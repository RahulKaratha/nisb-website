'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const LuxuryStardustCanvas = dynamic(() => import('./LuxuryStardustCanvas'), { ssr: false });
const FluidDotMorphCanvas = dynamic(() => import('./FluidDotMorphCanvas'), { ssr: false });

interface MobileIntroProps {
  onComplete: () => void;
}

export default function MobileIntro({ onComplete }: MobileIntroProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const completedRef = useRef(false);

  const skip = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setIsRevealed(true), 5200);
    const t2 = setTimeout(() => setIsExiting(true), 8000);
    const t3 = setTimeout(skip, 8800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [skip]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col justify-between items-center overflow-hidden select-none font-sans text-white"
      style={{
        background: 'radial-gradient(120% 120% at 50% 30%, #081020 0%, #03060e 50%, #010206 100%)',
        backgroundColor: '#030712',
      }}
    >
      {/* Lightweight Ambient Cyan Glow on Mobile */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%)',
        }}
      />

      {/* Auto-optimized lightweight Electric Blue Stardust (6 puffs, 14 embers on mobile) */}
      <LuxuryStardustCanvas />

      {/* 4-Dot to NISB Letterform Morph Engine */}
      <FluidDotMorphCanvas
        word="NISB"
        onMorphComplete={() => setIsRevealed(true)}
        onSolidComplete={() => setIsRevealed(true)}
      />

      {/* Minimalist Top Skip Button */}
      <header className="relative z-20 w-full px-5 pt-6 flex justify-end items-center pointer-events-none">
        <div className="pointer-events-auto">
          <button
            onClick={skip}
            className="group relative px-4 py-2 rounded-full bg-white/[0.08] active:bg-white/[0.2] backdrop-blur-xl border border-sky-300/35 text-[11px] font-mono font-bold text-sky-100 uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(56,189,248,0.25)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-300 shadow-[0_0_6px_#38bdf8]" />
            </span>
            <span>SKIP</span>
            <span className="text-sky-300 font-bold">↗</span>
          </button>
        </div>
      </header>

      {/* Clean, Lightweight Mobile Bottom Badge */}
      <footer className="relative z-20 w-full px-4 pb-7 flex justify-center pointer-events-none">
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xs pointer-events-auto px-4 py-2.5 rounded-full bg-[#060c18]/90 backdrop-blur-xl border border-sky-300/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-1.5 text-sky-200 font-bold text-[10px] font-mono tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]" />
                <span>NISB • IEEE</span>
              </div>
              <span className="text-[9px] font-mono text-sky-300/80 font-semibold tracking-wider">
                EST. 1999 • REGION 10
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </motion.div>
  );
}
