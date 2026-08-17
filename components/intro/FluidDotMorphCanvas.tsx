'use client';

import { useEffect, useRef, useCallback } from 'react';

interface FluidDotMorphCanvasProps {
  onMorphComplete?: () => void;
  onSolidComplete?: () => void;
  word?: string;
}

interface ParticleTarget {
  x: number;
  y: number;
}

interface DotCenter {
  x: number;
  y: number;
  radius: number;
}

// Very Light Blue Color Palette
const LIGHT_BLUE_PALETTE = [
  '#FFFFFF', // pure diamond white highlight
  '#F0F9FF', // ice blue white
  '#E0F2FE', // very light sky blue
  '#BAE6FD', // luminous light cyan-blue
  '#7DD3FC', // soft light azure
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

class MorphParticle {
  dotIndex: number;
  color: string;
  dotRadiusOffset: number;
  dotAngle: number;
  orbitSpeed: number;

  // Current animated position
  x: number;
  y: number;

  // Target coordinates for letterform
  letterX: number;
  letterY: number;

  // Physics velocity
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  noiseSeedX: number;
  noiseSeedY: number;
  friction: number;
  spring: number;

  constructor(
    dotIndex: number,
    startCenter: { x: number; y: number; radius: number },
    target: ParticleTarget,
    color: string
  ) {
    this.dotIndex = dotIndex;
    this.color = color;

    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * startCenter.radius;

    this.dotRadiusOffset = r;
    this.dotAngle = angle;
    this.orbitSpeed = (Math.random() - 0.5) * 0.022;

    this.x = startCenter.x + Math.cos(angle) * r;
    this.y = startCenter.y + Math.sin(angle) * r;

    this.letterX = target.x;
    this.letterY = target.y;

    this.vx = 0;
    this.vy = 0;
    this.baseSize = Math.random() * 1.5 + 1.1;
    this.size = this.baseSize;

    this.noiseSeedX = Math.random() * 1000;
    this.noiseSeedY = Math.random() * 1000;
    this.friction = 0.84;
    this.spring = 0.085;
  }

  update(
    currentDotCenter: DotCenter,
    morphProgress: number,
    solidProgress: number,
    time: number,
    mouse: { x: number; y: number; radius: number }
  ) {
    // 1. Orbiting dot position around moving dot center
    this.dotAngle += this.orbitSpeed;
    const pulse = Math.sin(time * 0.003 + this.dotIndex) * 1.5;
    const currentDotRadius = Math.max(6, currentDotCenter.radius + pulse);
    const scaledR =
      currentDotCenter.radius > 0
        ? (this.dotRadiusOffset / currentDotCenter.radius) * currentDotRadius
        : this.dotRadiusOffset;

    const currentDotX = currentDotCenter.x + Math.cos(this.dotAngle) * scaledR;
    const currentDotY = currentDotCenter.y + Math.sin(this.dotAngle) * scaledR;

    // 2. Interpolate towards letterform targets when morphing
    const easedProgress = easeInOutCubic(morphProgress);
    let targetX = currentDotX + (this.letterX - currentDotX) * easedProgress;
    let targetY = currentDotY + (this.letterY - currentDotY) * easedProgress;

    // 3. Fluid organic turbulence during mid-flight (damps down as solid text crystallizes)
    if (morphProgress > 0.04 && morphProgress < 0.98 && solidProgress < 0.4) {
      const turbulence = Math.sin(morphProgress * Math.PI) * (1 - solidProgress) * 11;
      targetX += Math.cos(time * 0.005 + this.noiseSeedX) * turbulence;
      targetY += Math.sin(time * 0.005 + this.noiseSeedY) * turbulence;
    }

    // 4. Interactive mouse repulsion
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const distSq = dx * dx + dy * dy;
    const radiusSq = mouse.radius * mouse.radius;
    if (distSq < radiusSq && distSq > 0) {
      const dist = Math.sqrt(distSq);
      const force = (1 - dist / mouse.radius) * 14;
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * force;
      this.vy += Math.sin(angle) * force;
    }

    // 5. Spring physics integration
    const springStrength = this.spring * (1 + solidProgress * 0.6);
    this.vx += (targetX - this.x) * springStrength;
    this.vy += (targetY - this.y) * springStrength;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    const sizeMultiplier = (1 + Math.sin(morphProgress * Math.PI) * 0.4) * (1 - solidProgress * 0.35);
    this.size = Math.max(0.6, this.baseSize * sizeMultiplier);
  }

  draw(ctx: CanvasRenderingContext2D, alpha: number) {
    if (alpha <= 0.02) return;
    ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function FluidDotMorphCanvas({
  onMorphComplete,
  onSolidComplete,
  word = 'NISB',
}: FluidDotMorphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<MorphParticle[]>([]);

  // Callbacks in refs so prop changes NEVER restart the animation loop
  const onMorphCompleteRef = useRef(onMorphComplete);
  const onSolidCompleteRef = useRef(onSolidComplete);
  useEffect(() => {
    onMorphCompleteRef.current = onMorphComplete;
    onSolidCompleteRef.current = onSolidComplete;
  }, [onMorphComplete, onSolidComplete]);

  // Layout coordinates ref
  const squareCentersRef = useRef<DotCenter[]>([]);
  const linearCentersRef = useRef<DotCenter[]>([]);
  const currentCentersRef = useRef<DotCenter[]>([]);
  const letterBoundsRef = useRef<{ x: number; y: number; char: string; fontSize: number }[]>([]);

  // Mouse position
  const mouseRef = useRef<{ x: number; y: number; radius: number }>({ x: -1000, y: -1000, radius: 100 });

  // Timeline durations (in milliseconds) - Extended by 3 seconds for majestic cinematic pacing
  const T_SQUARE_END = 1400;  // 0s to 1.4s: 4 Dots in Square
  const T_ALIGN_END = 2800;   // 1.4s to 2.8s: Smooth glide from Square to Linear
  const T_MORPH_END = 5000;   // 2.8s to 5.0s: Fluid particle morph into NISB letters
  const T_SOLID_END = 6800;   // 5.0s to 6.8s: Smooth crystallization to solid text

  const calculateLayout = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const centerY = h * (isMobile ? 0.46 : 0.48);

    // 1. Square Formation (2x2 Grid)
    const sqSize = isMobile ? Math.min(w * 0.16, 45) : Math.min(w * 0.08, 65);
    const sqDotRadius = isMobile ? 18 : 26;
    const centerX = w / 2;

    const squareCenters: DotCenter[] = [
      { x: centerX - sqSize, y: centerY - sqSize, radius: sqDotRadius }, // Dot 0 (N)
      { x: centerX + sqSize, y: centerY - sqSize, radius: sqDotRadius }, // Dot 1 (I)
      { x: centerX - sqSize, y: centerY + sqSize, radius: sqDotRadius }, // Dot 2 (S)
      { x: centerX + sqSize, y: centerY + sqSize, radius: sqDotRadius }, // Dot 3 (B)
    ];
    squareCentersRef.current = squareCenters;

    // 2. Linear Formation (1x4 Horizontal Line) with refined luxury spacing
    const linearDotSpacing = isMobile ? Math.min(w * 0.22, 85) : Math.min(w * 0.20, 205);
    const linearStartX = (w - 3 * linearDotSpacing) / 2;
    const linearDotRadius = isMobile ? 16 : 24;

    const linearCenters: DotCenter[] = [
      { x: linearStartX + 0 * linearDotSpacing, y: centerY, radius: linearDotRadius }, // Dot 0 (N)
      { x: linearStartX + 1 * linearDotSpacing, y: centerY, radius: linearDotRadius }, // Dot 1 (I)
      { x: linearStartX + 2 * linearDotSpacing, y: centerY, radius: linearDotRadius }, // Dot 2 (S)
      { x: linearStartX + 3 * linearDotSpacing, y: centerY, radius: linearDotRadius }, // Dot 3 (B)
    ];
    linearCentersRef.current = linearCenters;
    currentCentersRef.current = [...squareCenters];

    return { squareCenters, linearCenters };
  }, []);

  const sampleLetterPoints = useCallback((text: string, w: number, h: number, linearCenters: DotCenter[]) => {
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return [];

    const isMobile = w < 768;
    const particlesPerLetter = isMobile ? 220 : 360;

    const offWidth = 360;
    const offHeight = 360;
    offscreen.width = offWidth;
    offscreen.height = offHeight;

    const fontSize = isMobile ? 220 : 260;
    // Use Plus Jakarta Sans 800 for immaculate, razor-sharp geometric luxury typography
    offCtx.font = `800 ${fontSize}px 'Plus Jakarta Sans', sans-serif`;
    offCtx.textAlign = 'center';
    offCtx.textBaseline = 'middle';

    const chars = text.padEnd(4, ' ').substring(0, 4).split('');
    const letterTargets: ParticleTarget[][] = [];
    const letterBounds: { x: number; y: number; char: string; fontSize: number }[] = [];

    const scale = isMobile ? Math.min(w * 0.00092, 0.44) : Math.min(w * 0.00115, 0.95);

    chars.forEach((char, index) => {
      offCtx.clearRect(0, 0, offWidth, offHeight);
      offCtx.fillStyle = '#ffffff';
      offCtx.fillText(char, offWidth / 2, offHeight / 2);

      const imgData = offCtx.getImageData(0, 0, offWidth, offHeight);
      const pixels = imgData.data;
      const validPoints: ParticleTarget[] = [];

      const step = isMobile ? 4 : 3;
      for (let y = 0; y < offHeight; y += step) {
        for (let x = 0; x < offWidth; x += step) {
          const alpha = pixels[(y * offWidth + x) * 4 + 3];
          if (alpha > 130) {
            validPoints.push({
              x: x - offWidth / 2,
              y: y - offHeight / 2,
            });
          }
        }
      }

      // Shuffle points for smooth organic filling
      for (let i = validPoints.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [validPoints[i], validPoints[j]] = [validPoints[j], validPoints[i]];
      }

      const center = linearCenters[index] || { x: w / 2, y: h / 2, radius: 20 };
      letterBounds.push({
        x: center.x,
        y: center.y,
        char,
        fontSize: fontSize * scale,
      });

      const finalPoints: ParticleTarget[] = [];
      for (let i = 0; i < particlesPerLetter; i++) {
        const pt = validPoints[i % validPoints.length] || { x: 0, y: 0 };
        finalPoints.push({
          x: center.x + pt.x * scale,
          y: center.y + pt.y * scale,
        });
      }
      letterTargets.push(finalPoints);
    });

    letterBoundsRef.current = letterBounds;
    return letterTargets;
  }, []);

  const rebuildParticles = useCallback((w: number, h: number) => {
    const { squareCenters, linearCenters } = calculateLayout(w, h);
    const letterTargets = sampleLetterPoints(word, w, h, linearCenters);
    const isMobile = w < 768;
    const particlesPerLetter = isMobile ? 220 : 360;

    const particles: MorphParticle[] = [];
    for (let d = 0; d < 4; d++) {
      const targetsForDot = letterTargets[d] || [];
      const sqCenter = squareCenters[d];
      for (let p = 0; p < particlesPerLetter; p++) {
        const target = targetsForDot[p] || { x: linearCenters[d].x, y: linearCenters[d].y };
        const color = LIGHT_BLUE_PALETTE[p % LIGHT_BLUE_PALETTE.length];
        particles.push(new MorphParticle(d, sqCenter, target, color));
      }
    }
    particlesRef.current = particles;
  }, [calculateLayout, sampleLetterPoints, word]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      rebuildParticles(width, height);
    };

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => resize());
    } else {
      resize();
    }

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, radius: 110 };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, radius: 110 };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, radius: 90 };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000, radius: 90 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    let startTime: number | null = null;
    let morphCompletedTriggered = false;
    let solidCompletedTriggered = false;

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx.clearRect(0, 0, width, height);

      // ─────────────────────────────────────────────────────────
      // CONTINUOUS TIMELINE CALCULATIONS (STABLE & ZERO RESTART)
      // ─────────────────────────────────────────────────────────
      let alignProgress = 0;   // 0 = Square (2x2), 1 = Linear (1x4)
      let morphProgress = 0;   // 0 = Dots, 1 = Letter targets
      let solidProgress = 0;   // 0 = Particles only, 1 = Solid Light Blue Wordmark

      if (elapsed < T_SQUARE_END) {
        // Stage 1: 4 Dots in Square
        alignProgress = 0;
        morphProgress = 0;
        solidProgress = 0;
      } else if (elapsed < T_ALIGN_END) {
        // Stage 2: Smooth Glide from Square -> Linear
        const t = (elapsed - T_SQUARE_END) / (T_ALIGN_END - T_SQUARE_END);
        alignProgress = easeInOutCubic(Math.min(1, Math.max(0, t)));
        morphProgress = 0;
        solidProgress = 0;
      } else if (elapsed < T_MORPH_END) {
        // Stage 3: Smooth Particle Morph from Linear Dots -> Letters
        alignProgress = 1;
        const t = (elapsed - T_ALIGN_END) / (T_MORPH_END - T_ALIGN_END);
        morphProgress = Math.min(1, Math.max(0, t));
        solidProgress = 0;

        if (morphProgress >= 0.95 && !morphCompletedTriggered) {
          morphCompletedTriggered = true;
          if (onMorphCompleteRef.current) onMorphCompleteRef.current();
        }
      } else {
        // Stage 4: Smooth Crystallization to Solid Light Blue Text
        alignProgress = 1;
        morphProgress = 1;
        const t = (elapsed - T_MORPH_END) / (T_SOLID_END - T_MORPH_END);
        solidProgress = easeOutCubic(Math.min(1, Math.max(0, t)));

        if (solidProgress >= 0.95 && !solidCompletedTriggered) {
          solidCompletedTriggered = true;
          if (onSolidCompleteRef.current) onSolidCompleteRef.current();
        }
      }

      // Calculate current moving dot centers (Square -> Linear)
      const sq = squareCentersRef.current;
      const ln = linearCentersRef.current;
      const currentCenters = currentCentersRef.current;

      for (let i = 0; i < 4; i++) {
        if (sq[i] && ln[i] && currentCenters[i]) {
          currentCenters[i].x = sq[i].x + (ln[i].x - sq[i].x) * alignProgress;
          currentCenters[i].y = sq[i].y + (ln[i].y - sq[i].y) * alignProgress;
          currentCenters[i].radius = sq[i].radius + (ln[i].radius - sq[i].radius) * alignProgress;
        }
      }

      // 1. Soft light blue ambient radial glow behind dot centers
      if (morphProgress < 0.8) {
        const glowOpacity = 1 - morphProgress * 1.2;
        if (glowOpacity > 0) {
          for (let i = 0; i < 4; i++) {
            const dot = currentCenters[i];
            if (!dot) continue;
            const grad = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.radius * 2.8);
            grad.addColorStop(0, `rgba(224, 242, 254, ${(0.45 * glowOpacity).toFixed(3)})`);
            grad.addColorStop(0.5, `rgba(56, 189, 248, ${(0.18 * glowOpacity).toFixed(3)})`);
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.radius * 2.8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // 2. Additive blending for luminous light blue particle glow
      ctx.globalCompositeOperation = 'lighter';

      // 3. Update & render all particles (seamlessly fades as solid text crystallizes)
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const particleAlpha = Math.max(0, 1 - solidProgress * 0.88);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dotCenter = currentCenters[p.dotIndex] || currentCenters[0];
        p.update(dotCenter, morphProgress, solidProgress, elapsed, mouse);
        p.draw(ctx, particleAlpha);
      }

      // 4. Smoothly render solid luxury typography as particles crystallize
      if (solidProgress > 0.01) {
        const letterBounds = letterBoundsRef.current;
        const solidAlpha = Math.min(1, solidProgress * 1.35);

        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        letterBounds.forEach((lb) => {
          ctx.font = `800 ${lb.fontSize}px 'Plus Jakarta Sans', sans-serif`;

          // Layer 1: Ambient Back Glow (Wide soft light blue bloom)
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 40 * solidAlpha;
          ctx.fillStyle = `rgba(56, 189, 248, ${(0.35 * solidAlpha).toFixed(3)})`;
          ctx.fillText(lb.char, lb.x, lb.y);

          // Layer 2: Core Luminous Metallic Gradient Fill (No overlapping stroke wireframes!)
          ctx.shadowColor = '#BAE6FD';
          ctx.shadowBlur = 18 * solidAlpha;

          const textGrad = ctx.createLinearGradient(
            lb.x,
            lb.y - lb.fontSize * 0.45,
            lb.x,
            lb.y + lb.fontSize * 0.45
          );
          textGrad.addColorStop(0.0, `rgba(255, 255, 255, ${solidAlpha})`); // Pure diamond crest
          textGrad.addColorStop(0.25, `rgba(240, 249, 255, ${solidAlpha})`); // Ice white
          textGrad.addColorStop(0.65, `rgba(186, 230, 253, ${solidAlpha})`); // Luminous light blue
          textGrad.addColorStop(1.0, `rgba(125, 211, 252, ${solidAlpha})`); // Soft azure base

          ctx.fillStyle = textGrad;
          ctx.fillText(lb.char, lb.x, lb.y);

          // Layer 3: Top Specular Crest Reflection (Adds metallic depth & luxury 3D sheen)
          ctx.shadowBlur = 0;
          const crestGrad = ctx.createLinearGradient(
            lb.x,
            lb.y - lb.fontSize * 0.45,
            lb.x,
            lb.y
          );
          crestGrad.addColorStop(0.0, `rgba(255, 255, 255, ${(0.55 * solidAlpha).toFixed(3)})`);
          crestGrad.addColorStop(0.4, `rgba(255, 255, 255, 0)`);
          ctx.fillStyle = crestGrad;
          ctx.fillText(lb.char, lb.x, lb.y);
        });

        ctx.restore();
      }

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [word, rebuildParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10"
      style={{ touchAction: 'none' }}
    />
  );
}
