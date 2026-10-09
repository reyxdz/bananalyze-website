import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RIPENESS_LEVELS, RIPENESS_ORDER, VARIETIES, type Variety } from '../data/bananaData';
import { EASE_OUT } from '../lib/motion';
import { MaskText, Reveal } from './Reveal';
import './VarietyGrid.css';

const FINGER = 'M12 20C34 40 82 42 108 22c3-2 7 0 4 5C90 62 30 62 9 24c-1-2 1-5 3-4z';

/** Drawn stand-in for varieties we don't have a photo of yet. */
const VarietyArt: React.FC<{ variety: Variety }> = ({ variety }) => {
  const small = variety.id === 'senorita';
  return (
    <div className="vari__art">
      <svg viewBox="0 0 320 200" aria-hidden="true">
        {small && (
          <motion.path
            d={FINGER}
            transform="translate(40 52) scale(2.1)"
            fill="none"
            stroke="rgba(236, 238, 228, 0.4)"
            strokeWidth="0.7"
            strokeDasharray="2.5 2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: EASE_OUT }}
          />
        )}
        <motion.g
          initial={{ opacity: 0, y: 18, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ delay: small ? 0.9 : 0.35, duration: 1, ease: EASE_OUT }}
        >
          <g transform={small ? 'translate(95 80) scale(1.15)' : 'translate(34 40) scale(2.2)'}>
            <path d="M11 22L4.5 11.5" stroke="#4C6B24" strokeWidth="5" strokeLinecap="round" />
            <path d={FINGER} fill={small ? 'var(--s5)' : 'var(--s4)'} stroke="rgba(15,34,25,0.55)" strokeWidth="1" />
            <path d="M16 27c22 17 66 19 90 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <circle cx="111.4" cy="25.2" r="2.2" fill="#2E2410" />
          </g>
        </motion.g>
      </svg>
      {small && <span className="vari__art-cap mono">Dashed outline: a typical dessert banana</span>}
      <span className="vari__art-note mono">Illustration · photo coming</span>
    </div>
  );
};

const tally = (v: Variety) =>
  RIPENESS_ORDER.reduce(
    (acc, r) => ({ correct: acc.correct + v.tested[r].correct, total: acc.total + v.tested[r].total }),
    { correct: 0, total: 0 }
  );

export const VarietyGrid: React.FC = () => {
  const [active, setActive] = useState(0);
  const v = VARIETIES[active];
  const total = tally(v);
  const dishes = [...new Set(RIPENESS_ORDER.flatMap((r) => v.dishes[r]))].slice(0, 6);

  return (
    <section id="varieties" className="section section--deep vari">
      <div className="container">
        <div className="section-head">
          <p className="label">Varieties</p>
          <MaskText className="h2" text="Six bananas the model knows by sight." />
          <Reveal delay={0.15}>
            <p className="lede">
              Two cooking bananas and four dessert bananas sold in Philippine markets. Each card shows how the model
              did on test photos it had never seen.
            </p>
          </Reveal>
        </div>

        <div className="vari__grid">
          <Reveal className="vari__list" amount={0.3}>
            <div role="tablist" aria-label="Banana varieties">
              {VARIETIES.map((item, i) => (
                <button
                  key={item.id}
                  role="tab"
                  id={`variety-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="variety-panel"
                  className={`vari__tab ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {i === active && (
                    <motion.span
                      layoutId="variety-mark"
                      className="vari__mark"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="vari__tab-name">{item.name}</span>
                  <span className="vari__tab-tag">{item.kind}</span>
                  <span className="vari__tab-genome mono">{item.genome}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal className="vari__panel" delay={0.1} amount={0.2}>
            <div id="variety-panel" role="tabpanel" aria-labelledby={`variety-tab-${active}`}>
              <div className="vari__photo">
                <AnimatePresence initial={false}>
                  {v.image ? (
                    <motion.img
                      key={v.id}
                      src={v.image}
                      alt={`${v.name} bananas`}
                      initial={{ clipPath: 'inset(0% 0% 0% 100%)', scale: 1.12 }}
                      animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                      exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.2 } }}
                      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    />
                  ) : (
                    <motion.div
                      key={v.id}
                      className="vari__art-wrap"
                      initial={{ clipPath: 'inset(0% 0% 0% 100%)' }}
                      animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                      exit={{ opacity: 0, transition: { delay: 0.6, duration: 0.2 } }}
                      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <VarietyArt variety={v} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="vari__sci chip">{v.kind}</span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={v.id}
                  className="vari__body"
                  initial="hidden"
                  animate="shown"
                  exit="gone"
                  variants={{
                    shown: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } }
                  }}
                >
                  <motion.div
                    className="vari__desc"
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                      gone: { opacity: 0, y: -8, transition: { duration: 0.2 } }
                    }}
                  >
                    <p>{v.description}</p>
                    <ul className="vari__uses" aria-label="Dish ideas from the app">
                      {dishes.map((u) => (
                        <li key={u}>{u}</li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 14 },
                      shown: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
                      gone: { opacity: 0, y: -8, transition: { duration: 0.2 } }
                    }}
                  >
                    <p className="mono vari__test-title">
                      Test photos fully right <b>{total.correct}/{total.total}</b>
                    </p>
                    <dl className="vari__specs">
                      {RIPENESS_LEVELS.map((r) => {
                        const t = v.tested[r.id];
                        return (
                          <div key={r.id}>
                            <dt>
                              <span className="stage-dot" style={{ background: r.color }} />
                              {r.id}
                            </dt>
                            <dd>
                              <span className="vari__bar" aria-hidden="true">
                                <motion.span
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: t.correct / t.total }}
                                  transition={{ delay: 0.3, duration: 0.9, ease: EASE_OUT }}
                                />
                              </span>
                              {t.correct}/{t.total}
                            </dd>
                          </div>
                        );
                      })}
                      <div>
                        <dt>Genome group</dt>
                        <dd>{v.genome}</dd>
                      </div>
                    </dl>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
