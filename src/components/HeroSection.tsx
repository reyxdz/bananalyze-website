import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Zap, WifiOff, CheckCircle2, ShieldCheck, ArrowRight, Play, Sparkles } from 'lucide-react';
import { AnimatedBananaIcon, AnimatedCameraScanIcon, AnimatedOfflineWifiIcon } from './AnimatedIcons';
import { sound } from '../utils/audio';

interface HeroSectionProps {
  openDownloadModal: () => void;
  scrollToSimulator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  openDownloadModal,
  scrollToSimulator
}) => {
  return (
    <section style={{
      position: 'relative',
      padding: '70px 0 100px',
      overflow: 'hidden'
    }}>
      {/* Ambient background glow accents */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '450px',
        borderRadius: '50%',
        background: 'rgba(46, 125, 50, 0.12)',
        filter: 'blur(70px)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Top Announcement Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '28px'
          }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '7px 18px',
            borderRadius: '999px',
            background: 'rgba(21, 37, 26, 0.75)',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(12px)'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#34D399',
              boxShadow: '0 0 10px #34D399',
              display: 'inline-block'
            }} />
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '0.01em'
            }}>
              On-Device TensorFlow Lite • Shipped Flutter Mobile App
            </span>
            <span style={{
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              padding: '2px 8px',
              borderRadius: '6px',
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#FBBF24',
              fontWeight: 700
            }}>
              100% OFFLINE
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center' }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: '24px',
              letterSpacing: '-0.035em'
            }}
          >
            Instant Banana Variety &amp; Ripeness Intelligence.{' '}
            <span className="gradient-text-banana">Zero Cloud Required.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.28rem)',
              color: 'var(--text-secondary)',
              maxWidth: '740px',
              margin: '0 auto 36px',
              lineHeight: 1.65
            }}
          >
            Engineered specifically for agricultural growers, farm cooperatives, and produce merchants.
            Classify <strong style={{ color: 'var(--text-primary)' }}>Lakatan, Saba, Latundan &amp; Cavendish</strong> and
            evaluate harvest ripeness stages in <strong>38 milliseconds</strong>—even in remote plantations with zero cellular reception.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '54px'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(52, 211, 153, 0.45)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sound.playTap();
                scrollToSimulator();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 32px',
                borderRadius: '16px',
                background: '#10B981',
                color: '#062817',
                fontSize: '1.05rem',
                fontWeight: 800,
                boxShadow: '0 8px 30px rgba(16, 185, 129, 0.35)',
                cursor: 'pointer'
              }}
            >
              <Play size={18} fill="#062817" />
              <span>Launch Live Simulator</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sound.playSuccess();
                openDownloadModal();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 28px',
                borderRadius: '16px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-bright)',
                color: 'var(--text-primary)',
                fontSize: '1.02rem',
                fontWeight: 700,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)'
              }}
            >
              <Smartphone size={18} color="#34D399" />
              <span>Download Android APK</span>
              <span style={{
                fontSize: '0.72rem',
                padding: '2px 6px',
                borderRadius: '6px',
                background: 'rgba(52, 211, 153, 0.15)',
                color: '#34D399',
                fontFamily: 'var(--font-mono)'
              }}>
                v1.0.4
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* 4 Core Field Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '18px',
            marginBottom: '60px'
          }}
        >
          {[
            {
              icon: <Zap size={22} color="#FBBF24" />,
              value: '38 ms',
              label: 'Edge Latency',
              desc: 'Sub-second classification on low-end ARM chipsets without network roundtrip'
            },
            {
              icon: <WifiOff size={22} color="#34D399" />,
              value: '0 KB',
              label: 'Mobile Data Used',
              desc: 'Completely standalone neural network inference without runtime servers'
            },
            {
              icon: <CheckCircle2 size={22} color="#60A5FA" />,
              value: '98.4%',
              label: 'Top-1 Accuracy',
              desc: 'Robust across direct tropical sunlight, field shadows & moisture'
            },
            {
              icon: <ShieldCheck size={22} color="#F472B6" />,
              value: '2-Tap',
              label: 'Field UX Rule',
              desc: 'App launch to result in 2 touches; large 64dp buttons for gloved hands'
            }
          ].map((metric, idx) => (
            <motion.div
              key={metric.label}
              whileHover={{ y: -6, borderColor: 'var(--border-bright)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="glass-panel"
              style={{
                padding: '24px 22px',
                borderRadius: '18px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '10px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {metric.icon}
                </div>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    lineHeight: 1,
                    color: 'var(--text-primary)'
                  }}>
                    {metric.value}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--text-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em'
                  }}>
                    {metric.label}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: 0 }}>
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Hero Plantation Visual Showcase Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            position: 'relative',
            borderRadius: '28px',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <img
            src="/assets/hero_scan.jpg"
            alt="Agricultural technician scanning banana cluster in field plantation with Banana Check app"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '520px',
              objectFit: 'cover',
              display: 'block'
            }}
          />

          {/* Gradient Overlay for text readability */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7, 11, 8, 0.1) 0%, rgba(7, 11, 8, 0.4) 60%, rgba(7, 11, 8, 0.9) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Floating Live Detection Pill */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '28px',
              right: '28px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              padding: '18px 24px',
              borderRadius: '18px',
              background: 'rgba(10, 20, 14, 0.85)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#1B5E20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #34D399'
              }}>
                <AnimatedBananaIcon size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: '1.15rem',
                    color: '#F0FDF4'
                  }}>
                    Live Field Detection: Lakatan Bunch
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: '#F59E0B',
                    color: '#1A1002',
                    fontWeight: 800
                  }}>
                    RIPE • STAGE 5
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8', margin: 0 }}>
                  Quantized on-device model confidence: <strong>98.7%</strong> • Shutter latency: <strong>34ms</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playTap();
                scrollToSimulator();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                background: '#10B981',
                color: '#042514',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              <span>Test Interactive Scanner</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Ticker marquee */}
      <div className="ticker-wrap" style={{ marginTop: '70px' }}>
        <div className="ticker-track">
          {[
            'FLUTTER 3.22.3 RUNTIME',
            'TENSORFLOW LITE QUANTIZED INT8',
            '0KB CELLULAR DATA',
            'OFFLINE SQLITE PERSISTENCE',
            '4 PHILIPPINE VARIETIES',
            '7-STAGE RIPENESS GRADING',
            '2-TAP FIELD UX MANDATE',
            '64DP TOUCH TARGETS',
            '100% PRIVATE ON-DEVICE INFERENCE'
          ].concat([
            'FLUTTER 3.22.3 RUNTIME',
            'TENSORFLOW LITE QUANTIZED INT8',
            '0KB CELLULAR DATA',
            'OFFLINE SQLITE PERSISTENCE',
            '4 PHILIPPINE VARIETIES',
            '7-STAGE RIPENESS GRADING',
            '2-TAP FIELD UX MANDATE',
            '64DP TOUCH TARGETS',
            '100% PRIVATE ON-DEVICE INFERENCE'
          ]).map((item, i) => (
            <div key={i} className="ticker-item">
              <span style={{ color: '#FBBF24' }}>✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
