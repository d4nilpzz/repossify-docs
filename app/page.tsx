import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  FileCheck2,
  GitBranch,
  KeyRound,
  LayoutDashboard,
  Package,
} from "lucide-react";
import { basePath, siteConfig } from "@/site.config";
import GitHubStars from "@/components/GitHubStars";

const features = [
  {
    icon: <Package size={18} />,
    title: "Releases and snapshots",
    text: "Correct maven-metadata.xml, checksums and timestamped snapshot builds, the way Maven and Gradle expect them.",
  },
  {
    icon: <GitBranch size={18} />,
    title: "Mirrors upstream",
    text: "Point a build at Repossify alone. Anything it does not hold is fetched from the upstream you configure and cached.",
  },
  {
    icon: <KeyRound size={18} />,
    title: "Tokens scoped by path",
    text: "A token gets read or write on a path prefix, with an optional expiry. A deploy token for one library can touch nothing else.",
  },
  {
    icon: <Boxes size={18} />,
    title: "Per-repository rules",
    text: "Public, hidden or private, with its own redeployment policy, snapshot retention and storage quota.",
  },
  {
    icon: <FileCheck2 size={18} />,
    title: "Conditional and ranged",
    text: "Clients revalidate instead of re-downloading, and interrupted downloads of large jars resume where they stopped.",
  },
  {
    icon: <LayoutDashboard size={18} />,
    title: "Dashboard included",
    text: "Browse artifacts, search, read download statistics and manage tokens from the browser, or do all of it over the API.",
  },
];

export default function LandingPage() {
  const repoPath = siteConfig.repo.replace("https://github.com/", "");

  return (
    <div className="landing">
      <nav className="landing-nav">
        <Link href="/" className="landing-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${basePath}${siteConfig.logo}`} alt="" />
          <span className="wordmark">Repossify</span>
        </Link>
        <div className="landing-nav-links">
          <Link className="landing-nav-link" href={`${siteConfig.docsBase}/`}>
            Documentation
          </Link>
          <a className="landing-nav-link" href={siteConfig.repo} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="landing-nav-link" href={siteConfig.discord} target="_blank" rel="noreferrer">
            Discord
          </a>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero">
          <span className="status-pill">
            <span className="status-dot" aria-hidden />
            In development
          </span>

          <h1 className="hero-title">
            <span className="wordmark">Repossify</span>, your private Maven repository
          </h1>

          <p className="hero-sub">
            A self-hosted Maven repository manager in a single <code>.jar</code>. Host your Java
            artifacts privately, hand out tokens that reach exactly one path, and mirror the
            upstreams you depend on. No external database, no account, no limits.
          </p>

          <div className="hero-actions">
            <Link className="btn btn-primary" href={`${siteConfig.docsBase}/`}>
              Get started
              <ArrowRight size={16} aria-hidden />
            </Link>
            <a className="btn btn-ghost" href={siteConfig.repo} target="_blank" rel="noreferrer">
              Star on GitHub
              <GitHubStars repo={repoPath} />
            </a>
          </div>
        </section>

        <section className="section">
          <p className="section-label">Quick start</p>
          <h2 className="section-title">Running in one command</h2>
          <p className="section-sub">
            The published image is public, so nothing needs a registry login. The admin token is
            printed once in the logs of the first start.
          </p>

          <div className="steps">
            <div>
              <p className="step-label">Docker</p>
              <pre className="snippet">
                <code>
                  <span className="k">docker</span> run -d --name repossify \{"\n"}
                  {"  "}-p 8080:8080 -v repossify-data:/data \{"\n"}
                  {"  "}ghcr.io/d4nilpzz/repossify:latest
                </code>
              </pre>
              <p className="step-note">Mount the volume, or every redeploy starts empty.</p>
            </div>

            <div>
              <p className="step-label">Standalone jar</p>
              <pre className="snippet">
                <code>
                  <span className="c"># requires JDK 21</span>
                  {"\n"}
                  <span className="k">java</span> -jar repossify.jar --init{"\n"}
                  <span className="k">java</span> -jar repossify.jar
                </code>
              </pre>
              <p className="step-note">Everything lives in the directory you start it from.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <p className="section-label">What it does</p>
          <h2 className="section-title">A Maven repository you actually own</h2>
          <p className="section-sub">
            Built for the case where Central is not an option and a hosted service is more than you
            need: an internal library, a plugin you ship to a handful of servers, a private build.
          </p>

          <div className="feature-grid">
            {features.map((f) => (
              <div key={f.title} className="feature">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-text">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="section-label">Publishing</p>
          <h2 className="section-title">Your build already knows how</h2>
          <p className="section-sub">
            Repositories are served at <code>/repo/&lt;name&gt;/</code> and authenticate with plain
            HTTP Basic, so Maven and Gradle need no plugin and no special client.
          </p>
          <pre className="snippet">
            <code>
              <span className="c">&lt;!-- pom.xml --&gt;</span>
              {"\n"}
              &lt;distributionManagement&gt;{"\n"}
              {"  "}&lt;repository&gt;{"\n"}
              {"    "}&lt;id&gt;repossify&lt;/id&gt;{"\n"}
              {"    "}&lt;url&gt;https://maven.example.dev/repo/releases&lt;/url&gt;{"\n"}
              {"  "}&lt;/repository&gt;{"\n"}
              &lt;/distributionManagement&gt;
            </code>
          </pre>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <span>
            <span className="wordmark">Repossify</span> — GPL-2.0, built by d4nilpzz
          </span>
          <div className="footer-links">
            <Link href={`${siteConfig.docsBase}/`}>Documentation</Link>
            <a href={siteConfig.repo} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={siteConfig.releases} target="_blank" rel="noreferrer">
              Releases
            </a>
            <a href={siteConfig.discord} target="_blank" rel="noreferrer">
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
