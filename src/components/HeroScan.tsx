import React, { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue
} from 'framer-motion';
import { MODEL, RIPENESS_LEVELS, VARIETY_NAMES } from '../data/bananaData';
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion';
import './HeroScan.css';

const LOCK = { left: 20, top: 26, width: 63, height: 48.5 };
const SCAN_START = 1.9;
const SCAN_DURATION = 1.3;
const SCAN_REPEAT_DELAY = 6.5;

const atScanY = (y: number) => SCAN_START + ((y - LOCK.top) / LOCK.height) * SCAN_DURATION;

interface Probe {
  id: string;
  x: number;
  y: number;
  path: [number, number][];
  label: string;
  value: string;
  side: 'left' | 'right';
}

const PROBES: Probe[] = [
  {
    id: 'hue',
    x: 30,
    y: 54,
    path: [[30, 54], [5, 54]],
    label: 'Frame read at',
    value: `${MODEL.inputPx} × ${MODEL.inputPx}`,
    side: 'left'
  },
  {
    id: 'tips',
    x: 50,
    y: 45,
    path: [[50, 45], [62, 23], [94, 23]],
    label: 'Classes checked',
    value: `${MODEL.classes}`,
    side: 'right'
  },
  { id: 'fleck', x: 73, y: 52, path: [[73, 52], [95, 52]], label: 'Not a banana', value: 'ruled out', side: 'right' }
];

const RESULT_VARIETY = 'Lakatan';
const VARIETIES = [...VARIETY_NAMES.filter((v) => v !== RESULT_VARIETY), RESULT_VARIETY];
const RESULT_LEVEL = 1;
const CORNERS = ['tl', 'tr', 'br', 'bl'];

const toSvg = (path: [number, number][]) =>
  path.map(([x, y], i) => `${i ? 'L' : 'M'}${(x * 0.75).toFixed(2)} ${y}`).join(' ');

const ProbeMark: React.FC<{ probe: Probe }> = ({ probe }) => {
  const t = atScanY(probe.y);
  const [ex, ey] = probe.path[probe.path.length - 1];
  return (
    <>
      <motion.span
        className="scan__probe"
        style={{ left: `${probe.x}%`, top: `${probe.y}%` }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 520, damping: 22, delay: t }}
      />
      <motion.span
        className={`scan__tag mono scan__tag--${probe.side} scan__tag--${probe.id}`}
        style={
          probe.side === 'left'
            ? { left: `${ex}%`, bottom: `${100 - ey}%` }
            : { right: `${100 - ex}%`, bottom: `${100 - ey}%` }
        }
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: t + 0.35, ease: EASE_OUT }}
      >
        <span className="scan__tag-k">{probe.label}</span>
        <span className="scan__tag-v">{probe.value}</span>
      </motion.span>
    </>
  );
};

const useScanLoop = (progress: MotionValue<number>, visible: boolean) => {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      progress.set(1);
      return;
    }
    if (!visible) return;
    const scan = animate(progress, [0, 1], {
      duration: SCAN_DURATION,
      delay: SCAN_START,
      ease: EASE_IN_OUT,
      repeat: Infinity,
      repeatDelay: SCAN_REPEAT_DELAY
    });
    return () => {
      scan.stop();
      progress.set(0);
    };
  }, [reduce, progress, visible]);
};

export const HeroScan: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const visible = useInView(stageRef);
  const progress = useMotionValue(0);
  useScanLoop(progress, visible);
  const result = RIPENESS_LEVELS[RESULT_LEVEL];

  const lineTop = useTransform(progress, (p): string => `${LOCK.top + p * LOCK.height}%`);
  const lensMask = useTransform(progress, (p): string => {
    const y = LOCK.top + p * LOCK.height;
    return `linear-gradient(180deg, transparent ${y - 16}%, #000 ${y - 0.5}%, transparent ${y}%)`;
  });
  const sweepOpacity = useTransform(progress, [0, 0.06, 0.92, 1], [0, 1, 1, 0]);

  return (
    <>
      <div ref={stageRef} className="scan__stage">
        <motion.div
          className="scan__photo"
          initial={{ scale: 1.16 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, delay: 0.25, ease: EASE_OUT }}
        >
          <div className="scan__drift">
            <img
              src="/assets/hero_bunch.webp"
              alt="A hand of ripe Lakatan bananas hanging from its stalk, being scanned by Bananalyze"
              width={864}
              height={1152}
              fetchPriority="high"
            />

            <motion.div
              className="scan__lens"
              aria-hidden="true"
              style={{
                clipPath: `inset(${LOCK.top}% ${100 - LOCK.left - LOCK.width}% ${100 - LOCK.top - LOCK.height}% ${LOCK.left}%)`,
                maskImage: lensMask,
                WebkitMaskImage: lensMask,
                opacity: sweepOpacity
              }}
            >
              <img src="/assets/hero_bunch.webp" alt="" />
              <span className="scan__lens-tint" />
              <span className="scan__lens-dots" />
            </motion.div>

            <motion.span
              className="scan__line"
              aria-hidden="true"
              style={{
                top: lineTop,
                left: `${LOCK.left}%`,
                width: `${LOCK.width}%`,
                opacity: sweepOpacity
              }}
            />

            <div className="scan__sticker-pin" aria-hidden="true">
              <motion.div
                className="scan__sticker"
                initial={{ scale: 1.9, rotate: 10, opacity: 0 }}
                animate={{ scale: 1, rotate: -9, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 20, delay: 3.65 }}
              >
                <span className="scan__sticker-brand">Bananalyze</span>
                <span className="scan__sticker-name">{RESULT_VARIETY}</span>
                <span className="scan__sticker-meta">{result.id}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="scan__lock"
          aria-hidden="true"
          initial={{ left: '6%', top: '8%', width: '88%', height: '84%', opacity: 0 }}
          animate={{
            left: `${LOCK.left}%`,
            top: `${LOCK.top}%`,
            width: `${LOCK.width}%`,
            height: `${LOCK.height}%`,
            opacity: 1
          }}
          transition={{ duration: 1.2, delay: 1.25, ease: EASE_OUT, opacity: { duration: 0.4, delay: 1.25 } }}
        >
          <div className="scan__lock-inner">
            {CORNERS.map((c) => (
              <motion.span
                key={c}
                className={`scan__corner scan__corner--${c}`}
                initial={{ borderColor: 'rgba(247, 248, 242, 0.92)' }}
                animate={{ borderColor: '#E8C02D' }}
                transition={{ duration: 0.5, delay: SCAN_START + SCAN_DURATION + 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        <svg className="scan__leaders" viewBox="0 0 75 100" preserveAspectRatio="none" aria-hidden="true">
          {PROBES.map((p) => (
            <motion.path
              key={p.id}
              className={`scan__leader scan__leader--${p.id}`}
              d={toSvg(p.path)}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: atScanY(p.y) + 0.1, ease: EASE_OUT }}
            />
          ))}
        </svg>

        <div className="scan__probes" aria-hidden="true">
          {PROBES.map((p) => (
            <ProbeMark key={p.id} probe={p} />
          ))}
        </div>
      </div>

      <motion.div
        className="scan__chip mono"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
      >
        <span className="scan__pulse" />
        Airplane mode · on-device
      </motion.div>

      <motion.div
        className="scan__panel"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 2.6, ease: EASE_OUT }}
      >
        <div className="scan__cell">
          <span className="mono scan__k">Variety</span>
          <span className="scan__roll">
            <motion.span
              className="scan__roll-list"
              initial={{ y: '0%', filter: 'blur(0px)' }}
              animate={{ y: `-${((VARIETIES.length - 1) / VARIETIES.length) * 100}%`, filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'] }}
              transition={{ duration: 1.05, delay: 2.85, ease: [0.7, 0, 0.2, 1] }}
            >
              {VARIETIES.map((v) => (
                <span key={v}>{v}</span>
              ))}
            </motion.span>
          </span>
        </div>

        <div className="scan__cell">
          <span className="mono scan__k">Ripeness</span>
          <span className="scan__meter">
            {RIPENESS_LEVELS.map((level, i) => (
              <span key={level.id} className="scan__seg">
                {i <= RESULT_LEVEL && (
                  <motion.span
                    style={{ background: level.color }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.45, delay: 3 + i * 0.12, ease: EASE_OUT }}
                  />
                )}
              </span>
            ))}
          </span>
          <span className="mono scan__sub">{result.id}</span>
        </div>

        <div className="scan__cell">
          <span className="mono scan__k">How sure we are</span>
          <span className="scan__meter">
            {[0, 1, 2].map((i) => (
              <span key={i} className="scan__seg">
                <motion.span
                  style={{ background: 'var(--s5)' }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.45, delay: SCAN_START + 1.1 + i * 0.12, ease: EASE_OUT }}
                />
              </span>
            ))}
          </span>
          <span className="mono scan__sub">We&apos;re pretty sure</span>
        </div>
      </motion.div>
    </>
  );
};
