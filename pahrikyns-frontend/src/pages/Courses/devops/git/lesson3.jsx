export const meta = {
  title: "Git Lesson 3",
  description: "Basic Git commands explained in depth: init, clone, status, add, commit — with graphics, examples, mistakes, troubleshooting and a real mini-project.",
  difficulty: "Beginner",
  duration: "45 min",
  tags: ["git", "basics", "init", "clone", "commit"],
  updated: "2025-11-25",
  thumbnail: ""
};

// IMAGE IMPORTS
// put these inside: src/assets/git/
import GitInitImg from "../../../../assets/git/git-init.png";
import GitCloneImg from "../../../../assets/git/git-clone.png";
import GitStatusImg from "../../../../assets/git/git-status.png";
import GitAddImg from "../../../../assets/git/git-add.png";
import GitCommitImg from "../../../../assets/git/git-commit.png";
import GitWorkflowImg from "../../../../assets/git/git-architecture.png"; // reuse from lesson 1

export default function Lesson3() {
  return (
    <div
      style={{
        padding: "25px",
        lineHeight: "1.75",
        fontSize: "17px",
        maxWidth: 1000,
        margin: "auto",
        color: "#222",
      }}
    >
      {/* ------------------------------------------------------------- */}
      {/* TITLE */}
      {/* ------------------------------------------------------------- */}
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
        Git – Lesson 3: Basic Git Commands (init, clone, status, add, commit)
      </h1>
      <p style={{ color: "#666", marginBottom: 18 }}>
        In this 45-minute deep-dive, you’ll learn the 5 most important Git commands every developer
        uses daily. This lesson includes diagrams, examples, a mini-project and troubleshooting.
      </p>

      {/* INTRO BOX */}
      <div
        style={{
          background: "#e8fff5",
          padding: 16,
          borderRadius: 8,
          borderLeft: "5px solid #28a745",
          marginBottom: 22,
        }}
      >
        <strong>Goal:</strong> After this lesson, you will be able to create repositories, clone
        projects, track changes, stage files and save commits like a real developer.
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 1 — GIT WORKFLOW OVERVIEW */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>1️⃣ Before We Start — The Git Workflow</h2>
        <p>
          To understand today’s commands, you must clearly understand how Git sees your project.
          Here’s the famous 4-stage Git workflow:
        </p>

        <img
          src={GitWorkflowImg}
          alt="Git workflow"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <pre
          style={{
            background: "#f5f5f7",
            padding: 16,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`WORKING DIRECTORY  →  STAGING AREA  →  LOCAL REPOSITORY  →  REMOTE REPOSITORY
(edit files)             (git add)            (git commit)          (git push)`}
        </pre>

        <p>
          The commands you’ll learn today (<code>init</code>, <code>clone</code>, <code>status</code>,
          <code>add</code>, <code>commit</code>) interact directly with these stages.
        </p>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 2 — GIT INIT */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>2️⃣ git init — Create a New Repository</h2>
        <p>
          The <code>git init</code> command converts any folder on your system into a Git-tracked
          project.
        </p>

        <img
          src={GitInitImg}
          alt="git init diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <h3>📌 When do you use git init?</h3>
        <ul>
          <li>Creating a brand-new project from scratch</li>
          <li>Turning an existing folder into a Git repo</li>
          <li>Starting small scripts or notes with version control</li>
        </ul>

        <h3>🔧 Command:</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`mkdir myproject
cd myproject
git init`}
        </pre>

        <div
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          📁 After running <code>git init</code>, Git creates a hidden <code>.git/</code> folder.
          This folder contains all commit history, branches and configuration.
        </div>

        <h3 style={{ marginTop: 20 }}>❗ Common Mistake</h3>
        <div
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            marginTop: 12,
          }}
        >
          ❌ Running <code>git init</code> inside another Git project creates nested repos.
          <br />➡ Run <code>git status</code> first to confirm you’re in the right folder.
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 3 — GIT CLONE */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>3️⃣ git clone — Download an Existing Repository</h2>

        <img
          src={GitCloneImg}
          alt="git clone diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          The <code>git clone</code> command copies an entire remote repository (GitHub, GitLab,
          Bitbucket) to your computer — including all branches & commit history.
        </p>

        <h3>🔧 Command:</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git clone https://github.com/user/project.git`}
        </pre>

        <h3>📌 What git clone does:</h3>
        <ul>
          <li>Creates a new folder with the project name</li>
          <li>Downloads all files</li>
          <li>Pulls entire commit history</li>
          <li>Links your project to the remote origin</li>
        </ul>

        <h3 style={{ marginTop: 20 }}>❗ Common Mistake</h3>
        <div
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            marginTop: 12,
          }}
        >
          ❌ Running <code>git clone</code> inside another project creates nested folders.
          <br />➡ Always run clone in your HOME or PROJECTS directory.
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 4 — GIT STATUS */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>4️⃣ git status — See What Changed</h2>

        <img
          src={GitStatusImg}
          alt="git status diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          This command is used more than ANY other Git command. It tells you exactly what is happening
          in your working directory.
        </p>

        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git status`}
        </pre>

        <h3>What it shows:</h3>
        <ul>
          <li>Untracked files</li>
          <li>Modified files</li>
          <li>Staged files</li>
          <li>Which branch you’re on</li>
          <li>If your branch is ahead/behind remote</li>
        </ul>

        <h3 style={{ marginTop: 20 }}>❗ Common Mistake</h3>
        <div
          style={{
            background: "#e6f0ff",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #4285f4",
            marginTop: 12,
          }}
        >
          👉 Many beginners forget to run <code>git status</code> and get confused.
          <br />
          Solution: Run it **before every git add or commit**.
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 5 — GIT ADD */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>5️⃣ git add — Move Files to Staging Area</h2>

        <img
          src={GitAddImg}
          alt="git add diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          The <code>git add</code> command tells Git which files you want to include in the next
          commit.
        </p>

        <h3>Examples:</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git add file.txt
git add folder/
git add .`}
        </pre>

        <h3>📌 What git add does NOT do</h3>
        <div
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            marginTop: 12,
          }}
        >
          ❌ It does NOT save changes permanently.
          <br />
          Only <strong>git commit</strong> saves changes.
        </div>

        <h3>📌 Tip</h3>
        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          Use <code>git add .</code> when you want to stage EVERYTHING.
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 6 — GIT COMMIT */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>6️⃣ git commit — Save Your Work</h2>

        <img
          src={GitCommitImg}
          alt="git commit diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          A commit is a permanent snapshot of your project. Think of it like “Save Game” in a video
          game.
        </p>

        <h3>Basic commit:</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git commit -m "Add homepage layout"`}
        </pre>

        <h3>📌 What makes a good commit message?</h3>
        <ul>
          <li>Short & clear</li>
          <li>Describe what changed</li>
          <li>Use present tense (Add, Fix, Update)</li>
        </ul>

        <h3>Examples:</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git commit -m "Fix login validation"
git commit -m "Update header design"
git commit -m "Refactor user service"`}
        </pre>

        <div
          style={{
            background: "#e6f0ff",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #4285f4",
            marginTop: 12,
          }}
        >
          🔍 A commit stores: file changes, author, timestamp, and unique commit ID.
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 7 — MINI PROJECT */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 50 }}>
        <h2>7️⃣ Mini Project — Build and Commit a Notes App</h2>
        <p>
          Let’s create a simple “Notes App” project and practice every command you learned. This
          hands-on mini-project is exactly what students do in real Git training sessions.
        </p>

        <h3>📁 Step 1 — Create project</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`mkdir notes-app
cd notes-app
git init`}
        </pre>

        <h3>📄 Step 2 — Create your first file</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`echo "My first note" > notes.txt`}
        </pre>

        <h3>📊 Step 3 — Check status</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git status`}
        </pre>

        <h3>📥 Step 4 — Stage the file</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git add notes.txt`}
        </pre>

        <h3>💾 Step 5 — Commit it</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git commit -m "Add initial notes file"`}
        </pre>

        <h3>🔄 Step 6 — Modify file & commit again</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`echo "Another note" >> notes.txt
git status
git add .
git commit -m "Update notes with new entry"`}
        </pre>

        <h3>📜 Step 7 — View commit history</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`git log`}
        </pre>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 8 — TROUBLESHOOTING */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 50 }}>
        <h2>8️⃣ Troubleshooting (Beginner Mistakes)</h2>

        <h3>❌ Problem: “fatal: not a git repository”</h3>
        <pre
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            fontSize: 15,
          }}
        >
{`Solution:
cd into a folder where git init or git clone was done.`}
        </pre>

        <h3>❌ Problem: “nothing to commit”</h3>
        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            fontSize: 15,
          }}
        >
{`Solution:
You need to modify a file or add a new one.`}
        </pre>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 9 — INTERVIEW QUESTIONS */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 50 }}>
        <h2>9️⃣ Interview Questions</h2>
        <ul>
          <li>What is the difference between git add and git commit?</li>
          <li>What does git status show?</li>
          <li>What is stored inside .git/ folder?</li>
          <li>What’s the difference between init and clone?</li>
        </ul>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SECTION 10 — CONCLUSION */}
      {/* ------------------------------------------------------------- */}
      <section style={{ marginTop: 40, marginBottom: 80 }}>
        <h2>✔ Conclusion</h2>
        <p>
          You now understand the 5 most important Git commands used daily by every developer. In the
          next lesson, we’ll explore Git branches — one of the most powerful features in version
          control.
        </p>
      </section>
    </div>
  );
}

Lesson3.displayName = "GIT Lesson 3 – Full Content";
