import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowIcon, DownloadIcon } from './AnimatedIcons';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import { scrollToId } from '../lib/smoothScroll';
import { formatMegabytes, useRelease } from '../lib/release';
import { MODEL } from '../data/bananaData';
import elitesWordmark from '../assets/elites-wordmark.webp';
import { GlitchImage } from './GlitchImage';
import { HeroScan } from './HeroScan';
import './HeroSection.css';

interface HeroSectionProps {
  openDownloadModal: () => void;
}

const LINES: { text: string; ripe?: string }[] = [
  { text: 'Which banana.' },
  { text: 'How ', ripe: 'ripe.' },
  { text: 'No signal.' }
];

const FACTS = [
  { value: `${MODEL.accuracy}%`, text: `of ${MODEL.testPhotos} test photos got variety and ripeness right` },
  { value: '6 × 3', text: 'varieties and ripeness levels' },
  { value: '0 KB', text: 'of mobile data. The app has no internet permission' },
  { value: `${MODEL.sizeMb} MB`, text: 'model, stored inside the app' }
];

const REVEAL_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export const HeroSection: React.FC<HeroSectionProps> = ({ openDownloadModal }) => {
  const release = useRelease();
  const trigger = useIconTrigger();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] });
  const stageY = useTransform(scrollYProgress, [0, 1], ['-2.5%', '2.5%']);

  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <motion.p
            className="label"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          >
            Banana grading for Android, fully offline
          </motion.p>

          <h1 className="display hero__title" aria-label="Which banana. How ripe. No signal.">
            {LINES.map((line, i) => (
              <span className="hero__line" key={line.text} aria-hidden="true">
                <span className="word-mask">
                  <motion.span
                    initial={{ y: '112%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.15, delay: 0.12 + i * 0.11, ease: EASE_OUT }}
                  >
                    {line.text}
                    {line.ripe && <span className="hero__ripe">{line.ripe}</span>}
                  </motion.span>
                </span>
              </span>
            ))}
          </h1>

          <motion.p
            className="lede hero__lede"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE_OUT }}
          >
            Point the phone at a banana. Bananalyze names the variety — Saba, Cardaba, Cavendish, Señorita, Latundan
            or Lakatan — and tells you if it is unripe, ripe or overripe. The model lives inside the app, so it works
            in the field, at the market, in airplane mode.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.68, ease: EASE_OUT }}
          >
            <motion.button
              className="btn btn--sticker"
              onClick={() => scrollToId('simulator')}
              {...trigger}
            >
              <span>Try the scanner</span>
              <ArrowIcon size={20} />
            </motion.button>
            <motion.button
              className="btn btn--ghost"
              onClick={openDownloadModal}
              {...trigger}
            >
              <DownloadIcon size={20} />
              <span>Download APK</span>
            </motion.button>
          </motion.div>

          <motion.p
            className="mono hero__meta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <span>
              {release.status === 'ready'
                ? `v${release.apk.version} · Android ${release.apk.minAndroid}+ · ${formatMegabytes(release.apk.bytes)} · no account needed`
                : 'Android 5.0+ · no account needed'}
            </span>
            <span className="hero__by">
              By
              <a href="https://elitesys.org" target="_blank" rel="noopener noreferrer">
                <GlitchImage src={elitesWordmark} alt="Elites" width={229} height={48} />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </span>
          </motion.p>
        </div>

        <motion.div
          ref={frameRef}
          className="hero__frame"
          initial={{ clipPath: 'inset(100% 0% 0% 0% round 34px)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0% round 34px)' }}
          transition={{ duration: 1.5, delay: 0.25, ease: REVEAL_EASE }}
        >
          <HeroScan parallax={stageY} />
        </motion.div>
      </div>

      <div className="container">
        <motion.dl
          className="hero__facts"
          initial="hidden"
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
        >
          {FACTS.map((f, i) => (
            <motion.div
              key={f.value}
              className="hero__fact"
              variants={{
                hidden: { opacity: 0, y: 16 },
                shown: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.2 + i * 0.08, ease: EASE_OUT } }
              }}
            >
              <dt>{f.value}</dt>
              <dd>{f.text}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};
