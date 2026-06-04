import React, { useRef } from "react";
import { projects } from "../data/portfolioData";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getProjectImage = (id: string) => {
  switch (id) {
    case "dashboard-sales":
      return "/dashboard_sales.png";
    case "dashboard-project":
      return "/dashboard_project.png";
    case "crm-portal":
      return "/crm_portal.png";
    case "our-blooms":
      return "/our_blooms.png";
    case "doist-todo":
      return "/doist_todo.png";
    case "wedding-site":
      return "/wedding_site.png";
    default:
      return "/dashboard_sales.png";
  }
};

const getProjectYear = (_id: string) => {
  return "2026";
};

export const Work: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const mm = gsap.matchMedia();

    // Desktop/Tablet horizontal pin scroll
    mm.add("(min-width: 992px)", () => {
      const scrollWidth = scrollContainer.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollVal = scrollWidth - windowWidth;

      if (scrollVal <= 0) return;

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollVal * 1.1}`,
          invalidateOnRefresh: true,
        }
      });

      // Pin timeline horizontally scrolls the container
      pinTimeline.to(scrollContainer, {
        x: -scrollVal,
        ease: "none",
      });

      // Stagger elements blur-to-color reveal inside horizontal stream
      projects.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        const img = imagesRef.current[idx];

        if (card && img) {
          // unblur and make colorful on scroll
          gsap.fromTo(img, 
            {
              filter: "blur(12px) grayscale(100%)",
              opacity: 0.4,
            },
            {
              filter: "blur(0px) grayscale(0%)",
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: pinTimeline,
                start: "left 88%",
                end: "left 48%",
                scrub: true,
              }
            }
          );

          // Card slide-up reveal
          gsap.fromTo(card,
            {
              y: 35,
              opacity: 0.6,
            },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: pinTimeline,
                start: "left 88%",
                end: "left 48%",
                scrub: true,
              }
            }
          );
        }
      });
    });

    // Mobile vertical scroll reveal fallback
    mm.add("(max-width: 991px)", () => {
      projects.forEach((_, idx) => {
        const card = cardsRef.current[idx];
        const img = imagesRef.current[idx];

        if (card && img) {
          gsap.fromTo(img,
            {
              filter: "blur(10px) grayscale(100%)",
              opacity: 0.5,
            },
            {
              filter: "blur(0px) grayscale(0%)",
              opacity: 1,
              duration: 1.0,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              }
            }
          );

          gsap.fromTo(card,
            {
              y: 35,
              opacity: 0.7,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              }
            }
          );
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        // paddingTop must clear the fixed navbar (80px) + breathing room
        // so the heading is never hidden behind the navbar when GSAP pins this section
        paddingTop: "100px",
        paddingBottom: "40px",
      }}
    >
      <div className="radial-glow glow-indigo" style={{ opacity: 0.1, left: "70%" }} />

      {/* Section Title */}
      <div style={{ padding: "0 10%", marginBottom: "36px" }}>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 800, lineHeight: 1.3 }}>
          Featured <span className="text-gradient-indigo">Projects</span>
        </h2>
        <div style={{ width: "50px", height: "4px", backgroundColor: "var(--accent-indigo)", marginTop: "12px", borderRadius: "2px" }} />
      </div>

      {/* Projects Horizontal Wrapper */}
      <div
        ref={scrollContainerRef}
        className="work-horizontal-container"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80px",
          padding: "0 10%",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            ref={(el) => { cardsRef.current[idx] = el; }}
            className="work-card-wrapper"
            style={{
              width: "clamp(900px, 85vw, 1300px)",
              flexShrink: 0,
              height: "480px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "50px",
              position: "relative",
              paddingRight: "40px",
            }}
          >
            {/* Left Column: Metadata & Details */}
            <div
              style={{
                width: "260px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                borderLeft: `3px solid ${project.color}`,
                paddingLeft: "22px",
              }}
            >
              {/* Year */}
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.8rem",
                  fontWeight: 900,
                  color: project.color,
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}
              >
                {getProjectYear(project.id)}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "1.65rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  fontFamily: "var(--font-heading)",
                  lineHeight: 1.2,
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.92rem",
                  lineHeight: 1.55,
                }}
              >
                {project.description}
              </p>

              {/* Tech list */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  fontSize: "0.85rem",
                  fontFamily: "monospace",
                  color: "var(--text-muted)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                  paddingTop: "14px",
                }}
              >
                {project.tech.map((t, i) => (
                  <span key={i} style={{ color: i === 0 ? project.color : "var(--text-secondary)" }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Project Link icons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <div style={{ display: "flex", gap: "16px" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    style={{ color: "var(--text-secondary)", fontSize: "1.1rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    <FiGithub />
                  </a>
                  <a
                    href={project.link}
                    data-cursor="link"
                    style={{ color: "var(--text-secondary)", fontSize: "1.1rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Full Picture with blur reveal */}
            <div
              style={{
                flex: 1,
                height: "100%",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "rgba(5, 10, 25, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                boxShadow: `0 25px 60px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px ${project.color}18`,
              }}
            >
              <img
                ref={(el) => { imagesRef.current[idx] = el; }}
                src={getProjectImage(project.id)}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: "blur(12px) grayscale(100%)",
                  opacity: 0.4,
                  transition: "filter 0.3s ease",
                  padding: "8px",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stylesheet for responsiveness */}
      <style>{`
        @media (max-width: 991px) {
          #work {
            height: auto !important;
            padding: 120px 8% !important;
          }
          .work-horizontal-container {
            flex-direction: column !important;
            width: 100% !important;
            gap: 60px !important;
            padding: 0 !important;
          }
          .work-card-wrapper {
            width: 100% !important;
            height: auto !important;
            flex-direction: column !important;
            gap: 30px !important;
            padding-right: 0 !important;
          }
          .work-card-wrapper > div:nth-of-type(1) {
            width: 100% !important;
            padding-left: 16px !important;
          }
          .work-card-wrapper > div:nth-of-type(2) {
            width: 100% !important;
            height: 250px !important;
          }
        }
      `}</style>
    </section>
  );
};
