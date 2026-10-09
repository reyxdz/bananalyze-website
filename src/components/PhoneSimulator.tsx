import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BANANA_SAMPLES,
  INITIAL_MOCK_HISTORY,
  RIPENESS_LEVELS,
  confidenceLevel,
  ripenessLevel,
  thumbnail,
  varietyByName
} from '../data/bananaData';
import type { BananaSample, Ripeness, ScanRecord } from '../data/bananaData';
import { sound } from '../utils/audio';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import {
  BananaMark,
  CheckIcon,
  CloseIcon,
  FlashIcon,
  GalleryIcon,
  HistoryIcon,
  RotateIcon,
  ScanIcon,
  SignalOffIcon,
  SpeakerIcon,
  SunIcon,
  UploadIcon
} from './AnimatedIcons';
import { MaskText, Reveal } from './Reveal';
import './PhoneSimulator.css';

const levelColor = (ripeness: Ripeness) => ripenessLevel(ripeness).color;

const TIPS = [
  { Icon: ScanIcon, text: 'Hold one banana inside the frame. One fruit gives the clearest answer.' },
  { Icon: SunIcon, text: 'Too dark? The app tells you and suggests the flash before you scan.' },
  { Icon: HistoryIcon, text: 'Every scan is saved on the phone with its photo. Open the clock to see them.' }
];

export const PhoneSimulator: React.FC = () => {
  const [selected, setSelected] = useState<BananaSample>(BANANA_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState<ScanRecord[]>(INITIAL_MOCK_HISTORY);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [shutterFlash, setShutterFlash] = useState(0);
  const [soundOn, setSoundOn] = useState(sound.enabled);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const trigger = useIconTrigger();

  const activeImage = customImage || selected.image;
  const level = ripenessLevel(selected.ripeness);
  const sure = confidenceLevel(selected.confidence);
  const dishes = varietyByName(selected.variety).dishes[selected.ripeness].slice(0, 3);

  const toggleSound = () => {
    const next = !sound.enabled;
    sound.enabled = next;
    setSoundOn(next);
    sound.playTap();
  };

  const handleScan = () => {
    if (isScanning) return;
    sound.playShutter();
    setShutterFlash((n) => n + 1);
    setHistoryOpen(false);
    setShowResult(false);
    setIsScanning(true);

    window.setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      sound.playSuccess();
      setHistory((prev) => [
        {
          id: `scan-${Date.now()}`,
          variety: selected.variety,
          ripeness: selected.ripeness,
          confidence: selected.confidence,
          timestamp: 'Just now',
          image: activeImage
        },
        ...prev
      ]);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setCustomImage(event.target.result);
        setShowResult(false);
        sound.playTap();
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const pickSample = (sample: BananaSample) => {
    sound.playTap();
    setSelected(sample);
    setCustomImage(null);
    setShowResult(false);
  };

  return (
    <section id="simulator" className="section on-stalk sim">
      <div className="container">
        <div className="section-head">
          <p className="label">Try it</p>
          <MaskText className="h2" text="Scan a banana without installing anything." />
          <Reveal delay={0.15}>
            <p className="lede">
              Pick a sample or load your own photo, then press the shutter. The sheet that slides up is the same one
              the app shows in the field.
            </p>
          </Reveal>
        </div>

        <div className="sim__grid">
          <Reveal className="sim__controls">
            <p className="sim__step mono">Pick a sample</p>
            <div className="sim__samples">
              {BANANA_SAMPLES.map((sample) => {
                const isSelected = selected.id === sample.id && !customImage;
                return (
                  <button
                    key={sample.id}
                    className={`sample ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => pickSample(sample)}
                    aria-pressed={isSelected}
                  >
                    <span className="sample__img">
                      <img src={thumbnail(sample.image)} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span className="sample__row">
                      <span className="sample__name">{sample.variety}</span>
                      <span className="sample__stage mono">
                        <span className="stage-dot" style={{ background: levelColor(sample.ripeness) }} />
                        {sample.ripeness}
                      </span>
                    </span>
                    {isSelected && (
                      <motion.span
                        layoutId="sample-ring"
                        className="sample__ring"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      >
                        <span className="sample__tick">
                          <CheckIcon size={14} strokeWidth={2.4} />
                        </span>
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="visually-hidden"
              tabIndex={-1}
              aria-hidden="true"
            />
            <motion.button
              className={`upload ${customImage ? 'is-loaded' : ''}`}
              onClick={() => {
                sound.playTap();
                fileInputRef.current?.click();
              }}
              {...trigger}
            >
              <span className="upload__icon">
                <UploadIcon size={22} />
              </span>
              <span className="upload__text">
                <strong>{customImage ? 'Your photo is in the viewfinder' : 'Use your own photo'}</strong>
                <span>{customImage ? 'Choose a different one' : 'A JPG or PNG from your phone or computer'}</span>
              </span>
            </motion.button>
            <p className="sim__note">
              In this demo, uploaded photos get the selected sample&apos;s result. The real model runs inside the app.
            </p>

            <ul className="sim__tips">
              {TIPS.map(({ Icon, text }) => (
                <motion.li key={text} {...trigger}>
                  <span className="sim__tip-icon">
                    <Icon size={20} />
                  </span>
                  {text}
                </motion.li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="sim__phone-wrap" delay={0.1} y={48}>
            <div className="phone">
              <div className="phone__screen">
                <div className="phone__island" />

                <div className="phone__status mono">
                  <span>09:41</span>
                  <span className="phone__status-right">
                    <SignalOffIcon size={14} />
                    <span>Offline</span>
                  </span>
                </div>

                <div className="phone__appbar">
                  <span className="phone__brand">
                    <BananaMark size={22} />
                    <span>
                      banana<b>lyze</b>
                    </span>
                  </span>
                  <span className="phone__appbar-actions">
                    <motion.button
                      className={`phone__icon-btn ${flashOn ? 'is-on' : ''}`}
                      onClick={() => {
                        sound.playTap();
                        setFlashOn((f) => !f);
                      }}
                      aria-pressed={flashOn}
                      aria-label="Torch"
                      {...trigger}
                    >
                      <FlashIcon on={flashOn} size={17} />
                    </motion.button>
                    <motion.button
                      className="phone__icon-btn"
                      onClick={() => {
                        sound.playTap();
                        setHistoryOpen(true);
                      }}
                      aria-label="Scan history"
                      {...trigger}
                    >
                      <HistoryIcon size={17} />
                    </motion.button>
                  </span>
                </div>

                <div className={`phone__view ${isScanning ? 'is-scanning' : ''} ${showResult ? 'is-locked' : ''}`}>
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt="Banana in the viewfinder"
                      decoding="async"
                      className="phone__photo"
                      style={{ filter: flashOn ? 'brightness(1.18) contrast(1.05)' : 'none' }}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE_OUT }}
                    />
                  </AnimatePresence>

                  <div className="vf" aria-hidden="true">
                    <span className="vf__c vf__c--tl" />
                    <span className="vf__c vf__c--tr" />
                    <span className="vf__c vf__c--br" />
                    <span className="vf__c vf__c--bl" />
                    {!showResult && <span className="vf__line" />}
                  </div>

                  <div className="phone__live mono">
                    <span className="phone__live-dot" />
                    Looks good, tap Scan
                  </div>

                  <AnimatePresence>
                    {shutterFlash > 0 && (
                      <motion.div
                        key={shutterFlash}
                        className="phone__flash"
                        initial={{ opacity: 0.85 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isScanning && (
                      <motion.div
                        className="phone__scanning"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="mono">Analyzing your banana…</span>
                        <span className="phone__progress">
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 1.45, ease: [0.4, 0, 0.2, 1] }}
                          />
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {showResult && (
                      <motion.div
                        className="result tone-light"
                        initial={{ y: '105%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '105%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                        role="status"
                      >
                        <span className="result__grip" />
                        <div className="result__head">
                          <div>
                            <p className="result__variety">
                              {selected.variety} <span>— {selected.ripeness}</span>
                            </p>
                            <p className="result__sci">{level.summary}</p>
                          </div>
                          <motion.button
                            className="phone__icon-btn"
                            onClick={() => setShowResult(false)}
                            aria-label="Close result"
                            {...trigger}
                          >
                            <CloseIcon size={16} />
                          </motion.button>
                        </div>

                        <div className="result__stage" aria-hidden="true">
                          {RIPENESS_LEVELS.map((r) => (
                            <span
                              key={r.id}
                              className={`result__chip ${r.id === selected.ripeness ? 'is-on' : ''}`}
                              style={{ background: r.id === selected.ripeness ? r.color : undefined }}
                            >
                              {r.id}
                            </span>
                          ))}
                        </div>

                        <div className="result__conf">
                          <span className="mono">How sure we are</span>
                          <span className="result__pct">{sure.label}</span>
                          <span className="result__bars">
                            {[0, 1, 2].map((i) => (
                              <span key={i} className="result__bar">
                                <motion.span
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: i < sure.bars ? 1 : 0 }}
                                  transition={{ duration: 0.5, delay: 0.25 + i * 0.12, ease: EASE_OUT }}
                                />
                              </span>
                            ))}
                          </span>
                        </div>

                        <p className="result__use">
                          <span className="mono">Handling tip</span>
                          {level.handlingTip}
                        </p>

                        {dishes.length > 0 && (
                          <div className="result__use">
                            <span className="mono">Suggested dishes</span>
                            <ul className="result__dishes">
                              {dishes.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button
                          className="result__again"
                          onClick={() => {
                            sound.playTap();
                            setShowResult(false);
                          }}
                        >
                          Scan Again
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {historyOpen && (
                      <motion.div
                        className="drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 32, stiffness: 280 }}
                      >
                        <div className="drawer__head">
                          <span>Saved scans</span>
                          <motion.button
                            className="phone__icon-btn"
                            onClick={() => {
                              sound.playTap();
                              setHistoryOpen(false);
                            }}
                            aria-label="Close history"
                            {...trigger}
                          >
                            <CloseIcon size={16} />
                          </motion.button>
                        </div>
                        <p className="drawer__note mono">Stored on this phone only. Nothing is uploaded.</p>
                        <ul className="drawer__list">
                          {history.map((item, i) => (
                            <motion.li
                              key={item.id}
                              initial={{ opacity: 0, x: 24 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE_OUT }}
                            >
                              <img src={thumbnail(item.image)} alt="" decoding="async" />
                              <span className="drawer__meta">
                                <strong>{item.variety}</strong>
                                <span className="mono">{item.timestamp}</span>
                              </span>
                              <span className="drawer__level mono">
                                <span className="stage-dot" style={{ background: levelColor(item.ripeness) }} />
                                {item.ripeness}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="phone__bottom">
                  <motion.button className="phone__round" onClick={() => sound.playTap()} aria-label="Switch camera" {...trigger}>
                    <RotateIcon size={19} />
                  </motion.button>

                  <motion.button
                    className="shutter"
                    onClick={handleScan}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Take photo and classify"
                    disabled={isScanning}
                  >
                    <span className="shutter__inner" />
                  </motion.button>

                  <motion.button
                    className="phone__round"
                    onClick={() => {
                      sound.playTap();
                      fileInputRef.current?.click();
                    }}
                    aria-label="Open gallery"
                    {...trigger}
                  >
                    <GalleryIcon size={19} />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="sim__under">
              <p className="sim__hint mono">Press the shutter</p>
              <motion.button
                className={`sim__sound mono ${soundOn ? 'is-on' : ''}`}
                onClick={toggleSound}
                aria-pressed={soundOn}
                {...trigger}
              >
                <SpeakerIcon on={soundOn} size={16} />
                Sound {soundOn ? 'on' : 'off'}
              </motion.button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
