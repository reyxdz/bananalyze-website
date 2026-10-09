import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';

export type Theme = 'light' | 'dark';

interface Point {
  x: number;
  y: number;
}

/* The pre-paint script in index.html reads the same key and colours, keep them in sync. */
const STORAGE_KEY = 'bananalyze-theme';
const THEME_COLOR: Record<Theme, string> = { light: '#ECEEE4', dark: '#0B100D' };

const DURATION = 820;
const EASING = 'cubic-bezier(0.65, 0, 0.35, 1)';

const root = document.documentElement;
const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new Set<() => void>();

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function writeStored(theme: Theme | null) {
  try {
    if (theme) localStorage.setItem(STORAGE_KEY, theme);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode: the choice just won't persist */
  }
}

const systemTheme = (): Theme => (darkQuery.matches ? 'dark' : 'light');

export const getTheme = (): Theme => (root.dataset.theme === 'dark' ? 'dark' : 'light');

function apply(theme: Theme) {
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
  flushSync(() => listeners.forEach((notify) => notify()));
}

function defaultOrigin(): Point {
  const toggle = document.querySelector<HTMLElement>('[data-theme-toggle]');
  const rect = toggle?.getBoundingClientRect();
  if (rect && rect.width > 0) return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  return { x: window.innerWidth / 2, y: 0 };
}

/** A thin rim in the page's current ripeness colour that rides the edge of the reveal. */
function spawnRim({ x, y }: Point, radius: number) {
  const rim = document.createElement('div');
  rim.className = 'theme-rim';
  rim.style.left = `${x}px`;
  rim.style.top = `${y}px`;
  const inView = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
  const ripe = inView && getComputedStyle(inView).getPropertyValue('--ripe').trim();
  if (ripe) rim.style.setProperty('--ripe', ripe);
  document.body.appendChild(rim);
  return {
    play() {
      rim.animate(
        [
          { width: '0px', height: '0px', opacity: 1 },
          { opacity: 1, offset: 0.7 },
          { width: `${radius * 2}px`, height: `${radius * 2}px`, opacity: 0 }
        ],
        { duration: DURATION, easing: EASING, fill: 'forwards' }
      );
    },
    remove: () => rim.remove()
  };
}

function transitionTo(theme: Theme, origin?: Point) {
  if (theme === getTheme()) return;

  if (motionQuery.matches || document.visibilityState === 'hidden') {
    apply(theme);
    return;
  }

  if (!('startViewTransition' in document)) {
    root.classList.add('theme-fade');
    apply(theme);
    window.setTimeout(() => root.classList.remove('theme-fade'), 650);
    return;
  }

  const point = origin ?? defaultOrigin();
  const radius = Math.hypot(
    Math.max(point.x, window.innerWidth - point.x),
    Math.max(point.y, window.innerHeight - point.y)
  );

  let rim: ReturnType<typeof spawnRim> | undefined;
  const transition = document.startViewTransition(() => {
    apply(theme);
    rim = spawnRim(point, radius);
  });

  transition.ready
    .then(() => {
      const at = `at ${point.x}px ${point.y}px`;
      root.animate(
        { clipPath: [`circle(0px ${at})`, `circle(${radius}px ${at})`] },
        { duration: DURATION, easing: EASING, pseudoElement: '::view-transition-new(root)' }
      );
      rim?.play();
    })
    .catch(() => undefined);

  transition.finished.finally(() => rim?.remove());
}

/** Flip the theme from a user action. Picking whatever the device already uses drops the override. */
export function toggleTheme(origin?: Point) {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  writeStored(next === systemTheme() ? null : next);
  transitionTo(next, origin);
}

darkQuery.addEventListener('change', () => {
  const stored = readStored();
  if (stored === systemTheme()) writeStored(null);
  if (!stored || stored === systemTheme()) transitionTo(systemTheme());
});

window.addEventListener('storage', (e) => {
  if (e.key === STORAGE_KEY) transitionTo(readStored() ?? systemTheme());
});

function subscribe(notify: () => void) {
  listeners.add(notify);
  return () => listeners.delete(notify);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => 'light');
}
