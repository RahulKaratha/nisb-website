'use client';

import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 50, damping: 20 } },
};

const PUBLICATIONS = [
  {
    href: 'https://drive.google.com/file/d/1IVuRX4ufSidQTY7JNqsXEw8h_bmfeoib/view',
    title: 'MANAS',
    subtitle: 'NISB Half Yearly Newsletter',
    edition: '2025–26 Edition',
    cover: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/Manas%2026.png',
    desc: 'Comprehensive highlights of technical workshops, student accomplishments, research articles, and chapter achievements.',
    cta: 'Read Edition →',
    featured: false,
  },
  {
    href: 'https://tinyurl.com/JIJNASA-2025',
    title: 'JIJNASA',
    subtitle: 'NISB Yearly Magazine',
    edition: 'Vol. 11 Flagship',
    cover: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/JijnasaVol11frontcover.png',
    desc: 'The annual flagship publication celebrating 25+ years of NISB engineering excellence, creative writing, and innovation.',
    cta: 'Read Flipbook →',
    featured: true,
  },
];

export default function PublicationsSection() {
  return (
    <motion.section
      id="publications"
      className="premium-section py-12 md:py-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <motion.p className="section-tag-center" variants={fadeUp}>Knowledge Archives</motion.p>
      <motion.h2
        className="text-xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight text-center text-white mb-10 leading-tight font-display"
        variants={fadeUp}
      >
        Publications &amp; Magazines
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {PUBLICATIONS.map((pub) => (
          <motion.a
            key={pub.title}
            href={pub.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl bg-[#09090d] border border-white/[0.08] hover:border-white/30 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row"
            variants={fadeUp}
          >
            {/* Magazine Cover Container */}
            <div className="relative w-full sm:w-1/2 aspect-[3/4] sm:aspect-auto overflow-hidden bg-black/60 p-6 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-white/5">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none" />

              <img
                src={pub.cover}
                alt={`${pub.title} Magazine Cover`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain rounded-xl shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                onError={(e) => {
                  // Fallback styled cover if image load fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Edition Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/80">
                {pub.edition}
              </div>
            </div>

            {/* Publication Info */}
            <div className="w-full sm:w-1/2 p-6 md:p-8 flex flex-col justify-between relative z-10">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                  {pub.subtitle}
                </span>
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-1 group-hover:text-white transition-colors">
                  {pub.title}
                </h3>
                <p className="text-xs text-white/60 mt-4 leading-relaxed">
                  {pub.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white group-hover:text-[var(--accent)] flex items-center gap-2 transition-colors">
                  {pub.cta}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
