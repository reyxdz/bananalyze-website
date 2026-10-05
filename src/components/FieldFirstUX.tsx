import React from 'react';
import { motion } from 'framer-motion';
import { Target, SunMedium, Hand, MousePointerClick, ShieldCheck, CheckCircle } from 'lucide-react';

export const FieldFirstUX: React.FC = () => {
  return (
    <section id="field-ux" style={{
      position: 'relative',
      padding: '100px 0',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <Target size={18} color="#34D399" />
            <span style={{ color: '#34D399', fontWeight: 700 }}>FIELD-FIRST HUMAN DESIGN</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Engineered For Mud, Gloves, &amp; <span className="gradient-text-emerald">Noon Sun</span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Most software is designed for air-conditioned offices. Banana Check was architected around the physical realities of outdoor agriculture, detailed in the project’s strict UI Guidelines.
          </p>
        </div>

        {/* 3 Core UI Rules Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '50px'
        }}>
          {/* Rule 1: The 2-Tap Mandate */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel"
            style={{
              padding: '32px 28px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'rgba(52, 211, 153, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34D399',
                marginBottom: '20px'
              }}>
                <MousePointerClick size={26} />
              </div>

              <div style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#34D399',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}>
                MANDATORY RULE §1
              </div>

              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                Strict 2-Tap Scan Path
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                App launch directly opens the camera viewfinder. Tapping the shutter produces the classification result.
                <strong> No onboarding walkthroughs, no login screens, no verification popups, and no nested menus.</strong>
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(52, 211, 153, 0.08)',
              marginTop: '20px',
              fontSize: '0.8rem',
              color: '#34D399',
              fontWeight: 600
            }}>
              <CheckCircle size={16} />
              <span>Tap 1: Launch App → Tap 2: Shutter Click</span>
            </div>
          </motion.div>

          {/* Rule 2: 64dp Touch Target */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel"
            style={{
              padding: '32px 28px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'rgba(251, 191, 36, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FBBF24',
                marginBottom: '20px'
              }}>
                <Hand size={26} />
              </div>

              <div style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#FBBF24',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}>
                MANDATORY RULE §2
              </div>

              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                64dp Big Target Size
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Farmers and sorting workers frequently operate with damp hands, sap residue, or heavy rubber gloves.
                All interactive targets are ≥ 48dp, and the central camera trigger is a <strong>massive 72dp target</strong> with haptic feedback.
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(251, 191, 36, 0.08)',
              marginTop: '20px',
              fontSize: '0.8rem',
              color: '#FBBF24',
              fontWeight: 600
            }}>
              <CheckCircle size={16} />
              <span>Tested with thick rubber work gloves</span>
            </div>
          </motion.div>

          {/* Rule 3: Direct Sunlight Contrast */}
          <motion.div
            whileHover={{ y: -6 }}
            className="glass-panel"
            style={{
              padding: '32px 28px',
              borderRadius: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: 'rgba(96, 165, 250, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60A5FA',
                marginBottom: '20px'
              }}>
                <SunMedium size={26} />
              </div>

              <div style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#60A5FA',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}>
                MANDATORY RULE §3
              </div>

              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}>
                Outdoor Sunlight Legibility
              </h3>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                High-contrast typography (body copy ≥ 16sp, headings ≥ 20sp).
                <strong> Never rely on color alone</strong>: all ripeness indicators pair distinctive text labels, icons, and high-contrast bounding boxes visible on low-cost Android displays under direct noon glare.
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(96, 165, 250, 0.08)',
              marginTop: '20px',
              fontSize: '0.8rem',
              color: '#60A5FA',
              fontWeight: 600
            }}>
              <CheckCircle size={16} />
              <span>WCAG AAA outdoor contrast ratios</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
