export const meta = {
  title: "Git Lesson 4",
  description: "Branching in Git: create, delete, switch, merge strategies, conflict resolution, and a hands-on feature-branch mini-project.",
  difficulty: "Beginner",
  duration: "45 min",
  tags: ["git", "branch", "merge", "workflow"],
  updated: "2025-11-25",
  thumbnail: ""
};

// IMAGE IMPORTS (put these inside: src/assets/git/)
import GitBranchImg from "../../../../assets/git/git-branch.png";
import GitSwitchImg from "../../../../assets/git/git-switch.png";
import GitMergeImg from "../../../../assets/git/git-merge.png";
import GitFlowImg from "../../../../assets/git/git-flow.png";
import GitConflictImg from "../../../../assets/git/git-conflict.png";

export default function Lesson4() {
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
      {/* TITLE */}
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
        Git – Lesson 4: Branching (create, delete, switch) + Merge Strategies
      </h1>
      <p style={{ color: "#666", marginBottom: 18 }}>
        Branching is how teams and individuals develop features safely. This lesson covers creating,
        switching, deleting branches, merging, resolving conflicts and a practical feature-branch
        mini-project.
      </p>

      {/* GOAL BOX */}
      <div
        style={{
          background: "#e8fff5",
          padding: 16,
          borderRadius: 8,
          borderLeft: "5px solid #28a745",
          marginBottom: 22,
        }}
      >
        <strong>Goal:</strong> After this lesson you will confidently use branches to develop
        features, understand merging strategies, and resolve merge conflicts in real projects.
      </div>

      {/* OVERVIEW */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣ What is a Branch?</h2>
        <p>
          A branch is a movable pointer to a commit. The main branch (often <code>main</code> or
          <code>master</code>) is the stable line. Feature branches let you work in isolation.
        </p>

        <img
          src={GitBranchImg}
          alt="git branch diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <p>
          Branches are lightweight and are the core of collaborative workflows. Use them to build
          features, fix bugs, or try experiments without affecting the main codebase.
        </p>
      </section>

      {/* BASIC COMMANDS */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣ Basic Branching Commands (create, list, switch, delete)</h2>

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
{`# List branches (local)
git branch

# Create new branch (local only)
git branch feature-1

# Create and switch to new branch
git checkout -b feature-1
# or (recommended in modern Git)
git switch -c feature-1

# Switch to existing branch
git checkout main
# or
git switch main

# Delete local branch (safe)
git branch -d feature-1

# Force-delete local branch (even if not merged)
git branch -D feature-1

# List remote branches
git branch -r

# Delete remote branch
git push origin --delete feature-1`}
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
          🔧 Modern tip: prefer <code>git switch</code> and <code>git restore</code> for switching
          and undoing — they are clearer than the older <code>git checkout</code> which has many
          responsibilities.
        </div>
      </section>

      {/* CREATE & SWITCH */}
      <section style={{ marginTop: 28 }}>
        <h2>3️⃣ Create & Switch (Detailed)</h2>
        <p>Step-by-step examples so beginners won't get lost.</p>

        <h3>Create (separate creation and switching)</h3>
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
{`git branch feature-login   # creates branch locally
git branch                # confirm it exists (star shows current branch)
git switch feature-login  # switch to the branch`}
        </pre>

        <h3>Create & switch in one step</h3>
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
{`git switch -c feature-login
# or
git checkout -b feature-login`}
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
          ✅ When you create a branch, Git simply points a new name to the current commit.
          Switching moves HEAD to the new branch.
        </div>
      </section>

      {/* PUBLISHING BRANCHES */}
      <section style={{ marginTop: 28 }}>
        <h2>4️⃣ Publish Branches (push to remote)</h2>
        <p>
          To share your branch with the team, push it to the remote and create a pull request /
          merge request.
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
{`git push -u origin feature-login
# -u sets upstream so later you can: git push and git pull without specifying origin feature-login`}
        </pre>

        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          🔁 After first push, use <code>git push</code> and <code>git pull</code> to sync changes.
        </div>
      </section>

      {/* MERGE vs REBASE */}
      <section style={{ marginTop: 28 }}>
        <h2>5️⃣ Merge vs Rebase (When & Why)</h2>
        <img
          src={GitMergeImg}
          alt="git merge diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <h3>Merge (safe, preserves history)</h3>
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
{`# From main
git checkout main
git merge feature-login`}
        </pre>

        <p>
          Merge creates a merge commit that keeps both branches' histories. Use this in shared
          repositories where history preservation is important.
        </p>

        <h3>Rebase (linear history)</h3>
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
{`# From feature branch
git checkout feature-login
git rebase main

# Or to rebase interactively (squash / reorder)
git rebase -i main`}
        </pre>

        <p>
          Rebase rewrites commits to produce a linear history. Use it for local cleanup before
          publishing. Avoid rebasing public branches that others use.
        </p>

        <div
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            marginTop: 12,
          }}
        >
          ⚠️ Rule: <em>Do not rebase commits that you have already pushed and others may depend on.</em>
        </div>
      </section>

      {/* CONFLICTS */}
      <section style={{ marginTop: 28 }}>
        <h2>6️⃣ Merge Conflicts — How to Resolve</h2>
        <img
          src={GitConflictImg}
          alt="git conflict diagram"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <h3>When conflicts occur</h3>
        <p>
          Conflicts happen when Git cannot automatically combine changes from two branches. You'll
          see conflict markers inside files.
        </p>

        <h3>Example flow to resolve conflicts</h3>
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
{`# Step 1: try to merge
git checkout main
git merge feature-login

# If conflict appears:
git status           # shows conflicted files

# Edit the conflicted files, remove markers, fix content
git add conflicted-file.txt

# Continue merge / commit
git commit           # completes merge (message auto-populated for merge)
# OR, if rebasing:
git rebase --continue`}
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
          🔍 Tip: Use a diff/merge tool (VSCode, Meld, KDiff3) to simplify conflict resolution.
        </div>
      </section>

      {/* BRANCH CLEANUP */}
      <section style={{ marginTop: 28 }}>
        <h2>7️⃣ Cleaning Up Branches (local & remote)</h2>

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
{`# Delete local branch (safe)
git branch -d feature-login

# Force delete local branch
git branch -D feature-login

# Delete remote branch
git push origin --delete feature-login

# Prune deleted remote branches locally
git fetch --prune

# Show all branches (local + remote)
git branch -a`}
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
          ✅ Clean branches to avoid clutter and confusion. Delete feature branches after merging.
        </div>
      </section>

      {/* WORKFLOWS */}
      <section style={{ marginTop: 28 }}>
        <h2>8️⃣ Popular Branching Workflows</h2>

        <img
          src={GitFlowImg}
          alt="git flow"
          style={{ width: "100%", borderRadius: 10, margin: "12px 0" }}
        />

        <h3>GitHub flow (simple)</h3>
        <ol>
          <li>Create a short-lived feature branch</li>
          <li>Push and open PR</li>
          <li>Code review & merge into main</li>
        </ol>

        <h3>Git Flow (release-oriented)</h3>
        <ul>
          <li>Uses branches: <code>develop</code>, <code>release</code>, <code>hotfix</code></li>
          <li>More structured, used by teams with releases</li>
        </ul>

        <h3>Trunk-based development</h3>
        <ul>
          <li>Short-lived branches or feature flags</li>
          <li>Continuous integration and frequent merges to trunk</li>
        </ul>
      </section>

      {/* MINI-PROJECT: FEATURE BRANCH */}
      <section style={{ marginTop: 40 }}>
        <h2>9️⃣ Mini Project — Feature Branch Workflow (Hands-on)</h2>
        <p>
          We'll create a repo, add a small app file, create a feature branch to add a function,
          merge it back, and simulate a conflict.
        </p>

        <h3>Step A — Setup</h3>
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
{`mkdir feature-demo
cd feature-demo
git init
echo 'console.log("app v1")' > app.js
git add .
git commit -m "Initial commit: app v1"`}
        </pre>

        <h3>Step B — Create feature branch & modify</h3>
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
{`git switch -c feature-add-greet
# edit app.js and add a function
# app.js
# console.log("app v1")
# function greet(name) {
#   return \`Hello, \${name}!\`;
# }
# console.log(greet("Hari"))

git add app.js
git commit -m "feat: add greet function"`}
        </pre>

        <h3>Step C — Switch back to main and modify (simulate conflict)</h3>
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
{`git switch main
# edit app.js to change the same lines - for conflict
# app.js
# console.log("app v1")
# function greet(name) {
#   return \`Hi, \${name}!\`;
# }
# console.log(greet("Siva"))

git add app.js
git commit -m "chore: tweak greet greeting on main"`}
        </pre>

        <h3>Step D — Merge feature into main (conflict appears)</h3>
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
{`git merge feature-add-greet
# conflict markers will appear in app.js
git status`}
        </pre>

        <h3>Step E — Resolve conflict</h3>
        <pre
          style={{
            background: "#e6f0ff",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #4285f4",
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`# Edit app.js and choose the final greeting
git add app.js
git commit -m "fix: resolve merge conflict and unify greeting"`}
        </pre>

        <h3>Step F — Push branch and delete remote after merge</h3>
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
{`git push -u origin main
# if feature branch was pushed earlier:
git push origin --delete feature-add-greet`}
        </pre>

        <div
          style={{
            background: "#e8fff0",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #28a745",
            marginTop: 12,
          }}
        >
          🔁 This flow mirrors a PR-based workflow: create feature branch → push → open PR → review
          → merge → delete branch.
        </div>
      </section>

      {/* BEST PRACTICES */}
      <section style={{ marginTop: 28 }}>
        <h2>🔟 Best Practices for Branching</h2>
        <ul>
          <li>Keep branches short-lived (hours to days, not months).</li>
          <li>Use clear names: <code>feature/login</code>, <code>fix/typo</code>, <code>hotfix/</code>.</li>
          <li>Rebase locally to clean history, but don't rebase shared branches.</li>
          <li>Run tests locally before merging.</li>
          <li>Use code reviews for quality and knowledge sharing.</li>
        </ul>
      </section>

      {/* TROUBLESHOOTING */}
      <section style={{ marginTop: 28 }}>
        <h2>Ⓜ Troubleshooting & Common Errors</h2>

        <h3>Issue: "error: Your local changes to the following files would be overwritten by merge"</h3>
        <pre
          style={{
            background: "#ffe6e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #ff5c5c",
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`Solution:
Stash or commit your local changes before switching or merging:
git stash
# or
git add .
git commit -m "WIP: save before merge"
# then merge / switch`}
        </pre>

        <h3>Issue: Accidentally deleted branch</h3>
        <pre
          style={{
            background: "#fff7e6",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #f4b400",
            fontSize: 15,
            overflowX: "auto",
          }}
        >
{`Solution:
If branch was recently deleted and you know the last commit hash:
git branch recovered <commit-hash>
# Or find the hash using reflog:
git reflog
git checkout -b recovered <hash>`}
        </pre>
      </section>

      {/* INTERVIEW Qs */}
      <section style={{ marginTop: 28 }}>
        <h2>Ⓜ Interview Questions (Branching)</h2>
        <ol>
          <li>How do you create and switch to a new branch?</li>
          <li>Explain git merge vs git rebase — pros and cons.</li>
          <li>How do you resolve a merge conflict?</li>
          <li>How to delete a remote branch?</li>
          <li>When would you prefer trunk-based development over Git Flow?</li>
        </ol>
      </section>

      {/* PRACTICE TASKS */}
      <section style={{ marginTop: 28 }}>
        <h2>🧩 Practice Tasks (5 exercises)</h2>
        <ol>
          <li>Create a branch <code>feature-a</code>, add a file, commit and push to remote.</li>
          <li>Create two branches and produce a conflict intentionally, then resolve it.</li>
          <li>Rebase a feature branch on top of main and squash commits.</li>
          <li>Simulate a wrongly rebased public branch and explain how to fix it.</li>
          <li>Implement a small feature, open a PR, and delete the branch after merge.</li>
        </ol>
      </section>

      {/* CONCLUSION */}
      <section style={{ marginTop: 40, marginBottom: 80 }}>
        <h2>✔ Conclusion</h2>
        <p>
          Branches are essential for safe development. We covered creation, switching, publishing,
          merging, rebasing, conflict resolution and cleanup. Practice the mini-project until the
          flow feels natural.
        </p>
      </section>
    </div>
  );
}

Lesson4.displayName = "GIT Lesson 4 – Full Content";
