import React, { useEffect, useRef, type CSSProperties } from 'react';
import './GlitchImage.css';

/** Keep in step with the `glitch-*` animations in GlitchImage.css. */
const BURST_MS = 420;

/**
 * An image that glitches every few seconds: two copies of it, masked over
 * accent colours, slice sideways for under half a second. Masking lets it work
 * on a raster wordmark that `color` cannot reach. Runs only while on screen
 * with the tab visible, and never under reduced motion.
 */
export const GlitchImage: React.FC<{
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  everyMs?: number;
}> = ({ src, alt, width, height, className, everyMs = 3000 }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let burstTimer = 0;

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
    });
    observer.observe(el);

    const burst = (then?: () => void) => {
      el.setAttribute('data-glitch', '');
      burstTimer = window.setTimeout(() => {
        el.removeAttribute('data-glitch');
        then?.();
      }, BURST_MS);
    };

    const interval = window.setInterval(() => {
      if (!visible || document.hidden || reduce.matches) return;
      // An occasional double burst so it reads as a fault, not a metronome.
      burst(() => {
        if (Math.random() < 0.35) burstTimer = window.setTimeout(() => burst(), 90);
      });
    }, everyMs);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(burstTimer);
      observer.disconnect();
      el.removeAttribute('data-glitch');
    };
  }, [everyMs]);

  return (
    <span
      ref={ref}
      className={`glitch${className ? ` ${className}` : ''}`}
      style={{ '--glitch-mask': `url("${src}")` } as CSSProperties}
    >
      <img src={src} alt={alt} width={width} height={height} className="glitch__base" draggable={false} />
      <span aria-hidden="true" className="glitch__layer glitch__layer--b" />
      <span aria-hidden="true" className="glitch__layer glitch__layer--a" />
    </span>
  );
};
