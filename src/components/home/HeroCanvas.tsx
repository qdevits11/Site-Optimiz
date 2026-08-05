"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouse = useRef(new THREE.Vector3(0, 0, 0));
  const { viewport } = useThree();

  const { positions, base, linePositions } = useMemo(() => {
    const count = 1400;
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 2.2 + Math.random() * 7.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      const z = r * Math.cos(phi);
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      base[i3] = x;
      base[i3 + 1] = y;
      base[i3 + 2] = z;
    }

    const maxLinks = 900;
    const linePositions = new Float32Array(maxLinks * 6);
    return { positions, base, linePositions };
  }, []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    points.rotation.y += 0.00045;
    points.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08;

    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    mouse.current.lerp(new THREE.Vector3(x, y, 0), 0.08);

    const attr = points.geometry.attributes.position as THREE.BufferAttribute;
    const array = attr.array as Float32Array;
    const radius = 3.4;

    for (let i = 0; i < array.length; i += 3) {
      const bx = base[i];
      const by = base[i + 1];
      const bz = base[i + 2];
      const dx = bx - mouse.current.x;
      const dy = by - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = (1 - dist / radius) * 0.55;
        array[i] = bx + dx * force;
        array[i + 1] = by + dy * force;
        array[i + 2] = bz + force * 0.8;
      } else {
        array[i] += (bx - array[i]) * 0.045;
        array[i + 1] += (by - array[i + 1]) * 0.045;
        array[i + 2] += (bz - array[i + 2]) * 0.045;
      }
    }
    attr.needsUpdate = true;

    // Dynamic nearby connections
    if (linesRef.current) {
      const lp = linePositions;
      let cursor = 0;
      const step = 18;
      for (let i = 0; i < array.length && cursor < lp.length - 6; i += step * 3) {
        for (let j = i + step * 3; j < array.length && cursor < lp.length - 6; j += step * 3) {
          const dx = array[i] - array[j];
          const dy = array[i + 1] - array[j + 1];
          const dz = array[i + 2] - array[j + 2];
          const d2 = dx * dx + dy * dy + dz * dz;
          if (d2 < 2.8) {
            lp[cursor++] = array[i];
            lp[cursor++] = array[i + 1];
            lp[cursor++] = array[i + 2];
            lp[cursor++] = array[j];
            lp[cursor++] = array[j + 1];
            lp[cursor++] = array[j + 2];
          }
        }
      }
      for (let k = cursor; k < lp.length; k++) lp[k] = 0;
      const lineAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
      lineAttr.needsUpdate = true;
      linesRef.current.rotation.copy(points.rotation);
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#20C894"
          size={0.035}
          transparent
          opacity={0.75}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#20C894"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Lights() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    const t = clock.elapsedTime * 0.35;
    lightRef.current.position.x = Math.cos(t) * 7;
    lightRef.current.position.z = Math.sin(t) * 7;
    lightRef.current.position.y = Math.sin(t * 0.8) * 2.5;
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight ref={lightRef} color="#20C894" intensity={1.6} distance={20} />
      <pointLight position={[-5, 3, 2]} color="#4DB3FF" intensity={0.7} distance={16} />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 9], fov: 52 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Lights />
        <ParticleField />
      </Canvas>
    </div>
  );
}
