'use client';

import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 50, damping: 20 } },
};

const CHAPTERS = [
  {
    id: 'wie',
    name: 'Women in Engineering (WIE)',
    logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/wie.png',
    desc: 'Promoting women engineers and scientists since April 2015. Weekly meetups focusing on learning technical concepts, research skills, and collaborative projects.',
    link: 'https://wie.ieee.org',
  },
  {
    id: 'cs',
    name: 'Computer Society (CS)',
    logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/cs.png',
    desc: 'Advancing computing technology through research and collaboration. Over 50 active members equipping themselves with future tech skills.',
    link: 'https://www.computer.org',
  },
  {
    id: 'ceda',
    name: 'Council on Electronic Design Automation (CEDA)',
    logo: 'https://ieee-ceda.org/files/ieeeceda/IEEE%20CEDA%20Logo.png',
    desc: 'The IEEE Council on Electronic Design Automation (CEDA) is the leading organization dedicated to the advancement of electronic design automation (EDA) theory, methodologies, tools, and practices for circuits and systems.',
    link: 'https://ieee-ceda.org',
  },
  {
    id: 'cass',
    name: 'Circuits & Systems (CASS)',
    logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/cas.png',
    desc: 'Advancement of the theory, analysis, design, tools, and implementation of circuits and systems.',
    link: 'https://ieee-cas.org',
  },
  {
    id: 'ras',
    name: 'Robotics & Automation Society (RAS)',
    logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/ras.png',
    desc: 'Scientific and educational advancement of the theory and practice of robotics and automation engineering.',
    link: 'https://www.ieee-ras.org',
  },
  {
    id: 'grss',
    name: 'Geoscience & Remote Sensing (GRSS)',
    logo: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/images/grss.png',
    desc: 'Fostering engagement through science, engineering, and applications related to geoscience and remote sensing.',
    link: 'https://www.grss-ieee.org',
  },
];

export default function ChaptersSection() {
  return (
    <motion.section
      id="chapters"
      className="premium-section py-14 md:py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
    >
      {/* ── RESPONSIVE SECTION HEADER ── */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-10 sm:mb-16 px-2 sm:px-4">
        {/* Eyebrow Tag Pill */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_var(--accent-glow)]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span>SOCIETIES &amp; AFFINITY GROUPS</span>
        </motion.div>

        {/* Responsive Main Heading with balanced hierarchy */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-[var(--star-white)] leading-[1.12] sm:leading-[1.04]"
        >
          NISB CHAPTERS, COUNCILS <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--star-white)] to-[var(--accent)] drop-shadow-[0_0_30px_var(--accent-glow)]">
            &amp; AFFINITY GROUPS
          </span>
        </motion.h2>

        {/* Subtitle Description */}
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm md:text-base font-sans text-[var(--text-muted)] max-w-2xl mt-3.5 sm:mt-4 leading-relaxed"
        >
          Pioneering specialized technical domains across computer science, electronic design automation, robotics, circuit systems, remote sensing, and women in engineering.
        </motion.p>
      </div>

      {/* ── CHAPTERS GRID ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {CHAPTERS.map((chapter) => (
          <motion.a
            key={chapter.id}
            href={chapter.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-3xl bg-[#09090d] border border-white/[0.08] hover:border-[var(--accent)]/50 p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_25px_var(--accent-glow)] flex flex-col justify-between"
            variants={fadeUp}
          >
            <div>
              {/* High-Resolution Logo Container */}
              <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-2xl bg-[#FFFDF5] border border-amber-900/20 p-4 flex items-center justify-center mb-6 group-hover:scale-105 transition-all duration-300 shadow-xl">
                <img
                  src={chapter.logo}
                  alt={`${chapter.name} Logo`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain filter drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight group-hover:text-[var(--accent)] transition-colors leading-snug text-center font-display uppercase">
                {chapter.name}
              </h3>
              <p className="text-xs text-white/70 mt-3 leading-relaxed text-center font-sans">
                {chapter.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                Official IEEE Chapter
              </span>
              <svg className="w-5 h-5 text-white/50 group-hover:text-[var(--accent)] transform group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}
