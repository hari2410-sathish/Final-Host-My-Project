// src/pages/Courses/Git/Lesson1.jsx  (example path)
export const meta = {
  title: "Git Lesson 1",
  description: "A clean, beginner-friendly introduction to Git with images, examples, highlights and diagrams.",
  difficulty: "Beginner",
  duration: "12 min",
  tags: ["git", "version control", "basics"],
  updated: "2025-11-25",
  thumbnail: ""
};

// IMPORTANT: put images in src/assets/git/ and adjust import paths if your folder differs
import GitWhatIs from "../../../../assets/git/git-what-is.png";
import GitDistributed from "../../../../assets/git/git-distributed.png";
import GitWhy from "../../../../assets/git/git-why-use.png";
import GitArch from "../../../../assets/git/git-architecture.png";
import GitStates from "../../../../assets/git/git-file-states.png";

export default function Lesson1() {
  return (
    <div style={{
      padding: "25px",
      lineHeight: "1.75",
      fontSize: "17px",
      maxWidth: 1000,
      margin: "auto",
      color: "#222"
    }}>

      {/* TITLE */}
      <h1 style={{ fontSize: "34px", fontWeight: 800, marginBottom: 8 }}>Git – Lesson 1</h1>
      <p style={{ color: "#666", marginBottom: 18 }}>
        Beginner-friendly explanation of Git with diagrams, practical examples, and teacher-style highlights.
      </p>

      {/* 1. WHAT IS GIT */}
      <section>
        <h2 style={{ marginTop: 28 }}>1️⃣ What is Git?</h2>

        <img
          src={GitWhatIs}
          alt="What is Git"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          <strong>Git</strong> is a <em>Distributed Version Control System</em> (DVCS). It records every change 
          to your project files so you can track history, revert mistakes, and collaborate with teammates.
        </p>

        <div style={{
          background: "#e8f7ff",
          padding: 14,
          borderRadius: 8,
          borderLeft: "5px solid #007bff",
          marginTop: 12
        }}>
          <strong>Simple:</strong> Git = time machine + backup for your code.
        </div>

        <ul style={{ marginTop: 12 }}>
          <li>Keeps full history of changes</li>
          <li>Lets you undo or compare versions</li>
          <li>Helps multiple developers work together</li>
        </ul>
      </section>

      {/* 2. WHY DISTRIBUTED */}
      <section>
        <h2 style={{ marginTop: 28 }}>2️⃣ Why Git is Distributed?</h2>

        <img
          src={GitDistributed}
          alt="Distributed Git"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          In Git, each developer has a complete copy of the project (files + history + branches). This makes your workflow:
        </p>

        <div style={{
          background: "#fff7e6",
          padding: 14,
          borderRadius: 8,
          borderLeft: "5px solid #f4b400",
          marginTop: 12
        }}>
          <strong>Benefit:</strong> Work offline or continue even if the remote server is down.
        </div>
      </section>

      {/* 3. WHY USE GIT */}
      <section>
        <h2 style={{ marginTop: 28 }}>3️⃣ Why Developers Use Git?</h2>

        <img
          src={GitWhy}
          alt="Why use Git"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <ul>
          <li>🔍 Track every file change</li>
          <li>↩ Undo mistakes using commits</li>
          <li>🌿 Branch safely for new features</li>
          <li>🔀 Merge team changes with control</li>
          <li>🚀 Work offline then push later</li>
        </ul>
      </section>

      {/* 4. ARCHITECTURE */}
      <section>
        <h2 style={{ marginTop: 28 }}>4️⃣ Git Architecture (Core Workflow)</h2>

        <img
          src={GitArch}
          alt="Git Architecture"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <pre style={{
          background: "#f5f5f7",
          padding: 16,
          borderRadius: 8,
          fontSize: 15,
          overflowX: "auto"
        }}>
WORKING DIRECTORY  →  STAGING AREA  →  LOCAL REPOSITORY  →  REMOTE REPOSITORY
(edit files)             (git add)           (git commit)         (git push)
        </pre>

        <ul>
          <li><strong>Working Directory:</strong> Your editable files</li>
          <li><strong>Staging Area:</strong> Waiting room before commit</li>
          <li><strong>Local Repository:</strong> Saved snapshots inside <code>.git/</code></li>
          <li><strong>Remote Repository:</strong> GitHub / GitLab / Bitbucket</li>
        </ul>
      </section>

      {/* 5. FILE STATES */}
      <section>
        <h2 style={{ marginTop: 28 }}>5️⃣ Git File States</h2>

        <img
          src={GitStates}
          alt="Git File States"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <ul>
          <li><strong>Untracked:</strong> Git doesn't know the file yet</li>
          <li><strong>Modified:</strong> You changed the file but not staged</li>
          <li><strong>Staged:</strong> Marked for next commit</li>
          <li><strong>Committed:</strong> Saved in local history</li>
          <li><strong>Pushed:</strong> Uploaded to the remote</li>
        </ul>
      </section>

      {/* 6. COMMANDS */}
      <section>
        <h2 style={{ marginTop: 28 }}>6️⃣ Essential Git Commands</h2>

        <pre style={{
          background: "#1f1f1f",
          color: "#f1f1f1",
          padding: 14,
          borderRadius: 8,
          fontSize: 15,
          overflowX: "auto"
        }}>
git init             → Initialize a repo
git status           → See file states
git add file.txt     → Stage a file
git add .            → Stage all changes
git commit -m "msg"  → Save snapshot locally
git log              → View commit history
        </pre>
      </section>

      {/* 7. PRACTICAL EXAMPLE */}
      <section>
        <h2 style={{ marginTop: 28 }}>7️⃣ Practical Example (first repo)</h2>

        <pre style={{
          background: "#282c34",
          color: "#9cd37a",
          padding: 14,
          borderRadius: 8,
          fontSize: 15,
          overflowX: "auto"
        }}>
git init
echo "hello" &gt; a.txt
git status
git add a.txt
git commit -m "first commit"
git log
        </pre>

        <div style={{
          background: "#e8fff0",
          padding: 14,
          borderRadius: 8,
          borderLeft: "5px solid #28a745",
          marginTop: 12
        }}>
          🎉 <strong>Well done!</strong> You've created a repo, added a file, staged it and committed.
        </div>
      </section>

    </div>
  );
}
