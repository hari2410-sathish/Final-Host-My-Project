// src/pages/Admin/Resume/ResumeBuilder.jsx
import React, { useRef, useState } from "react";
import { Box, Button, MenuItem, Select, Typography, Stack } from "@mui/material";
import { ResumeProvider, useResume } from "./ResumeContext";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// CLOUD API (YOU MUST IMPLEMENT THESE)
import { saveToServer, publishResume, exportDocxServer } from "../../../api/resume";



function BuilderInner() {
  const {
    resume,
    setTemplate,
    setTheme,
    exportJSON,
    importJSON,
    saveToLocal,
    loadFromLocal,
    resetResume,
  } = useResume();

  const previewRef = useRef();
  const [importError, setImportError] = useState(null);
  const [serverId, setServerId] = useState(null);

  // -------------------
  // CLOUD SAVE
  // -------------------
  const handleSaveCloud = async () => {
    try {
      const id = await saveToServer(serverId);
      setServerId(id);
      alert("Resume saved to cloud: " + id);
    } catch (e) {
      alert("Cloud save failed");
    }
  };

  // -------------------
  // PUBLISH PUBLIC URL
  // -------------------
  const handlePublish = async () => {
    try {
      let id = serverId;

      if (!id) {
        id = await saveToServer();
        setServerId(id);
      }

      const resp = await publishResume(id);
      const publicUrl = window.location.origin + resp.url;

      navigator.clipboard.writeText(publicUrl);
      alert("Published! URL copied: " + publicUrl);
    } catch (e) {
      alert("Publish failed");
    }
  };

  // -------------------
  // EXPORT DOCX (SERVER)
  // -------------------
  const handleExportDocx = async () => {
    try {
      let id = serverId;
      if (!id) {
        id = await saveToServer();
        setServerId(id);
      }
      await exportDocxServer(id);
    } catch (e) {
      alert("DOCX export failed");
    }
  };

  // -------------------
  // EXPORT PDF
  // -------------------
  const downloadPDF = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "pt", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);

    const imgHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, imgHeight);
    pdf.save(`${(resume.name || "resume").replace(/\s+/g, "_")}.pdf`);
  };

  // -------------------
  // PRINT
  // -------------------
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write("<html><head><title>Print Resume</title></head><body>");
    printWindow.document.write(previewRef.current.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  // -------------------
  // IMPORT JSON
  // -------------------
  const handleImportFile = async (e) => {
    setImportError(null);
    const f = e.target.files?.[0];
    if (!f) return;

    const ok = await importJSON(f);
    if (!ok) setImportError("Invalid file format");

    e.target.value = "";
  };

  return (
    <Box>

      {/* TOOLBAR */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h6">Resume Builder</Typography>

        {/* TEMPLATE PICKER */}
        <Select
          value={resume.template || "simple"}
          size="small"
          onChange={(e) => setTemplate(e.target.value)}
        >
          <MenuItem value="simple">Simple</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="pro">Pro</MenuItem>
          <MenuItem value="master">Master</MenuItem>
          <MenuItem value="ultra-pro">Ultra Pro</MenuItem>
        </Select>

        {/* THEME PICKER */}
        <Select
          value={resume.theme || "default"}
          size="small"
          onChange={(e) => setTheme(e.target.value)}
        >
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="green">Green</MenuItem>
        </Select>

        {/* LOCAL SAVE/LOAD */}
        <Button variant="outlined" onClick={saveToLocal}>Save</Button>
        <Button variant="outlined" onClick={loadFromLocal}>Load</Button>
        <Button variant="outlined" onClick={resetResume}>Reset</Button>

        {/* JSON IMPORT/EXPORT */}
        <Button variant="contained" onClick={exportJSON}>Export JSON</Button>

        <label>
          <input type="file" accept="application/json" onChange={handleImportFile} hidden />
          <Button variant="contained" component="span">Import JSON</Button>
        </label>

        {/* PDF / PRINT */}
        <Button variant="contained" onClick={downloadPDF}>PDF</Button>
        <Button variant="outlined" onClick={handlePrint}>Print</Button>

        {/* CLOUD */}
        <Button variant="contained" color="secondary" onClick={handleSaveCloud}>Save Cloud</Button>
        <Button variant="contained" color="success" onClick={handlePublish}>Publish</Button>
        <Button variant="contained" onClick={handleExportDocx}>Export DOCX</Button>
      </Stack>

      {/* MAIN LAYOUT */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* LEFT FORM */}
        <Box
          sx={{
            width: "35%",
            bgcolor: "#0f172a",
            color: "white",
            p: 2,
            borderRight: "1px solid #1e293b",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <ResumeForm />
        </Box>

        {/* PREVIEW */}
        <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
          <div ref={previewRef}>
            <ResumePreview />
          </div>
        </Box>
      </Box>

      {importError && <Typography color="error">{importError}</Typography>}
    </Box>
  );
}

export default function ResumeBuilder() {
  return (
    <ResumeProvider>
      <BuilderInner />
    </ResumeProvider>
  );
}
