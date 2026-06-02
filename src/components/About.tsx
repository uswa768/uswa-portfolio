import React, { useRef } from "react";
import { personalInfo, stats, educationTimeline } from "../data/portfolioData";
import { FiBookOpen } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Section Title fade-up
    gsap.from(".about-title h2, .about-title div", {
      opacity: 0,
      y: 50,
      duration: 1.0,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".about-title",
        start: "top 90%",
        toggleActions: "play none none reverse",
      }
    });

    // 2. Info Card + Staggered children reveal
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about-info-card",
        start: "top 90%",
        toggleActions: "play none none reverse",
      }
    });

    cardTl.from(".about-info-card", {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: "power4.out",
    })
    .from(".about-info-card > *", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.18,
      ease: "power4.out",
    }, "-=0.5");

    // 3. Stats cards staggered fade-up
    gsap.from(".about-stat-card", {
      opacity: 0,
      y: 50,
      duration: 1.0,
      stagger: 0.15,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".about-stats-grid",
        start: "top 90%",
        toggleActions: "play none none reverse",
      }
    });

    // 4. Timeline header reveal
    gsap.from(".about-timeline-header", {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".about-timeline-header",
        start: "top 90%",
        toggleActions: "play none none reverse",
      }
    });

    // 5. Scroll-linked timeline vertical line drawing
    gsap.fromTo(".about-timeline-line", 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-timeline-container",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 0.5,
        }
      }
    );

    // 6. Individual scroll triggers for education timeline items
    const timelineItems = gsap.utils.toArray<HTMLElement>(".about-timeline-item");
    timelineItems.forEach((item) => {
      const node = item.querySelector(".about-timeline-node");
      const content = item.querySelector(".about-timeline-content");

      if (node && content) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          }
        )
        .fromTo(content,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.25"
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="about"
      ref={containerRef}
      style={{
        position: "relative",
        padding: "160px 10%",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div className="radial-glow glow-cyan" style={{ opacity: 0.1 }} />

      {/* Section Title */}
      <div className="about-title" style={{ marginBottom: "80px" }}>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800 }}>
          About <span className="text-gradient-cyan">My Journey</span>
        </h2>
        <div style={{ width: "50px", height: "4px", backgroundColor: "var(--accent-cyan)", marginTop: "12px", borderRadius: "2px" }} />
      </div>

      {/* Main Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Stats & Profile Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Main Info Card */}
          <div 
            className="glass-card about-info-card" 
            style={{ borderLeft: "4px solid var(--accent-cyan)", padding: "32px" }}
          >
            <h3 style={{ marginBottom: "20px", fontSize: "1.45rem", color: "#ffffff", fontWeight: 700 }}>
              Student by Day, Frontend Sculptor by Night
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "20px", fontSize: "1.02rem" }}>
              {personalInfo.bio}
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1.02rem" }}>
              Currently completing my Computer Science undergrad studies, I bridge the gap between academic computational theory and frontend arts. I love working with shadows, interactive 3D, physics-based UI, and vector animations.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div
            className="about-stats-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card about-stat-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 850,
                    color: index % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-purple)",
                    fontFamily: "var(--font-heading)",
                    marginBottom: "8px",
                    textShadow: index % 2 === 0 ? "0 0 10px var(--accent-cyan-glow)" : "0 0 10px var(--accent-purple-glow)",
                  }}
                >
                  {stat.value}
                </span>
                <span style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Timeline of Milestones */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <h3
            className="about-timeline-header"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.45rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <FiBookOpen style={{ color: "var(--accent-cyan)" }} />
            Education & Milestones
          </h3>

          <div
            className="about-timeline-container"
            style={{
              position: "relative",
              paddingLeft: "28px",
              marginLeft: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            {/* Background line track */}
            <div
              style={{
                position: "absolute",
                left: "7px",
                top: "4px",
                bottom: "4px",
                width: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                zIndex: 1,
              }}
            />

            {/* Glowing active line that grows */}
            <div
              className="about-timeline-line"
              style={{
                position: "absolute",
                left: "7px",
                top: "4px",
                bottom: "4px",
                width: "2px",
                background: "linear-gradient(to bottom, var(--accent-cyan), var(--accent-purple))",
                transformOrigin: "top",
                zIndex: 1,
              }}
            />

            {educationTimeline.map((item, index) => (
              <div key={index} className="about-timeline-item" style={{ position: "relative" }}>
                {/* Timeline node */}
                <div
                  className="about-timeline-node"
                  style={{
                    position: "absolute",
                    left: "-29px",
                    top: "4px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: "var(--bg-secondary)",
                    border: "2px solid var(--accent-cyan)",
                    boxShadow: "0 0 10px var(--accent-cyan-glow)",
                    zIndex: 2,
                  }}
                />

                <div className="about-timeline-content">
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "var(--accent-cyan)",
                      backgroundColor: "rgba(6, 182, 212, 0.08)",
                      border: "1px solid rgba(6, 182, 212, 0.25)",
                      padding: "2px 10px",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginBottom: "10px",
                    }}
                  >
                    {item.year}
                  </span>
                  
                  <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                    {item.title}
                  </h4>
                  
                  <h5 style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--accent-purple)", marginBottom: "10px" }}>
                    {item.subtitle}
                  </h5>
                  
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Responsive columns stylesheet */}
      <style>{`
        @media (max-width: 991px) {
          #about > div:nth-of-type(2) {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
        }
      `}</style>
    </section>
  );
};
