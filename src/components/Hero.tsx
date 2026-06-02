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
        style={{
          display: "grid",
          gridTemplateColumns: "1.25fr 0.75fr",
          alignItems: "center",
          gap: "80px",
          width: "100%",
          paddingTop: "120px", // space for navbar
        }}
      >
        {/* Left Column: Text Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Status Badges */}
          <div
            ref={badgesRef}
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
          <div style={{ overflow: "hidden" }}>
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
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(300px, 45vw, 550px)",
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
      
      {/* Keyframe pulse animation styling */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};
