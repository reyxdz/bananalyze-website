import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import { SunIcon, TapIcon, TargetIcon } from './AnimatedIcons';
import { MaskText, Reveal } from './Reveal';
import './FieldFirstUX.css';

const RULES = [
  {
    Icon: TapIcon,
    title: 'Straight to the camera',
    body: 'A three-page welcome you can skip, then the camera. Point at a banana, tap Scan, read the answer. No sign-up, no account.',
    proof: ['Point', 'Scan', 'Result']
  },
  {
    Icon: TargetIcon,
    title: 'Buttons for busy hands',
    body: 'Every control is at least 48 dp. The Scan button is 80 dp and the gallery button 56 dp, easy to hit with wet or sticky fingers.',
    proof: ['48 dp minimum', '80 dp Scan']
  },
  {
    Icon: SunIcon,
    title: 'Says when the photo is bad',
    body: 'Live hints like "Too dark, turn on flash" appear before you scan. Ripeness is never shown by colour alone: every level has a word and an icon.',
    proof: ['Live hints', 'Word + icon + colour']
  }
];

export const FieldFirstUX: React.FC = () => {
  const trigger = useIconTrigger();

  return (
    <section id="field-ux" className="section field">
      <div className="container">
        <div className="section-head">
          <p className="label">Field design</p>
          <MaskText className="h2" text="Made for sap, sun and dim market stalls." />
          <Reveal delay={0.15}>
            <p className="lede">
              Most software is designed at a desk. Bananalyze was designed around farms and market stalls: budget
              phones, harsh or poor light, and hands that are busy. Every word on screen is plain language.
            </p>
          </Reveal>
        </div>

        <div className="field__grid">
          {RULES.map(({ Icon, title, body, proof }, i) => (
            <motion.article key={title} className="rule" {...trigger}>
              <motion.div
                className="rule__inner"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1, delay: i * 0.1, ease: EASE_OUT }}
              >
                <span className="rule__icon">
                  <Icon size={44} strokeWidth={1.5} />
                </span>
                <h3 className="h3 rule__title">{title}</h3>
                <p className="rule__body">{body}</p>
                <p className="rule__proof mono">
                  {proof.map((p, j) => (
                    <React.Fragment key={p}>
                      {j > 0 && <span className="rule__sep">{i === 0 ? '→' : '·'}</span>}
                      <span>{p}</span>
                    </React.Fragment>
                  ))}
                </p>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
