'use client';

export default function SiteFooter() {
  const socialLinks = [
    {
      name: 'WhatsApp',
      handle: 'Channel & Alerts',
      url: 'https://whatsapp.com/channel/0029Vb7IgHfFHWq8YKr29A0O',
      color: '#25D366',
      badge: 'LIVE',
      icon: 'M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08s.89 2.41 1.01 2.58c.13.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z',
    },
    {
      name: 'YouTube',
      handle: 'Tech N Tales',
      url: 'https://www.youtube.com/@nie_ieee',
      color: '#EF4444',
      badge: 'WATCH',
      icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
    },
    {
      name: 'LinkedIn',
      handle: 'Professional Hub',
      url: 'https://www.linkedin.com/company/nie-ieee-student-branch/',
      color: '#0A66C2',
      badge: 'NETWORK',
      icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z',
    },
    {
      name: 'Instagram',
      handle: '@nie_ieee',
      url: 'https://www.instagram.com/nie_ieee/',
      color: '#E1306C',
      badge: 'MEDIA',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      name: 'Substack',
      handle: 'NISBlogs Feed',
      url: 'https://nisb.substack.com',
      color: '#FF6719',
      badge: 'BLOGS',
      icon: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11L22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
    },
    {
      name: 'Facebook',
      handle: 'Official Page',
      url: 'https://www.facebook.com/share/1VT8aamGW5/',
      color: '#1877F2',
      badge: 'SOCIAL',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      name: 'GitHub',
      handle: 'Code & Web',
      url: 'https://github.com/nisbweb',
      color: '#FFFFFF',
      badge: 'DEV',
      icon: 'M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z',
    },
    {
      name: 'Discord',
      handle: 'Student Server',
      url: 'https://dsc.gg/nisb',
      color: '#5865F2',
      badge: 'CHAT',
      icon: 'M18.942 5.556a16.299 16.299 0 0 0-4.126-1.297.054.054 0 0 0-.057.026c-.178.315-.377.733-.514 1.058a15.029 15.029 0 0 0-4.49 0 10.96 10.96 0 0 0-.522-1.058.056.056 0 0 0-.057-.026 16.3 16.3 0 0 0-4.126 1.297.052.052 0 0 0-.024.02 19.34 19.34 0 0 0-3.084 12.016.058.058 0 0 0 .022.046 16.4 16.4 0 0 0 4.945 2.493.056.056 0 0 0 .061-.02c.381-.52.715-1.07 1.002-1.642.016-.032.001-.07-.033-.083a10.82 10.82 0 0 1-1.536-.732.057.057 0 0 1-.006-.095c.103-.077.206-.157.304-.239a.055.055 0 0 1 .057-.008c3.242 1.48 6.757 1.48 9.96 0a.055.055 0 0 1 .058.007c.098.082.201.162.304.24a.057.057 0 0 1-.005.094 10.5 10.5 0 0 1-1.537.733.057.057 0 0 0-.033.083c.288.572.622 1.121 1.001 1.642a.055.055 0 0 0 .062.02 16.35 16.35 0 0 0 4.946-2.493.058.058 0 0 0 .022-.046c.451-4.73-.772-8.818-3.084-12.016a.046.046 0 0 0-.024-.02zM8.52 14.832c-.974 0-1.777-.895-1.777-1.996 0-1.101.787-1.996 1.777-1.996.999 0 1.792.9 1.777 1.996 0 1.101-.778 1.996-1.777 1.996zm6.96 0c-.975 0-1.777-.895-1.777-1.996 0-1.101.788-1.996 1.777-1.996.998 0 1.792.9 1.777 1.996 0 1.101-.778 1.996-1.777 1.996z',
    },
  ];

  return (
    <footer id="contact" className="footer border-t border-[var(--border-main)] bg-[var(--void)] text-[var(--star-white)] py-16 px-4 sm:px-6 md:px-16" role="contentinfo">
      <div className="max-w-[88rem] mx-auto space-y-14 sm:space-y-16">

        {/* IEEE Affiliation & Logos Row */}
        <div className="p-6 sm:p-8 rounded-3xl border border-[var(--border-main)] bg-[var(--card-bg)] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--accent)] font-bold">
              AFFILIATIONS &amp; REGION SECTIONS
            </span>
            <h3 className="text-xl md:text-2xl font-extrabold uppercase font-display text-[var(--star-white)]">
              A Part of IEEE Bangalore Section
            </h3>
            <p className="text-xs font-mono text-[var(--text-muted)] max-w-lg">
              IEEE Bangalore Section was established in 1977 and stands among the most active IEEE sections globally with over 23,000 members.
            </p>
          </div>

          {/* Official IEEE & Section Logos Grid */}
          <div className="flex items-center gap-6 flex-wrap justify-center font-mono py-3 px-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <a
              href="https://www.ieee.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              title="IEEE Global"
            >
              <img src="/ieee-white.png" alt="IEEE Global" className="h-7 w-auto object-contain brightness-125" />
            </a>
            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
            <a
              href="https://ieeebangalore.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              title="IEEE Bangalore Section"
            >
              <img src="/ieee-bangalore-white.png" alt="IEEE Bangalore Section" className="h-8 w-auto object-contain brightness-125" />
            </a>
            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
            <a
              href="https://ieeebangalore.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:scale-105 transition-transform"
              title="IEEE Mysore Subsection"
            >
              <img src="/ieee-mysore-white.png" alt="IEEE Mysore Subsection" className="h-8 w-auto object-contain brightness-125" />
            </a>
            <div className="h-6 w-[1px] bg-white/20 hidden sm:block" />
            <a
              href="#hero"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/40 hover:scale-105 transition-all"
              title="NISB Student Branch"
            >
              <img src="/nisb-logo-white.png" alt="NISB Logo" className="h-6 w-auto object-contain" />
              <span className="text-xs font-black text-[var(--accent)] tracking-wider">NISB</span>
            </a>
          </div>
        </div>

        {/* 2-Column Split: Google Maps Location + Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Interactive Google Map of NIE South Campus Mysuru */}
          <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[var(--border-main)] shadow-2xl relative min-h-[360px] flex flex-col">
            <iframe
              title="NIE Mysuru Location Map"
              src="https://maps.google.com/maps?q=The%20National%20Institute%20of%20Engineering%20South%20Campus%20Mysuru&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px', flex: 1, filter: 'contrast(1.1) brightness(0.9)' }}
              allowFullScreen={false}
              loading="lazy"
            />
            <div className="p-4 bg-[var(--card-bg)] border-t border-[var(--border-main)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono text-[var(--star-white)] font-bold">
                  The National Institute of Engineering, Mysuru
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=The+National+Institute+of+Engineering+South+Campus+Mysuru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)] font-bold hover:underline"
              >
                Open In Maps ↗
              </a>
            </div>
          </div>

          {/* Right Column: Official Contact Details */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border border-[var(--border-main)] bg-[var(--card-bg)] flex flex-col justify-between gap-6 shadow-2xl">
            <div className="space-y-5">
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase font-display text-[var(--star-white)] tracking-tight">
                  Contact <span className="text-[var(--accent)]">Us</span>
                </h2>
                <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                  Have questions or want to collaborate? Get in touch with our team.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-[var(--border-main)]">
                  <p className="text-[10px] uppercase text-[var(--accent)] font-bold tracking-widest">
                    STUDENT BRANCH
                  </p>
                  <p className="text-sm font-bold text-[var(--star-white)] mt-1">
                    NIE IEEE Student Branch
                  </p>
                  <a
                    href="mailto:nisb@nie.ac.in"
                    className="text-[var(--accent)] font-bold hover:underline block text-[11px]"
                  >
                    nisb@nie.ac.in
                  </a>
                  <p className="text-[var(--text-muted)] text-[11px] mt-0.5">
                    NIE Mysuru — 570008
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-[var(--border-main)]">
                  <p className="text-[10px] uppercase text-[var(--accent)] font-bold tracking-widest">
                    CHAIRPERSON CONTACT
                  </p>
                  <p className="text-sm font-bold text-[var(--star-white)] mt-1">
                    Sagar Kumar Singh
                  </p>
                  <p className="text-[var(--text-muted)] text-[11px] mt-0.5">+91 86603 18339</p>
                  <a
                    href="mailto:sagarks@ieee.org"
                    className="text-[var(--accent)] font-bold hover:underline block text-[11px]"
                  >
                    sagarks@ieee.org
                  </a>
                </div>
              </div>
            </div>

            {/* ── ULTRA-COOL CYBER SOCIAL BENTO MATRIX ── */}
            <div className="pt-5 border-t border-[var(--border-main)] space-y-3">


              {/* 4x2 Responsive Glass Bento Tile Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`${item.name} — ${item.handle}`}
                    className="group relative p-2.5 sm:p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.7)] flex flex-col justify-between overflow-hidden"
                  >
                    {/* Hover ambient color bloom */}
                    <div
                      className="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundColor: item.color }}
                    />

                    {/* Top Row: Icon + Badge / Arrow */}
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${item.color}15`,
                          color: item.color,
                          border: `1px solid ${item.color}35`,
                        }}
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-[8.5px] font-mono font-bold tracking-wider uppercase text-white/50 group-hover:text-white transition-colors">
                        ↗
                      </span>
                    </div>

                    {/* Bottom Row: Name + Subtitle */}
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight group-hover:text-[var(--accent)] transition-colors leading-none">
                        {item.name}
                      </h4>
                      <p className="text-[9px] font-mono text-[var(--text-muted)] mt-1 truncate">
                        {item.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-[var(--border-main)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-muted)]">
          <div>© {new Date().getFullYear()} IEEE NISB · National Institute of Engineering</div>
          <div>Honoured as Best Student Chapter of Region 10</div>
        </div>

      </div>
    </footer>
  );
}
