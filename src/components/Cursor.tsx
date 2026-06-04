import React, { useEffect, useRef, useState } from "react";

export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Don't register mouse handlers on mobile devices
    if (window.matchMedia("(max-width: 768px)").matches) {
      return () => window.removeEventListener("resize", checkMobile);
    }

    // Live mouse position (updated synchronously in mousemove)
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    // Ring lerp position
    const ring = { x: mouse.x, y: mouse.y };

    let rafId: number;
    let isVisible = false;

    const show = () => {
      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = "1";
        if (ringRef.current) ringRef.current.style.opacity = "1";
      }
    };
    const hide = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      show();

      // Move inner dot instantly (zero lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x - 4}px, ${mouse.y - 4}px, 0)`;
      }
    };

    // Hover detection
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        const type = interactive.getAttribute("data-cursor") || "link";
        setHoverType(type);
      } else {
        setHoverType(null);
      }
    };

    // Smooth ring lerp — runs every frame
    const animate = () => {
      // Lerp factor: 0.12 = smooth but not too laggy
      ring.x += (mouse.x - ring.x) * 0.12;
      ring.y += (mouse.y - ring.y) * 0.12;

      if (ringRef.current) {
        const size = ringRef.current.offsetWidth;
        ringRef.current.style.transform = `translate3d(${ring.x - size / 2}px, ${ring.y - size / 2}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  // Derived styles based on hover state
  const isHovered = hoverType !== null;
  const ringSize = isHovered ? 56 : 32;
  const ringColor = hoverType === "project" ? "var(--accent-cyan)" : "var(--accent-purple)";

  if (isMobile) return null;

  return (
    <>
      {/* Inner dot — zero lag, moves instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: isHovered ? "var(--accent-cyan)" : "var(--accent-purple)",
          transform: "translate3d(-100px, -100px, 0)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "background-color 0.2s ease, transform 0s",
          willChange: "transform",
        }}
      />

      {/* Outer ring — smooth lerp follow */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `1.5px solid ${isHovered ? ringColor : "rgba(139, 92, 246, 0.5)"}`,
          background: isHovered
            ? hoverType === "project"
              ? "rgba(6, 182, 212, 0.06)"
              : "rgba(139, 92, 246, 0.06)"
            : "transparent",
          borderRadius: "50%",
          transform: "translate3d(-100px, -100px, 0)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "width 0.25s cubic-bezier(0.19,1,0.22,1), height 0.25s cubic-bezier(0.19,1,0.22,1), border-color 0.2s, background 0.2s",
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isHovered ? `0 0 12px ${ringColor}55` : "none",
        }}
      >
        {isHovered && hoverType === "project" && (
          <span style={{
            fontSize: "9px",
            fontWeight: 700,
            color: "var(--accent-cyan)",
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}>
            View
          </span>
        )}
      </div>
    </>
  );
};
