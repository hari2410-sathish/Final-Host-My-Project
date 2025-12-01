export const meta = {
  title: "Git Lesson 5",
  description:
    "Understand git stash, restore, and reset (soft/mixed/hard) with diagrams, warnings, examples, and a full hands-on rescue mini-project.",
  difficulty: "Intermediate",
  duration: "45 min",
  tags: ["git", "stash", "restore", "reset"],
  updated: "2025-11-25",
  thumbnail: "",
};

// Add these inside: /src/assets/git/
import GitStashImg from "../../../../assets/git/git-stash.png";
import GitResetImg from "../../../../assets/git/git-reset.png";
import GitRestoreImg from "../../../../assets/git/git-restore.png";
import GitDangerImg from "../../../../assets/git/git-danger.png";

export default function Lesson5() {
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
      {/* ---------------------------------------------- */}
      {/* TITLE */}
      {/* ---------------------------------------------- */}
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
        Git – Lesson 5: Stash, Restore, Reset (Soft / Mixed / Hard)
      </h1>

      <p style={{ color: "#666", marginBottom: 18 }}>
        In this lesson we go deep into Git’s most misunderstood commands — stash, restore, and reset.
        These commands help you undo mistakes, recover lost work, and clean your working directory
        like a pro.
      </p>

      <div
        style={{
          background: "#e8fff5",
          padding: 16,
          borderRadius: 8,
          borderLeft: "5px solid #28a745",
          marginBottom: 22,
        }}
      >
        <strong>Goal:</strong> After this lesson you will confidently recover deleted work, undo
        commits, revert file changes, and safely switch tasks using Git stash.
      </div>

      {/* ---------------------------------------------- */}
      {/* SECTION 1: OVERVIEW */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>1️⃣ Why These Commands Matter</h2>
        <p>
          New Git users often fear making mistakes. These commands help you stay safe — no matter
          what goes wrong. They are your “undo superpowers.”
        </p>

        <ul>
          <li>
            <strong>stash</strong> → Save unfinished work temporarily
          </li>
          <li>
            <strong>restore</strong> → Undo changes in working directory or staging area
          </li>
          <li>
            <strong>reset</strong> → Move branch pointer (undo commits)
          </li>
        </ul>

        <img
          src={GitDangerImg}
          alt="Git danger"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <div
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          ⚠️ These are powerful commands. Used incorrectly, they can permanently remove work. Today
          you will learn the safe way.
        </div>
      </section>

      {/* ---------------------------------------------- */}
      {/* SECTION 2: GIT STASH */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>2️⃣ git stash — Save Unfinished Work</h2>
        <p>
          Stash temporarily stores your changes without committing them. Useful when you must switch
          tasks quickly.
        </p>

        <img
          src={GitStashImg}
          alt="git stash diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <h3>Basic Usage</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
            overflowX: "auto",
          }}
        >
{`git stash
git stash list
git stash pop
git stash apply
git stash drop`}
        </pre>

        <h3>Use Cases</h3>
        <ul>
          <li>Stop current work and hotfix another issue</li>
          <li>Switch branch without committing messy code</li>
          <li>Experiment and revert easily</li>
        </ul>

        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          💡 <strong>git stash pop</strong> = apply + delete  
          <br />
          💡 <strong>git stash apply</strong> = apply but keep the stash saved
        </div>

        <h3>Stash With Message</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git stash push -m "WIP: login page UI"`}
        </pre>

        <h3>Stash Untracked Files Too</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git stash push -u`}
        </pre>
      </section>

      {/* ---------------------------------------------- */}
      {/* SECTION 3: GIT RESTORE */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>3️⃣ git restore — Undo File Changes</h2>

        <img
          src={GitRestoreImg}
          alt="git restore diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>Restore replaced older commands like git checkout -- file.</p>

        <h3>Discard changes in working directory</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git restore file.txt`}
        </pre>

        <h3>Unstage a file</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git restore --staged file.txt`}
        </pre>

        <h3>Restore from a specific commit</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git restore --source <commit-id> file.txt`}
        </pre>

        <div
          style={{
            background: "#fff8e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          ⚠️ Restore only affects files. It does not move commits or branches.
        </div>
      </section>

      {/* ---------------------------------------------- */}
      {/* SECTION 4: GIT RESET */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>4️⃣ git reset — Undo Commits (Soft / Mixed / Hard)</h2>

        <img
          src={GitResetImg}
          alt="git reset diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          Reset changes where your branch pointer (HEAD) points. There are 3 types, and understanding
          the difference is crucial.
        </p>

        <h3>Soft Reset (keep everything staged)</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git reset --soft HEAD~1`}
        </pre>

        <p>
          Moves HEAD backward by 1 commit but keeps all changes in staging. Useful for rewriting the
          last commit.
        </p>

        <h3>Mixed Reset (default — keep changes unstaged)</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git reset HEAD~1`}
        </pre>

        <p>Undo commit but leave changes in the working directory (unstaged).</p>

        <h3>Hard Reset (danger — deletes changes)</h3>
        <pre
          style={{
            background: "#ffebeb",
            color: "#c70000",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git reset --hard HEAD~1`}
        </pre>

        <div
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            marginTop: 12,
          }}
        >
          ❌ Hard reset permanently deletes all changes in your working directory & staging area.
        </div>

        <h3>Reset to a specific commit</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git reset --hard <commit-id>`}
        </pre>
      </section>

      {/* ---------------------------------------------- */}
      {/* SECTION 5: MINI PROJECT */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 50 }}>
        <h2>5️⃣ Mini Project — “Undo & Rescue Lab”</h2>

        <p>
          This lab simulates real developer mistakes and teaches you how to recover using stash,
          restore, and reset.
        </p>

        <h3>Step A — Setup</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
          }}
        >
{`mkdir rescue-lab
cd rescue-lab
git init
echo "line 1" > demo.txt
git add .
git commit -m "Initial commit"`}
        </pre>

        <h3>Step B — Make changes and stash them</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
          }}
        >
{`echo "work in progress" >> demo.txt
git stash push -m "WIP: editing demo file"`}        
        </pre>

        <h3>Step C — Recover stashed work</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
          }}
        >
{`git stash list
git stash pop`}
        </pre>

        <h3>Step D — Wrong commit? Undo using reset</h3>
        <pre
          style={{
            background: "#1f1f1f",
            color: "#f1f1f1",
            padding: 14,
          }}
        >
{`git add .
git commit -m "Oops: bad commit"
git reset --soft HEAD~1  # uncommit safely`}        
        </pre>

        <h3>Step E — Overwrite changes using restore</h3>
        <pre
          style={{
            background: "#282c34",
            color: "#9cd37a",
            padding: 14,
          }}
        >
{`echo "bad data" >> demo.txt
git restore demo.txt   # undo it`}
        </pre>
      </section>

      {/* ---------------------------------------------- */}
      {/* SECTION 6: TROUBLESHOOTING */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>6️⃣ Troubleshooting & Recovery</h2>

        <h3>❌ “I lost changes after hard reset!”</h3>
        <div
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
          }}
        >
          Try: <code>git reflog</code> — it shows EVERY previous HEAD position.  
          You may recover with:  
          <code>git reset --hard &lt;old-hash&gt;</code>
        </div>

        <h3>❌ “Stash pop caused conflict”</h3>
        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
          }}
        >
{`git status
# fix conflicts
git add .
git commit`}
        </pre>
      </section>

      {/* ---------------------------------------------- */}
      {/* SECTION 7: INTERVIEW QUESTIONS */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 40 }}>
        <h2>7️⃣ Interview Questions</h2>

        <ol>
          <li>What is the difference between soft, mixed, and hard reset?</li>
          <li>What does git restore do that git reset does not?</li>
          <li>Why is git stash useful in workflow?</li>
          <li>How do you recover a commit lost by reset?</li>
          <li>Difference between stash apply and stash pop?</li>
        </ol>
      </section>

      {/* ---------------------------------------------- */}
      {/* CONCLUSION */}
      {/* ---------------------------------------------- */}
      <section style={{ marginTop: 40, marginBottom: 80 }}>
        <h2>✔ Conclusion</h2>
        <p>
          You now have complete control over undoing changes, switching tasks quickly, and rescuing
          lost work — a skill every real developer MUST know. These commands turn you from beginner
          to confident Git user instantly.
        </p>
      </section>
    </div>
  );
}

Lesson5.displayName = "GIT Lesson 5 – Full Content";
