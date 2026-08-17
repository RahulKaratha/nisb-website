'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ROUTES = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#legacy' },
  { label: 'Chapters', href: '#chapters' },
  { label: 'Events', href: '#events' },
  { label: 'Activities', href: '#activities' },
  { label: 'Team', href: '#team' },
  { label: 'Media', href: '#media' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'obsidian' | 'cyan' | 'emerald' | 'violet' | 'clay' | 'blue'>('clay');

  const changeTheme = (theme: 'obsidian' | 'cyan' | 'emerald' | 'violet' | 'clay' | 'blue') => {
    setCurrentTheme(theme);
    if (theme === 'obsidian') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  };

  useEffect(() => {
    // Set default theme to Warm Clay (#84937e)
    document.documentElement.setAttribute('data-theme', 'clay');

    // Triggered by landing page after intro ends
    const handler = () => setVisible(true);
    window.addEventListener('nisb:landingReady', handler);

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('nisb:landingReady', handler);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-4 inset-x-0 mx-auto z-[999] w-[92%] max-w-[92rem] transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
          }`}
      >
        <div
          className={`relative flex items-center justify-between px-5 md:px-8 py-3 rounded-full border transition-all duration-300 backdrop-blur-2xl shadow-2xl ${scrolled
            ? 'bg-[#030914]/90 border-[var(--accent)]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-black/60 border-white/15'
            }`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 group/logo shrink-0"
            aria-label="NISB Home"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[var(--accent)]/50 group-hover/logo:scale-105 transition-transform bg-transparent flex items-center justify-center">
              <img
                src="/icon.png"
                alt="NISB Logo"
                className="w-full h-full object-cover rounded-full scale-[1.25]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-tight font-display text-white group-hover/logo:text-[var(--accent)] transition-colors leading-none">
                NISB<span className="text-[var(--accent)]"></span>
              </span>
              <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">NIE MYSURU</span>
            </div>
          </a>

          {/* Desktop Links (Visible lg+) */}
          <nav className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            {NAV_ROUTES.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all hover:scale-105"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right Action Bar (Theme Selector & CTA & Mobile Toggle) */}
          <div className="flex items-center gap-3">
            {/* Theme Selector */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              {[
                { id: 'cyan', color: '#06b6d4', title: 'Cyber Cyan' },
                { id: 'blue', color: '#2563eb', title: 'Electric Blue' },
                { id: 'emerald', color: '#10b981', title: 'Emerald' },
                { id: 'violet', color: '#a855f7', title: 'Violet' },
                { id: 'clay', color: '#84937e', title: 'Warm Clay' },
                { id: 'obsidian', color: '#999999', title: 'Obsidian' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => changeTheme(t.id as any)}
                  title={`Switch to ${t.title} Theme`}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${currentTheme === t.id ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-60 hover:opacity-100'
                    }`}
                  style={{ background: t.color }}
                />
              ))}
            </div>

            {/* Membership CTA Button */}
            <a
              href="https://tinyurl.com/MEMBERSHIPDRIVE26"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-wider text-[var(--void)] bg-[var(--accent)] px-5 py-2 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-[0_0_20px_var(--accent-glow)]"
            >
              <span>Join NISB</span>
              <span className="text-sm">↗</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className="lg:hidden w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white flex items-center justify-center transition-all"
            >
              <span className="text-lg font-mono leading-none">
                {mobileMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[997] bg-black/75 backdrop-blur-md lg:hidden"
            />

            {/* Ultra-Futuristic Glassmorphic Floating Drawer Card */}
            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.94 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-20 inset-x-0 mx-auto z-[998] w-[92%] max-w-md rounded-3xl bg-[#030914]/95 border border-[var(--accent)]/40 backdrop-blur-3xl p-5 sm:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.95)] lg:hidden flex flex-col gap-5 overflow-hidden"
            >
              {/* Top Laser Shimmer Line */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent shadow-[0_0_15px_var(--accent-glow)]"
              />

              {/* Ambient Glowing Blobs */}
              <div className="absolute top-0 right-0 w-52 h-52 bg-[var(--accent)]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              {/* Header Info Bar */}
              <div className="flex items-center justify-between px-1 pb-3 border-b border-white/10 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-white font-extrabold">
                    NISB <span className="text-[var(--accent)]">INDEX</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[9px] font-mono text-[var(--accent)] font-bold">
                    NIE MYSURU
                  </span>
                </div>
              </div>

              {/* Navigation Link Cards (Grid with Cyber Accents) */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.04 } },
                }}
                className="grid grid-cols-2 gap-2.5 relative z-10"
              >
                {NAV_ROUTES.map(({ label, href }, idx) => (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    className="group relative p-3 rounded-2xl bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 hover:border-[var(--accent)]/80 hover:bg-[var(--accent)]/15 text-white transition-all duration-300 shadow-md overflow-hidden flex items-center justify-between"
                  >
                    {/* Left Accent Indicator */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-1 h-3.5 rounded-full bg-white/20 group-hover:bg-[var(--accent)] group-hover:shadow-[0_0_8px_var(--accent)] transition-all" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono text-[var(--accent)] font-bold tracking-widest leading-none">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-sans font-extrabold uppercase tracking-wider group-hover:text-white transition-colors mt-0.5">
                          {label}
                        </span>
                      </div>
                    </div>

                    <span className="text-[var(--accent)] text-xs opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                      ➔
                    </span>
                  </motion.a>
                ))}
              </motion.div>

              {/* Theme Color Switcher & Action CTA */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3.5 relative z-10">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/60 font-bold uppercase tracking-wider">
                    <span>SYSTEM ACCENT:</span>
                    <span className="text-[var(--accent)] uppercase font-extrabold">{currentTheme}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                    {[
                      { id: 'cyan', color: '#06b6d4', title: 'Cyber Cyan' },
                      { id: 'blue', color: '#2563eb', title: 'Electric Blue' },
                      { id: 'emerald', color: '#10b981', title: 'Emerald' },
                      { id: 'violet', color: '#a855f7', title: 'Violet' },
                      { id: 'clay', color: '#84937e', title: 'Warm Clay' },
                      { id: 'obsidian', color: '#999999', title: 'Obsidian' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => changeTheme(t.id as any)}
                        title={`Switch to ${t.title} Theme`}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${currentTheme === t.id
                          ? 'scale-125 ring-2 ring-white shadow-[0_0_12px_rgba(255,255,255,0.7)]'
                          : 'opacity-40 hover:opacity-100'
                          }`}
                        style={{ background: t.color }}
                      />
                    ))}
                  </div>
                </div>

                <a
                  href="https://tinyurl.com/MEMBERSHIPDRIVE26"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative group w-full py-3.5 rounded-2xl bg-[var(--accent)] text-[var(--void)] text-xs font-mono font-black uppercase tracking-widest text-center shadow-[0_0_30px_var(--accent-glow)] hover:scale-[1.02] active:scale-[0.98] transition-all overflow-hidden block"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>JOIN NISB 2026</span>
                    <span className="text-sm font-extrabold group-hover:translate-x-1 transition-transform">➔</span>
                  </span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
