'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D 八卦阵组件
 * 使用React Three Fiber实现带有阴阳鱼效果的3D旋转八卦阵
 */
function BaguaRing({ radius, rotationSpeed, color }: {
  radius: number;
  rotationSpeed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * rotationSpeed;
    }
  });

  const segments = 8;
  const segmentAngle = (Math.PI * 2) / segments;

  return (
    <group ref={ref}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = i * segmentAngle;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <group key={i} rotation={[0, 0, angle]}>
            {/* 爻线 */}
            <mesh position={[radius * 0.7, 0, 0]}>
              <boxGeometry args={[radius * 0.4, 0.08, 0.08]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function YinYang() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = -state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ref}>
      {/* 阳鱼头 */}
      <mesh position={[0, 0.3, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#c9a227" emissive="#c9a227" emissiveIntensity={0.2} />
      </mesh>

      {/* 阴鱼尾 */}
      <mesh position={[0, -0.3, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#1a1a2e" emissiveIntensity={0.1} />
      </mesh>

      {/* 阳鱼眼 */}
      <mesh position={[0, 0.45, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>

      {/* 阴鱼眼 */}
      <mesh position={[0, -0.45, 0.01]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#c9a227" />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const count = 50;
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#c9a227"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      {/* 环境光 */}
      <ambientLight intensity={0.3} />

      {/* 点光源 */}
      <pointLight position={[10, 10, 10]} intensity={1} color="#c9a227" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4a574" />

      {/* 外圈 */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <BaguaRing radius={2} rotationSpeed={0.1} color="#c9a227" />
      </Float>

      {/* 中圈 */}
      <Float speed={1.5} rotationIntensity={-0.3} floatIntensity={0.3}>
        <BaguaRing radius={1.5} rotationSpeed={-0.15} color="#d4a574" />
      </Float>

      {/* 内圈 */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.2}>
        <BaguaRing radius={1} rotationSpeed={0.2} color="#e8c547" />
      </Float>

      {/* 阴阳鱼 */}
      <YinYang />

      {/* 漂浮粒子 */}
      <FloatingParticles />
    </>
  );
}

export default function Bagua3D() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
