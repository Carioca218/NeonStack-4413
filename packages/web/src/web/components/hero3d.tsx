import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";

const LIME = "#C8FF2E";
const W = 2.5;
const H = 1.56;

type CardProps = {
  src: string;
  position: [number, number, number];
  speed: number;
};

/** Floating browser window with a real project screenshot on its face. */
function Card({ src, position, speed }: CardProps) {
  const tex = useTexture(src);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return (
    <Float
      speed={speed}
      rotationIntensity={0}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        <RoundedBox args={[W + 0.12, H + 0.36, 0.08]} radius={0.08} smoothness={4}>
          <meshStandardMaterial color="#141416" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[-W / 2 + 0.1 + i * 0.13, H / 2 + 0.09, 0.05]}>
            <circleGeometry args={[0.036, 20]} />
            <meshBasicMaterial color={i === 0 ? LIME : "#4a4a4f"} />
          </mesh>
        ))}
        <mesh position={[0, -0.08, 0.05]}>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
      </group>
    </Float>
  );
}

/** A thin lime orbit with a glossy bead travelling around the stack. */
function Orbit() {
  const bead = useRef<THREE.Group>(null);
  const R = 2.75;
  useFrame((state) => {
    if (!bead.current) return;
    const a = state.clock.elapsedTime * 0.55;
    bead.current.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
  });
  return (
    <group rotation={[1.18, 0.32, 0.5]} position={[0, 0, -0.4]}>
      <mesh>
        <torusGeometry args={[R, 0.012, 12, 220]} />
        <meshBasicMaterial color={LIME} transparent opacity={0.55} />
      </mesh>
      <group ref={bead}>
        <mesh>
          <sphereGeometry args={[0.2, 48, 48]} />
          <meshPhysicalMaterial color={LIME} metalness={0.4} roughness={0.12} clearcoat={1} emissive="#7ea800" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const size = useThree((s) => s.size);

  useEffect(() => {
    const on = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);

  // keep the stack inside the stage on any aspect ratio
  const fit = Math.min(1, size.width / size.height / 0.9) * 0.9;

  useFrame((_, dt) => {
    if (!g.current) return;
    const scroll = Math.min(window.scrollY / 800, 1);
    const { x, y } = mouse.current;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, -0.32 + x * 0.22 + scroll * 0.35, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, 0.08 + y * 0.12, 3, dt);
    g.current.position.y = THREE.MathUtils.damp(g.current.position.y, scroll * 0.8, 3, dt);
  });

  return (
    <group scale={fit}>
      <group ref={g}>{children}</group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-4, -2, 3]} intensity={25} color={LIME} />
      <Rig>
        <Orbit />
        <Card src="/images/work/nexus.webp" position={[0.75, 1.5, -1.1]} speed={1.1} />
        <Card src="/images/work/fiber.webp" position={[-0.35, 0, 0]} speed={1.3} />
        <Card src="/images/work/barber.webp" position={[0.6, -1.5, 1.1]} speed={1.2} />
        <Sparkles count={30} scale={[6, 6, 3]} size={2.6} speed={0.3} color={LIME} opacity={0.6} />
      </Rig>
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.3], fov: 36 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
