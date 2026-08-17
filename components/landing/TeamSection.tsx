'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  category: 'core' | 'chapter' | 'tech';
  society?: string;
  img: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Sagar Kumar Singh',
    role: 'Chairperson',
    category: 'core',
    society: 'Executive Board',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/SagarSingh.jpg',
  },
  {
    name: 'Abhay Hegde',
    role: 'Vice Chairperson & Secretary of Marketing and Publicity',
    category: 'core',
    society: 'Executive Board',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Abhay.jpg',
  },
  {
    name: 'Yogesh S',
    role: 'Treasurer',
    category: 'core',
    society: 'Executive Board',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Yogesh.jpg',
  },
  {
    name: 'Sakleshwar Hubli',
    role: 'Secretary of Internal Affairs',
    category: 'core',
    society: 'Executive Board',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Saklesh.jpg',
  },
  {
    name: 'K Anantha Krishna Rao',
    role: 'Secretary of Events',
    category: 'core',
    society: 'Event Operations',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Anantha.jpg',
  },
  {
    name: 'Shreya P V',
    role: 'Secretary of Events',
    category: 'core',
    society: 'Event Operations',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Shreya%20P%20V.jpg',
  },
  {
    name: 'Aadya Sharma',
    role: 'Secretary of Marketing and Publicity',
    category: 'core',
    society: 'Member Public Relations',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Aadya.jpeg',
  },
  {
    name: 'Sagar N Mutalik',
    role: 'Secretary  of membership development & SAC Coordinator',
    category: 'core',
    society: 'Member Development & SAC',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/SagarNM.jpg',
  },
  {
    name: 'Pranav A Korlahalli',
    role: 'Technology Coordinator',
    category: 'tech',
    society: 'Tech Team',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Pranav.jpg',
  },
  {
    name: 'Aashish Vatwani',
    role: 'Technology Coordinator',
    category: 'tech',
    society: 'Tech Team',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Aashish.jpg',
  },
  {
    name: 'Rahul K',
    role: 'Editor-in-Chief',
    category: 'core',
    society: 'Editorial & Publications',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Rahul.jpeg',
  },
  {
    name: 'Shresth S Juptimath',
    role: 'Sponsorship Coordinator',
    category: 'core',
    society: 'Corporate Outreach',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Shresht.JPG',
  },
  {
    name: 'Priyanka Pramod Daivagna',
    role: 'CS Chairperson',
    category: 'chapter',
    society: 'Computer Society',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Priyanka.jpeg',
  },
  {
    name: 'Prerika P',
    role: 'CS Secretary',
    category: 'chapter',
    society: 'Computer Society',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/PrerikaP.jpeg',
  },
  {
    name: 'Nikitha H S',
    role: 'CASS & RAS Chairperson',
    category: 'chapter',
    society: 'CASS & RAS Societies',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Nikitha.jpeg',
  },
  {
    name: 'Suma Acharya',
    role: 'CASS Secretary',
    category: 'chapter',
    society: 'Circuits & Systems Society',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Suma.jpg',
  },
  {
    name: 'Sanjana S Shetty',
    role: 'WIE Chairperson',
    category: 'chapter',
    society: 'Women in Engineering',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/SanjanaS.jpg',
  },
  {
    name: 'Panchami Urs S',
    role: 'WIE Secretary',
    category: 'chapter',
    society: 'Women in Engineering',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Panchami.jpg',
  },
  {
    name: 'Rachit Kulkarni',
    role: 'RAS Secretary',
    category: 'chapter',
    society: 'Robotics & Automation Society',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Rachit.jpeg',
  },
  {
    name: 'Mohammed Mansooruddin',
    role: 'GRSS Chairperson',
    category: 'chapter',
    society: 'Geoscience & Remote Sensing',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Mansoor.jpg',
  },
  {
    name: 'Amol S',
    role: 'GRSS Secretary',
    category: 'chapter',
    society: 'Geoscience & Remote Sensing',
    img: 'https://raw.githubusercontent.com/nisbweb/nisbweb.github.io/master/assets/cores25-26/Amol.jpg',
  },
];

export default function TeamSection() {
  const [filter, setFilter] = useState<'all' | 'core' | 'chapter' | 'tech'>('all');

  const filteredMembers = filter === 'all'
    ? TEAM_MEMBERS
    : TEAM_MEMBERS.filter(m => m.category === filter);

  return (
    <section
      id="team"
      className="premium-section py-20 px-4 md:px-12 bg-[var(--void)] text-[var(--star-white)] relative overflow-hidden"
    >
      <div className="max-w-[88rem] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <h2 className="text-4xl md:text-6xl font-black uppercase font-display tracking-tight text-[var(--star-white)]">
            CORE  TEAM  <span className="text-[var(--accent)]">2025–26</span>
          </h2>


          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { id: 'all', label: 'All Members' },

            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setFilter(item.id as any)}
                className={`px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${filter === item.id
                  ? 'bg-[var(--star-white)] text-[var(--void)] font-extrabold shadow-xl scale-105'
                  : 'bg-white/5 text-[var(--star-white)]/70 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── High-Performance Team Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="group relative rounded-[42px] border-[3px] border-white/20 hover:border-[var(--accent)] bg-[#0d0e12] p-2.5 transition-transform duration-300 shadow-2xl hover:scale-[1.02] will-change-transform"
            >
              {/* iPhone OLED Screen Container */}
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-black border border-white/10">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 grayscale-[10%] group-hover:grayscale-0 pointer-events-none"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Gradient Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity pointer-events-none" />

                {/* Member Name & Role inside OLED screen bottom */}
                <div className="absolute bottom-4 left-4 right-4 z-10 space-y-0.5 pointer-events-none">
                  <h3 className="text-lg font-extrabold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-white/70 font-semibold">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
