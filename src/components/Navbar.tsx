import React, { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from "react-icons/fi";
import { personalInfo } from "../data/portfolioData";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "tech-3d", label: "Tech" },
    { id: "work", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const NAVBAR_HEIGHT = 82;

    const getActiveSection = () => {
      const sectionRects = navLinks
        .map((link) => {
          const el = document.getElementById(link.id);
          if (!el) return null;
          return { id: link.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      let active = sectionRects[0]?.id ?? "hero";
      for (const section of sectionRects) {
        if (section.top <= NAVBAR_HEIGHT + 10) {
          active = section.id;
        }
      }
      return active;
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setActiveSection(getActiveSection());
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6%",
          zIndex: 1000,
          transition: "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
          backgroundColor: scrolled || menuOpen ? "var(--bg-primary)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "1px solid transparent",
        }}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          data-cursor="link"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.45rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            textDecoration: "none",
          }}
        >
          USWA
        </a>

        {/* ── Desktop Nav ── */}
        <nav className="navbar-desktop">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              data-cursor="link"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "0.92rem",
                fontWeight: 500,
                textDecoration: "none",
                color: activeSection === link.id ? "var(--text-primary)" : "var(--text-secondary)",
                position: "relative",
                padding: "6px 0",
                transition: "color 0.3s",
              }}
            >
              {link.label}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "var(--accent-purple)",
                  transform: activeSection === link.id ? "scaleX(1)" : "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease",
                  boxShadow: "0 0 8px var(--accent-purple-glow)",
                }}
              />
            </a>
          ))}
        </nav>

        {/* ── Desktop Actions ── */}
        <div className="navbar-desktop" style={{ gap: "18px" }}>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            style={{ color: "var(--text-secondary)", fontSize: "1.15rem", display: "flex", alignItems: "center", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <FiGithub />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            style={{ color: "var(--text-secondary)", fontSize: "1.15rem", display: "flex", alignItems: "center", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            <FiLinkedin />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="btn-neon"
            style={{ padding: "8px 18px", fontSize: "0.82rem" }}
          >
            <FiMail style={{ fontSize: "0.95rem" }} />
            <span>Hire Me</span>
          </a>
        </div>

        {/* ── Mobile Hamburger Button ── */}
        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "1px solid var(--border-color)",
            borderRadius: "8px",
            color: "var(--text-primary)",
            fontSize: "1.3rem",
            width: "40px",
            height: "40px",
            display: "none",          /* shown via CSS on mobile */
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        ref={drawerRef}
        className="navbar-drawer"
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          width: "100%",
          zIndex: 999,
          background: "rgba(3, 7, 18, 0.97)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          transform: menuOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          padding: "24px 6%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.1rem",
              fontWeight: 600,
              textDecoration: "none",
              color: activeSection === link.id ? "#fff" : "var(--text-secondary)",
              padding: "14px 16px",
              borderRadius: "10px",
              background: activeSection === link.id ? "rgba(139,92,246,0.12)" : "transparent",
              borderLeft: activeSection === link.id ? "3px solid var(--accent-purple)" : "3px solid transparent",
              transition: "background 0.2s, color 0.2s",
            }}
          >
            {link.label}
          </a>
        ))}

        {/* Divider */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />

        {/* Social + Hire Me */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "8px 16px" }}>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)", fontSize: "1.3rem", display: "flex" }}>
            <FiGithub />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)", fontSize: "1.3rem", display: "flex" }}>
            <FiLinkedin />
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="btn-neon"
            style={{ padding: "8px 18px", fontSize: "0.82rem", marginLeft: "auto" }}
          >
            <FiMail style={{ fontSize: "0.95rem" }} />
            <span>Hire Me</span>
          </a>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        .navbar-desktop {
          display: flex;
          align-items: center;
          gap: 28px;
        }
        .navbar-hamburger {
          display: none !important;
        }
        /* Hide drawer on desktop */
        @media (min-width: 769px) {
          .navbar-drawer { display: none !important; }
        }
        @media (max-width: 768px) {
          .navbar-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
};
