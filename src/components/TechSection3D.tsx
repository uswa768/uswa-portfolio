import React from "react";
import { SplineScene } from "./ui/splite";

export const TechSection3D: React.FC = () => {
  return (
    <section
      id="tech-3d"
      style={{
        position: "relative",
        padding: "160px 10%",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Background soft glow rings */}
      <div className="radial-glow glow-purple" style={{ opacity: 0.1, left: "70%" }} />
      <div className="radial-glow glow-cyan" style={{ opacity: 0.08, left: "10%", top: "40%" }} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* Left Column: Title and updated description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 850,
              color: "#ffffff",
              lineHeight: 1.2,
              fontFamily: "var(--font-heading)",
            }}
          >
            Interactive <span className="text-gradient-purple">Tech Stack</span>
          </h2>
          
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
              lineHeight: 1.8,
              maxWidth: "480px",
            }}
          >
            These are my core frontend languages. I focus on creating semantic, accessible structures using <strong>HTML</strong>, <strong>CSS</strong>, <strong>JAVASCRIPT</strong>, <strong>REACT</strong>, and <strong>TAILWIND CSS</strong>, while integrating interactive 3D elements with <strong>THREE.JS</strong>, sleek motion layouts from <strong>21st DEV</strong>, and advanced animations powered by <strong>FRAMER MOTION</strong> and <strong>GSAP</strong>.
          </p>
        </div>

        {/* Right Column: Spline 3D Scene directly on the background */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(400px, 45vw, 550px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Responsive columns stylesheet */}
      <style>{`
        #tech-3d p strong {
          color: var(--accent-cyan);
          font-weight: 700;
          text-shadow: 0 0 8px rgba(6, 182, 212, 0.1);
        }

        @media (max-width: 991px) {
          #tech-3d > div:nth-of-type(2) {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
};
