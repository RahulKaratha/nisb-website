'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Optimised nebula — single-pass noise, no FBM loop
const vert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = `
  uniform float uTime;
  uniform float uProgress;
  varying vec2  vUv;

  float hash21(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash21(i), hash21(i + vec2(1,0)), u.x),
      mix(hash21(i + vec2(0,1)), hash21(i + vec2(1,1)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv - 0.5;
    // Single noise pass — cheap & smooth
    float n = noise(uv * 1.8 + vec2(uTime * 0.012, uTime * 0.008));
    float radial = 1.0 - smoothstep(0.0, 0.7, length(uv));

    vec3 deepVoid   = vec3(0.000, 0.000, 0.018);
    vec3 nebulaBlue = vec3(0.015, 0.055, 0.140);
    vec3 plasmaBlue = vec3(0.050, 0.130, 0.400);

    vec3 col = mix(deepVoid, nebulaBlue, n * radial);
    col = mix(col, plasmaBlue, n * n * radial * 0.6);

    gl_FragColor = vec4(col * uProgress, 1.0);
  }
`;


export default function NebulaBackground({ progress }: { progress: number }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // No guard — always update uniforms so progress is never stuck at 0
  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value     = state.clock.elapsedTime;
    matRef.current.uniforms.uProgress.value = progress;
  });

  return (
    <mesh position={[0, 0, -8]} scale={[50, 30, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={{
          uTime:     { value: 0 },
          uProgress: { value: 0 },
        }}
        depthWrite={false}
      />
    </mesh>
  );
}
