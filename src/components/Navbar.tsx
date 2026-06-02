import React, { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "tech-3d", label: "Tech" },
    { id: "work", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Fallback for the last section (contact): if we're near the bottom of the page,
      // force-activate "contact" regardless of IntersectionObserver margins.
      const distFromBottom = document.body.scrollHeight - window.scrollY - window.innerHeight;
      if (distFromBottom < 80) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // IntersectionObserver — fires whenever 10% of a section enters viewport.
    // rootMargin top=-60px accounts for the fixed navbar height.
    // rootMargin bottom=0px so even short sections at page-end can trigger.
    const observerOptions = {
      root: null,
      rootMargin: "-60px 0px 0px 0px",
      threshold: [0, 0.1, 0.25],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Pick the entry with the largest intersection ratio that is currently intersecting
      const intersecting = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (intersecting.length > 0) {
        setActiveSection(intersecting[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8%",
        zIndex: 1000,
        transition: "background-color 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        backgroundColor: scrolled ? "rgba(3, 7, 18, 0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid transparent",
      }}
    >
      {/* Brand logo */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, "hero")}
        data-cursor="link"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.5rem",
          fontWeight: 800,
          color: "#ffffff",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>USWA</span>
      </a>

      {/* Nav links */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => handleNavClick(e, link.id)}
            data-cursor="link"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.95rem",
              fontWeight: 500,
              textDecoration: "none",
              color: activeSection === link.id ? "#ffffff" : "var(--text-secondary)",
              position: "relative",
              padding: "6px 0",
              transition: "color 0.3s",
            }}
          >
            {link.label}
            {/* Glowing active indicator */}
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

      {/* Social / Action Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <a
          href="https://github.com/uswa-dev"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          style={{ color: "var(--text-secondary)", fontSize: "1.2rem", transition: "color 0.3s", display: "flex", alignItems: "center" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <FiGithub />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          style={{ color: "var(--text-secondary)", fontSize: "1.2rem", transition: "color 0.3s", display: "flex", alignItems: "center" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <FiLinkedin />
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className="btn-neon"
          style={{ padding: "8px 20px", fontSize: "0.85rem" }}
        >
          <FiMail style={{ fontSize: "1rem" }} />
          <span>Hire Me</span>
        </a>
      </div>
    </header>
  );
};
