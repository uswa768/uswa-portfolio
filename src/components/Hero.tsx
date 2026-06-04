import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ModelCanvas } from "./Model/Canvas";
import { FiArrowRight } from "react-icons/fi";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial states for fade-in animations
    gsap.set([titleRef.current, textRef.current, btnGroupRef.current, badgesRef.current, canvasWrapperRef.current], {
      opacity: 0,
    });

    tl.to(canvasWrapperRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
    })
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      startAt: { y: 40 },
    }, "-=1.0")
    .to(badgesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      startAt: { y: 20 },
    }, "-=0.7")
    .to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      startAt: { y: 20 },
    }, "-=0.6")
    .to(btnGroupRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      startAt: { y: 20 },
    }, "-=0.5");
  }, { scope: containerRef });

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 10%",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Visual background lights */}
      <div className="radial-glow glow-purple" />
      <div className="radial-glow glow-indigo" />

      {/* Grid container splitting text and 3D */}
      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "40% 60%",
          alignItems: "center",
          gap: "40px",
          width: "100%",
          paddingTop: "100px",
        }}
      >
        {/* Left Column: Text Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="hero-text-col">
          {/* Status Badges */}
          <div
            ref={badgesRef}
            className="hero-badges-wrapper"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "rgba(6, 182, 212, 0.08)",
                border: "1px solid rgba(6, 182, 212, 0.25)",
                color: "var(--accent-cyan)",
                boxShadow: "0 0 10px rgba(6, 182, 212, 0.1)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "var(--accent-cyan)",
                  borderRadius: "50%",
                  animation: "pulse 2s infinite",
                  display: "inline-block",
                }}
              />
              Available for Projects
            </span>
            <span
              style={{
                display: "inline-flex",
                padding: "6px 14px",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                fontFamily: "var(--font-heading)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px solid rgba(139, 92, 246, 0.25)",
                color: "var(--accent-purple)",
              }}
            >
              CS Undergrad Student
            </span>
          </div>

          {/* Main Title Heading */}
          <div className="hero-title-wrapper" style={{ overflow: "hidden" }}>
            <h1
              ref={titleRef}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.8rem)",
                lineHeight: 1.05,
                fontWeight: 900,
              }}
            >
              Hi, I'm <span className="text-gradient-indigo">Uswa</span>
              <br />
              <span style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", fontWeight: 700, color: "var(--text-secondary)" }}>
                Frontend Developer
              </span>
            </h1>
          </div>

          {/* Intro Description */}
          <p
            ref={textRef}
            className="hero-description"
            style={{
              fontSize: "clamp(1rem, 1.2vw, 1.25rem)",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              maxWidth: "580px",
            }}
          >
            I craft immersive, high-performance web interfaces with rich animations, premium glassmorphism styles, and clean code. Blending my academic studies with cutting-edge frontend libraries, I turn concepts into digital realities.
          </p>

          {/* CTA Button Group */}
          <div
            ref={btnGroupRef}
            className="hero-btn-group"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginTop: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => handleScrollTo("work")}
              className="btn-neon"
              data-cursor="project"
            >
              <span>Explore Projects</span>
              <FiArrowRight style={{ fontSize: "1.1rem" }} />
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="btn-glass"
              data-cursor="link"
            >
              <span>Get in Touch</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Canvas Visuals */}
        <div
          ref={canvasWrapperRef}
          className="hero-canvas-wrapper"
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(380px, 52vw, 620px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center",
          }}
        >
          {/* Neon background ring glow for depth */}
          <div
            style={{
              position: "absolute",
              width: "80%",
              height: "80%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)",
              filter: "blur(20px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <ModelCanvas />
        </div>
      </div>

      {/* Responsive + keyframe styles */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ── Mobile: custom grid area positioning, text first, then stacked buttons side-by-side with model ── */
        @media (max-width: 768px) {
          #hero {
            padding: 0 6% !important;
            align-items: center !important;
            min-height: calc(100vh - 60px) !important;
          }
          .hero-grid {
            display: grid !important;
            grid-template-columns: 52% 48% !important;
            grid-template-rows: auto auto auto auto !important;
            grid-template-areas:
              "badges badges"
              "title title"
              "desc desc"
              "btns canvas" !important;
            padding-top: 100px !important;
            gap: 16px !important;
            align-items: center !important;
          }
          
          /* Assign Grid Areas */
          .hero-badges-wrapper {
            grid-area: badges;
          }
          .hero-title-wrapper {
            grid-area: title;
          }
          .hero-description {
            grid-area: desc;
            margin: 0 !important;
          }
          .hero-btn-group {
            grid-area: btns;
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
            width: 100% !important;
            margin: 0 !important;
          }
          .hero-btn-group button {
            width: 100% !important;
            justify-content: center !important;
          }
          .hero-canvas-wrapper {
            grid-area: canvas;
            height: 190px !important;
            width: 100% !important;
            margin: 0 !important;
            position: relative !important;
          }
          /* Remove column flex display on mobile wrapper to prevent override */
          .hero-text-col {
            display: contents !important;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 45% 55% !important;
            gap: 24px !important;
          }
          .hero-canvas-wrapper {
            height: clamp(340px, 46vw, 500px) !important;
          }
        }
      `}</style>
    </section>
  );
};
