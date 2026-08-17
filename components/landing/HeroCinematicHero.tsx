'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 60, damping: 20 } },
};

const SOCIETIES_STRIP = [
  { num: '01', code: 'CS', name: 'Computer Society', logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/cs.png', bg: '#06b6d4' },
  { num: '02', code: 'WIE', name: 'Women in Engineering', logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/wie.png', bg: '#ec4899' },
  { num: '03', code: 'CASS', name: 'Circuits & Systems', logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/cas.png', bg: '#f59e0b' },
  { num: '04', code: 'RAS', name: 'Robotics & Automation', logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/ras.png', bg: '#10b981' },
  { num: '05', code: 'GRSS', name: 'Geoscience & Remote Sensing', logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/grss.png', bg: '#a855f7' },
  { num: '06', code: 'CEDA', name: 'Design Automation', logo: 'https://ieee-ceda.org/files/ieeeceda/IEEE%20CEDA%20Logo.png', bg: '#3b82f6' },
];

export default function HeroCinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);

  const finalOpacity = isMobile ? 1 : heroOpacity;
  const finalScale = isMobile ? 1 : heroScale;

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      className="hero-section relative pt-20 pb-12 px-3 sm:px-4 md:px-8 lg:px-12 bg-[var(--void)] text-[var(--star-white)] overflow-hidden w-full"
      initial="hidden"
      animate={isReady ? 'show' : 'hidden'}
      style={{ opacity: finalOpacity }}
    >
      {/* Ambient Tech Circuit Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover filter saturate(150%) contrast(120%) scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--void)] via-transparent to-[var(--void)]" />
      </div>

      <motion.div
        className="w-full max-w-[88rem] mx-auto flex flex-col gap-0 border border-[var(--border-main)] rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--card-bg)] shadow-2xl relative z-10"
        style={{ scale: finalScale }}
      >
        {/* ── TOP QUADRANT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[var(--border-main)]">
          {/* Block 1 (Top-Left): Est 1999 & Mission */}
          <div className="lg:col-span-5 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-[var(--border-main)] flex flex-col justify-between gap-6 bg-gradient-to-br from-white/[0.02] to-transparent">
            <div className="flex items-center justify-between text-xs font-mono tracking-widest uppercase text-[var(--text-muted)]">
              <span>EST — 1999</span>
              <span className="px-2.5 py-0.5 rounded-full border border-[var(--accent)] text-[10px] font-bold text-[var(--accent)] bg-[var(--accent)]/10">
                NIE MYSURU
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                Student Branch • Bangalore Section
              </p>
              <p className="text-sm md:text-base leading-relaxed text-[var(--star-white)]/80 max-w-md font-sans">
                Our mission is preserving long-term engineering traditions while pioneering state-of-the-art technological innovation for over 25 years.
              </p>
            </div>
          </div>

          {/* Block 2 (Top-Right): THE FUSION OF INNOVATION & LEADERSHIP */}
          <div className="lg:col-span-7 p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-bl from-[var(--accent)]/[0.08] via-transparent to-white/[0.02]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[var(--accent)] font-bold">

              </div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight sm:tracking-tighter uppercase leading-[1.08] sm:leading-[0.95] font-display text-[var(--star-white)]">
                Advancing Technology <br className="hidden sm:inline" />
                <span className="text-[var(--star-white)]/80">FOR </span>
                <span className="text-[var(--accent)] drop-shadow-[0_0_20px_var(--accent-glow)]">HUMANITY</span>
              </h2>
            </div>

          </div>
        </div>

        {/* ── MIDDLE QUADRANT GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[var(--border-main)]">
          {/* Block 3 (Middle-Left): Massive Brand Title with Rich Cream Background */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-amber-900/10 flex flex-col justify-between gap-6 md:gap-8 bg-gradient-to-br from-[#FFFDF5] via-[#FAF5EA] to-[#F2EADA] text-[#0d0e12] relative overflow-hidden shadow-2xl">
            {/* Subtle Warm Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-[#0d0e12] text-[#FFFDF5] text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-md">
                  EST. 1999 • REGION 10
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-900/70 uppercase">
                  NATIONAL INSTITUTE OF ENGINEERING
                </span>
              </div>

              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black tracking-tight leading-none uppercase text-[#0d0e12] flex items-baseline gap-1 sm:gap-2">
                <span className="inline-block tracking-tight font-display">NISB</span>
                <span className="text-lg sm:text-2xl md:text-4xl text-amber-700 font-mono font-extrabold select-none">©</span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg font-serif italic text-amber-950/80 font-medium max-w-xl leading-relaxed">
                NIE IEEE Student Branch — Fostering 25+ years of raw engineering innovation, technical research, and student leadership at NIE Mysuru.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-amber-900/15 relative z-10">
              <a
                href="#legacy"
                className="text-xs font-mono uppercase tracking-widest text-[#0d0e12] hover:text-amber-700 transition-colors flex items-center gap-3 font-extrabold"
              >
                <span>( explore legacy story )</span>
                <span className="text-lg">➔</span>
              </a>

              <a
                href="https://tinyurl.com/MEMBERSHIPDRIVE26"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0d0e12] text-[#FFFDF5] text-xs font-mono font-extrabold uppercase tracking-wider hover:scale-105 hover:bg-amber-600 hover:text-white transition-all shadow-xl text-center"
              >
                Join NISB ↗
              </a>
            </div>
          </div>

          {/* Block 4 (Middle-Right): CREATIVE CIRCULAR ORBIT SHOWCASE FOR 06 SOCIETIES */}
          <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between gap-4 bg-gradient-to-br from-white/[0.03] to-black/60 relative overflow-hidden min-h-[320px] sm:min-h-[360px] md:min-h-[400px]">
            <div className="flex items-center justify-between z-10">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">
                NISB CHAPTERS,COUNCILS AND AFFINITY GROUP
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 text-xs font-mono text-[var(--accent)] font-bold">
                (06 CHAPTERS)
              </span>
            </div>

            {/* Circular Orbit Ring Layout */}
            <div className="relative w-full aspect-square max-w-[240px] sm:max-w-[280px] md:max-w-[320px] mx-auto my-auto flex items-center justify-center">
              {/* Outer Glowing Orbital Ring Line */}
              <div className="absolute inset-2 sm:inset-4 rounded-full border border-dashed border-white/20 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-white/10" />

              {/* Center Hub Node (Full Covering Circle Image) */}
              <a
                href="#chapters"
                className="relative z-30 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#09090d] border-2 border-[var(--accent)] overflow-hidden flex items-center justify-center shadow-[0_0_35px_var(--accent-glow)] hover:scale-110 transition-transform group p-0"
                title="NISB Student Branch"
              >
                <img
                  src="/icon.png"
                  alt="NISB Logo"
                  className="w-full h-full object-cover rounded-full scale-[1.25] group-hover:scale-[1.35] transition-transform duration-300"
                />
              </a>

              {/* 360° CSS Rotating Orbit Wrapper for 6 Radial Society Nodes */}
              <div className="absolute inset-0 z-20 pointer-events-none animate-[spin_30s_linear_infinite] hover:[animation-play-state:paused]">
                {SOCIETIES_STRIP.map((soc, i) => {
                  const angle = (i * 60 - 90) * (Math.PI / 180);
                  const radiusPercent = 38;
                  const x = 50 + radiusPercent * Math.cos(angle);
                  const y = 50 + radiusPercent * Math.sin(angle);

                  return (
                    <div
                      key={soc.code}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                      style={{
                        left: `${x.toFixed(1)}%`,
                        top: `${y.toFixed(1)}%`,
                      }}
                    >
                      <a
                        href="#chapters"
                        title={soc.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[#FFFDF5] hover:bg-white border-2 border-amber-900/20 p-1.5 sm:p-2 flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-[0_0_20px_rgba(255,253,245,0.8)] shadow-2xl group/node relative block"
                      >
                        {/* Inner Container Counter-Rotates so Logos Remain Upright While Orbiting */}
                        <div className="w-full h-full animate-[spin_30s_linear_infinite] [animation-direction:reverse] flex items-center justify-center">
                          <img
                            src={soc.logo}
                            alt={soc.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain filter drop-shadow-sm group-hover/node:scale-110 transition-transform"
                          />
                        </div>

                        {/* Floating Tooltip on Hover */}

                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[10px] sm:text-[11px] font-mono text-[var(--text-muted)] text-center relative z-10">
              CS • WIE • CASS • RAS • GRSS • CEDA — Fostering domain expertise across engineering disciplines.
            </p>
          </div>
        </div>

        {/* ── BOTTOM SHOWCASE HERO CARD ── */}
        <div className="relative aspect-[4/3] sm:aspect-[16/7] md:aspect-[21/8] overflow-hidden group">
          <img
            src="/fonts/image.png"
            alt="NISB Engineering Showcase"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--void)] via-transparent to-transparent" />

          {/* Overlay Banner Labels */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 z-10">
            <div>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[var(--accent)] font-bold">
                FLAGSHIP Events &amp; FESTS
              </span>
              <h3 className="text-xl sm:text-2xl md:text-4xl font-black uppercase text-white font-display tracking-tight mt-0.5">
                ANKURA • ADROIT • ELECTRONIKA
              </h3>
            </div>

            {/* Quick Stats Pills */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-white shadow-xl">
                R10 Best Student Chapter
              </div>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-white shadow-xl">
                25+ Years Legacy
              </div>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-white shadow-xl">
                50+ Annual Events
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
