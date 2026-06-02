import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Character } from "./Character";

export const ModelCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    // Elegant high-performance 2D SVG/CSS placeholder for mobile devices
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          className="float-animation"
          style={{
            position: "relative",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            border: "1px dashed rgba(139, 92, 246, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.1)",
          }}
        >
          {/* Animated Glowing Orb Core */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)",
              boxShadow: "0 0 40px var(--accent-purple-glow), 0 0 20px var(--accent-cyan-glow)",
              opacity: 0.8,
              position: "relative",
            }}
          >
            {/* Visual Visor Overlay Simulation */}
            <div
              style={{
                position: "absolute",
                top: "40%",
                left: "10%",
                width: "80%",
                height: "20px",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                boxShadow: "0 0 15px rgba(255,255,255,1)",
                opacity: 0.9,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Suspense fallback={
        <div style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)", fontSize: "0.9rem", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          INITIALIZING CYBERSPACE...
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 3.0], fov: 48 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          {/* Ambient light for subtle shadow fills */}
          <ambientLight intensity={0.5} />

          {/* Key Lights (Cyber Neon Highlights) */}
          {/* 1. Purple accent light from top-right */}
          <directionalLight
            position={[5, 5, 2]}
            intensity={2.5}
            color="#8b5cf6"
          />

          {/* 2. Cyan accent light from front-left */}
          <pointLight
            position={[-4, 2, 3]}
            intensity={3.0}
            color="#06b6d4"
            distance={10}
          />

          {/* 3. White highlight fill */}
          <directionalLight
            position={[0, 4, 1]}
            intensity={1.0}
            color="#ffffff"
          />

          {/* 4. Deep Indigo Rim Light from behind */}
          <pointLight
            position={[0, -2, -3]}
            intensity={4.0}
            color="#4f46e5"
            distance={8}
          />

          {/* 3D Cyberpunk Character Model */}
          <Character />
        </Canvas>
      </Suspense>
    </div>
  );
};
