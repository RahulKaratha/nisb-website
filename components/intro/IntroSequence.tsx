'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const LuxuryStardustCanvas = dynamic(() => import('./LuxuryStardustCanvas'), { ssr: false });
const FluidDotMorphCanvas = dynamic(() => import('./FluidDotMorphCanvas'), { ssr: false });

interface IntroSequenceProps {
  onComplete: () => void;
}

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
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
    const t2 = setTimeout(() => setIsExiting(true), 8200);
    const t3 = setTimeout(skip, 9000);

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
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col justify-between items-center overflow-hidden select-none text-white font-sans"
      style={{
        background: 'radial-gradient(120% 120% at 50% 30%, #081020 0%, #03060e 50%, #010206 100%)',
        backgroundColor: '#030712',
      }}
    >
      {/* ── VOLUMETRIC ELECTRIC BLUE & CYAN NEBULA BLOOMS ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.25) 0%, rgba(14, 165, 233, 0.10) 45%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full pointer-events-none z-[1]"
        style={{
          background: 'radial-gradient(ellipse, rgba(186, 230, 253, 0.15) 0%, rgba(56, 189, 248, 0.06) 50%, transparent 70%)',
        }}
      />

      {/* ── ELECTRIC BLUE STARDUST & NEBULA CANVAS ── */}
      <LuxuryStardustCanvas />

      {/* ── FLUID 4 DOTS (SQUARE -> LINEAR -> MORPH -> SOLID) CANVAS ── */}
      <FluidDotMorphCanvas
        word="NISB"
        onMorphComplete={() => setIsRevealed(true)}
        onSolidComplete={() => setIsRevealed(true)}
      />

      {/* ── SKIP INTRO BUTTON WITH ELECTRIC CYAN PARTICLE ── */}


      {/* ── BOTTOM HUD FROSTED GLASS CARD OVERLAY ── */}
      <footer className="relative z-20 w-full max-w-2xl mx-auto px-4 sm:px-6 pb-8 sm:pb-10 flex justify-center pointer-events-none">
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ y: 35, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 35, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="w-full pointer-events-auto p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-[#060c18]/80 backdrop-blur-2xl border border-sky-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.2),inset_0_0_20px_rgba(186,230,253,0.05)] relative overflow-hidden group hover:border-sky-300/50 transition-all duration-500"
            >
              {/* Subtle Ambient Glows inside Card */}
              <div className="absolute -top-10 right-1/4 w-32 h-32 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 left-1/4 w-32 h-32 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />

              {/* Top Row: Institution Name & Region Pill */}
              <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10 text-[10px] sm:text-xs font-mono relative z-10">
                <div className="flex items-center gap-2 text-sky-200 font-bold tracking-wider uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-300 shadow-[0_0_8px_#38bdf8]" />
                  </span>
                  <span>NIE IEEE STUDENT BRANCH</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200 font-bold text-[9.5px] sm:text-[10px] tracking-widest uppercase shadow-sm">
                  EST. 1999 • REGION 10
                </span>
              </div>

              {/* Bottom Row: Motto & Telemetry Coordinates */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 pt-2.5 relative z-10">
                <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] text-white/90 font-medium text-center sm:text-left">
                  Advancing Technology For Humanity
                </p>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </motion.div>
  );
}
