'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import NebulaBackground from './NebulaBackground';
import ParticleField    from './ParticleField';
import GeometricLattice from './GeometricLattice';

function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    // Throttled lerp — lighter on GPU
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.6, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.6, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface SceneProps {
  act: number;
  particleProgress: number;
  nebulaProgress: number;
  latticeProgress: number;
  latticePulse: number;
  latticePosY: number;
}

export default function SceneCanvas({
  act,
  particleProgress,
  nebulaProgress,
  latticeProgress,
  latticePulse,
  latticePosY,
}: SceneProps) {
  const [degraded, setDegraded] = useState(false);

  return (
    <Canvas
      gl={{
        antialias: !degraded,       // disable AA when performance drops
        alpha: false,
        powerPreference: 'high-performance',
        precision: 'mediump',       // mediump vs highp → 20–30% GPU savings
      }}
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 5] }}
      dpr={[1, 1.5]}               // cap at 1.5× (was 2×) — big GPU savings on HiDPI
      frameloop="always"
      style={{ background: '#000005' }}
    >
      <PerformanceMonitor
        onDecline={() => setDegraded(true)}
        onIncline={() => setDegraded(false)}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.05} />
          {!degraded && <CameraRig />}

          {/* Always render nebula */}
          <NebulaBackground progress={nebulaProgress} />

          {/* Act 2+: Particle field */}
          <ParticleField progress={particleProgress} />

          {/* Act 3+: Geometric lattice */}
          {act >= 3 && (
            <GeometricLattice progress={latticeProgress} pulse={latticePulse} posY={latticePosY} />
          )}
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
