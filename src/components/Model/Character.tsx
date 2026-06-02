import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Character: React.FC = () => {
  const headGroupRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const leftAntennaRef = useRef<THREE.Mesh>(null);
  const rightAntennaRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const pointerX = state.pointer.x; // -1 to 1
    const pointerY = state.pointer.y; // -1 to 1

    // 1. Gaze Tracking - Rotate Head Group smoothly towards the cursor
    if (headGroupRef.current) {
      // Rotate left/right (Yaw)
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        pointerX * 0.6,
        0.08
      );
      // Rotate up/down (Pitch)
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        -pointerY * 0.4,
        0.08
      );
      
      // Floating motion for the head group
      headGroupRef.current.position.y = Math.sin(t * 1.5) * 0.08 + 0.15;
    }

    // 2. Secondary animation - neck follows head slightly
    if (neckRef.current && headGroupRef.current) {
      neckRef.current.rotation.y = headGroupRef.current.rotation.y * 0.3;
      neckRef.current.rotation.x = headGroupRef.current.rotation.x * 0.3;
    }

    // 3. Blinking/Pulsing antenna indicators
    const emissiveIntensity = (Math.sin(t * 8) + 1) * 0.5 * 1.5 + 0.5;
    if (leftAntennaRef.current && rightAntennaRef.current) {
      const leftMat = leftAntennaRef.current.material as THREE.MeshStandardMaterial;
      const rightMat = rightAntennaRef.current.material as THREE.MeshStandardMaterial;
      if (leftMat && rightMat) {
        leftMat.emissiveIntensity = emissiveIntensity;
        rightMat.emissiveIntensity = emissiveIntensity;
      }
    }

    // 4. Floating holographic ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
      ringRef.current.rotation.x = Math.sin(t * 0.8) * 0.2 + (Math.PI / 2.3);
      ringRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.9;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* 3D Holographic Base Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]} position={[0, -0.9, 0]}>
        <torusGeometry args={[1.5, 0.03, 8, 64]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          emissive="#8b5cf6" 
          emissiveIntensity={1.5} 
          wireframe
        />
      </mesh>

      {/* Cybernetic Neck Support (static base) */}
      <mesh ref={neckRef} position={[0, -0.75, -0.15]}>
        <cylinderGeometry args={[0.25, 0.32, 0.45, 16]} />
        <meshStandardMaterial color="#1f2937" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Shoulder/Collar support (base) */}
      <mesh position={[0, -1.1, -0.2]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[1.8, 0.3, 0.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Head Joint Sphere */}
      <mesh position={[0, -0.55, -0.15]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#374151" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* HEAD GROUP (Main gaze tracking structure) */}
      <group ref={headGroupRef} position={[0, 0, -0.1]}>
        {/* Core Helmet / Skull */}
        <mesh>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshStandardMaterial 
            color="#090d16" 
            roughness={0.15} 
            metalness={0.95} 
          />
        </mesh>

        {/* Visor Mount Wrap (darker armor plating) */}
        <mesh position={[0, 0.05, 0.08]} scale={[1.02, 1.02, 1.02]}>
          <sphereGeometry args={[0.74, 32, 16, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.3} metalness={0.6} />
        </mesh>

        {/* Glowing Visor (front visor piece) */}
        <mesh position={[0, 0.08, 0.32]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.66, 0.66, 0.28, 32, 1, false, -Math.PI / 2.8, Math.PI / 1.4]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={2.5}
            transparent
            opacity={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Cyber Ear Cushions / Audio Jacks (Sides) */}
        {/* Left Ear */}
        <group position={[-0.76, 0, -0.05]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.26, 0.26, 0.12, 24]} />
            <meshStandardMaterial color="#1e1b4b" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Inner Glowing Ring */}
          <mesh position={[0, 0.07, 0]}>
            <torusGeometry args={[0.15, 0.03, 8, 24]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
          </mesh>
        </group>

        {/* Right Ear */}
        <group position={[0.76, 0, -0.05]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.26, 0.26, 0.12, 24]} />
            <meshStandardMaterial color="#1e1b4b" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Inner Glowing Ring */}
          <mesh position={[0, 0.07, 0]}>
            <torusGeometry args={[0.15, 0.03, 8, 24]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
          </mesh>
        </group>

        {/* Antenna / Neon indicators extending from ears */}
        {/* Left Antenna */}
        <mesh ref={leftAntennaRef} position={[-0.82, 0.4, -0.12]} rotation={[0.2, 0, 0.35]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
        </mesh>
        <mesh position={[-0.91, 0.65, -0.08]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
        </mesh>

        {/* Right Antenna */}
        <mesh ref={rightAntennaRef} position={[0.82, 0.4, -0.12]} rotation={[0.2, 0, -0.35]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0.91, 0.65, -0.08]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
        </mesh>

        {/* Tactical Forehead Sensor */}
        <mesh position={[0, 0.46, 0.45]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[0.12, 0.12, 0.06]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2.5} />
        </mesh>
      </group>
    </group>
  );
};
