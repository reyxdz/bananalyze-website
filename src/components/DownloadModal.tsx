import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Download, QrCode, ShieldCheck, Check, Copy } from 'lucide-react';
import { sound } from '../utils/audio';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const shaHash = 'e7b94c810fe1b0be5942a031c040c1a92e43e279a509d3b23321967ee8419da4';

  const copyHash = () => {
    sound.playTap();
    navigator.clipboard?.writeText(shaHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-panel"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              padding: '36px',
              borderRadius: '28px',
              background: '#0E1A11',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              zIndex: 210
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                sound.playTap();
                onClose();
              }}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94A3B8',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: '#1B5E20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #34D399',
                color: '#34D399'
              }}>
                <Smartphone size={24} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: 0
                }}>
                  Download Banana Check APK
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                  Release v1.0.4 • 100% Offline Standalone Build
                </span>
              </div>
            </div>

            {/* Simulated QR Code for Mobile Scanning */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '18px',
              borderRadius: '18px',
              background: 'rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '24px'
            }}>
              {/* QR Code Graphic */}
              <div style={{
                width: '90px',
                height: '90px',
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
                  <rect width="100" height="100" fill="#FFFFFF" />
                  {/* Position detection markers */}
                  <rect x="5" y="5" width="28" height="28" fill="#0D2818" rx="4" />
                  <rect x="11" y="11" width="16" height="16" fill="#FFFFFF" />
                  <rect x="15" y="15" width="8" height="8" fill="#0D2818" />

                  <rect x="67" y="5" width="28" height="28" fill="#0D2818" rx="4" />
                  <rect x="73" y="11" width="16" height="16" fill="#FFFFFF" />
                  <rect x="77" y="15" width="8" height="8" fill="#0D2818" />

                  <rect x="5" y="67" width="28" height="28" fill="#0D2818" rx="4" />
                  <rect x="11" y="73" width="16" height="16" fill="#FFFFFF" />
                  <rect x="15" y="77" width="8" height="8" fill="#0D2818" />

                  {/* QR Pattern noise */}
                  <rect x="40" y="8" width="6" height="12" fill="#0D2818" />
                  <rect x="50" y="14" width="8" height="6" fill="#0D2818" />
                  <rect x="40" y="24" width="16" height="6" fill="#0D2818" />
                  <rect x="10" y="42" width="18" height="8" fill="#0D2818" />
                  <rect x="36" y="38" width="24" height="24" fill="#0D2818" rx="2" />
                  <rect x="42" y="44" width="12" height="12" fill="#FFFFFF" />
                  <rect x="68" y="42" width="10" height="18" fill="#0D2818" />
                  <rect x="84" y="46" width="10" height="10" fill="#0D2818" />
                  <rect x="40" y="68" width="14" height="10" fill="#0D2818" />
                  <rect x="60" y="70" width="12" height="22" fill="#0D2818" />
                  <rect x="78" y="68" width="16" height="6" fill="#0D2818" />
                  <rect x="76" y="80" width="18" height="12" fill="#0D2818" />
                </svg>
              </div>

              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '4px' }}>
                  Scan with Your Phone Camera
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>
                  Installs directly on Android 5.0+ devices. Zero Google Play account or cloud sign-in necessary.
                </p>
              </div>
            </div>

            {/* Direct Download Button */}
            <motion.a
              href="https://github.com/reyxdz/bananaCheck/releases"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => sound.playSuccess()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                background: '#10B981',
                color: '#062817',
                fontWeight: 800,
                fontSize: '1.05rem',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.4)',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
            >
              <Download size={20} />
              <span>Download BananaCheck-v1.0.4.apk (24.2 MB)</span>
            </motion.a>

            {/* SHA-256 Verification Hash */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontSize: '0.74rem'
            }}>
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '10px' }}>
                <span style={{ color: '#94A3B8' }}>SHA-256: </span>
                <span style={{ color: '#34D399', fontFamily: 'var(--font-mono)' }}>{shaHash.slice(0, 24)}...</span>
              </div>

              <button
                onClick={copyHash}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: copied ? '#34D399' : '#CBD5E1',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
