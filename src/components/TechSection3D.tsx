import React, { useRef } from "react";
import { SplineScene } from "./SplineScene";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const TechSection3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const technologies = [
    { name: "HTML5", color: "var(--accent-cyan)", glow: "rgba(6, 182, 212, 0.15)" },
    { name: "CSS3", color: "#3b82f6", glow: "rgba(59, 130, 246, 0.15)" },
    { name: "JavaScript", color: "#f59e0b", glow: "rgba(245, 158, 11, 0.15)" },
    { name: "React", color: "#06b6d4", glow: "rgba(6, 182, 212, 0.15)" },
    { name: "Tailwind", color: "#38bdf8", glow: "rgba(56, 189, 248, 0.15)" },
    { name: "Three.js", color: "#ffffff", glow: "rgba(255, 255, 255, 0.12)" },
    { name: "GSAP", color: "#10b981", glow: "rgba(16, 185, 129, 0.15)" },
    { name: "Framer Motion", color: "var(--accent-purple)", glow: "rgba(139, 92, 246, 0.15)" }
  ];

  useGSAP(() => {
    // 1. Title and description fade-up
    gsap.from(".tech-heading, .tech-description", {
      opacity: 0,
      y: 40,
      duration: 1.0,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".tech-container",
        start: "top 85%",
        toggleActions: "play none none reverse",
      }
    });

    // 2. Responsive Flying pop-out animation
    const cards = gsap.utils.toArray<HTMLElement>(".tech-tag-card");
    const sceneCol = document.querySelector(".tech-scene-col") as HTMLElement;

    if (sceneCol && cards.length > 0) {
      const mm = gsap.matchMedia();

      // Desktop layout (>768px): Scroll-linked Zoom In/Out & Fly-out
      mm.add("(min-width: 769px)", () => {
        // Temporarily clear inline transforms/opacity to get pristine layout calculations
        gsap.set(sceneCol, { clearProps: "transform,opacity" });
        gsap.set(cards, { clearProps: "transform,opacity" });

        const sceneRect = sceneCol.getBoundingClientRect();
        const sceneCenterX = sceneRect.left + sceneRect.width / 2;
        const sceneCenterY = sceneRect.top + sceneRect.height / 2;

        // Calculate initial offsets for each card relative to the robot center
        const cardOffsets = cards.map((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;
          return {
            card,
            dx: sceneCenterX - cardCenterX,
            dy: sceneCenterY - cardCenterY,
          };
        });

        // Set initial hidden/zoomed states
        gsap.set(sceneCol, { opacity: 0.2, scale: 1.0 });
        cards.forEach((card) => {
          gsap.set(card, { opacity: 0, scale: 0.1 });
        });

        // Create scroll-linked timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".tech-content-row",
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1.2,
          }
        });

        // Robot zooms in (scale up to 1.6) and fades in, then zooms back out to original scale (1.0)
        tl.to(sceneCol, {
          opacity: 1,
          scale: 1.6,
          duration: 1.0,
          ease: "power1.inOut",
        })
        .to(sceneCol, {
          scale: 1.0,
          duration: 1.0,
          ease: "power1.inOut",
        });

        // Language cards fly out from the center of the robot to their native grid positions
        cardOffsets.forEach(({ card, dx, dy }, idx) => {
          tl.fromTo(card,
            {
              opacity: 0,
              scale: 0.1,
              x: dx,
              y: dy,
              rotation: 45,
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotation: 0,
              ease: "power2.out",
              duration: 1.2,
            },
            idx * 0.1
          );
        });
      });

      // Mobile layout (<=768px): Viewport entry triggered animation (no scroll-linked scrub)
      mm.add("(max-width: 768px)", () => {
        // Temporarily clear inline transforms/opacity to get pristine layout calculations
        gsap.set(sceneCol, { clearProps: "transform,opacity" });
        gsap.set(cards, { clearProps: "transform,opacity" });

        const sceneRect = sceneCol.getBoundingClientRect();
        const sceneCenterX = sceneRect.left + sceneRect.width / 2;
        const sceneCenterY = sceneRect.top + sceneRect.height / 2;

        const cardOffsets = cards.map((card) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenterX = cardRect.left + cardRect.width / 2;
          const cardCenterY = cardRect.top + cardRect.height / 2;
          return {
            card,
            dx: sceneCenterX - cardCenterX,
            dy: sceneCenterY - cardCenterY,
          };
        });

        gsap.set(cards, { opacity: 0, scale: 0.1 });
        gsap.set(sceneCol, { opacity: 0, scale: 2.0 });

        ScrollTrigger.create({
          trigger: ".tech-tags-container",
          start: "top 85%",
          onEnter: () => {
            cardOffsets.forEach(({ card, dx, dy }, idx) => {
              gsap.fromTo(card,
                {
                  opacity: 0,
                  scale: 0.1,
                  x: dx,
                  y: dy,
                  rotation: 45,
                },
                {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  y: 0,
                  rotation: 0,
                  duration: 1.3,
                  delay: idx * 0.08,
                  ease: "power3.out",
                  clearProps: "all"
                }
              );
            });

            gsap.fromTo(sceneCol,
              {
                opacity: 0,
                scale: 2.0,
              },
              {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power3.out",
              }
            );
          },
          onLeaveBack: () => {
            gsap.set(cards, { opacity: 0, scale: 0.1, x: 0, y: 0 });
            gsap.set(sceneCol, { opacity: 0, scale: 2.0 });
          }
        });
      });
    }
  }, { scope: containerRef });

  return (
    <section
      id="tech-3d"
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Background soft glow rings */}
      <div className="radial-glow glow-purple" style={{ opacity: 0.08, left: "70%" }} />
      <div className="radial-glow glow-cyan" style={{ opacity: 0.06, left: "10%", top: "40%" }} />

      <div className="tech-inner">
        <div className="tech-container">
          <h2 className="tech-heading">
            Interactive <span className="text-gradient-purple">Tech Stack</span>
          </h2>

          <p className="tech-description">
            These are my core frontend languages. I focus on creating semantic,
            accessible structures using <strong>HTML</strong>, <strong>CSS</strong>,{" "}
            <strong>JAVASCRIPT</strong>, <strong>REACT</strong>, and{" "}
            <strong>TAILWIND CSS</strong>, while integrating interactive 3D elements
            with <strong>THREE.JS</strong>, sleek motion layouts from{" "}
            <strong>21st DEV</strong>, and animations powered by{" "}
            <strong>FRAMER MOTION</strong> and <strong>GSAP</strong>.
          </p>

          <div className="tech-content-row">
            {/* Left side: Technologies Tags */}
            <div className="tech-tags-container">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-tag-card"
                  style={{
                    "--tech-color": tech.color,
                    "--tech-glow": tech.glow,
                  } as React.CSSProperties}
                >
                  <span className="tech-tag-indicator" />
                  {tech.name}
                </div>
              ))}
            </div>

            {/* Right side: Spline 3D Scene */}
            <div className="tech-scene-col">
              <div className="tech-scene-container">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped styles */}
      <style>{`
        /* ── Inner wrapper handles all padding ── */
        .tech-inner {
          padding: 100px 10%;
        }

        .tech-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
        }

        .tech-heading {
          font-size: clamp(1.8rem, 3.5vw, 3.2rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          font-family: var(--font-heading);
          letter-spacing: -0.02em;
          margin: 0;
        }

        .tech-description {
          color: var(--text-secondary);
          font-size: clamp(0.88rem, 1.2vw, 1.02rem);
          line-height: 1.7;
          max-width: 800px;
          margin: 0;
        }

        #tech-3d .tech-description strong {
          color: var(--accent-cyan);
          font-weight: 700;
        }

        /* ── Content Row ── */
        .tech-content-row {
          display: flex;
          align-items: center;
          gap: 40px;
          width: 100%;
          margin-top: 10px;
          perspective: 1000px; /* Enable 3D transitions */
        }

        /* ── Tech Tags Grid (Desktop) ── */
        .tech-tags-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 45%;
          flex-shrink: 0;
        }

        .tech-tag-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
        }

        .tech-tag-indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--tech-color);
          box-shadow: 0 0 8px var(--tech-color);
        }

        .tech-tag-card:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--tech-color);
          box-shadow: 0 0 15px var(--tech-glow);
          transform: translateY(-2px);
        }

        /* ── Scene column ── */
        .tech-scene-col {
          position: relative;
          width: 55%;
          aspect-ratio: 4 / 3;
          min-height: 460px;
          flex-grow: 1;
        }

        .tech-scene-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: scale(0.8);
          transform-origin: center center;
        }

        /* ── Mobile Layout (≤768px) ── */
        @media (max-width: 768px) {
          .tech-inner {
            padding: 0 !important;
          }
          .tech-container {
            gap: 16px !important;
          }
          .tech-heading {
            font-size: clamp(1.6rem, 6vw, 2.2rem) !important;
          }
          .tech-description {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
          }
          .tech-content-row {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 24px !important;
            width: 100% !important;
            margin-top: 8px !important;
          }
          .tech-tags-container {
            display: flex !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 10px !important;
            width: 100% !important;
            grid-template-columns: none !important;
          }
          .tech-tag-card {
            padding: 8px 14px !important;
            font-size: 0.85rem !important;
            border-radius: 10px !important;
            gap: 8px !important;
          }
          .tech-scene-col {
            width: 100% !important;
            height: 360px !important;
            min-height: auto !important;
            aspect-ratio: auto !important;
            margin: 0 !important;
            pointer-events: none !important; /* Prevent touch event hijacking */
          }
          .tech-scene-container {
            transform: scale(0.9) !important;
          }
        }
      `}</style>
    </section>
  );
};
