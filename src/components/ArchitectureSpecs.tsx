import React from 'react';
import { motion } from 'framer-motion';
import { MODEL } from '../data/bananaData';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import { ArrowIcon, CameraIcon, ChipIcon, DatabaseIcon } from './AnimatedIcons';
import { MaskText, Reveal } from './Reveal';
import './ArchitectureSpecs.css';

const pct = (n: number, d: number) => `${((n / d) * 100).toFixed(1)}%`;

const STEPS = [
  {
    Icon: CameraIcon,
    title: 'Photo',
    body: 'Tap Scan with one banana inside the on-screen frame, or upload a JPG or PNG from the gallery.',
    tag: 'Flutter · camera'
  },
  {
    Icon: ArrowIcon,
    title: 'Crop',
    body: `The photo is cut down to the frame you aimed with, then resized to ${MODEL.inputPx} × ${MODEL.inputPx} pixels.`,
    tag: `${MODEL.inputPx} × ${MODEL.inputPx} RGB`
  },
  {
    Icon: ChipIcon,
    title: 'Model',
    body: `A ${MODEL.architecture} network scores all ${MODEL.classes} answers: six varieties at three ripeness levels, plus "not a banana".`,
    tag: `${MODEL.runtime} · ${MODEL.sizeMb} MB`
  },
  {
    Icon: DatabaseIcon,
    title: 'Check & save',
    body: 'If it is not a banana, or the call is too close, the app asks for another photo. Otherwise the result and photo are saved on the phone.',
    tag: 'SQLite · on-device'
  }
];

const SPECS = [
  {
    title: 'Runs on',
    rows: [
      ['Minimum', 'Android 5.0 (API 21)'],
      ['Target', 'Android 14 (API 34)'],
      ['CPU', 'armeabi-v7a, arm64-v8a, x86_64'],
      ['Internet permission', 'None']
    ]
  },
  {
    title: 'The model',
    rows: [
      ['Network', MODEL.architecture],
      ['Input', `${MODEL.inputPx} × ${MODEL.inputPx} RGB`],
      ['Answers', `${MODEL.classes} (6 × 3 + not a banana)`],
      ['Size', `${MODEL.sizeMb} MB, bundled in the APK`]
    ]
  },
  {
    title: 'Tested on held-out photos',
    rows: [
      ['Test photos', `${MODEL.testPhotos}`],
      ['Variety and ripeness right', pct(MODEL.testCorrect, MODEL.testPhotos)],
      ['Variety right', `${MODEL.varietyCorrect} of ${MODEL.bananaPhotos}`],
      ['Non-bananas rejected', `${MODEL.notBananaPhotos} of ${MODEL.notBananaPhotos}`]
    ]
  }
];

export const ArchitectureSpecs: React.FC = () => {
  const trigger = useIconTrigger();

  return (
    <section id="architecture" className="section section--deep arch">
      <div className="container">
        <div className="section-head">
          <p className="label">How it works</p>
          <MaskText className="h2" text="What happens between Scan and the answer." />
          <Reveal delay={0.15}>
            <p className="lede">
              A photo goes from the camera to a saved result without leaving the phone. Four steps, all local.
            </p>
          </Reveal>
        </div>

        <div className="pipe">
          <motion.span
            className="pipe__line"
            aria-hidden="true"
            initial={{ scaleX: 0, scaleY: 0 }}
            whileInView={{ scaleX: 1, scaleY: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
          >
            <span className="pipe__packet" />
          </motion.span>

          <ol className="pipe__steps">
            {STEPS.map(({ Icon, title, body, tag }, i) => (
              <motion.li key={title} className="pipe__step" {...trigger}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE_OUT }}
                >
                  <span className="pipe__icon" style={{ animationDelay: `${i * 0.75}s` }}>
                    <Icon size={28} />
                  </span>
                  <p className="pipe__num mono">0{i + 1}</p>
                  <h3 className="h3 pipe__title">{title}</h3>
                  <p className="pipe__body">{body}</p>
                  <p className="pipe__tag mono">{tag}</p>
                </motion.div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="specs">
          {SPECS.map((group, i) => (
            <Reveal key={group.title} className="specs__group" delay={i * 0.08}>
              <h3 className="specs__title">{group.title}</h3>
              <dl>
                {group.rows.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd className="mono">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
