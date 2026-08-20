'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

/* ─── The Solar Obsidian Background ─── */
function SolarBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020202] overflow-hidden">
      {/* Harsh, focused spotlight */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-[var(--accent)]/[0.04] blur-[150px]"
      />

      {/* Bottom organic shape */}
      <div className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#ffffff]/[0.02] blur-[120px]" />

      {/* Heavy Film Grain for that 'Printed' look */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}

function Word({ word, i, total, progress, isMobile }: { word: string; i: number; total: number; progress: any; isMobile: boolean }) {
  const start = 0.05 + (i / total) * 0.7;
  const end = start + 0.1;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.span
      style={{ opacity: isMobile ? 1 : opacity, y: isMobile ? 0 : y }}
      className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-snug"
    >
      {word}
    </motion.span>
  );
}

export default function SolarLegacySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 40 });

  const words = "For generations of students, NISB has been a space where curiosity becomes capability and ideas become impact. Through a year-round calendar of technical initiatives, we bring together engineering, creativity, competition, and collaboration.                                This is more than an IEEE Student Branch. It is a legacy of ideas, a community of innovators, and a tradition of engineering excellence that continues to move forward.".split(" ");

  const legacyVideoUrl = 'https://drive.google.com/drive/folders/1OQU1uT4141Y4wj7bw2r3G2WvNrw6mdhk';

  return (
    <section
      ref={containerRef}
      id="legacy"
      className="relative bg-[var(--void)] text-[var(--star-white)] py-20 md:py-32 px-4 sm:px-6 md:px-16 border-b border-[var(--border-main)] selection:bg-[var(--accent)] selection:text-black"
    >
      <SolarBackground />

      {/* Top Solar Progress Line */}
      <div className="w-full h-[2px] bg-white/10 mb-12">
        <motion.div
          className="h-full bg-[var(--accent)] shadow-[0_0_20px_var(--accent)]"
          style={{ scaleX: smoothProgress, transformOrigin: 'left' }}
        />
      </div>

      <div className="w-full max-w-[88rem] mx-auto space-y-16 sm:space-y-24">
        {/* ── PART 1: EDITORIAL WRITEUP & STATS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Left Side: Editorial Heading & Large Word Text */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="inline-block px-3.5 py-1 mb-4 border border-[var(--accent)] text-[var(--accent)] text-xs font-bold uppercase tracking-[0.35em] rounded-full bg-[var(--accent)]/10">
                Region 10 Excellence
              </span>

              <h2 className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.92] sm:leading-[0.88] tracking-[-0.05em] uppercase font-display">
                The <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '2px white' }}>Unmatched</span> <br />
                <span className="text-[var(--accent)]">Legacy.</span>
              </h2>
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-2 md:gap-x-4 md:gap-y-3 pt-2">
              {words.map((word, i) => (
                <Word
                  key={i}
                  word={word}
                  i={i}
                  total={words.length}
                  progress={smoothProgress}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Brutalist Stats */}
          <div className="lg:col-span-4 flex flex-col justify-start gap-4 lg:border-l border-white/10 lg:pl-10">
            {[
              { label: 'Founded', val: '1999', sub: '25+ Years of Tradition' },
              { label: 'Recognition', val: 'TOP R10', sub: 'Best Student Chapter' },
              { label: 'Flagships', val: 'ADROIT • ANKURA', sub: 'Premier Tech Symposia' },
              { label: '2025 Honours', val: 'GRSS • CS', sub: 'Chapter Awards & Distinctions' },
              { label: 'Legacy', val: '2018 • 2021 • 2023', sub: 'Outstanding Branch Recognitions' },
              { label: 'Impact', val: '80+', sub: 'Initiatives Every Year' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="group py-4 sm:py-5 border-b border-white/10 hover:border-[var(--accent)] transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.35em] text-white/50 group-hover:text-[var(--accent)] font-mono font-bold">
                    {stat.label}
                  </p>
                  <p className="text-3xl md:text-5xl font-black text-white leading-tight font-display mt-0.5">
                    {stat.val}
                  </p>
                  <p className="text-[11px] font-mono text-[var(--text-muted)] mt-1">
                    {stat.sub}
                  </p>
                </div>
                <span className="text-xl font-mono text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── PART 2: STUNNING 25-YEAR LEGACY FILM SHOWCASE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden border border-[var(--border-main)] bg-[var(--card-bg)] shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_50px_var(--accent-glow)] group hover:border-[var(--accent)]/60 transition-all duration-700"
        >
          {/* Ambient Lighting Orbs inside Card */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent)]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Cinematic Showcase Frame */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] min-h-[320px] w-full overflow-hidden flex items-center justify-center">
            {/* Background Cinematic Graphic / Video Poster */}
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop"
              alt="NISB 25 Years Legacy Film"
              className="w-full h-full object-cover filter brightness-[0.45] contrast-125 group-hover:scale-105 transition-transform duration-1000"
            />

            {/* Dark Vignette & Mesh Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/50 to-transparent" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/80" />

            {/* Top Telemetry Overlay */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-8 right-4 sm:right-8 flex items-center justify-between pointer-events-none z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.25em] text-[var(--accent)] font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>NISB CINEMATIC ARCHIVE // 1999 — 2026</span>
              </div>
              <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-white/80">
                25 YEARS • SPECIAL FEATURE
              </span>
            </div>

            {/* Center Luminous Play Button Linking to Google Drive Video */}


            {/* Bottom Info Banner */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
              <div className="max-w-xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-display">
                  Watch The 25-Year <span className="text-[var(--accent)]">Legacy Story</span>
                </h3>
                <p className="text-xs sm:text-sm font-sans text-white/70 mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  Experience the founding memories, historic flagships, alumni achievements, and the visionary community that forged NIE IEEE Student Branch.
                </p>
              </div>

              <a
                href={legacyVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[var(--star-white)] hover:bg-[var(--accent)] text-[var(--void)] hover:text-black text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 shrink-0"
              >
                <span>Open Archive Drive</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}