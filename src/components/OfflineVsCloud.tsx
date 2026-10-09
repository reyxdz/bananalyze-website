import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform
} from 'framer-motion';
import { MODEL } from '../data/bananaData';
import { EASE_IN_OUT, EASE_OUT, useIconTrigger } from '../lib/motion';
import { BananaMark, CheckIcon, ChipIcon, CloudIcon, RotateIcon, SignalOffIcon } from './AnimatedIcons';
import { MaskText, Reveal } from './Reveal';
import './OfflineVsCloud.css';

/** How far the cloud upload gets before it gives up. */
const CLOUD_STALL = 0.34;
/** The app shows its "Analyzing your banana…" screen for at least 1.5 s. */
const ANALYZE_S = 1.5;

const ROWS = [
  { label: 'Waiting for an answer', cloud: 'Depends on the signal', ours: 'No upload, no queue' },
  { label: 'No signal at all', cloud: 'Stops working', ours: 'Works exactly the same' },
  { label: 'Mobile data per scan', cloud: 'Every photo is uploaded', ours: 'None. The app has no internet permission' },
  { label: 'Running cost', cloud: 'Servers, billed every month', ours: 'Nothing. The phone does the work' },
  { label: 'Your photos and history', cloud: "Sent to someone else's server", ours: 'Never leave the phone' }
];

type CloudState = 'idle' | 'trying' | 'failed';

const SignalRace: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [run, setRun] = useState(0);
  const [cloudState, setCloudState] = useState<CloudState>('idle');
  const [oursDone, setOursDone] = useState(false);
  const trigger = useIconTrigger();

  const cloud = useMotionValue(0);
  const ours = useMotionValue(0);
  const oursSpring = useSpring(ours, { stiffness: 500, damping: 22 });
  const checkScale = useTransform(oursSpring, [0.9, 1], [0.4, 1]);
  const checkOpacity = useTransform(ours, [0.96, 1], [0, 1]);

  useMotionValueEvent(cloud, 'change', (v) =>
    setCloudState(v >= CLOUD_STALL - 0.001 ? 'failed' : v > 0 ? 'trying' : 'idle')
  );
  useMotionValueEvent(ours, 'change', (v) => setOursDone(v >= 1));

  useEffect(() => {
    if (!inView) return;
    cloud.jump(0);
    ours.jump(0);
    const c = animate(cloud, CLOUD_STALL, { duration: 2.8, ease: [0.2, 0.7, 0.3, 1], delay: 0.1 });
    const l = animate(ours, 1, { duration: ANALYZE_S, ease: EASE_IN_OUT, delay: 0.1 });
    return () => {
      c.stop();
      l.stop();
    };
  }, [inView, run, cloud, ours]);

  const cloudText = cloudState === 'failed' ? 'No connection' : cloudState === 'trying' ? 'Uploading…' : '—';

  return (
    <div className="race" ref={ref}>
      <div className="race__head">
        <p className="mono">One scan, same phone, no signal</p>
        <motion.button className="race__replay mono" onClick={() => setRun((r) => r + 1)} {...trigger}>
          <RotateIcon size={16} />
          Run again
        </motion.button>
      </div>

      <div className={`race__lane ${cloudState === 'failed' ? 'is-failed' : ''}`}>
        <div className="race__who">
          <span className="race__icon">
            <CloudIcon size={22} play={cloudState === 'trying'} />
          </span>
          <span>
            Cloud app <small>needs a server to answer</small>
          </span>
        </div>
        <div className="race__track">
          <motion.span className="race__bar race__bar--cloud" style={{ scaleX: cloud }} />
        </div>
        <div className="race__time mono" aria-live="polite">
          {cloudText}
        </div>
      </div>

      <div className="race__lane race__lane--ours">
        <div className="race__who">
          <span className="race__icon">
            <ChipIcon size={22} play={oursDone} />
          </span>
          <span>
            Bananalyze <small>airplane mode on</small>
          </span>
        </div>
        <div className="race__track">
          <motion.span className="race__bar race__bar--ours" style={{ scaleX: ours }} />
          <motion.span className="race__done" style={{ scale: checkScale, opacity: checkOpacity }}>
            {oursDone && <CheckIcon size={14} strokeWidth={2.6} />}
          </motion.span>
        </div>
        <div className="race__time mono" aria-live="polite">
          {oursDone ? 'Lakatan · Ripe' : 'Analyzing…'}
        </div>
      </div>
    </div>
  );
};

export const OfflineVsCloud: React.FC = () => {
  const trigger = useIconTrigger();

  return (
    <section id="offline" className="section on-stalk off">
      <div className="container">
        <div className="section-head">
          <p className="label">Offline</p>
          <MaskText className="h2" text="Built for the places with no bars." />
          <Reveal delay={0.15}>
            <p className="lede">
              Farms sit under canopy, behind ridges, far from towers, and market stalls often get one bar at best. Apps
              that send photos to a server stall right where bananas are sorted and sold. Bananalyze never needs to
              ask.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <SignalRace />
        </Reveal>

        <Reveal className="compare" amount={0.15}>
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">Compared on</span>
                </th>
                <th scope="col">
                  <motion.span className="compare__th" {...trigger}>
                    <SignalOffIcon size={20} />
                    Cloud apps
                  </motion.span>
                </th>
                <th scope="col" className="compare__ours">
                  <motion.span className="compare__th" {...trigger}>
                    <BananaMark size={24} />
                    Bananalyze
                  </motion.span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: EASE_OUT }}
                >
                  <th scope="row">{row.label}</th>
                  <td data-label="Cloud apps">{row.cloud}</td>
                  <td data-label="Bananalyze" className="compare__ours">
                    {row.ours}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal className="off__foot">
          <p>
            The model ships inside the app, so the first scan works straight after install. There is nothing to
            download later and no account to make.
          </p>
          <div className="off__chips">
            <span className="chip">Model {MODEL.sizeMb} MB</span>
            <span className="chip">{MODEL.architecture}</span>
            <span className="chip">{MODEL.runtime}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
