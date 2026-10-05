import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';
import { sound } from '../utils/audio';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Does Banana Check really work with zero internet or Wi-Fi connectivity?',
    answer: 'Yes, 100%. The trained TensorFlow Lite neural network (quantized int8 model) and classification taxonomy are bundled directly inside the Flutter APK package. You can switch your smartphone to Airplane Mode in the middle of a remote mountain valley and inference will execute at full speed in 38 milliseconds.'
  },
  {
    question: 'How does the AI tell the difference between Lakatan and Latundan?',
    answer: 'While both are popular Philippine table bananas, the vision model identifies key morphological characteristics: Latundan features smaller, plumper fingers with papery thin peel and rounded tips, whereas Lakatan exhibits a distinct golden-orange tint, longer cylindrical curvature, and a thicker blunt apex.'
  },
  {
    question: 'Can the app classify Saba bananas when they are still completely green?',
    answer: 'Yes. Saba (and its Cardaba sub-variety) possesses a unique angular, squared cross-section with pronounced ridges and a thick pedicel stem. The model reliably identifies green Saba and classifies it as Unripe / Cooking Grade, ideal for boiling and processing into banana chips.'
  },
  {
    question: 'What are the minimum smartphone specifications needed?',
    answer: 'Banana Check supports Android 5.0 (Lollipop, API 21) through Android 14+. It requires only a standard camera lens and 1GB of RAM. The app footprint is under 25MB total, specifically designed to run on accessible, low-cost budget smartphones used by agricultural workers.'
  },
  {
    question: 'Are my crop photos or farm location ever uploaded to a server?',
    answer: 'Never. Banana Check does not communicate with any cloud backend during inference. All image frames, classification labels, confidence metrics, and timestamps remain strictly inside the local on-device SQLite database on your physical device.'
  },
  {
    question: 'How was the dataset collected and annotated?',
    answer: 'Per the project plan (docs/DATASET.md), dataset specimens are cataloged with strict provenance: variety first (Lakatan, Saba, Latundan, Cavendish), then ripeness maturity stage (Unripe, Ripe, Overripe), captured under actual field conditions with balanced sunlight, natural tree canopy shading, and crate lighting.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    sound.playTap();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" style={{
      position: 'relative',
      padding: '100px 0'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <HelpCircle size={18} color="#34D399" />
            <span style={{ color: '#34D399', fontWeight: 700 }}>FIELD &amp; TECHNICAL FAQ</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Frequently Asked <span className="gradient-text-banana">Questions</span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Everything you need to know about the on-device inference engine, model accuracy, and agricultural deployment.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{
          maxWidth: '820px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.question}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: isOpen ? '1px solid var(--border-bright)' : '1px solid var(--border-subtle)',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleItem(idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    background: isOpen ? 'rgba(255, 255, 255, 0.03)' : 'transparent'
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.08rem',
                    fontWeight: 700,
                    paddingRight: '16px',
                    color: isOpen ? '#34D399' : 'var(--text-primary)'
                  }}>
                    {faq.question}
                  </span>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ color: isOpen ? '#34D399' : 'var(--text-muted)', flexShrink: 0 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div style={{
                        padding: '0 24px 22px',
                        fontSize: '0.92rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                        paddingTop: '16px'
                      }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
