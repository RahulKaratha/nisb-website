'use client';

import { useEffect, useRef } from 'react';

/*
 * Ultra-Optimized Electric Blue Stardust & Cosmic Nebula Canvas
 * -------------------------------------------------------------
 * Performance Architecture:
 *  - Electric Sky Blue / Cyan / Diamond Cosmic Palette
 *  - 100% Pre-baked offscreen canvas textures (zero per-frame gradient calls)
 *  - Zero ctx.shadowBlur (zero multi-pass GPU Gaussian blurs)
 *  - Mobile Auto-Detection (< 768px):
 *      -> Drops smoke puffs to 6 and embers to 14
 *      -> Forces DPR = 1 on mobile for lightning-fast 60-120fps
 *  - Offscreen culling (skips drawing out-of-viewport puffs)
 */

interface SmokePuff {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  texIdx: number;
  breathOffset: number;
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  maxAlpha: number;
  pulseDir: number;
  pulseSpeed: number;
  color: string;
  swayFreq: number;
  swayAmp: number;
  timeOffset: number;
}

export default function LuxuryStardustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let smokePuffs: SmokePuff[] = [];
    let embers: Ember[] = [];
    let smokeTextures: HTMLCanvasElement[] = [];

    // Electric Blue & Diamond Stardust Colors
    const emberColors = [
      '#FFFFFF', // pure diamond spark
      '#F0F9FF', // crystal white
      '#E0F2FE', // soft ice blue
      '#BAE6FD', // light sky blue
      '#7DD3FC', // electric cyan
      '#38BDF8', // vivid sky blue
    ];

    // Pre-bake 3 Electric Blue / Cyan nebula textures (256x256 offscreen canvases)
    const bakeSmokeTextures = () => {
      const texSize = 256;
      const colorSets = [
        // 0: Electric Sky Blue Nebula
        [ [56, 189, 248], [14, 165, 233], [3, 105, 161] ],
        // 1: Sapphire Azure Plasma
        [ [14, 165, 233], [2, 132, 199], [7, 89, 133] ],
        // 2: Diamond Frost Cosmic Haze
        [ [186, 230, 253], [125, 211, 252], [56, 189, 248] ],
      ];

      smokeTextures = colorSets.map(colors => {
        const offscreen = document.createElement('canvas');
        offscreen.width = texSize;
        offscreen.height = texSize;
        const octx = offscreen.getContext('2d')!;
        const cx = texSize / 2;
        const grad = octx.createRadialGradient(cx, cx, 0, cx, cx, cx);
        grad.addColorStop(0, `rgba(${colors[0].join(',')}, 0.55)`);
        grad.addColorStop(0.4, `rgba(${colors[1].join(',')}, 0.22)`);
        grad.addColorStop(0.75, `rgba(${colors[2].join(',')}, 0.06)`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        octx.fillStyle = grad;
        octx.fillRect(0, 0, texSize, texSize);
        return offscreen;
      });
    };

    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isMobile = width < 768;

      // On mobile, cap DPR to 1 to preserve battery and maintain 120fps
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      bakeSmokeTextures();

      // Mobile: only 6 puffs | Desktop: max 16 puffs
      const smokeCount = isMobile ? 6 : Math.min(16, Math.floor((width * height) / 70000) + 6);
      smokePuffs = Array.from({ length: smokeCount }, (_, i) => {
        const baseRadius = isMobile
          ? Math.random() * 80 + 90
          : Math.random() * 140 + 110;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: baseRadius,
          baseRadius,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -0.15 - Math.random() * 0.25,
          alpha: isMobile ? 0.18 : Math.random() * 0.2 + 0.1,
          texIdx: i % 3,
          breathOffset: Math.random() * Math.PI * 2,
        };
      });

      // Mobile: only 14 embers | Desktop: max 30 embers
      const emberCount = isMobile ? 14 : Math.min(30, Math.floor((width * height) / 45000) + 10);
      embers = Array.from({ length: emberCount }, () => {
        const maxAlpha = 0.4 + Math.random() * 0.5;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: isMobile ? Math.random() * 1.1 + 0.5 : Math.random() * 1.4 + 0.6,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: -0.3 - Math.random() * 0.55,
          alpha: Math.random() * maxAlpha,
          maxAlpha,
          pulseDir: 1,
          pulseSpeed: 0.008 + Math.random() * 0.015,
          color: emberColors[Math.floor(Math.random() * emberColors.length)],
          swayFreq: 0.002 + Math.random() * 0.003,
          swayAmp: isMobile ? 0.6 : Math.random() * 1.1 + 0.3,
          timeOffset: Math.random() * 1000,
        };
      });
    };

    initCanvas();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initCanvas, 200);
    };
    window.addEventListener('resize', handleResize);

    const render = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height);

      // ── 1. COSMIC NEBULA: Blit pre-baked textures ──
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < smokePuffs.length; i++) {
        const s = smokePuffs[i];
        s.x += s.vx;
        s.y += s.vy;

        const r = s.baseRadius + Math.sin(timestamp * 0.0008 + s.breathOffset) * 15;

        // Screen wrap
        if (s.y < -r) { s.y = height + r; s.x = Math.random() * width; }
        if (s.x < -r) s.x = width + r;
        if (s.x > width + r) s.x = -r;

        // Culling
        if (s.x + r < 0 || s.x - r > width || s.y + r < 0 || s.y - r > height) continue;

        const d = r * 2;
        ctx.globalAlpha = s.alpha;
        ctx.drawImage(smokeTextures[s.texIdx], s.x - r, s.y - r, d, d);
      }
      ctx.restore();

      // ── 2. DIAMOND STARDUST: Lightweight circular sparks (NO shadowBlur) ──
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        const sway = Math.sin((timestamp + e.timeOffset) * e.swayFreq) * e.swayAmp;
        e.x += e.speedX + sway;
        e.y += e.speedY;

        e.alpha += e.pulseSpeed * e.pulseDir;
        if (e.alpha >= e.maxAlpha) { e.alpha = e.maxAlpha; e.pulseDir = -1; }
        if (e.alpha <= 0.08) { e.alpha = 0.08; e.pulseDir = 1; }

        // Screen wrap
        if (e.y < -10) { e.y = height + 10; e.x = Math.random() * width; }
        if (e.x < -10) e.x = width + 10;
        if (e.x > width + 10) e.x = -10;

        ctx.globalAlpha = e.alpha;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.92 }}
    />
  );
}
