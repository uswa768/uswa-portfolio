import React, { useEffect, useState, useRef } from "react";

interface Tag {
  text: string;
  x: number;
  y: number;
  z: number;
}

export const TechSphere: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  const skills = [
    "React", "TypeScript", "JavaScript", "HTML5", "CSS3",
    "Three.js", "GSAP", "Vite", "Git", "GitHub",
    "Figma", "Tailwind", "Next.js", "Node.js", "Python",
    "WebGL", "CS Major", "UI/UX"
  ];

  useEffect(() => {
    // 1. Initialize tags distributed evenly on a sphere (Fibonacci Sphere Algorithm)
    const count = skills.length;
    const radius = 95; // Radius of the sphere
    const initialTags: Tag[] = [];

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      initialTags.push({
        text: skills[i],
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
      });
    }

    setTags(initialTags);

    // 2. Track mouse position relative to container center
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      
      // Normalize mouse coordinates from -100 to 100
      mouseRef.current = {
        x: ((e.clientX - cx) / (rect.width / 2)) * 80,
        y: ((e.clientY - cy) / (rect.height / 2)) * 80,
      };
    };

    const handleMouseEnter = () => {
      isHovered.current = true;
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      // Reset speed slowly in animation frame
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // 3. Animation Loop for 3D rotations
    let animationFrameId: number;
    let currentRotationX = 0.003; // Default slow spin speed
    let currentRotationY = 0.003;

    const rotateSphere = () => {
      setTags((prevTags) => {
        // Target speed based on mouse or fallback to slow spin
        let targetRotX = 0.002;
        let targetRotY = 0.002;

        if (isHovered.current) {
          // Adjust rotation speed depending on cursor distance from center
          targetRotX = mouseRef.current.y * 0.0003;
          targetRotY = -mouseRef.current.x * 0.0003;
        }

        // Interpolate current speed to target speed for smoothness
        currentRotationX += (targetRotX - currentRotationX) * 0.08;
        currentRotationY += (targetRotY - currentRotationY) * 0.08;

        const radX = currentRotationX;
        const radY = currentRotationY;

        const cosX = Math.cos(radX);
        const sinX = Math.sin(radX);
        const cosY = Math.cos(radY);
        const sinY = Math.sin(radY);

        return prevTags.map((tag) => {
          // Rotate Y (Yaw)
          const x1 = tag.x * cosY - tag.z * sinY;
          const z1 = tag.x * sinY + tag.z * cosY;

          // Rotate X (Pitch)
          const y1 = tag.y * cosX - z1 * sinX;
          const z2 = tag.y * sinX + z1 * cosX;

          return { ...tag, x: x1, y: y1, z: z2 };
        });
      });

      animationFrameId = requestAnimationFrame(rotateSphere);
    };

    rotateSphere();

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const fov = 150; // Perspective focal depth
  const centerX = 120; // Coordinates offset
  const centerY = 120;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "250px",
        height: "250px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      {tags.map((tag, idx) => {
        // Perspective projections
        const scale = fov / (fov + tag.z);
        const opacity = (tag.z + 100) / 200 * 0.75 + 0.25; // closer = brighter
        const left = tag.x * scale + centerX;
        const top = tag.y * scale + centerY;
        
        // Colors mapping depending on depth
        const isClose = tag.z < 0;
        const color = isClose 
          ? "var(--accent-cyan)" 
          : idx % 2 === 0 
            ? "var(--accent-purple)" 
            : "var(--text-secondary)";

        return (
          <span
            key={idx}
            style={{
              position: "absolute",
              left: `${left}px`,
              top: `${top}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity,
              color: color,
              fontSize: "0.85rem",
              fontWeight: isClose ? "800" : "500",
              fontFamily: "var(--font-heading)",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              zIndex: Math.round(scale * 100),
              textShadow: isClose ? `0 0 10px ${color}55` : "none",
              transition: "color 0.3s",
            }}
          >
            {tag.text}
          </span>
        );
      })}
    </div>
  );
};
