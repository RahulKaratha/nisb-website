'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubstackPost {
  title: string;
  summary: string;
  date: string;
  author: string;
  link: string;
  tag: string;
}

const REAL_SUBSTACK_POSTS: SubstackPost[] = [
  {
    title: 'The Cockroach Principle',
    summary: 'Discover how CockroachDB is rewriting the rules of distributed databases.',
    date: 'Jul 30, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/the-cockroach-principle',
    tag: 'DISTRIBUTED SYSTEMS',
  },
  {
    title: 'The Trionda Story',
    summary: 'The Technology Inside the 2026 FIFA World Cup Ball',
    date: 'Jul 15, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/the-trionda-story',
    tag: 'SPORTS TECH',
  },
  {
    title: 'You Pressed Play',
    summary: "YouTube delivered. Here's the Part You Never Saw.",
    date: 'Jun 30, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/you-pressed-play',
    tag: 'SYSTEM ARCHITECTURE',
  },
  {
    title: 'Being a Permanent Beginner',
    summary: 'Why chasing expertise is a trap and how staying curious will future-proof your career.',
    date: 'May 31, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/being-a-permanent-beginner',
    tag: 'CAREER & GROWTH',
  },
  {
    title: 'A (short) History of DevOps',
    summary: 'What began as a response to slow and unreliable deployments eventually became a defining culture of modern engineering.',
    date: 'May 16, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/a-short-history-of-devops',
    tag: 'DEVOPS & INFRA',
  },
  {
    title: 'From Kirchhoff’s Laws to Cutting-Edge Chips',
    summary: 'Why the fundamentals we survived in first year still rule modern silicon.',
    date: 'Apr 30, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/from-kirchhoffs-laws-to-cutting-edge-chips',
    tag: 'HARDWARE & VLSI',
  },
  {
    title: 'Wonders of Data: Where Numbers Tell Stories',
    summary: 'How raw numbers become revelations',
    date: 'Apr 17, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/wonders-of-data-where-numbers-tell',
    tag: 'DATA SCIENCE',
  },
  {
    title: 'WIE Voices: Fei-Fei Li',
    summary: 'The woman who gave eyes to Artificial Intelligence.',
    date: 'Mar 31, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/wie-voices-fei-fei-li',
    tag: 'WIE VOICES',
  },
  {
    title: 'WIE Voices: Ayyalasomayajula Lalitha',
    summary: 'The woman who lit the way for India’s women engineers.',
    date: 'Mar 15, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/wie-voices-ayyalasomayajula-lalitha',
    tag: 'WIE VOICES',
  },
  {
    title: 'Robots with a Heart',
    summary: 'How electronics enable socially beneficial automation.',
    date: 'Feb 28, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/robots-with-a-heart',
    tag: 'ROBOTICS & AI',
  },
  {
    title: 'When Code Talks Back',
    summary: 'Loneliness, mental health, and the rise of conversational AI',
    date: 'Feb 15, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/when-code-talks-back',
    tag: 'AI & SOCIETY',
  },
  {
    title: 'The Confident Engineer',
    summary: 'Because not everything is about your technical skills.',
    date: 'Jan 30, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/the-confident-engineer',
    tag: 'SOFT SKILLS',
  },
  {
    title: 'The Art of Encryption: How Computers Keep your Secrets',
    summary: 'Dive more into the techniques which keep your data safe and intact.',
    date: 'Jan 16, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com/p/the-art-of-encryption-how-computers',
    tag: 'CYBERSECURITY',
  },
  {
    title: 'Inception: NISBlogs',
    summary: 'Welcome to NISBlogs: The official home for technical insights and academic growth from the NIE IEEE Student Branch.',
    date: 'Jan 15, 2026',
    author: 'NIE IEEE STUDENT BRANCH',
    link: 'https://nisb.substack.com',
    tag: 'INAUGURAL POST',
  },
];

export default function BlogsAndPodcastSection() {
  const [posts, setPosts] = useState<SubstackPost[]>(REAL_SUBSTACK_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedPost, setSelectedPost] = useState<SubstackPost | null>(null);

  // Auto-sync live RSS feed from nisb.substack.com on mount
  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://nisb.substack.com/feed')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          const livePosts: SubstackPost[] = data.items.map((item: { title: string; description: string; pubDate: string; link: string }, i: number) => ({
            title: item.title,
            summary: item.description.replace(/<[^>]*>?/gm, '').slice(0, 160) + '...',
            date: new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            author: 'NIE IEEE STUDENT BRANCH',
            link: item.link,
            tag: i === 0 ? 'LATEST POST' : 'SUBSTACK ARTICLE',
          }));

          setPosts(prev => {
            const combined = [...livePosts];
            prev.forEach(p => {
              if (!combined.some(c => c.title.toLowerCase() === p.title.toLowerCase())) {
                combined.push(p);
              }
            });
            return combined;
          });
        }
      })
      .catch(() => { });
  }, []);

  const categories = ['ALL', 'DISTRIBUTED SYSTEMS', 'WIE VOICES', 'AI', 'DEVOPS', 'HARDWARE'];

  const filteredPosts = posts.filter(post => {
    const matchesCat = activeCategory === 'ALL' || post.tag.includes(activeCategory);
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="media" className="premium-section bg-[var(--void)] text-[var(--star-white)] py-16 relative overflow-hidden">
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-[88rem] mx-auto space-y-8 sm:space-y-12">

        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col gap-3 pb-5 border-b border-[var(--border-main)]">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[var(--accent)] font-bold">
            OFFICIAL NISB MEDIA &amp; PUBLICATIONS
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase font-display tracking-tight text-[var(--star-white)] leading-tight">
              BLOGS &amp; <span className="text-[var(--accent)]">PODCAST</span>
            </h2>
            <p className="text-[11px] font-mono text-[var(--text-muted)] max-w-xs">
              Read NISBlogs on Substack and watch Tech &amp; Tales YouTube episodes.
            </p>
          </div>
        </div>

        {/* ── MOBILE: PODCAST CARD (compact) + BLOG FEED ── */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:items-stretch">

          {/* ── PODCAST CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl border border-[var(--border-main)] bg-[var(--card-bg)] overflow-hidden shadow-2xl relative flex flex-col justify-between group hover:border-[var(--accent)]/50 transition-all duration-500"
          >
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-[60px] pointer-events-none" />

            <div>
              {/* Tech N Tales Logo & Media Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#07132a] flex items-center justify-center border-b border-[var(--border-main)]">
                <img
                  src="/tech-n-tales.png"
                  alt="Tech N Tales — Official NISB Podcast"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 flex items-center justify-center">
                  <a
                    href="https://youtu.be/_xdb0UZCQZc?si=aqc6PIgmdk4QuwfV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-xl shadow-[0_0_30px_rgba(239,68,68,0.8)] hover:scale-110 active:scale-95 transition-all"
                    title="Watch Episode on YouTube"
                  >
                    <span className="translate-x-0.5">▶</span>
                  </a>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[9.5px] font-mono font-bold uppercase tracking-widest shadow-lg">
                    OFFICIAL PODCAST
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-sky-200 border border-white/10 text-[9px] font-mono font-semibold">
                    EPISODE 01 LIVE ↗
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                    NIE IEEE STUDENT BRANCH TALK SHOW
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--star-white)] tracking-tight uppercase leading-tight font-display">
                  TECH N <span className="text-[var(--accent)]">TALES</span>
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[var(--text-muted)] leading-relaxed">
                  Tech-N-Tales is NISB’s official podcast series, where we explore the technologies we learn (and sometimes don’t), along with the stories that truly matter!
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-5 sm:p-6 pt-0">
              <a
                href="https://youtu.be/_xdb0UZCQZc?si=aqc6PIgmdk4QuwfV"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-extrabold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)] hover:scale-[1.02] active:scale-95"
              >
                <span>Watch on YouTube</span>
                <span>↗</span>
              </a>
            </div>
          </motion.div>

          {/* ── SUBSTACK BLOG FEED ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-[var(--border-main)] bg-[var(--card-bg)] p-5 sm:p-6 flex flex-col gap-5 shadow-2xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 text-[var(--accent)] text-[9px] font-mono font-bold tracking-widest uppercase">
                  NISBlogs • SUBSTACK
                </span>
                <a
                  href="https://nisb.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-bold"
                >
                  nisb.substack.com ↗
                </a>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[var(--star-white)] tracking-tight uppercase leading-tight">
                READ <span className="text-[var(--accent)]">NISBlogs</span>
              </h3>

              {/* Search */}
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* Articles list */}
            <div className="space-y-2.5 max-h-[420px] sm:max-h-[480px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(6,182,212,0.3) transparent' }}>
              {filteredPosts.map((post, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer p-4 rounded-xl bg-white/[0.03] border border-[var(--border-main)] hover:border-[var(--accent)]/60 hover:bg-white/[0.06] transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/25 text-[var(--accent)] text-[8px] font-mono font-bold uppercase tracking-wider shrink-0">
                      {post.tag}
                    </span>
                    <span className="text-[9px] font-mono text-[var(--text-muted)] shrink-0">{post.date}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[var(--star-white)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-[10px] font-sans text-[var(--text-muted)] mt-1 leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-[var(--accent)] font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                      Read Article ➔
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-[var(--border-main)] flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold">
                {posts.length} ARTICLES LIVE
              </span>
              <a
                href="https://nisb.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[var(--star-white)] text-[var(--void)] text-[10px] font-mono font-extrabold uppercase tracking-wider transition-all hover:bg-[var(--accent)] hover:scale-105 shadow-xl"
              >
                Visit Substack ↗
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── ARTICLE READING MODAL OVERLAY ── */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-3xl bg-[#0d0e12] border border-white/20 p-8 shadow-2xl space-y-6 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-lg flex items-center justify-center transition-all"
              >
                ✕
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 text-[var(--accent)] text-[10px] font-mono font-bold uppercase">
                    {selectedPost.tag}
                  </span>
                  <span className="text-xs font-mono text-white/50">{selectedPost.date}</span>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-white uppercase font-display tracking-tight leading-snug">
                  {selectedPost.title}
                </h3>

                <p className="text-xs font-mono text-[var(--accent)]">
                  AUTHOR: {selectedPost.author} • OFFICIAL SUBSTACK PUBLICATION
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-sm font-sans text-white/80 leading-relaxed space-y-3">
                <p className="font-medium text-white text-base">
                  {selectedPost.summary}
                </p>
                <p className="text-xs text-white/50">
                  This article is published on the official NIE IEEE Student Branch Substack journal (<span className="text-[var(--accent)]">nisb.substack.com</span>). Click below to read the complete post with full research notes, diagrams, and reader comments.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-all uppercase font-bold"
                >
                  Close Reader
                </button>

                <a
                  href={selectedPost.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[var(--accent)] hover:bg-white text-black text-xs font-mono font-black uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-2 hover:scale-105"
                >
                  <span>Read Full Article on Substack</span>
                  <span>↗</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
