export const meta = {
  title: "Git Lesson 2",
  description: "Install Git on Ubuntu, Linux, CentOS, RedHat, macOS & Windows with step-by-step guidance.",
  difficulty: "Beginner",
  duration: "10 min",
  tags: ["git", "install", "setup"],
  updated: "2025-11-25",
  thumbnail: ""
};

export default function Lesson2() {
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
        Git – Lesson 2: Installing Git
      </h1>
      <p style={{ color: "#666", marginBottom: 18 }}>
        Follow these platform-specific instructions to install Git on Linux, macOS and Windows.
        Screenshots not needed — commands are beginner friendly and verified.
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
        <strong>Goal:</strong> After this lesson, you will have Git installed and ready to use on your
        operating system.
      </div>

      {/* UBUNTU / DEBIAN */}
      <section style={{ marginTop: 28 }}>
        <h2>1️⃣ Install Git – Ubuntu / Debian</h2>
        <p>Works for Ubuntu, Debian, Linux Mint and similar distros.</p>

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
{`sudo apt update
sudo apt install git -y
git --version`}
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
          📝 <strong>Tip:</strong> If <code>git --version</code> prints a version number, installation
          is successful.
        </div>
      </section>

      {/* CENTOS / RHEL */}
      <section style={{ marginTop: 28 }}>
        <h2>2️⃣ Install Git – CentOS / RHEL</h2>

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
{`sudo yum install git -y
git --version`}
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
          🔧 If <code>yum</code> fails, enable EPEL repository and try again.
        </div>
      </section>

      {/* MACOS */}
      <section style={{ marginTop: 28 }}>
        <h2>3️⃣ Install Git – macOS</h2>

        <p>Recommended: Use Homebrew (macOS package manager).</p>

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
{`brew install git
git --version`}
        </pre>

        <div
          style={{
            background: "#ffe6f3",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #d63384",
            marginTop: 12,
          }}
        >
          🍎 If you don't have Homebrew, install it from <code>brew.sh</code>
        </div>
      </section>

      {/* WINDOWS */}
      <section style={{ marginTop: 28 }}>
        <h2>4️⃣ Install Git – Windows</h2>

        <p>Download the official Git installer:</p>
        <a
          href="https://git-scm.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#007bff" }}
        >
          https://git-scm.com
        </a>

        <div
          style={{
            background: "#f0f7ff",
            padding: 14,
            borderRadius: 8,
            borderLeft: "5px solid #3273dc",
            marginTop: 12,
          }}
        >
          Windows installation includes <strong>Git Bash</strong>, a Linux-style terminal.
        </div>

        <ol style={{ marginTop: 12 }}>
          <li>Download the installer</li>
          <li>Click “Next” for default settings</li>
          <li>Install Git Bash when prompted</li>
          <li>Open Git Bash and run:</li>
        </ol>

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
{`git --version`}
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
          🎉 <strong>You're ready!</strong> Git is now installed on Windows.
        </div>
      </section>

      {/* CONCLUSION */}
      <section style={{ marginTop: 35 }}>
        <h2>✔ Conclusion</h2>
        <p>
          Git is now installed on your system. In the next lesson, you will configure your Git identity
          and start creating your first repository.
        </p>
      </section>
    </div>
  );
}

Lesson2.displayName = "GIT Lesson 2 – Full Content";
