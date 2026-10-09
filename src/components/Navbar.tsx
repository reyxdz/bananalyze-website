import React, { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue
} from 'framer-motion';
import appLogo from '../assets/bananalyze-logo.png';
import { DownloadIcon, MenuIcon, ArrowIcon, ThemeIcon } from './AnimatedIcons';
import { GithubIcon } from './GithubIcon';
import { RIPENESS_LEVELS } from '../data/bananaData';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import { lockScroll, scrollToId, scrollToTop } from '../lib/smoothScroll';
import { toggleTheme, useTheme } from '../lib/theme';
import { formatMegabytes, useRelease } from '../lib/release';
import './Navbar.css';

const LINKS = [
  { id: 'simulator', label: 'Try it' },
  { id: 'ripeness', label: 'Ripeness' },
  { id: 'varieties', label: 'Varieties' },
  { id: 'offline', label: 'Offline' },
  { id: 'field-ux', label: 'Field design' },
  { id: 'architecture', label: 'How it works' },
  { id: 'faq', label: 'FAQ' }
];

const STAGES = RIPENESS_LEVELS.length;

const linkColor = (i: number) => RIPENESS_LEVELS[Math.round((i * (STAGES - 1)) / (LINKS.length - 1))].color;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const StripSegment: React.FC<{ progress: MotionValue<number>; index: number }> = ({ progress, index }) => {
  const scaleX = useTransform(progress, [index / STAGES, (index + 1) / STAGES], [0, 1], { clamp: true });
  return (
    <span className="strip__seg">
      <motion.span className="strip__fill" style={{ scaleX, background: RIPENESS_LEVELS[index].color }} />
    </span>
  );
};

interface NavbarProps {
  progress: MotionValue<number>;
  openDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ progress, openDownloadModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [stageIdx, setStageIdx] = useState(0);
  const active = useActiveSection(LINKS.map((l) => l.id));
  const trigger = useIconTrigger();
  const dark = useTheme() === 'dark';
  const release = useRelease();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 12));
  useMotionValueEvent(progress, 'change', (p) => {
    setStageIdx(Math.min(STAGES - 1, Math.floor(p * STAGES)));
  });

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      window.setTimeout(() => scrollToId(id), 380);
    } else {
      scrollToId(id);
    }
  };

  const stage = RIPENESS_LEVELS[stageIdx];

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${menuOpen ? 'nav--open' : ''}`}>
      <div className="container nav__bar">
        <motion.a
          href="#top"
          className="nav__brand"
          aria-label="Bananalyze, back to top"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            scrollToTop();
          }}
          {...trigger}
        >
          <motion.span
            className="nav__logo"
            variants={{
              rest: { rotate: 0, scale: 1 },
              active: { rotate: -7, scale: 1.06, transition: { type: 'spring', stiffness: 380, damping: 16 } }
            }}
          >
            <img src={appLogo} alt="" width={34} height={34} />
            <motion.span
              className="nav__logo-sweep"
              aria-hidden="true"
              variants={{
                rest: { y: '-110%', opacity: 0, transition: { duration: 0 } },
                active: { y: '110%', opacity: [0, 1, 0], transition: { duration: 0.75, ease: EASE_OUT } }
              }}
            />
          </motion.span>
          <span className="nav__word">
            banana<b>lyze</b>
          </span>
        </motion.a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
              aria-current={active === link.id ? 'true' : undefined}
              onClick={(e) => go(e, link.id)}
            >
              {link.label}
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="nav__link-mark"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="icon-btn nav__gh"
            href="https://github.com/reyxdz/bananaCheck"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bananalyze on GitHub"
          >
            <GithubIcon size={18} />
          </a>

          <motion.button
            className="icon-btn nav__theme"
            data-theme-toggle
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
            }}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={dark ? 'Light theme' : 'Dark theme'}
            {...trigger}
          >
            <ThemeIcon dark={dark} size={19} />
          </motion.button>

          <motion.button
            className="btn btn--sticker btn--small nav__cta"
            onClick={openDownloadModal}
            {...trigger}
          >
            <DownloadIcon size={18} />
            <span>Get the app</span>
          </motion.button>

          <button
            className="icon-btn nav__menu"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <MenuIcon open={menuOpen} size={22} />
          </button>
        </div>
      </div>

      <div className="strip" aria-hidden="true">
        {RIPENESS_LEVELS.map((s, i) => (
          <StripSegment key={s.id} progress={progress} index={i} />
        ))}
      </div>

      <div className="container strip-label-wrap" aria-hidden="true">
        <div className="strip-label mono">
          <span className="stage-dot" style={{ background: stage.color }} />
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={stage.id}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              {stage.id} · {stage.summary}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="sheet"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="container sheet__links" aria-label="Sections">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className="sheet__link"
                  onClick={(e) => go(e, link.id)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.18 + i * 0.05, duration: 0.7, ease: EASE_OUT } }}
                  exit={{ y: -16, opacity: 0, transition: { duration: 0.25 } }}
                  whileHover="active"
                >
                  <span className="stage-dot" style={{ background: linkColor(i) }} />
                  <span className="sheet__text">{link.label}</span>
                  <span className="sheet__arrow">
                    <ArrowIcon size={22} />
                  </span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="container sheet__foot"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <button
                className="btn btn--sticker"
                onClick={() => {
                  setMenuOpen(false);
                  openDownloadModal();
                }}
              >
                <DownloadIcon size={20} />
                Download the APK
              </button>
              <span className="mono sheet__meta">
                Android 5.0+ · {release.status === 'ready' ? `${formatMegabytes(release.apk.bytes)} · ` : ''}works offline
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
