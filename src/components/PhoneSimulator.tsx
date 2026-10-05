import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  RotateCw, 
  History, 
  Flashlight, 
  WifiOff, 
  Check, 
  Upload, 
  Sparkles, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  Share2,
  BookmarkPlus,
  X
} from 'lucide-react';
import { BANANA_SAMPLES, INITIAL_MOCK_HISTORY } from '../data/bananaData';
import type { BananaSample, ScanRecord } from '../data/bananaData';
import { sound } from '../utils/audio';
import { AnimatedBananaIcon, AnimatedCameraScanIcon } from './AnimatedIcons';

export const PhoneSimulator: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<BananaSample>(BANANA_SAMPLES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyList, setHistoryList] = useState<ScanRecord[]>(INITIAL_MOCK_HISTORY);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [screenFlash, setScreenFlash] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger simulated camera scan
  const handleScan = () => {
    if (isScanning) return;

    sound.playShutter();
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 80);

    setIsScanning(true);
    setShowResult(false);

    // Realistic quantized TFLite inference latency: ~38ms - 300ms UI animation
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
      sound.playSuccess();

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#FBBF24', '#34D399', '#10B981', '#F59E0B']
        });
      } catch {
        // ignore if canvas not supported
      }

      // Add to SQLite history log
      const newRecord: ScanRecord = {
        id: `scan-${Date.now().toString().slice(-4)}`,
        variety: selectedSample.variety,
        ripeness: selectedSample.ripeness,
        confidence: selectedSample.confidence,
        timestamp: 'Just now • Viewfinder Capture',
        image: customImage || selectedSample.image
      };
      setHistoryList((prev) => [newRecord, ...prev]);
    }, 450);
  };

  // Handle custom image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomImage(event.target.result as string);
          setShowResult(false);
          sound.playTap();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const activeImage = customImage || selectedSample.image;

  return (
    <section id="simulator" style={{
      position: 'relative',
      padding: '80px 0 120px',
      background: 'rgba(18, 38, 25, 0.25)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <AnimatedCameraScanIcon size={20} />
            <span style={{ color: 'var(--text-accent)', fontWeight: 700 }}>LIVE INTERACTIVE DEMO</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Experience The <span className="gradient-text-banana">Flutter App</span> in Action
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Test on-device classification without installing anything. Select a tropical banana sample below
            or upload a photo from your device, then press the <strong>shutter button</strong> to run simulated TensorFlow Lite inference.
          </p>
        </div>

        {/* Simulator Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* Left Column: Sample Switcher & Controls */}
          <div>
            <h3 style={{
              fontSize: '1.35rem',
              fontWeight: 700,
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span>1. Choose A Banana Test Specimen</span>
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px',
              marginBottom: '26px'
            }}>
              {BANANA_SAMPLES.map((sample) => {
                const isSelected = selectedSample.id === sample.id && !customImage;
                return (
                  <motion.button
                    key={sample.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      sound.playTap();
                      setSelectedSample(sample);
                      setCustomImage(null);
                      setShowResult(false);
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '12px',
                      borderRadius: '14px',
                      background: isSelected ? 'rgba(52, 211, 153, 0.15)' : 'var(--bg-card)',
                      border: isSelected ? '2px solid #34D399' : '1px solid var(--border-subtle)',
                      boxShadow: isSelected ? '0 0 20px rgba(52, 211, 153, 0.25)' : 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '75px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      marginBottom: '8px'
                    }}>
                      <img
                        src={sample.image}
                        alt={sample.variety}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        fontSize: '0.62rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: sample.badgeColor,
                        color: '#000000'
                      }}>
                        {sample.ripeness.toUpperCase()}
                      </span>
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)'
                    }}>
                      {sample.variety}
                    </span>

                    <span style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)'
                    }}>
                      Stage {sample.ripenessStageNumber} • {Math.round(sample.confidence * 100)}% Match
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Upload Custom Banana Photo */}
            <div style={{
              padding: '18px 20px',
              borderRadius: '16px',
              background: 'var(--bg-card)',
              border: customImage ? '2px solid #34D399' : '1px dashed var(--border-subtle)',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'rgba(52, 211, 153, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#34D399'
                  }}>
                    <Upload size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {customImage ? 'Custom Photo Loaded' : 'Upload From Your Camera / Gallery'}
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                      Supports JPG, PNG, WEBP from your garden or grocery
                    </p>
                  </div>
                </div>

                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <button
                    onClick={() => {
                      sound.playTap();
                      fileInputRef.current?.click();
                    }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    {customImage ? 'Replace Photo' : 'Browse File'}
                  </button>
                </div>
              </div>
            </div>

            {/* Field Guide Instructions */}
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(21, 37, 26, 0.5)',
              border: '1px solid rgba(52, 211, 153, 0.2)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#34D399',
                marginBottom: '8px'
              }}>
                <Sparkles size={16} />
                <span>Field Operator Guidelines (Project Plan §7)</span>
              </div>
              <ul style={{
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                paddingLeft: '20px',
                lineHeight: 1.6
              }}>
                <li>Position banana cluster within green reticle frame for optimal bounding.</li>
                <li>Operates under full sunlight without cellular data or cloud latency.</li>
                <li>Tap History icon inside phone to inspect stored SQLite database records.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Realistic Phone Chassis Container */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="phone-mockup-wrapper">
              <div className="phone-chassis">
                <div className="phone-screen">
                  {/* Top Notch */}
                  <div className="phone-notch">
                    <div className="phone-camera-lens" />
                  </div>

                  {/* Status Bar */}
                  <div className="phone-status-bar">
                    <span>09:41</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <WifiOff size={13} color="#34D399" aria-label="Zero cellular data used - 100% Offline" />
                      <span style={{ fontSize: '0.66rem', color: '#34D399' }}>OFFLINE</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* App Header Bar (Flutter UI) */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 16px',
                    background: 'rgba(10, 20, 13, 0.8)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    zIndex: 30
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <AnimatedBananaIcon size={20} />
                      <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 800,
                        fontSize: '1rem',
                        color: '#FFFFFF'
                      }}>
                        banana<span style={{ color: '#FBBF24' }}>Check</span>
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Flashlight toggle */}
                      <button
                        onClick={() => {
                          sound.playTap();
                          setFlashActive(!flashActive);
                        }}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: flashActive ? '#FBBF24' : 'rgba(255, 255, 255, 0.1)',
                          color: flashActive ? '#000000' : '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        <Flashlight size={15} />
                      </button>

                      {/* Local SQLite History Drawer Toggle */}
                      <button
                        onClick={() => {
                          sound.playTap();
                          setHistoryOpen(true);
                        }}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#FFFFFF',
                          cursor: 'pointer'
                        }}
                      >
                        <History size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Camera Viewfinder Viewport */}
                  <div style={{
                    position: 'relative',
                    flex: 1,
                    overflow: 'hidden',
                    background: '#040805'
                  }}>
                    {/* Viewfinder Banana Image */}
                    <img
                      src={activeImage}
                      alt="Banana in Viewfinder"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: flashActive ? 'brightness(1.2)' : 'none',
                        transition: 'filter 0.2s ease'
                      }}
                    />

                    {/* Camera Shutter White Flash overlay */}
                    <AnimatePresence>
                      {screenFlash && (
                        <motion.div
                          initial={{ opacity: 0.9 }}
                          animate={{ opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: '#FFFFFF',
                            zIndex: 60
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Bounding Box Scanner Reticle Overlay */}
                    <div className="scanner-overlay">
                      <div className="reticle-corner reticle-tl" />
                      <div className="reticle-corner reticle-tr" />
                      <div className="reticle-corner reticle-bl" />
                      <div className="reticle-corner reticle-br" />

                      {/* Pulsing laser scan line */}
                      <div className="scanner-laser" />

                      {/* Live inference stats floating badge */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '999px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(8px)',
                        fontSize: '0.68rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#34D399',
                        border: '1px solid rgba(52, 211, 153, 0.4)'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#34D399',
                          display: 'inline-block'
                        }} />
                        <span>TFLite Int8 Active • 38ms</span>
                      </div>
                    </div>

                    {/* Scanning Spinner State */}
                    {isScanning && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.65)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 40
                      }}>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            border: '3px solid rgba(52, 211, 153, 0.2)',
                            borderTopColor: '#34D399',
                            marginBottom: '12px'
                          }}
                        />
                        <span style={{
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          color: '#FFFFFF'
                        }}>
                          Running On-Device TFLite...
                        </span>
                      </div>
                    )}

                    {/* Result Sheet Card (Slides Up on scan completion) */}
                    <AnimatePresence>
                      {showResult && (
                        <motion.div
                          initial={{ y: 280, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 280, opacity: 0 }}
                          transition={{ type: 'spring', damping: 24, stiffness: 220 }}
                          style={{
                            position: 'absolute',
                            left: '10px',
                            right: '10px',
                            bottom: '10px',
                            background: 'rgba(13, 23, 16, 0.95)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            borderRadius: '22px',
                            padding: '16px',
                            border: '1px solid rgba(52, 211, 153, 0.4)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8)',
                            zIndex: 45
                          }}
                        >
                          {/* Close result button */}
                          <button
                            onClick={() => setShowResult(false)}
                            style={{
                              position: 'absolute',
                              top: '12px',
                              right: '12px',
                              color: '#94A3B8',
                              cursor: 'pointer'
                            }}
                          >
                            <X size={16} />
                          </button>

                          {/* Variety & Ripeness Header */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                            <div style={{
                              width: '38px',
                              height: '38px',
                              borderRadius: '10px',
                              background: 'rgba(52, 211, 153, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid #34D399'
                            }}>
                              <AnimatedBananaIcon size={22} />
                            </div>

                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <h4 style={{
                                  fontSize: '1.15rem',
                                  fontWeight: 800,
                                  color: '#FFFFFF',
                                  margin: 0
                                }}>
                                  {selectedSample.variety}
                                </h4>
                                <span style={{
                                  fontSize: '0.68rem',
                                  fontWeight: 800,
                                  padding: '2px 8px',
                                  borderRadius: '6px',
                                  background: selectedSample.badgeColor,
                                  color: '#000000'
                                }}>
                                  {selectedSample.ripeness.toUpperCase()}
                                </span>
                              </div>
                              <p style={{
                                fontSize: '0.72rem',
                                color: '#94A3B8',
                                fontStyle: 'italic',
                                margin: 0
                              }}>
                                {selectedSample.scientificName}
                              </p>
                            </div>
                          </div>

                          {/* Confidence Gauge Bar */}
                          <div style={{ marginBottom: '12px' }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              color: '#CBD5E1',
                              marginBottom: '4px'
                            }}>
                              <span>Model Confidence</span>
                              <span style={{ color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                                {(selectedSample.confidence * 100).toFixed(1)}%
                              </span>
                            </div>
                            <div style={{
                              width: '100%',
                              height: '6px',
                              borderRadius: '3px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              overflow: 'hidden'
                            }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${selectedSample.confidence * 100}%` }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                style={{
                                  height: '100%',
                                  background: '#10B981'
                                }}
                              />
                            </div>
                          </div>

                          {/* Agricultural & Culinary Insight */}
                          <div style={{
                            background: 'rgba(0, 0, 0, 0.35)',
                            padding: '10px',
                            borderRadius: '10px',
                            fontSize: '0.75rem',
                            color: '#E2E8F0',
                            marginBottom: '12px',
                            lineHeight: 1.45
                          }}>
                            <div style={{ fontWeight: 700, color: '#FBBF24', marginBottom: '2px' }}>
                              Recommended Use:
                            </div>
                            {selectedSample.culinaryUse}
                          </div>

                          {/* Action Button: Scan another */}
                          <button
                            onClick={() => {
                              sound.playTap();
                              setShowResult(false);
                            }}
                            style={{
                              width: '100%',
                              padding: '8px',
                              borderRadius: '10px',
                              background: '#10B981',
                              color: '#062817',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            Scan Another Specimen
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* SQLite Local History Drawer Modal inside Phone */}
                    <AnimatePresence>
                      {historyOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: '100%' }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: '100%' }}
                          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(8, 14, 10, 0.98)',
                            backdropFilter: 'blur(20px)',
                            zIndex: 55,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '16px'
                          }}
                        >
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingBottom: '12px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            marginBottom: '14px'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <History size={18} color="#34D399" />
                              <span style={{ fontWeight: 800, fontSize: '0.98rem', color: '#FFFFFF' }}>
                                Local SQLite History
                              </span>
                            </div>

                            <button
                              onClick={() => {
                                sound.playTap();
                                setHistoryOpen(false);
                              }}
                              style={{ color: '#94A3B8', cursor: 'pointer' }}
                            >
                              <X size={18} />
                            </button>
                          </div>

                          <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '12px' }}>
                            Stored on-device via Sqflite. 0KB synced to external servers.
                          </div>

                          {/* Records list */}
                          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {historyList.map((item) => (
                              <div
                                key={item.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  padding: '10px',
                                  borderRadius: '10px',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                  border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                              >
                                <img
                                  src={item.image}
                                  alt={item.variety}
                                  style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                                />
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#FFFFFF' }}>
                                      {item.variety}
                                    </span>
                                    <span style={{
                                      fontSize: '0.64rem',
                                      padding: '1px 5px',
                                      borderRadius: '4px',
                                      background: item.ripeness === 'Ripe' ? '#F59E0B' : '#84CC16',
                                      color: '#000000',
                                      fontWeight: 800
                                    }}>
                                      {item.ripeness}
                                    </span>
                                  </div>
                                  <div style={{ fontSize: '0.68rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={11} />
                                    <span>{item.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Shutter Bottom Bar (Flutter UI 64dp Touch Target) */}
                  <div style={{
                    padding: '16px 20px',
                    background: 'rgba(10, 18, 12, 0.95)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    zIndex: 30
                  }}>
                    {/* Switch camera simulated */}
                    <button
                      onClick={() => sound.playTap()}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94A3B8',
                        cursor: 'pointer'
                      }}
                    >
                      <RotateCw size={18} />
                    </button>

                    {/* Primary Camera Shutter (>= 64dp per guidelines) */}
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={handleScan}
                      className="camera-shutter-btn"
                      aria-label="Capture banana for inference"
                    >
                      <div className="camera-shutter-inner" />
                    </motion.button>

                    {/* Gallery open simulated */}
                    <button
                      onClick={() => {
                        sound.playTap();
                        fileInputRef.current?.click();
                      }}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#94A3B8',
                        cursor: 'pointer'
                      }}
                    >
                      <Camera size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
