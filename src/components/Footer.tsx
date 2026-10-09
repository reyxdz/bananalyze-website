import React from 'react';
import { motion } from 'framer-motion';
import elitesWordmark from '../assets/elites-wordmark.webp';
import { GithubIcon } from './GithubIcon';
import { GlitchImage } from './GlitchImage';
import { ArrowIcon, DownloadIcon } from './AnimatedIcons';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import { scrollToId, scrollToTop } from '../lib/smoothScroll';
import { MaskText, Reveal } from './Reveal';
import './Footer.css';

const SECTIONS = [
  { id: 'simulator', label: 'Try the scanner' },
  { id: 'ripeness', label: 'Ripeness' },
  { id: 'varieties', label: 'Varieties' },
  { id: 'offline', label: 'Why offline' },
  { id: 'field-ux', label: 'Field design' },
  { id: 'architecture', label: 'How it works' }
];

const PROJECT = [
  { href: 'https://github.com/reyxdz/bananaCheck', label: 'Source code' },
  { href: 'https://github.com/reyxdz/bananaCheck/blob/main/PROJECT_PLAN.md', label: 'Project plan' },
  { href: 'https://github.com/reyxdz/bananaCheck/blob/main/docs/UI_GUIDELINES.md', label: 'Field UI guidelines' },
  { href: 'https://github.com/reyxdz/bananaCheck/releases', label: 'Releases & changelog' }
];

export const Footer: React.FC<{ openDownloadModal: () => void }> = ({ openDownloadModal }) => {
  const trigger = useIconTrigger();

  return (
    <footer className="foot on-stalk">
      <div className="container">
        <div className="foot__cta">
          <MaskText className="h2 foot__cta-title" text="Take it to the field." />
          <Reveal className="foot__cta-actions" delay={0.2}>
            <motion.button
              className="btn btn--sticker"
              onClick={openDownloadModal}
              {...trigger}
            >
              <DownloadIcon size={20} />
              Download the APK
            </motion.button>
            <a
              className="btn btn--ghost"
              href="https://github.com/reyxdz/bananaCheck"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon size={18} />
              View the source
            </a>
          </Reveal>
        </div>

        <div className="foot__cols">
          <p className="foot__about">
            Offline banana variety and ripeness checks for farmers, vendors and anyone who buys bananas. Built with
            Flutter and TensorFlow Lite in the Philippines.
          </p>
          <nav aria-label="Sections">
            <p className="mono foot__h">On this page</p>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(s.id);
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Project">
            <p className="mono foot__h">Project</p>
            <ul>
              {PROJECT.map((p) => (
                <li key={p.href}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <motion.div
          className="foot__mark"
          aria-hidden="true"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span
            variants={{ hidden: { y: '100%' }, shown: { y: '0%' } }}
            transition={{ duration: 1.3, ease: EASE_OUT }}
          >
            banana<b>lyze</b>
          </motion.span>
        </motion.div>

        <div className="foot__bar mono">
          <span>© 2026 Bananalyze · Made for Philippine farmers and vendors</span>
          <span>Flutter 3.22.3 · TensorFlow Lite · MobileNetV2</span>
          <span className="foot__credit">
            Developed and maintained by
            <a className="foot__elites" href="https://elitesys.org" target="_blank" rel="noopener noreferrer">
              <GlitchImage src={elitesWordmark} alt="Elites" width={229} height={48} />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </span>
          <motion.button className="foot__top" onClick={scrollToTop} aria-label="Back to top" {...trigger}>
            Back to top
            <ArrowIcon direction="up" size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
