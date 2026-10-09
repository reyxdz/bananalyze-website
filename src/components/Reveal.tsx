import React from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT } from '../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  style?: React.CSSProperties;
}

export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, y = 28, amount = 0.2, style }) => (
  <motion.div
    className={className}
    style={style}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount }}
    transition={{ duration: 1, ease: EASE_OUT, delay }}
  >
    {children}
  </motion.div>
);

interface MaskTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  /** Words to wrap in a span with this class, e.g. to tint them. */
  highlight?: { words: string[]; className: string };
}

/** Word-by-word rise from behind a mask. Screen readers get the plain sentence. */
export const MaskText: React.FC<MaskTextProps> = ({
  text,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.045,
  immediate = false,
  highlight
}) => {
  const Tag = motion[as];
  const words = text.split(' ');
  const trigger = immediate
    ? { initial: 'hidden', animate: 'shown' }
    : { initial: 'hidden', whileInView: 'shown', viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={className} aria-label={text} {...trigger}>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="word-mask" aria-hidden="true">
            <motion.span
              className={highlight?.words.includes(word) ? highlight.className : undefined}
              variants={{
                hidden: { y: '110%', rotate: 4 },
                shown: { y: '0%', rotate: 0, transition: { duration: 1, ease: EASE_OUT, delay: delay + i * stagger } }
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </Tag>
  );
};
