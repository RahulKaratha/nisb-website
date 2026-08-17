'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import StarfieldBackground from './StarfieldBackground';

export default function LandingCanvas() {
  return (
    <Canvas
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'default',
      }}
      camera={{ fov: 60, near: 0.1, far: 100, position: [0, 0, 5] }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <StarfieldBackground />
      </Suspense>
    </Canvas>
  );
}
