import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MODEL } from '../data/bananaData';
import { EASE_OUT } from '../lib/motion';
import { formatMegabytes, useRelease } from '../lib/release';
import { PlusMinusIcon } from './AnimatedIcons';
import { MaskText, Reveal } from './Reveal';
import './FAQSection.css';

const faqs = (download: string | null) => [
  {
    q: 'Does it really work with no internet at all?',
    a: 'Yes. The model is packed inside the app, and the app does not even ask for internet permission. Put the phone in airplane mode and scans work exactly the same.'
  },
  {
    q: 'How accurate is it?',
    a: `On ${MODEL.testPhotos} test photos it had never seen, it got both the variety and the ripeness right on ${MODEL.accuracy}% of them, and the variety alone right on ${MODEL.varietyCorrect} of ${MODEL.bananaPhotos} bananas. Its hardest call is ripe versus overripe Saba. Each result is a best guess from one photo, so check the fruit yourself before selling or eating.`
  },
  {
    q: 'Which bananas does it know?',
    a: 'Six varieties sold in Philippine markets: Saba, Cardaba, Cavendish, Señorita, Latundan and Lakatan. Each one is graded as unripe, ripe or overripe. Other varieties are not supported yet.'
  },
  {
    q: 'What if the photo is not a banana, or too unclear?',
    a: `It says so instead of guessing. The model has a separate "not a banana" answer, which caught all ${MODEL.notBananaPhotos} non-banana test photos. If two answers are too close to call, the app asks you for another photo.`
  },
  {
    q: 'What phone do I need?',
    a: `An Android phone running 5.0 (Lollipop) or newer, with a working camera.${download ? ` The download is ${download}.` : ''} No account or sign-up is needed.`
  },
  {
    q: 'Are my photos ever uploaded?',
    a: 'No. Bananalyze has no server to send them to. Photos and results are saved in a local database on your phone, and you can clear the history at any time.'
  },
  {
    q: 'Where did the training photos come from?',
    a: 'The model learned from labelled photos of the six varieties at each ripeness level, plus a set of photos that are not bananas. The test photos were kept apart from training. The method is in docs/DATASET.md in the repository.'
  }
];

export const FAQSection: React.FC = () => {
  const release = useRelease();
  const FAQS = faqs(release.status === 'ready' ? formatMegabytes(release.apk.bytes) : null);
  const [open, setOpen] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpen((cur) => (cur === i ? null : i));
  };

  return (
    <section id="faq" className="section faq">
      <div className="container faq__grid">
        <div className="faq__aside">
          <p className="label">FAQ</p>
          <MaskText className="h2 faq__title" text="Questions from the field." />
          <Reveal delay={0.15}>
            <p className="lede">
              Something not covered here? Open an issue on{' '}
              <a href="https://github.com/reyxdz/bananaCheck/issues" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              .
            </p>
          </Reveal>
        </div>

        <Reveal className="faq__list" amount={0.1}>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    className="faq__q"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                  >
                    <span>{item.q}</span>
                    <span className="faq__icon">
                      <PlusMinusIcon open={isOpen} size={18} strokeWidth={2} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ height: { duration: 0.55, ease: EASE_OUT }, opacity: { duration: 0.35 } }}
                    >
                      <motion.p
                        initial={{ y: -8 }}
                        animate={{ y: 0 }}
                        exit={{ y: -8 }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      >
                        {item.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};
