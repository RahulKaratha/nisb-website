'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import SmoothScroll        from '@/components/landing/SmoothScroll';
import Navbar              from '@/components/landing/Navbar';
import HeroCinematicHero   from '@/components/landing/HeroCinematicHero';
import LegacyScrollSection from '@/components/landing/LegacyScrollSection';

// Dynamically import below-the-fold interactive components for code-splitting & performance
const CinematicEventsSection = dynamic(() => import('@/components/landing/CinematicEventsSection'), { ssr: false });
const ActivitiesBentoGrid   = dynamic(() => import('@/components/landing/ActivitiesBentoGrid'), { ssr: false });
const PublicationsSection   = dynamic(() => import('@/components/landing/PublicationsSection'), { ssr: false });
const BlogsAndPodcastSection = dynamic(() => import('@/components/landing/BlogsAndPodcastSection'), { ssr: false });
const TeamSection           = dynamic(() => import('@/components/landing/TeamSection'), { ssr: false });
const ChaptersSection       = dynamic(() => import('@/components/landing/ChaptersSection'), { ssr: false });
const SiteFooter            = dynamic(() => import('@/components/landing/SiteFooter'));

// Heavy / SSR-unsafe components loaded dynamically
const IntroSequence = dynamic(() => import('@/components/intro/IntroSequence'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: '#000005',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000,
      }}
      aria-label="Loading intro sequence"
    >
      <div className="loading-ring" />
    </div>
  ),
});

const LandingCanvas = dynamic(() => import('@/components/landing/LandingCanvas'), { ssr: false });

export default function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const [landingVisible, setLandingVisible] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    setTimeout(() => {
      setLandingVisible(true);
      window.dispatchEvent(new Event('nisb:landingReady'));
    }, isMobile ? 0 : 300);
  };

  return (
    <SmoothScroll>
      <main>
        {/* ── Intro Sequence ── */}
        {!introComplete && <IntroSequence onComplete={handleIntroComplete} />}

        {/* ── Landing Page ── */}
        <div
          ref={overlayRef}
          className="landing-wrapper"
          style={{
            opacity:    landingVisible ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.19, 1, 0.22, 1)',
            visibility: landingVisible ? 'visible' : 'hidden',
          }}
          aria-hidden={!landingVisible}
        >
          {/* Global ambient starfield */}
          {landingVisible && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} aria-hidden="true">
              <LandingCanvas />
            </div>
          )}

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* 1 ── Navigation */}
            <Navbar />

            {/* 2 ── Full-screen cinematic hero */}
            <HeroCinematicHero />

            {/* 3 ── Scroll-pinned word-reveal legacy story */}
            <LegacyScrollSection />

            {/* 4 ── Horizontal scroll event showcase */}
            <CinematicEventsSection />

            {/* 5 ── All-round development bento grid */}
            <ActivitiesBentoGrid />

            {/* 6 ── Publications */}
            <PublicationsSection />

            {/* 7 ── NISB Blogs & Tech and Tales Podcast */}
            <BlogsAndPodcastSection />

            {/* 8 ── Executive Committee / Team */}
            <TeamSection />

            {/* 8 ── IEEE Chapters / Societies */}
            <ChaptersSection />

            {/* 9 ── Footer */}
            <SiteFooter />
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
