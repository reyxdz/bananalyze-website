/** Marks page sections that are out of view so their looping CSS animations can pause (see index.css). */
export function pauseOffscreen(): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) entry.target.toggleAttribute('data-offscreen', !entry.isIntersecting);
    },
    { rootMargin: '200px 0px' }
  );
  document.querySelectorAll('main > section, footer').forEach((el) => observer.observe(el));
  return () => observer.disconnect();
}
