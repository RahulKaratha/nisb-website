'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface DellLaptopSceneProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  '[ DELL ALIENWARE OS — POWER SURGE DETECTED ]',
  '> CHARGER CONNECTED: 130W USB-C POWER SUPPLY',
  '> BIOS v2.16.0 — INITIALIZING HARDWARE MESH...',
  '> MOUNTING NISB REGION 10 ARCHIVES...',
  '> CONNECTING NATIONAL INSTITUTE OF ENGINEERING...',
  '> LOADED: MANAS & JIJNASA PUBLICATIONS [1999–2026]',
  '> STATUS: BEST STUDENT CHAPTER ACTIVE — ACCESS GRANTED',
];

export default function DellLaptopScene({ onComplete }: DellLaptopSceneProps) {
  const lidGroupRef = useRef<THREE.Group>(null);
  const chargerRef = useRef<THREE.Group>(null);

  // Animation States
  const [chargerPlugged, setChargerPlugged] = useState(false);
  const [lidOpenProgress, setLidOpenProgress] = useState(0); // 0 (closed +Z) to 1 (open +Y)
  const [powerOn, setPowerOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [zoomingIn, setZoomingIn] = useState(false);

  useEffect(() => {
    // 1. Plug in charger cable after 300ms
    const timer1 = setTimeout(() => {
      setChargerPlugged(true);
    }, 300);

    // 2. Open Lid from +Z to +Y after charger connects (1100ms)
    const timer2 = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 0.03;
        if (current >= 1) {
          current = 1;
          clearInterval(interval);
          setPowerOn(true); // Switch laptop ON from OFF
        }
        setLidOpenProgress(current);
      }, 25);
    }, 1100);

    // 3. Increment Counter (000 to 100 - NO % SYMBOL!)
    const timer3 = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer3);
          setTimeout(() => {
            setZoomingIn(true);
            setTimeout(onComplete, 800);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    // 4. Cycle Terminal Logs
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % BOOT_LOGS.length);
    }, 700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(timer3);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  // R3F Animation Frame Loop
  useFrame((state) => {
    // Animate Charger Cable Plugging In (-4.5 -> -2.2)
    if (chargerRef.current) {
      const targetX = chargerPlugged ? -2.22 : -4.2;
      chargerRef.current.position.x = THREE.MathUtils.lerp(chargerRef.current.position.x, targetX, 0.12);
    }

    // Animate Lid Opening around Hinge X-axis (+Z lying flat -> +Y standing open)
    if (lidGroupRef.current) {
      const targetRotX = (1 - lidOpenProgress) * (Math.PI / 2.02);
      lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(lidGroupRef.current.rotation.x, targetRotX, 0.12);
    }

    // Zoom Camera into Display Screen on Completion
    if (zoomingIn) {
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 0.9, 0.08);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0.45, 0.08);
    }
  });

  return (
    <>
      {/* ── BRIGHT HYPER-REALISTIC LIGHTING SETUP ── */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 8, 5]} intensity={2.5} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={1.0} color="#38bdf8" />
      <pointLight position={[0, 4, 3]} intensity={2.0} color="#ffffff" />
      {powerOn && <pointLight position={[0, 1.5, 1]} intensity={2.5} color="#06b6d4" />}

      {/* Contact Shadows under Laptop Base */}
      <ContactShadows position={[0, -0.6, 0]} opacity={0.7} scale={8} blur={2} far={4} />

      {/* ── 3D CHARGER CABLE ASSEMBLY ── */}
      <group ref={chargerRef} position={[-4.2, -0.45, 0.4]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 0.8, 16]} />
          <meshStandardMaterial color={chargerPlugged ? '#0284c7' : '#475569'} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Charger LED Ring */}
        <mesh position={[0.4, 0, 0]}>
          <boxGeometry args={[0.15, 0.16, 0.22]} />
          <meshStandardMaterial
            color={chargerPlugged ? '#06b6d4' : '#64748b'}
            emissive={chargerPlugged ? '#06b6d4' : '#000000'}
            emissiveIntensity={chargerPlugged ? 2.5 : 0}
          />
        </mesh>
      </group>

      {/* ── 3D DELL LAPTOP MAIN ASSEMBLY ── */}
      <group position={[0, -0.5, 0]}>
        
        {/* ── 1. LAPTOP BASE CHASSIS ── */}
        <group position={[0, 0, 0]}>
          {/* Main Anodized Platinum Body */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[4.4, 0.16, 3.0]} />
            <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Precision Glass Trackpad */}
          <mesh position={[0, 0.085, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.4, 0.9]} />
            <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.2} />
          </mesh>

          {/* Realistic Backlit Keyboard Keys Deck */}
          <group position={[0, 0.09, -0.3]}>
            {/* Keybed Recessed Plate */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[3.8, 1.3]} />
              <meshStandardMaterial color="#0f172a" metalness={0.3} roughness={0.5} />
            </mesh>

            {/* Individual Backlit Keycaps Simulation */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.01]}>
              <planeGeometry args={[3.7, 1.2]} />
              <meshStandardMaterial
                color="#1e293b"
                emissive="#38bdf8"
                emissiveIntensity={powerOn ? 0.6 : 0.05}
              />
            </mesh>

            {/* Power Button with LED Ring */}
            <mesh position={[1.7, 0.02, -0.5]}>
              <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
              <meshStandardMaterial
                color={powerOn ? '#10b981' : '#475569'}
                emissive={powerOn ? '#10b981' : '#000000'}
                emissiveIntensity={powerOn ? 3 : 0}
              />
            </mesh>
          </group>

          {/* Side Ports (USB-C Left Port) */}
          <mesh position={[-2.21, 0, 0.4]}>
            <boxGeometry args={[0.02, 0.08, 0.3]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>

        {/* ── 2. LAPTOP LID ASSEMBLY (PIVOTS AT REAR HINGE Z = -1.4) ── */}
        <group ref={lidGroupRef} position={[0, 0.08, -1.4]}>
          <group position={[0, 1.25, 0]}>
            {/* Outer Metallic Back Cover */}
            <mesh position={[0, 0, -0.05]}>
              <boxGeometry args={[4.4, 2.5, 0.08]} />
              <meshStandardMaterial color="#334155" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Dell Chrome Ring Logo on Back Cover */}
            <mesh position={[0, 0, -0.09]}>
              <ringGeometry args={[0.22, 0.3, 32]} />
              <meshStandardMaterial color="#f8fafc" metalness={1.0} roughness={0.05} />
            </mesh>

            {/* Inner Screen Bezel Frame */}
            <mesh position={[0, 0, 0.02]}>
              <boxGeometry args={[4.36, 2.46, 0.04]} />
              <meshStandardMaterial color="#090a0f" metalness={0.4} roughness={0.3} />
            </mesh>

            {/* ── OLED DISPLAY SCREEN (HTML INTERFACE MOUNTED IN 3D SPACE) ── */}
            <Html
              transform
              distanceFactor={2.35}
              position={[0, 0, 0.05]}
              className="w-[820px] h-[480px] select-none pointer-events-none"
            >
              <div
                className={`w-full h-full rounded-lg bg-[#050608] border border-white/10 p-6 flex flex-col justify-between font-mono text-white transition-all duration-700 ${
                  powerOn ? 'opacity-100' : 'opacity-0 bg-black'
                }`}
              >
                {/* Top Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-white/60 border-b border-white/10 pb-3 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 font-bold tracking-widest">DELL XPS • ALIENWARE ENGINE</span>
                    <span>|</span>
                    <span className="text-white/80">NISB WORKSTATION</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold">
                    <span className="text-white/60">WiFi: NISB_5G</span>
                    <span className="text-emerald-400">CHARGING ⚡</span>
                    <span className="text-white">19:99 IST</span>
                  </div>
                </div>

                {/* Main Display Typography (Different Fonts) */}
                <div className="my-auto space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono tracking-[0.3em] text-[var(--accent)] font-bold uppercase">
                    ⚡ REGION 10 EXCELLENCE • EST. 1999
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[var(--accent)] uppercase font-display leading-none">
                    NISB
                  </h1>

                  <p className="text-sm md:text-base font-serif italic text-white/90 max-w-xl leading-relaxed">
                    &quot;The Student Branch of National Institute of Engineering, Mysuru. Fostering 25+ years of raw engineering innovation and leadership.&quot;
                  </p>

                  <div className="p-3 rounded-xl bg-black/80 border border-white/10 text-[11px] font-mono text-emerald-400 max-w-md shadow-2xl">
                    <p className="text-white/40 text-[9px] uppercase tracking-widest">[ TERMINAL FEED ]</p>
                    <p className="truncate font-semibold">{BOOT_LOGS[logIndex]}</p>
                  </div>
                </div>

                {/* Bottom Counter HUD (NO PERCENTAGE SYMBOL AS REQUESTED!) */}
                <div className="flex items-end justify-between border-t border-white/10 pt-3 font-mono">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold block">
                      SYSTEM INITIALIZATION
                    </span>
                    <span className="text-xs text-white/70 tracking-wider">
                      {progress < 30 && '> CHARGER CONNECTED — POWER ON...'}
                      {progress >= 30 && progress < 70 && '> MOUNTING IEEE REGION 10 ARCHIVES...'}
                      {progress >= 70 && progress < 90 && '> RENDERING NISB WORKSTATION...'}
                      {progress >= 90 && '> BOOT COMPLETE — ACCESS GRANTED'}
                    </span>
                  </div>

                  {/* NO % SYMBOL HERE AS REQUESTED! */}
                  <div className="text-right">
                    <span className="text-4xl md:text-6xl font-black text-white leading-none font-mono tracking-tighter">
                      {String(progress).padStart(3, '0')}
                    </span>
                    <span className="block text-[9px] font-mono text-[var(--accent)] uppercase tracking-widest mt-1">
                      SYSTEM READY
                    </span>
                  </div>
                </div>
              </div>
            </Html>
          </group>
        </group>

      </group>
    </>
  );
}
