import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { TechSection3D } from "./components/TechSection3D";
import { Work } from "./components/Work";
import { Contact } from "./components/Contact";
import { Cursor } from "./components/Cursor";
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";
import { personalInfo } from "./data/portfolioData";

const App: React.FC = () => {
  return (
    <>
      {/* Custom Liquid Follower Cursor */}
      <Cursor />

      {/* Cyber Grid Background Design overlay */}
      <div className="grid-overlay" />

      {/* Primary Sticky Header */}
      <Navbar />

      {/* Main Core Viewport Content Container */}
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <TechSection3D />
        <Work />
        <Contact />
      </main>

      {/* Footer */}
      <footer style={{ position: "relative", zIndex: 2, backgroundColor: "var(--bg-secondary)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 8% 32px" }}>

          {/* Top row */}
          <div className="footer-top-row">
            {/* Brand */}
            <div>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "1.4rem", color: "#fff", letterSpacing: "-0.02em" }}>USWA</span>
              <p style={{ marginTop: "8px", color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: "260px" }}>
                Frontend developer building clean, fast web experiences.
              </p>
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "2px" }}>Navigate</span>
              {["hero","about","tech-3d","work","contact"].map((id) => (
                <a key={id} href={`#${id}`} data-cursor="link"
                  style={{ color: "var(--text-secondary)", fontSize: "0.9rem", textDecoration: "none", textTransform: "capitalize", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
                  {id === "tech-3d" ? "Tech" : id === "hero" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "2px" }}>Connect</span>
              {[
                { icon: FiMail,     label: "Email",    href: `mailto:${personalInfo.email}` },
                { icon: FiGithub,   label: "GitHub",   href: personalInfo.github },
                { icon: FiLinkedin, label: "LinkedIn", href: personalInfo.linkedin },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-cursor="link"
                  style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
                  <Icon size={15} />{label}
                </a>
              ))}
            </div>

            {/* Back to top */}
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <a href="#hero" data-cursor="link"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.8rem", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-cyan)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>
                <div style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiArrowUp size={16} />
                </div>
                Back to top
              </a>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "36px 0 24px" }} />

          {/* Bottom row */}
          <div className="footer-bottom-row">
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
              © {new Date().getFullYear()} Uswa. All rights reserved.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>
              Built with React, TypeScript &amp; GSAP
            </p>
          </div>
        </div>

        <style>{`
          .footer-top-row {
            display: grid;
            grid-template-columns: 1.4fr 1fr 1fr auto;
            gap: 40px;
            align-items: start;
          }
          .footer-bottom-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 8px;
          }
          @media (max-width: 768px) {
            .footer-top-row {
              grid-template-columns: 1fr 1fr;
              gap: 32px;
            }
            .footer-bottom-row {
              flex-direction: column;
              align-items: flex-start;
              gap: 4px;
            }
            footer > div {
              padding: 24px 6% 24px !important;
            }
          }
          @media (max-width: 480px) {
            .footer-top-row {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </footer>
    </>
  );
};

export default App;
