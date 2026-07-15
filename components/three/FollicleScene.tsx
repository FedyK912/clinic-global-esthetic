"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const GOLD = "#AD8A55";
const GOLD_SOFT = "#D9BC8C";
const INK = "#2E2A25";
const EPIDERMIS = "#E7CBB5";
const DERMIS = "#F2E3D0";

/**
 * Cibles par phase du cycle : position du bulbe, sommet du poil,
 * inclinaison et teinte. La surface de la peau est à y = 1.65.
 */
const PHASE_TARGETS = [
  { bulbY: -1.28, topY: 2.15, lean: 0.05, tone: "#2E2A25", glow: 1 }, // anagène
  { bulbY: -0.62, topY: 1.92, lean: 0.14, tone: "#4A423A", glow: 0.25 }, // catagène
  { bulbY: -0.12, topY: 1.78, lean: 0.22, tone: "#6B6157", glow: 0 }, // télogène
];

function Hair({ phase, animate }: { phase: number; animate: boolean }) {
  const shaft = useRef<THREE.Mesh>(null);
  const shaftMat = useRef<THREE.MeshStandardMaterial>(null);
  const bulb = useRef<THREE.Mesh>(null);
  const bulbMat = useRef<THREE.MeshStandardMaterial>(null);
  const papillaMat = useRef<THREE.MeshStandardMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const current = useRef({ bulbY: PHASE_TARGETS[0].bulbY, topY: PHASE_TARGETS[0].topY, lean: PHASE_TARGETS[0].lean, glow: 1 });
  const color = useRef(new THREE.Color(PHASE_TARGETS[0].tone));

  useFrame(() => {
    const t = PHASE_TARGETS[phase];
    const c = current.current;
    const k = animate ? 0.07 : 1;
    c.bulbY = THREE.MathUtils.lerp(c.bulbY, t.bulbY, k);
    c.topY = THREE.MathUtils.lerp(c.topY, t.topY, k);
    c.lean = THREE.MathUtils.lerp(c.lean, t.lean, k);
    c.glow = THREE.MathUtils.lerp(c.glow, t.glow, k);
    color.current.lerp(new THREE.Color(t.tone), k);

    const len = c.topY - c.bulbY;
    const mid = (c.topY + c.bulbY) / 2;
    if (shaft.current) {
      shaft.current.scale.y = len;
      shaft.current.position.y = mid;
    }
    if (bulb.current) bulb.current.position.y = c.bulbY;
    if (group.current) group.current.rotation.z = c.lean;
    if (shaftMat.current) shaftMat.current.color.copy(color.current);
    if (bulbMat.current) {
      bulbMat.current.color.copy(color.current);
      bulbMat.current.emissive.set(GOLD);
      bulbMat.current.emissiveIntensity = c.glow * 0.35;
    }
    if (papillaMat.current) papillaMat.current.emissiveIntensity = 0.3 + c.glow * 0.6;
  });

  return (
    <group ref={group}>
      {/* Tige du poil (hauteur de base 1, mise à l'échelle chaque frame) */}
      <mesh ref={shaft}>
        <cylinderGeometry args={[0.05, 0.068, 1, 14]} />
        <meshStandardMaterial ref={shaftMat} color={INK} roughness={0.55} />
      </mesh>
      {/* Bulbe */}
      <mesh ref={bulb}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial ref={bulbMat} color={INK} roughness={0.5} />
      </mesh>
      {/* Papille dermique (fixe, en profondeur) */}
      <mesh position={[0, -1.42, 0]}>
        <sphereGeometry args={[0.09, 20, 20]} />
        <meshStandardMaterial ref={papillaMat} color={GOLD} emissive={new THREE.Color(GOLD)} emissiveIntensity={0.9} roughness={0.35} metalness={0.2} />
      </mesh>
    </group>
  );
}

function NeighbourHair({ x, lean }: { x: number; lean: number }) {
  return (
    <mesh position={[x, 0.6, -0.5]} rotation={[0, 0, lean]}>
      <cylinderGeometry args={[0.03, 0.04, 2.4, 10]} />
      <meshStandardMaterial color="#8A7B69" transparent opacity={0.5} roughness={0.6} />
    </mesh>
  );
}

function SkinBlock() {
  return (
    <group>
      {/* Épiderme */}
      <RoundedBox args={[4.1, 0.5, 2.4]} radius={0.06} smoothness={4} position={[0, 1.4, 0]}>
        <meshStandardMaterial color={EPIDERMIS} roughness={0.55} />
      </RoundedBox>
      {/* Derme */}
      <RoundedBox args={[4.1, 2.8, 2.4]} radius={0.06} smoothness={4} position={[0, -0.25, 0]}>
        <meshStandardMaterial color={DERMIS} roughness={0.65} />
      </RoundedBox>
    </group>
  );
}

function Rig({ children, animate }: { children: React.ReactNode; animate: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const sway = animate ? Math.sin(state.clock.elapsedTime * 0.25) * 0.05 : 0;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      0.38 + sway + (animate ? state.pointer.x * 0.14 : 0),
      0.05,
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      0.12 + (animate ? -state.pointer.y * 0.06 : 0),
      0.05,
    );
  });
  return <group ref={ref}>{children}</group>;
}

export default function FollicleScene({ phase }: { phase: number }) {
  const reduced = usePrefersReducedMotion();
  const animate = !reduced;

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.35, 9.4], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#F5EDDE"]} />
      <fog attach="fog" args={["#F5EDDE", 11, 18]} />
      <ambientLight intensity={0.95} color="#FFF7EC" />
      <directionalLight position={[4, 6, 4]} intensity={1.05} />
      <directionalLight position={[-5, 2, -3]} intensity={0.3} color="#F3DFB8" />
      <Rig animate={animate}>
        <group position={[0, -0.15, 0]} scale={0.72}>
          <SkinBlock />
          {/* Follicule principal sur la face avant du bloc — lecture en coupe */}
          <group position={[0, 0, 1.24]}>
            <Hair phase={phase} animate={animate} />
          </group>
          <NeighbourHair x={-1.25} lean={-0.12} />
          <NeighbourHair x={1.3} lean={0.18} />
          <ContactShadows position={[0, -1.72, 0]} opacity={0.3} scale={6.5} blur={2.8} far={2.4} color={INK} />
        </group>
      </Rig>
      <pointLight position={[0, -1.2, 1.4]} color={GOLD_SOFT} intensity={1.4} distance={4} />
    </Canvas>
  );
}
