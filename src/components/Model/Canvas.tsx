import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Character } from "./Character";

export const ModelCanvas: React.FC = () => {
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
          camera={{ position: [0, 0.1, 3.8], fov: 58 }}
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
