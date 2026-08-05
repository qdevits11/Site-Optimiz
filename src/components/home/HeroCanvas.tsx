"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  const { positions, base } = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
    }
    return { positions, base };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    points.rotation.y += 0.0003;

    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    mouse.current.set(x, y, 0);

    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const array = attr.array as Float32Array;
    const radius = 3;

    for (let i = 0; i < array.length; i += 3) {
      const bx = base[i];
      const by = base[i + 1];
      const bz = base[i + 2];

      const dx = bx - mouse.current.x;
      const dy = by - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = (1 - dist / radius) * 0.35;
        array[i] = bx + dx * force;
        array[i + 1] = by + dy * force;
        array[i + 2] = bz;
      } else {
        array[i] += (bx - array[i]) * 0.05;
        array[i + 1] += (by - array[i + 1]) * 0.05;
        array[i + 2] += (bz - array[i + 2]) * 0.05;
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#00D4A8"
        size={0.03}
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Lights() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.elapsedTime * 0.4;
    lightRef.current.position.x = Math.cos(t) * 6;
    lightRef.current.position.z = Math.sin(t) * 6;
    lightRef.current.position.y = Math.sin(t * 0.7) * 2;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={lightRef} color="#00D4A8" intensity={1.2} distance={18} />
      <pointLight position={[-4, 3, 2]} color="#0099FF" intensity={0.5} distance={14} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <Particles />
      </Canvas>
    </div>
  );
}
