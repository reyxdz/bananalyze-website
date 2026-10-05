import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Terminal, FileText, Shield } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { AnimatedBananaIcon } from './AnimatedIcons';
import { sound } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playTap();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative',
      padding: '80px 0 40px',
      background: 'rgba(5, 8, 6, 0.95)',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: '#1B5E20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #34D399'
              }}>
                <AnimatedBananaIcon size={24} />
              </div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                color: '#FFFFFF'
              }}>
                banana<span style={{ color: '#FBBF24' }}>Check</span>
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '20px' }}>
              Offline edge-AI application for banana variety and ripeness classification using on-device TensorFlow Lite on Flutter.
              Built for farmers, produce sorters, and agricultural traders.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(52, 211, 153, 0.15)',
                color: '#34D399',
                border: '1px solid rgba(52, 211, 153, 0.3)'
              }}>
                ZERO CLOUD
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(251, 191, 36, 0.15)',
                color: '#FBBF24',
                border: '1px solid rgba(251, 191, 36, 0.3)'
              }}>
                38ms TFLITE
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#F0FDF4',
              marginBottom: '16px'
            }}>
              Showcase Sections
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Interactive Phone Simulator', href: '#simulator' },
                { label: 'Ripeness Transformation Matrix', href: '#ripeness' },
                { label: 'Philippine Varieties Guide', href: '#varieties' },
                { label: 'Why On-Device Edge AI Matters', href: '#offline' },
                { label: 'Field-First 2-Tap UX Mandate', href: '#field-ux' },
                { label: 'Monorepo Architecture Specs', href: '#architecture' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => sound.playTap()}
                    style={{
                      fontSize: '0.86rem',
                      color: '#94A3B8',
                      transition: 'color var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#34D399')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Repository & Open Source */}
          <div>
            <h4 style={{
              fontSize: '0.95rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#F0FDF4',
              marginBottom: '16px'
            }}>
              Open Source Monorepo
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a
                  href="https://github.com/reyxdz/bananaCheck"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.86rem',
                    color: '#94A3B8'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34D399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                >
                  <GithubIcon size={16} />
                  <span>GitHub Repository: reyxdz/bananaCheck</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/reyxdz/bananaCheck/blob/main/PROJECT_PLAN.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.86rem',
                    color: '#94A3B8'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34D399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                >
                  <FileText size={16} />
                  <span>PROJECT_PLAN.md Specifications</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/reyxdz/bananaCheck/blob/main/docs/UI_GUIDELINES.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.86rem',
                    color: '#94A3B8'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34D399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                >
                  <Shield size={16} />
                  <span>Field UI Guidelines (docs/UI_GUIDELINES.md)</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/reyxdz/bananaCheck/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.86rem',
                    color: '#94A3B8'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#34D399')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
                >
                  <Terminal size={16} />
                  <span>Releases &amp; Changelog</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          paddingTop: '28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontSize: '0.82rem',
          color: '#64748B'
        }}>
          <div>
            <span>© 2026 Banana Check • Developed for Philippine Agriculture &amp; Smallholders.</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span>Flutter 3.22.3 • Dart 3.4.4 • Python 3.11</span>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              title="Back to Top"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#34D399',
                cursor: 'pointer'
              }}
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};
