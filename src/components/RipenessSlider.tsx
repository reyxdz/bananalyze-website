import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RIPENESS_LEVELS, VARIETIES, type Ripeness, type RipenessLevel } from '../data/bananaData';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import { LeafIcon, ThermometerIcon } from './AnimatedIcons';
import { MaskText, Reveal } from './Reveal';
import './RipenessSlider.css';

const FRECKLES = [
  [30, 43, 1.7],
  [41, 48, 1.2],
  [52, 44, 1.9],
  [63, 50, 1.3],
  [72, 45, 1.6],
  [84, 44, 1.2],
  [94, 39, 1.5],
  [47, 52, 1],
  [36, 38, 1.1],
  [78, 51, 1]
];

const STEM: Record<Ripeness, string> = { Unripe: '#4C6B24', Ripe: '#6F6A2A', Overripe: '#5E4A1E' };

const dishesFor = (kind: 'Cooking banana' | 'Dessert banana', level: Ripeness) => [
  ...new Set(VARIETIES.filter((v) => v.kind === kind).flatMap((v) => v.dishes[level]))
].slice(0, 4);

const BananaGlyph: React.FC<{ level: RipenessLevel }> = ({ level }) => (
  <svg viewBox="0 0 120 64" className="glyph" aria-hidden="true">
    <motion.path
      d="M11 22L4.5 11.5"
      strokeWidth="5"
      strokeLinecap="round"
      initial={false}
      animate={{ stroke: STEM[level.id] }}
      transition={{ duration: 0.6 }}
    />
    <motion.path
      d="M12 20C34 40 82 42 108 22c3-2 7 0 4 5C90 62 30 62 9 24c-1-2 1-5 3-4z"
      initial={false}
      animate={{ fill: level.color }}
      transition={{ duration: 0.6 }}
      stroke="rgba(15,34,25,0.55)"
      strokeWidth="1.2"
    />
    <path d="M16 27c22 17 66 19 90 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <circle cx="111.4" cy="25.2" r="2.4" fill="#2E2410" />
    {level.id === 'Overripe' &&
      FRECKLES.map(([cx, cy, r], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="var(--fleck)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.85 }}
          transition={{ delay: 0.15 + i * 0.03, type: 'spring', stiffness: 500, damping: 20 }}
        />
      ))}
  </svg>
);

const DishList: React.FC<{ title: string; dishes: string[] }> = ({ title, dishes }) => (
  <div className="ripe__dishes">
    <p className="mono">{title}</p>
    {dishes.length ? (
      <ul>
        {dishes.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    ) : (
      <p className="ripe__wait">Let it ripen first</p>
    )}
  </div>
);

export const RipenessSlider: React.FC = () => {
  const [idx, setIdx] = useState(1);
  const level = RIPENESS_LEVELS[idx];
  const trigger = useIconTrigger();
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = Math.min(RIPENESS_LEVELS.length - 1, Math.max(0, idx + delta));
    setIdx(next);
    buttonsRef.current[next]?.focus();
  };

  return (
    <section id="ripeness" className="section ripe">
      <div className="container">
        <div className="section-head">
          <p className="label">Ripeness</p>
          <MaskText className="h2" text="Three answers, read straight from the peel." />
          <Reveal delay={0.15}>
            <p className="lede">
              Every scan ends in one of three words: unripe, ripe or overripe. Each one comes with a handling tip and
              food ideas, the same ones the app shows. Pick a level to see them.
            </p>
          </Reveal>
        </div>

        <Reveal className="chart" amount={0.3}>
          <div className="chart__row" role="radiogroup" aria-label="Ripeness level" onKeyDown={onKeyDown}>
            {RIPENESS_LEVELS.map((l, i) => {
              const isActive = i === idx;
              return (
                <button
                  key={l.id}
                  ref={(el) => {
                    buttonsRef.current[i] = el;
                  }}
                  role="radio"
                  aria-checked={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`chart__item ${isActive ? 'is-active' : ''}`}
                  onClick={() => setIdx(i)}
                >
                  <motion.span
                    className="chart__glyph"
                    animate={{ y: isActive ? -10 : 0, rotate: isActive ? -6 : 0, scale: isActive ? 1.06 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <BananaGlyph level={l} />
                  </motion.span>
                  <span className="chart__num">{l.id}</span>
                  <span className="chart__name">{l.peel}</span>
                  {isActive && (
                    <motion.span
                      layoutId="stage-bracket"
                      className="chart__bracket"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="ripe__detail">
          <Reveal className="ripe__photo">
            <AnimatePresence initial={false}>
              <motion.img
                key={level.image}
                src={level.image}
                alt={`${level.id} bananas`}
                decoding="async"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
              />
            </AnimatePresence>
            <span className="ripe__photo-chip chip">
              <span className="stage-dot" style={{ background: level.color }} />
              {level.id}
            </span>
          </Reveal>

          <Reveal className="ripe__text" delay={0.08}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={level.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                <p className="ripe__stage-num">
                  The app says <span>{level.id}</span>
                </p>
                <h3 className="h3 ripe__stage-label">{level.summary}.</h3>

                <motion.div className="ripe__note" {...trigger}>
                  <span className="ripe__note-icon">
                    <ThermometerIcon size={22} />
                  </span>
                  <div>
                    <p className="mono">Handling tip</p>
                    <p>{level.handlingTip}</p>
                  </div>
                </motion.div>
                <motion.div className="ripe__note" {...trigger}>
                  <span className="ripe__note-icon">
                    <LeafIcon size={22} />
                  </span>
                  <div>
                    <p className="mono">Health notes</p>
                    {level.health.map((h) => (
                      <p key={h}>{h}.</p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal className="ripe__comp" delay={0.16}>
            <p className="mono ripe__comp-title">Starch turning to sugar</p>
            <div className="scale" role="img" aria-label={`${level.id}: ${level.summary}`}>
              <motion.span
                className="scale__fill"
                initial={false}
                animate={{ width: `${level.sweetness * 100}%`, backgroundColor: level.color }}
                transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              />
              <motion.span
                className="scale__pin"
                initial={false}
                animate={{ left: `${level.sweetness * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 22 }}
              />
            </div>
            <div className="scale__legend mono">
              <span>More starch</span>
              <span>More sugar</span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={level.id}
                className="ripe__comp-body"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <div className="ripe__look">
                  <p className="mono">What to look for</p>
                  <p>{level.peel}</p>
                </div>
                <div className="ripe__uses">
                  <DishList title="Cooking bananas" dishes={dishesFor('Cooking banana', level.id)} />
                  <DishList title="Dessert bananas" dishes={dishesFor('Dessert banana', level.id)} />
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
