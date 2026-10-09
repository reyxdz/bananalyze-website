import { RIPENESS_LEVELS, VARIETIES } from '../data/bananaData';

/** Fetches and decodes the photos the demos swap in, once the page is idle, so a click never waits on the network. */
export function preloadImages(): () => void {
  const urls = new Set<string>();
  RIPENESS_LEVELS.forEach((level) => urls.add(level.image));
  VARIETIES.forEach((v) => v.image && urls.add(v.image));

  const load = () => urls.forEach((src) => {
    const img = new Image();
    img.src = src;
    img.decode().catch(() => {});
  });

  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(load, { timeout: 4000 });
    return () => window.cancelIdleCallback(handle);
  }
  const timer = window.setTimeout(load, 2500);
  return () => window.clearTimeout(timer);
}
