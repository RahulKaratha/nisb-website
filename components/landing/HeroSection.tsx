'use client';

/**
 * HeroSection — thin orchestrator.
 * Each visual block lives in its own component file:
 *
 *  ├── HeroCinematicHero.tsx   — full-screen hero (GIF bg, 3D asset, headline, CTA)
 *  ├── LegacyScrollSection.tsx — scroll-pinned word-reveal + fly-through
 *  ├── CinematicEventsSection.tsx — horizontal scroll event cards
 *  ├── ActivitiesBentoGrid.tsx — bento grid (industrial visits, focus groups, social)
 *  ├── PublicationsSection.tsx — MANAS & JIJNASA cards
 *  ├── ChaptersSection.tsx     — 5 IEEE societies
 *  └── SiteFooter.tsx          — footer
 *
 * Page composition happens in app/page.tsx.
 * This file is intentionally left as a re-export for legacy imports.
 */

export { default } from '@/components/landing/HeroCinematicHero';
