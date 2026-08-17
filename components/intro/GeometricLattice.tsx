'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const NODES = 80;
const EDGES_PER_NODE = 3;

function buildLattice() {
  // Distribute nodes on sphere surface
  const nodePositions: THREE.Vector3[] = [];
  for (let i = 0; i < NODES; i++) {
    const phi   = Math.acos(1 - (2 * (i + 0.5)) / NODES);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r = 2.2;
    nodePositions.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ));
  }

  // Connect nearby nodes
  const edgePairs: [number, number][] = [];
  for (let i = 0; i < NODES; i++) {
    const dists = nodePositions
      .map((p, j) => ({ dist: p.distanceTo(nodePositions[i]), j }))
      .filter(d => d.j !== i)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, EDGES_PER_NODE);

    for (const { j } of dists) {
      if (!edgePairs.find(([a, b]) => (a === i && b === j) || (a === j && b === i))) {
        edgePairs.push([i, j]);
      }
    }
  }

  // Build line segments buffer
  const linePositions: number[] = [];
  for (const [a, b] of edgePairs) {
    const pa = nodePositions[a];
    const pb = nodePositions[b];
    linePositions.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
  }

  return { nodePositions, linePositions: new Float32Array(linePositions), edgeCount: edgePairs.length };
}

const latticeVert = `
  uniform float uTime;
  uniform float uProgress;
  varying float vEdge;

  void main() {
    // Slow rotation via matrix would be done outside; here just oscillate
    vec3 pos = position;
    vEdge = uProgress;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const latticeFrag = `
  uniform float uProgress;
  uniform float uPulse;
  varying float vEdge;

  void main() {
    float alpha = vEdge * 0.55 * (0.7 + 0.3 * uPulse);
    vec3 col = mix(vec3(0.12, 0.46, 0.96), vec3(0.49, 0.22, 0.93), uPulse);
    gl_FragColor = vec4(col, alpha);
  }
`;

const nodeVert = `
  uniform float uProgress;
  uniform float uTime;
  varying float vP;

  void main() {
    vP = uProgress;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    float dist = length(mvPos.xyz);
    gl_PointSize = uProgress * 4.0 * (80.0 / dist);
    gl_PointSize = clamp(gl_PointSize, 1.0, 8.0);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const nodeFrag = `
  varying float vP;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if(d > 0.5) discard;
    float a = vP * (1.0 - d * 2.0);
    gl_FragColor = vec4(0.38, 0.65, 0.98, a);
  }
`;

interface GeometricLatticeProps {
  progress: number;
  pulse: number; // 0–1 pulsing value from parent
  posY?: number; // Optional Y offset for falling animation
}

export default function GeometricLattice({ progress, pulse, posY = 0 }: GeometricLatticeProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const lineMat   = useRef<THREE.ShaderMaterial>(null);
  const nodeMat   = useRef<THREE.ShaderMaterial>(null);

  const { nodePositions, linePositions, edgeCount } = useMemo(() => buildLattice(), []);

  const nodeArr = useMemo(() => {
    const arr = new Float32Array(nodePositions.length * 3);
    nodePositions.forEach((p, i) => {
      arr[i * 3]     = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [nodePositions]);

  const lineUniforms = useMemo(() => ({ uProgress: { value: 0 }, uPulse: { value: 0 } }), []);
  const nodeUniforms = useMemo(() => ({ uProgress: { value: 0 }, uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.2;
      groupRef.current.position.y = posY;
    }
    lineUniforms.uProgress.value = progress;
    lineUniforms.uPulse.value    = pulse;
    nodeUniforms.uProgress.value = progress;
    nodeUniforms.uTime.value     = state.clock.elapsedTime;
  });

  return (
    <group ref={groupRef}>
      {/* Edges */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={lineMat}
          vertexShader={latticeVert}
          fragmentShader={latticeFrag}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodeArr, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={nodeMat}
          vertexShader={nodeVert}
          fragmentShader={nodeFrag}
          uniforms={nodeUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
