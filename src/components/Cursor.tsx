import React, { useEffect, useState, useRef } from "react";

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Check if it's a mobile device (touch support)
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Animation loop for trail interpolation (lerp)
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;

    const animateTrail = () => {
      // Lerp formula: current = current + (target - current) * factor
      const targetX = position.x;
      const targetY = position.y;
      
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      
      setTrail({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(animateTrail);
    };

    animateTrail();

    // Event Delegation to detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for clickable elements
      const interactive = target.closest("a, button, [data-cursor]");
      if (interactive) {
        setHovered(true);
        const cursorType = interactive.getAttribute("data-cursor") || "link";
        setHoverType(cursorType);
      } else {
        setHovered(false);
        setHoverType(null);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [position.x, position.y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot Cursor */}
      <div
        ref={mainRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: hovered ? "var(--accent-cyan)" : "var(--accent-purple)",
          borderRadius: "50%",
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${hovered ? 0.5 : 1})`,
          transition: "transform 0.1s ease-out, background-color 0.3s ease",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      
      {/* Outer Floating Ring Cursor */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: hovered ? "60px" : "32px",
          height: hovered ? "60px" : "32px",
          border: hovered
            ? `1px solid ${hoverType === "project" ? "var(--accent-cyan)" : "var(--accent-purple)"}`
            : "1px solid rgba(139, 92, 246, 0.4)",
          background: hovered
            ? hoverType === "project"
              ? "rgba(6, 182, 212, 0.05)"
              : "rgba(139, 92, 246, 0.05)"
            : "transparent",
          borderRadius: "50%",
          transform: `translate3d(${trail.x - (hovered ? 30 : 16)}px, ${trail.y - (hovered ? 30 : 16)}px, 0)`,
          transition: "width 0.3s cubic-bezier(0.19, 1, 0.22, 1), height 0.3s cubic-bezier(0.19, 1, 0.22, 1), background-color 0.3s, border-color 0.3s",
          pointerEvents: "none",
          zIndex: 9998,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered 
            ? `0 0 15px ${hoverType === "project" ? "var(--accent-cyan-glow)" : "var(--accent-purple-glow)"}` 
            : "none",
        }}
      >
        {hovered && hoverType === "project" && (
          <span style={{ 
            fontSize: "10px", 
            fontWeight: "bold", 
            color: "var(--accent-cyan)", 
            fontFamily: "var(--font-heading)",
            letterSpacing: "0.05em",
            textTransform: "uppercase"
          }}>
            View
          </span>
        )}
      </div>
    </>
  );
};
