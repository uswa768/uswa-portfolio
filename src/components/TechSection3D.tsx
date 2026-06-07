import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiHtml5,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiFramer
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

interface TechItem {
  name: string;
  color: string;
  icon: React.ReactNode;
}

const technologies: TechItem[] = [
  { name: "HTML", color: "#e34f26", icon: <SiHtml5 size={48} color="#e34f26" /> },
  { name: "CSS", color: "#1572b6", icon: <FaCss3Alt size={48} color="#1572b6" /> },
  { name: "Tailwind", color: "#38bdf8", icon: <SiTailwindcss size={48} color="#38bdf8" /> },
  { name: "JavaScript", color: "#f7df1e", icon: <SiJavascript size={48} color="#f7df1e" /> },
  { name: "TypeScript", color: "#3178c6", icon: <SiTypescript size={48} color="#3178c6" /> },
  {
    name: "Java",
    color: "#0074BD",
    icon: (
      <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style={{ width: "48px", height: "48px" }}>
        <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" />
        <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" />
        <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z" />
        <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z" />
        <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z" />
      </svg>
    )
  },
  {
    name: "Vite",
    color: "#bd34fe",
    icon: (
      <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "48px", height: "48px" }}>
        <defs>
          <linearGradient id="viteGradientA" x1="6" x2="235" y1="33" y2="344" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#41d1ff" />
            <stop offset="1" stopColor="#bd34fe" />
          </linearGradient>
          <linearGradient id="viteGradientB" x1="194.651" x2="236.076" y1="8.818" y2="292.989" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffea83" />
            <stop offset=".083" stopColor="#ffdd35" />
            <stop offset="1" stopColor="#ffa800" />
          </linearGradient>
        </defs>
        <path fill="url(#viteGradientA)" d="M124.766 19.52 67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.09 3.09 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594Zm0 0" />
        <path fill="url(#viteGradientB)" d="M91.46 1.43 48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968 34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43Zm0 0" />
      </svg>
    )
  },
  { name: "React", color: "#61dafb", icon: <SiReact size={48} color="#61dafb" /> },
  {
    name: "GSAP",
    color: "#88ce02",
    icon: (
      <svg viewBox="0 0 24 24" fill="#88ce02" xmlns="http://www.w3.org/2000/svg" style={{ width: "48px", height: "48px" }}>
        <path d="M9.83,7.59C10.647,7.595 11.267,7.828 11.672,8.282C12.055,8.713 12.239,9.336 12.219,10.132L12.205,10.193C12.197,10.211 12.185,10.229 12.17,10.243C12.14,10.272 12.099,10.288 12.057,10.288L10.398,10.288C10.29,10.288 10.199,10.2 10.199,10.093C10.199,9.669 10.071,9.435 9.809,9.383L9.689,9.372C9.347,9.372 9.125,9.583 9.119,9.951C9.112,10.361 9.344,10.734 10.004,11.374C10.872,12.19 11.221,12.913 11.204,13.867C11.177,15.411 10.127,16.41 8.531,16.41C7.716,16.41 7.093,16.191 6.678,15.761C6.258,15.324 6.066,14.683 6.106,13.855C6.108,13.813 6.125,13.772 6.155,13.743C6.185,13.714 6.226,13.698 6.267,13.698L7.983,13.698C8.007,13.699 8.03,13.705 8.052,13.715C8.073,13.726 8.092,13.741 8.107,13.76C8.12,13.775 8.129,13.793 8.135,13.813C8.14,13.832 8.141,13.853 8.137,13.873C8.118,14.171 8.171,14.394 8.288,14.518C8.363,14.598 8.469,14.639 8.599,14.639C8.916,14.639 9.102,14.414 9.109,14.024C9.115,13.687 9.007,13.39 8.427,12.792C7.676,12.058 7.003,11.3 7.024,10.108C7.037,9.416 7.311,8.784 7.798,8.327C8.312,7.845 9.014,7.59 9.83,7.59ZM4.047,7.618C4.794,7.612 5.381,7.842 5.789,8.303C6.221,8.79 6.44,9.524 6.441,10.485C6.44,10.527 6.422,10.567 6.392,10.597C6.362,10.626 6.322,10.643 6.28,10.643L4.479,10.643C4.448,10.642 4.417,10.629 4.395,10.607C4.373,10.584 4.361,10.553 4.36,10.522C4.346,9.899 4.172,9.576 3.828,9.538L3.757,9.534C3.067,9.535 2.66,10.472 2.444,10.992C2.142,11.719 1.988,12.507 2.018,13.293C2.033,13.659 2.092,14.173 2.438,14.386C2.746,14.575 3.185,14.45 3.451,14.24C3.716,14.031 3.93,13.669 4.02,13.339C4.033,13.293 4.033,13.258 4.021,13.241C4.015,13.233 4.003,13.229 3.989,13.226L3.485,13.222C3.461,13.222 3.436,13.216 3.414,13.206C3.392,13.196 3.372,13.181 3.356,13.162C3.344,13.148 3.335,13.13 3.331,13.112C3.327,13.093 3.327,13.074 3.331,13.056L3.647,11.682C3.663,11.611 3.726,11.558 3.804,11.548L3.804,11.545L6.839,11.545C6.846,11.545 6.854,11.545 6.86,11.546C6.939,11.556 6.995,11.63 6.994,11.71L6.994,11.714L6.678,13.085C6.661,13.163 6.583,13.22 6.494,13.22L6.113,13.22C6.1,13.22 6.086,13.225 6.075,13.233C6.064,13.241 6.056,13.253 6.052,13.266C5.7,14.46 5.223,15.282 4.594,15.775C4.058,16.195 3.399,16.391 2.517,16.391C1.725,16.391 1.191,16.136 0.738,15.633C0.14,14.967 -0.107,13.879 0.043,12.566C0.313,10.103 1.589,7.618 4.047,7.618ZM21.016,7.75C23.026,7.75 24.03,8.662 23.999,10.461C23.962,12.569 22.678,14.119 20.745,14.477C20.47,14.527 20.191,14.547 19.912,14.545L18.978,14.541C18.963,14.541 18.948,14.547 18.937,14.558C18.926,14.568 18.92,14.583 18.92,14.598C18.92,14.608 18.922,14.618 18.928,14.627C18.933,14.636 18.941,14.643 18.95,14.648L19.744,15.062C19.809,15.096 19.835,15.153 19.82,15.226C19.815,15.249 19.618,16.139 19.613,16.159C19.596,16.237 19.533,16.282 19.442,16.282L17.739,16.282C17.715,16.282 17.69,16.277 17.668,16.267C17.646,16.257 17.626,16.241 17.61,16.223C17.598,16.208 17.589,16.191 17.585,16.173C17.58,16.155 17.581,16.135 17.585,16.116L19.481,7.875C19.5,7.789 19.581,7.751 19.653,7.751L21.016,7.75ZM17.273,7.762C17.292,7.77 17.31,7.781 17.324,7.795C17.338,7.81 17.351,7.828 17.358,7.847C17.366,7.866 17.369,7.886 17.369,7.906L17.358,16.119C17.361,16.138 17.36,16.158 17.355,16.177C17.35,16.196 17.34,16.213 17.328,16.228C17.313,16.245 17.295,16.259 17.274,16.268C17.254,16.277 17.232,16.282 17.21,16.281L15.397,16.281C15.377,16.282 15.356,16.277 15.337,16.27C15.318,16.262 15.3,16.25 15.286,16.236C15.272,16.221 15.26,16.204 15.253,16.185C15.245,16.166 15.241,16.146 15.241,16.125L15.28,15.328C15.282,15.241 15.28,15.217 15.229,15.211L15.161,15.209L13.447,15.209C13.323,15.209 13.314,15.22 13.27,15.334L12.914,16.191C12.882,16.252 12.818,16.281 12.722,16.281L10.927,16.281C10.818,16.281 10.74,16.173 10.781,16.072L14.499,7.873C14.524,7.824 14.562,7.75 14.648,7.75L17.214,7.75C17.234,7.75 17.254,7.754 17.273,7.762ZM15.5,9.985C15.492,9.953 15.466,9.956 15.445,9.998C15.43,10.028 15.416,10.06 15.405,10.091L14.121,13.274C14.114,13.294 14.109,13.31 14.105,13.322C14.104,13.328 14.103,13.335 14.104,13.341C14.105,13.347 14.108,13.353 14.111,13.358C14.115,13.363 14.12,13.367 14.126,13.37C14.131,13.373 14.137,13.376 14.143,13.376L15.215,13.39C15.334,13.38 15.34,13.374 15.352,13.253C15.354,13.21 15.506,10.022 15.5,9.985ZM20.112,9.582C20.097,9.582 20.083,9.588 20.072,9.599C20.061,9.609 20.055,9.624 20.054,9.639C20.054,9.649 20.057,9.659 20.062,9.668C20.068,9.677 20.075,9.685 20.084,9.69C20.097,9.697 20.869,10.104 20.926,10.135C20.968,10.158 20.969,10.198 20.955,10.267C20.948,10.298 20.415,12.642 20.416,12.644C20.419,12.647 20.435,12.655 20.515,12.655L20.551,12.655C21.446,12.619 21.934,11.561 21.952,10.534C21.961,9.979 21.772,9.638 21.429,9.588L21.358,9.582L20.112,9.582Z" />
      </svg>
    )
  },
  { name: "Framer", color: "#bb4bff", icon: <SiFramer size={48} color="#bb4bff" /> },
];

export const TechSection3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".tech-heading, .tech-desc", {
      opacity: 0,
      y: 40,
      duration: 1.0,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ".tech-heading",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".tech-marquee-container", {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".tech-marquee-wrapper",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  const row1 = technologies.slice(0, 5);
  const row2 = technologies.slice(5, 10);

  return (
    <section
      id="tech-3d"
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "var(--bg-primary)",
        overflow: "hidden",
        padding: "120px 10%",
      }}
    >
      {/* Background glow effects */}
      <div className="radial-glow glow-purple" style={{ opacity: 0.08, left: "80%", top: "15%" }} />
      <div className="radial-glow glow-cyan" style={{ opacity: 0.06, left: "5%", top: "65%" }} />

      <h2
        className="tech-heading"
        style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
          fontWeight: 800,
          color: "#fff",
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.02em",
          marginBottom: "16px",
        }}
      >
        My <span className="text-gradient-purple">Tech Stack</span>
      </h2>

      <p
        className="tech-desc"
        style={{
          color: "var(--text-secondary)",
          fontSize: "clamp(0.88rem, 1.2vw, 1.02rem)",
          lineHeight: 1.7,
          maxWidth: "680px",
          marginBottom: "56px",
        }}
      >
        Tools I actually use to build things. From structure and style to logic,
        interactivity, and animation these are my daily drivers.
      </p>

      {/* Dynamic scrolling marquee tracks */}
      <div className="tech-marquee-wrapper">
        
        {/* Track 1: Left to Right */}
        <div className="tech-marquee-container track-1">
          <div className="tech-marquee-content">
            {[...row1, ...row1, ...row1, ...row1].map((tech, idx) => (
              <div
                key={`${tech.name}-r1-${idx}`}
                className="tech-grid-card"
                style={{ "--card-accent": tech.color } as React.CSSProperties}
              >
                <div className="tech-card-icon-box">
                  {tech.icon}
                </div>
                <h3 className="tech-card-title">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Right to Left */}
        <div className="tech-marquee-container track-2">
          <div className="tech-marquee-content">
            {[...row2, ...row2, ...row2, ...row2].map((tech, idx) => (
              <div
                key={`${tech.name}-r2-${idx}`}
                className="tech-grid-card"
                style={{ "--card-accent": tech.color } as React.CSSProperties}
              >
                <div className="tech-card-icon-box">
                  {tech.icon}
                </div>
                <h3 className="tech-card-title">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .tech-marquee-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          overflow: hidden;
          position: relative;
          padding: 10px 0;
          mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        }

        .tech-marquee-container {
          display: flex;
          overflow: hidden;
          width: 100%;
          user-select: none;
        }

        .tech-marquee-content {
          display: flex;
          flex-shrink: 0;
          gap: 24px;
          min-width: 100%;
          will-change: transform;
        }

        .track-1 .tech-marquee-content {
          animation: scroll-ltr 28s linear infinite;
        }

        .track-2 .tech-marquee-content {
          animation: scroll-rtl 28s linear infinite;
        }

        .tech-marquee-container:hover .tech-marquee-content {
          animation-play-state: paused;
        }

        @keyframes scroll-ltr {
          0% {
            transform: translate3d(-25%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }

        @keyframes scroll-rtl {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-25%, 0, 0);
          }
        }

        .tech-grid-card {
          flex: 0 0 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 34px 20px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: default;
          position: relative;
        }

        .tech-grid-card:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--card-accent);
          transform: translateY(-6px);
          box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.4),
            0 0 15px color-mix(in srgb, var(--card-accent) 20%, transparent);
        }

        .tech-card-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          margin-bottom: 18px;
          transition: transform 0.3s ease;
        }

        .tech-grid-card:hover .tech-card-icon-box {
          transform: scale(1.12);
        }

        .tech-card-title {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--text-secondary);
          text-transform: uppercase;
          margin: 0;
          transition: color 0.3s ease;
        }

        .tech-grid-card:hover .tech-card-title {
          color: #ffffff;
        }

        @media (max-width: 768px) {
          #tech-3d {
            padding: 50px 6% 30px !important;
          }
          .tech-marquee-wrapper {
            gap: 16px;
          }
          .tech-marquee-content {
            gap: 16px;
          }
          .tech-grid-card {
            flex: 0 0 170px;
            padding: 24px 16px;
            border-radius: 16px;
          }
          .tech-card-icon-box {
            width: 42px;
            height: 42px;
            margin-bottom: 12px;
          }
          .tech-card-icon-box svg {
            width: 38px !important;
            height: 38px !important;
          }
          .tech-card-title {
            font-size: 0.75rem;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </section>
  );
};
