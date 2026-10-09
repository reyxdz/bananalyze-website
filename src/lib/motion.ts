import { useEffect, useState } from 'react';

type Bezier = [number, number, number, number];

export const EASE_OUT: Bezier = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: Bezier = [0.65, 0, 0.35, 1];

const HOVER_QUERY = '(hover: hover) and (pointer: fine)';

export function useCanHover(): boolean {
  const [canHover, setCanHover] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(HOVER_QUERY).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY);
    const onChange = () => setCanHover(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return canHover;
}

/**
 * Props for any motion element that should drive the animated icons inside it.
 * Icons play on hover/focus with a mouse, and when scrolled into view on touch screens.
 */
export function useIconTrigger() {
  const canHover = useCanHover();
  return canHover
    ? ({ initial: 'rest', animate: 'rest', whileHover: 'active', whileFocus: 'active' } as const)
    : ({ initial: 'rest', whileInView: 'active', viewport: { amount: 0.9 } } as const);
}
