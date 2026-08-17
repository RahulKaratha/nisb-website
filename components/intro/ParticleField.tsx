'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 8000;

const vertexShader = `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3  aColor;

  uniform float uTime;
  uniform float uProgress;
  uniform float uSpread;
  uniform vec2  uMouse;

  varying float vAlpha;
  varying vec3  vColor;

  // Simple hash for pseudo-random
  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  void main() {
    vColor = aColor;

    // Animate position from origin outward
    vec3 pos = position * uSpread;

    // Soft oscillation per particle
    float t = uTime * 0.4 + aPhase;
    pos.x += sin(t * 1.1 + position.y * 2.0) * 0.08 * uProgress;
    pos.y += cos(t * 0.9 + position.z * 2.0) * 0.06 * uProgress;
    pos.z += sin(t * 0.7 + position.x * 2.0) * 0.05 * uProgress;

    // Magnetic Mouse Repulsion
    // Approximate mouse 3D position at Z=0
    vec2 projectedMouse = uMouse * vec2(7.0, 4.0);
    vec2 dir = pos.xy - projectedMouse;
    float mDist = length(dir);
    if (mDist < 2.5) {
      // Repel outwards from mouse, scale by uProgress so it's active when visible
      pos.xy += normalize(dir) * pow(2.5 - mDist, 2.0) * 0.4 * uProgress;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Depth-based size falloff
    float dist = length(mvPosition.xyz);
    gl_PointSize = (aSize * uProgress) * (120.0 / dist);
    gl_PointSize = clamp(gl_PointSize, 0.4, 4.0);

    gl_Position = projectionMatrix * mvPosition;

    // Alpha: fade in with uProgress, fade edges
    float edgeFade = 1.0 - smoothstep(4.0, 8.0, length(pos));
    vAlpha = uProgress * edgeFade * (0.4 + 0.6 * hash(aPhase));
  }
`;

const fragmentShader = `
  varying float vAlpha;
  varying vec3  vColor;

  void main() {
    // Circular soft point
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = vAlpha * (1.0 - d * 2.0);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

interface ParticleFieldProps {
  progress: number; // 0–1 animation progress
}

export default function ParticleField({ progress }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, sizes, phases, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);
    const phases    = new Float32Array(PARTICLE_COUNT);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);

    // Color palette: deep blue → plasma → violet
    const palette = [
      new THREE.Color('#3B82F6'), // plasma
      new THREE.Color('#60A5FA'), // corona
      new THREE.Color('#7C3AED'), // violet
      new THREE.Color('#A78BFA'), // violet light
      new THREE.Color('#E8F4FD'), // star white
      new THREE.Color('#1E3A8A'), // electric blue
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = Math.cbrt(Math.random()) * 6; // cube root for uniform sphere

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i]  = 0.5 + Math.random() * 1.5;
      phases[i] = Math.random() * Math.PI * 2;

      // Pick a color from palette
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, sizes, phases, colors };
  }, []);

  const matRef = useRef<THREE.ShaderMaterial>(null);
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value     = state.clock.elapsedTime;
    matRef.current.uniforms.uProgress.value = progress;
    
    // Smooth mouse follow
    targetMouse.current.lerp(state.pointer, 0.1);
    matRef.current.uniforms.uMouse.value.copy(targetMouse.current);
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aSize"
          args={[sizes, 1]}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          args={[phases, 1]}
        />
        <bufferAttribute
          attach="attributes-aColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:     { value: 0 },
          uProgress: { value: 0 },
          uSpread:   { value: 1 },
          uMouse:    { value: new THREE.Vector2(0, 0) },
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
      />
    </points>
  );
}
