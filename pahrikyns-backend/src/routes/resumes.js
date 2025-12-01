// api/resumes.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { Document, Packer, Paragraph, TextRun } = require("docx"); // optional for server-side docx
const router = express.Router();

// Ensure data dir exists
const DATA_DIR = path.join(__dirname, "..", "data", "resumes");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// Middleware: simple token auth (replace with your admin auth)
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  // TODO: validate token with your auth system
  next();
}

// Save new resume (create)
router.post("/", requireAuth, (req, res) => {
  try {
    const body = req.body;
    const id = uuidv4();
    const now = new Date().toISOString();
    const doc = { id, createdAt: now, updatedAt: now, published: false, views: 0, downloads: 0, premium: !!body.premium, ...body };
    fs.writeFileSync(path.join(DATA_DIR, `${id}.json`), JSON.stringify(doc, null, 2));
    res.json({ ok: true, id, doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "save_failed" });
  }
});

// Update resume
router.put("/:id", requireAuth, (req, res) => {
  try {
    const id = req.params.id;
    const file = path.join(DATA_DIR, `${id}.json`);
    if (!fs.existsSync(file)) return res.status(404).json({ ok: false });
    const existing = JSON.parse(fs.readFileSync(file));
    const updated = { ...existing, ...req.body, updatedAt: new Date().toISOString() };
    fs.writeFileSync(file, JSON.stringify(updated, null, 2));
    res.json({ ok: true, updated });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "update_failed" });
  }
});

// List resumes (for current admin) — prototype: returns all
router.get("/", requireAuth, (req, res) => {
  try {
    const items = fs.readdirSync(DATA_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f))));
    res.json(items);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "read_failed" });
  }
});

// Publish resume (make public) — returns a short publicId (slug)
router.post("/:id/publish", requireAuth, (req, res) => {
  try {
    const id = req.params.id;
    const file = path.join(DATA_DIR, `${id}.json`);
    if (!fs.existsSync(file)) return res.status(404).json({ ok: false });
    const doc = JSON.parse(fs.readFileSync(file));
    // create short public id (uuid v4 substring) OR use nanoid in prod
    const publicId = (doc.publicId) ? doc.publicId : uuidv4().slice(0, 8);
    doc.publicId = publicId;
    doc.published = true;
    doc.publicAt = new Date().toISOString();
    fs.writeFileSync(file, JSON.stringify(doc, null, 2));
    res.json({ ok: true, publicId, url: `/r/${publicId}` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
});

// Public view (no auth) — increments views
router.get("/public/:publicId", (req, res) => {
  try {
    const publicId = req.params.publicId;
    const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".json"));
    const file = files.find((f) => {
      const doc = JSON.parse(fs.readFileSync(path.join(DATA_DIR, f)));
      return doc.publicId === publicId;
    });
    if (!file) return res.status(404).send("Not found");
    const filePath = path.join(DATA_DIR, file);
    const doc = JSON.parse(fs.readFileSync(filePath));
    doc.views = (doc.views || 0) + 1;
    fs.writeFileSync(filePath, JSON.stringify(doc, null, 2));
    // return the resume data for client rendering
    res.json({ ok: true, doc });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false });
  }
});

// Download DOCX (server-side generation) — increments downloads
router.get("/:id/export/docx", requireAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const file = path.join(DATA_DIR, `${id}.json`);
    if (!fs.existsSync(file)) return res.status(404).json({ ok: false });

    const docData = JSON.parse(fs.readFileSync(file));

    // Basic docx generator using 'docx' library (server must have it)
    const doc = new Document();
    doc.addSection({
      children: [
        new Paragraph({ children: [ new TextRun({ text: docData.name || "", bold: true, size: 28 }) ] }),
        new Paragraph({ children: [ new TextRun({ text: docData.title || "", italics: true }) ] }),
        new Paragraph({ children: [ new TextRun({ text: "" }) ] }),
        new Paragraph({ children: [ new TextRun({ text: "Summary", bold: true }) ] }),
        new Paragraph(docData.summary || ""),
        new Paragraph({ children: [ new TextRun({ text: "" }) ] }),
      ],
    });

    const packer = new Packer();
    const b = await packer.toBuffer(doc);

    // increment downloads
    docData.downloads = (docData.downloads || 0) + 1;
    fs.writeFileSync(file, JSON.stringify(docData, null, 2));

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.setHeader("Content-Disposition", `attachment; filename=${(docData.name || "resume").replace(/\s/g,"_")}.docx`);
    res.send(b);
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = router;
