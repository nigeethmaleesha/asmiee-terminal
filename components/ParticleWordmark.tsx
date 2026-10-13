"use client";

import { useCallback, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  phase: number;
};

/** Canvas-based spring particles. No images, APIs, or animation dependencies. */
export default function ParticleWordmark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -9999, y: -9999 });

  const handleMove = useCallback((event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !parent || !ctx) return;

    let particles: Particle[] = [];
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => { reduceMotion = media.matches; };
    media.addEventListener?.("change", updateMotion);

    const build = () => {
      const bounds = parent.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pointer.current = { x: -9999, y: -9999 };

      const mask = document.createElement("canvas");
      // Mask resolution is intentionally based on CSS pixels, not physical DPR.
      mask.width = Math.round(width);
      mask.height = Math.round(height);
      const m = mask.getContext("2d", { willReadFrequently: true });
      if (!m) return;
      let size = Math.min(height * 0.77, width * 0.245, 280);
      const word = "asmiee";
      m.textAlign = "center";
      m.textBaseline = "middle";
      do {
        m.font = `900 ${size}px Arial, Helvetica, sans-serif`;
        if (m.measureText(word).width <= width * 0.83) break;
        size -= 3;
      } while (size > 14);
      m.fillStyle = "#ffffff";
      m.fillText(word, width / 2, height * 0.52);
      const pixels = m.getImageData(0, 0, mask.width, mask.height).data;
      const gap = width < 600 ? 4 : width < 1000 ? 5 : 6;
      const points: Array<{ x: number; y: number }> = [];
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (pixels[(Math.floor(y) * mask.width + Math.floor(x)) * 4 + 3] > 140 && Math.random() > 0.12) {
            points.push({ x, y });
          }
        }
      }
      // Fewer particles on mobile/low-powered screens.
      const limit = width < 620 ? 880 : width < 1000 ? 1450 : 2350;
      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [points[i], points[j]] = [points[j], points[i]];
      }
      particles = points.slice(0, limit).map(({ x, y }) => ({
        x: reduceMotion ? x : width / 2 + (Math.random() - 0.5) * width * 0.95,
        y: reduceMotion ? y : height / 2 + (Math.random() - 0.5) * height * 1.1,
        tx: x,
        ty: y,
        vx: 0,
        vy: 0,
        r: Math.random() * 0.68 + (width < 600 ? 0.6 : 0.82),
        alpha: Math.random() * 0.5 + 0.42,
        phase: Math.random() * Math.PI * 2,
      }));
      frame = 0;
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      // Subtle baseline and markers make the typographic physics feel engineered.
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(188, 127, 189, .075)";
      ctx.beginPath();
      ctx.moveTo(width * 0.09, height * 0.87);
      ctx.lineTo(width * 0.91, height * 0.87);
      ctx.stroke();

      for (const item of particles) {
        if (!reduceMotion) {
          const dx = item.tx - item.x;
          const dy = item.ty - item.y;
          item.vx = (item.vx + dx * 0.026) * 0.875;
          item.vy = (item.vy + dy * 0.026) * 0.875;

          const px = item.x - pointer.current.x;
          const py = item.y - pointer.current.y;
          const dist2 = px * px + py * py;
          if (dist2 < 116 * 116 && dist2 > 0.5) {
            const dist = Math.sqrt(dist2);
            const force = Math.pow(1 - dist / 116, 2) * 4.1;
            item.vx += (px / dist) * force;
            item.vy += (py / dist) * force;
          }
          item.x += item.vx;
          item.y += item.vy;
        }
        const pulse = reduceMotion ? 0.91 : 0.8 + 0.2 * Math.sin(frame * 0.022 + item.phase);
        ctx.fillStyle = `rgba(224, ${Math.round(176 + item.alpha * 29)}, 240, ${Math.min(1, item.alpha * pulse)})`;
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      frame += 1;
      paint();
      if (!reduceMotion) raf = requestAnimationFrame(tick);
    };

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      build();
      tick();
    });
    observer.observe(parent);
    build();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      media.removeEventListener?.("change", updateMotion);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      aria-hidden="true"
      onPointerMove={handleMove}
      onPointerLeave={() => { pointer.current = { x: -9999, y: -9999 }; }}
    />
  );
}
