'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface NISBWordmarkProps {
  progress: number;   // 0–1: letter reveal
  glowIntensity: number; // 0–1
}

export default function NISBWordmark({ progress, glowIntensity }: NISBWordmarkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mainRef  = useRef<THREE.Mesh>(null);
  const subRef   = useRef<THREE.Mesh>(null);

  // Locally served Orbitron Bold (copied from @fontsource/orbitron)
  // troika-three-text 0.52+ supports WOFF2 natively
  const FONT_URL = '/fonts/Orbitron-Bold.woff2';

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle float
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
  });

  const mainOpacity    = Math.max(0, (progress - 0.0) / 0.6);
  const subOpacity     = Math.max(0, (progress - 0.5) / 0.5);
  const ieeeopacity    = Math.max(0, (progress - 0.7) / 0.3);
  const mainY          = (1 - mainOpacity) * -0.4;
  const subY           = (1 - subOpacity) * -0.3;

  return (
    <group ref={groupRef}>
      {/* NISB Main wordmark */}
      <Text
        ref={mainRef as React.Ref<THREE.Mesh>}
        font={FONT_URL}
        fontSize={0.9}
        letterSpacing={0.18}
        position={[0, 0.3 + mainY, 0]}
        anchorX="center"
        anchorY="middle"
        fillOpacity={mainOpacity}
      >
        NISB
        <meshStandardMaterial
          color="#60A5FA"
          emissive="#3B82F6"
          emissiveIntensity={glowIntensity * 3}
          transparent
          opacity={mainOpacity}
        />
      </Text>

      {/* Subtitle */}
      <Text
        ref={subRef as React.Ref<THREE.Mesh>}
        font={FONT_URL}
        fontSize={0.14}
        letterSpacing={0.35}
        position={[0, -0.25 + subY, 0]}
        anchorX="center"
        anchorY="middle"
        fillOpacity={subOpacity}
      >
        NITTE IEEE STUDENT BRANCH
        <meshStandardMaterial
          color="#E8F4FD"
          emissive="#60A5FA"
          emissiveIntensity={glowIntensity * 1.5}
          transparent
          opacity={subOpacity * 0.8}
        />
      </Text>

      {/* IEEE tag above */}
      <Text
        font={FONT_URL}
        fontSize={0.1}
        letterSpacing={0.4}
        position={[0, 0.85 + mainY, 0]}
        anchorX="center"
        anchorY="middle"
        fillOpacity={ieeeopacity}
      >
        IEEE
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={glowIntensity * 2}
          transparent
          opacity={ieeeopacity}
        />
      </Text>

      {/* Ambient light for bloom */}
      <pointLight
        position={[0, 0, 1]}
        color="#3B82F6"
        intensity={glowIntensity * 4}
        distance={6}
      />
      <pointLight
        position={[0, 0, 1]}
        color="#7C3AED"
        intensity={glowIntensity * 2}
        distance={8}
      />
    </group>
  );
}
