"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const GOLD = "#AD8A55";
const GOLD_SOFT = "#D9BC8C";
const CERAMIC = "#F8F4ED";
const INK = "#2E2A25";
const SKIN = "#E7CBB5";

/** Léger parallaxe caméra qui suit le pointeur. */
function Rig({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || !animate) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.22, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.08, 0.05);
  });

  return <group ref={ref}>{children}</group>;
}

/** Pièce à main laser stylisée qui balaye la peau avec son faisceau. */
function Handpiece({ animate }: { animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const beamMatA = useRef<THREE.MeshBasicMaterial>(null);
  const beamMatB = useRef<THREE.MeshBasicMaterial>(null);
  const spot = useRef<THREE.Mesh>(null);
  const spotMat = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const sweep = animate ? Math.sin(t * 0.5) * 0.85 : 0.3;
    group.current.position.x = sweep;
    group.current.position.y = animate ? Math.sin(t * 1.3) * 0.04 : 0;
    group.current.rotation.z = animate ? Math.cos(t * 0.5) * 0.06 : 0.04;

    const pulse = animate ? 0.32 + Math.abs(Math.sin(t * 6)) * 0.22 : 0.4;
    if (beamMatA.current) beamMatA.current.opacity = pulse;
    if (beamMatB.current) beamMatB.current.opacity = pulse * 0.8;
    if (spot.current && spotMat.current) {
      const s = animate ? 1 + Math.sin(t * 6) * 0.12 : 1;
      spot.current.scale.setScalar(s);
      spotMat.current.opacity = pulse * 0.9;
    }
  });

  return (
    <group ref={group}>
      {/* Corps céramique */}
      <mesh position={[0, 1.62, 0]}>
        <capsuleGeometry args={[0.38, 1.3, 12, 32]} />
        <meshStandardMaterial color={CERAMIC} roughness={0.32} metalness={0.05} />
      </mesh>
      {/* Bague dorée */}
      <mesh position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.41, 0.41, 0.15, 48]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.35} />
      </mesh>
      {/* Tête */}
      <RoundedBox args={[0.82, 0.52, 0.6]} radius={0.12} smoothness={6} position={[0, 0.56, 0]}>
        <meshStandardMaterial color={CERAMIC} roughness={0.3} metalness={0.05} />
      </RoundedBox>
      {/* Fenêtre d'émission */}
      <RoundedBox args={[0.5, 0.08, 0.34]} radius={0.03} smoothness={4} position={[0, 0.27, 0]}>
        <meshStandardMaterial color={INK} roughness={0.15} metalness={0.4} emissive={new THREE.Color(GOLD)} emissiveIntensity={0.5} />
      </RoundedBox>

      {/* Faisceau (deux plans croisés) */}
      <mesh position={[0, -0.55, 0]}>
        <planeGeometry args={[0.46, 1.56]} />
        <meshBasicMaterial ref={beamMatA} color={GOLD} transparent opacity={0.4} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh position={[0, -0.55, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.34, 1.56]} />
        <meshBasicMaterial ref={beamMatB} color={GOLD} transparent opacity={0.32} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {/* Impact lumineux sur la peau */}
      <mesh ref={spot} position={[0, -1.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 40]} />
        <meshBasicMaterial ref={spotMat} color="#F3DFB8" transparent opacity={0.5} depthWrite={false} />
      </mesh>
      <pointLight position={[0, -0.4, 0.6]} color={GOLD_SOFT} intensity={2.2} distance={3.2} />
    </group>
  );
}

function SkinPlane() {
  return (
    <RoundedBox args={[4.6, 0.3, 2.9]} radius={0.1} smoothness={5} position={[0, -1.5, 0]}>
      <meshStandardMaterial color={SKIN} roughness={0.6} metalness={0} />
    </RoundedBox>
  );
}

export default function LaserScene() {
  const reduced = usePrefersReducedMotion();
  const animate = !reduced;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, 7.6], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={animate ? "always" : "demand"}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#EFE2C9"]} />
      <fog attach="fog" args={["#EFE2C9", 9, 15]} />
      <ambientLight intensity={0.95} color="#FFF7EC" />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#F3DFB8" />
      <Rig animate={animate}>
        <group position={[0, -0.15, 0]}>
          <Handpiece animate={animate} />
          <SkinPlane />
          <Sparkles count={26} scale={[3.6, 2.2, 2]} position={[0, 0.4, 0]} size={1.6} speed={animate ? 0.28 : 0} color={GOLD_SOFT} opacity={0.5} />
          <ContactShadows position={[0, -1.34, 0]} opacity={0.32} scale={5.5} blur={2.6} far={2.4} color={INK} />
        </group>
      </Rig>
    </Canvas>
  );
}
