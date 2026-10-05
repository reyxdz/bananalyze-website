import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sun, Moon, Smartphone } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { AnimatedBananaIcon } from './AnimatedIcons';
import { sound } from '../utils/audio';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  openDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  soundEnabled,
  toggleSound,
  openDownloadModal
}) => {
  return (
    <header className="navbar-container" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: theme === 'dark' ? 'rgba(7, 11, 8, 0.85)' : 'rgba(244, 247, 242, 0.9)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'background-color 0.3s ease, border-color 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Logo & Brand */}
        <a 
          href="#" 
          style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          onClick={() => sound.playTap()}
        >
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#1B5E20',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            boxShadow: '0 4px 14px rgba(46, 125, 50, 0.3)'
          }}>
            <AnimatedBananaIcon size={26} />
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 8px #34D399'
            }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)'
              }}>
                banana<span style={{ color: '#FBBF24' }}>Check</span>
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                padding: '2px 7px',
                borderRadius: '6px',
                background: 'rgba(52, 211, 153, 0.15)',
                color: '#34D399',
                border: '1px solid rgba(52, 211, 153, 0.3)'
              }}>
                OFFLINE TFLITE
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0 }}>
              On-Device Agricultural Intelligence
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px'
        }}>
          {[
            { label: 'Simulator', href: '#simulator' },
            { label: 'Ripeness Matrix', href: '#ripeness' },
            { label: 'Why Offline', href: '#offline' },
            { label: 'Field UX', href: '#field-ux' },
            { label: 'Architecture', href: '#architecture' },
            { label: 'FAQ', href: '#faq' }
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => sound.playTap()}
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#34D399')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Utility Controls & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Sound FX Toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleSound}
            aria-label="Toggle sound effects"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: soundEnabled ? '#34D399' : 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </motion.button>

          {/* Theme Toggle (Field Sunshine vs Dark Obsidian) */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={toggleTheme}
            aria-label="Toggle display mode"
            title={theme === 'dark' ? 'Switch to Field Sunlight High-Contrast Mode' : 'Switch to Dark Obsidian Mode'}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              color: theme === 'dark' ? '#FBBF24' : '#1B5E20',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* GitHub Link */}
          <motion.a
            href="https://github.com/reyxdz/bananaCheck"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => sound.playTap()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}
          >
            <GithubIcon size={16} />
            <span>GitHub</span>
          </motion.a>

          {/* Get APK CTA */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(52, 211, 153, 0.5)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              sound.playSuccess();
              openDownloadModal();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
              borderRadius: '11px',
              background: '#10B981',
              color: '#062817',
              fontWeight: 700,
              fontSize: '0.88rem',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
              cursor: 'pointer'
            }}
          >
            <Smartphone size={16} />
            <span>Get App</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
