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

const ACTIVITIES = [
  {
    title: 'Industrial Visits',
    image: '/WhatsApp Image 2026-08-08 at 22.33.54.jpeg',
    tag: 'INDUSTRY EXPOSURE',
    destinations: 'ISRO Space Centre • IISc Bangalore • NIGST • Cisco • Infosys',
    body: 'We conduct regular technical tours exposing students to real-world engineering workflows, satellite manufacturing, and corporate R&D facilities.',
    iconSvg: (
      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m0 0v-4a2 2 0 00-2-2h-2a2 2 0 00-2 2v4" />
      </svg>
    ),
  },
  {
    title: 'Focus Groups',
    image: '/WhatsApp Image 2026-08-08 at 22.33.56.jpeg',
    tag: 'HANDS-ON LABS',
    destinations: 'AVR Atmega • Deep Learning • Web Dev • Python',
    body: 'Peer-to-peer technical circles where students build real-world firmware applications, neural networks, web platforms, and embedded prototypes.',
    iconSvg: (
      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    title: 'Social Initiatives',
    image: '/image copy.png',
    tag: 'COMMUNITY OUTREACH',
    destinations: 'Divya Deepa • Ashram Drives • Tech Literacy',
    body: 'Annual outreach visits to ashrams and Divya Deepa, introducing local communities to digital literacy and the practical benefits of modern technology.',
    iconSvg: (
      <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-7.682-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function ActivitiesBentoGrid() {
  return (
    <motion.section
      id="activities"
      className="premium-section py-20 bg-[var(--void)] text-[var(--star-white)] relative overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainer}
    >
      <div className="max-w-[88rem] mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-[var(--border-main)]">
          <div>
            <motion.span className="text-xs font-mono uppercase tracking-[0.4em] text-[var(--accent)] font-bold block mb-1" variants={fadeUp}>
              BEYOND THE CLASSROOM
            </motion.span>
            <motion.h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase font-display tracking-tight text-[var(--star-white)] leading-tight" variants={fadeUp}>
              ALL-ROUND <span className="text-[var(--accent)]">DEVELOPMENT</span>
            </motion.h2>
          </div>
          <motion.p className="text-xs font-mono text-[var(--text-muted)] max-w-sm" variants={fadeUp}>
            Empowering student engineers through industrial tours, focus research labs, and social impact drives.
          </motion.p>
        </div>

        {/* Balanced 3-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ACTIVITIES.map((a, i) => (
            <motion.div
              key={i}
              className="group relative rounded-3xl bg-[var(--card-bg)] border border-[var(--border-main)] hover:border-[var(--accent)] overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col justify-between min-h-[420px] p-8"
              variants={fadeUp}
            >
              {/* Background Image Container with Gradient Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-[var(--card-bg)]/80 to-transparent" />
              </div>

              {/* Top Tag & Vector SVG Icon Row */}


              {/* Bottom Content Container */}
              <div className="space-y-3 relative z-10 pt-20">
                <h3 className="text-3xl font-extrabold text-[var(--star-white)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {a.title}
                </h3>
                <p className="text-xs font-sans text-[var(--text-muted)] leading-relaxed">
                  {a.body}
                </p>
                <div className="flex items-center justify-between relative z-10">

                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[var(--accent)] font-bold">
                  <span className="truncate max-w-[80%]">{a.destinations}</span>
                  <span className="text-base group-hover:translate-x-1 transition-transform"></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
