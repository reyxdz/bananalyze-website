import React from 'react';
import { motion } from 'framer-motion';

interface IconProps {
  className?: string;
  size?: number;
}

export const AnimatedBananaIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      whileHover={{ scale: 1.15, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 15 }}
    >
      <defs>
        <filter id="bananaGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Banana Body */}
      <motion.path
        d="M36 8C36 8 30 10 24 15C18 20 12 28 12 36C12 40 14 42 18 42C26 42 34 35 38 27C42 19 39 12 36 8Z"
        fill="#FBBF24"
        filter="url(#bananaGlow)"
        stroke="#D97706"
        strokeWidth="1.5"
        strokeLinejoin="round"
        initial={{ pathLength: 1 }}
        animate={{ rotate: [0, -3, 3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stem */}
      <motion.path
        d="M36 8C38 6 40 5 42 6C43 7 42 9 40 10L36 10"
        stroke="#78350F"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Peel Ridge Curve */}
      <motion.path
        d="M20 18C25 24 30 28 36 30"
        stroke="#FDE047"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />

      {/* Sparkle micro-animation */}
      <motion.circle
        cx="16"
        cy="22"
        r="1.8"
        fill="#FFFFFF"
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
};

export const AnimatedCameraScanIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >


      {/* Camera Body */}
      <rect x="8" y="14" width="32" height="24" rx="7" fill="#132A1C" stroke="#34D399" strokeWidth="2" />
      <path d="M18 14L20 10H28L30 14" fill="#132A1C" stroke="#34D399" strokeWidth="2" strokeLinejoin="round" />

      {/* Lens Circle */}
      <circle cx="24" cy="26" r="7" fill="#06120B" stroke="#34D399" strokeWidth="2" />
      <circle cx="24" cy="26" r="3" fill="#34D399" />

      {/* Laser Scan Line */}
      <motion.line
        x1="12"
        y1="26"
        x2="36"
        y2="26"
        stroke="#FBBF24"
        strokeWidth="2"
        strokeLinecap="round"
        animate={{ y1: [18, 33, 18], y2: [18, 33, 18] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
};

export const AnimatedOfflineWifiIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      whileHover={{ scale: 1.15 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >


      {/* Shield Base */}
      <path
        d="M24 6L38 12V22C38 31 32 39 24 42C16 39 10 31 10 22V12L24 6Z"
        fill="#10B981"
        stroke="#6EE7B7"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* WiFi arcs with slash */}
      <path d="M18 20C20 18 22 17 24 17C26 17 28 18 30 20" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M21 24C22 23 23 22.5 24 22.5C25 22.5 26 23 27 24" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="24" cy="28" r="1.8" fill="#FFFFFF" />

      {/* Slash */}
      <motion.line
        x1="15"
        y1="33"
        x2="33"
        y2="15"
        stroke="#FEE2E2"
        strokeWidth="2.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />
    </motion.svg>
  );
};

export const AnimatedCpuChipIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      whileHover={{ scale: 1.15 }}
    >
      <rect x="14" y="14" width="20" height="20" rx="5" fill="#0C1F14" stroke="#34D399" strokeWidth="2" />
      
      {/* Neural Core */}
      <motion.rect
        x="19"
        y="19"
        width="10"
        height="10"
        rx="2"
        fill="#10B981"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Pins */}
      <path d="M20 14V8M24 14V8M28 14V8" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 34V40M24 34V40M28 34V40" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 20H8M14 24H8M14 28H8" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
      <path d="M34 20H40M34 24H40M34 28H40" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
  );
};

export const AnimatedLeafIcon: React.FC<IconProps> = ({ className = '', size = 32 }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >


      <path
        d="M38 10C24 10 14 18 12 32C18 36 28 36 36 28C40 22 40 14 38 10Z"
        fill="#22C55E"
        stroke="#22C55E"
        strokeWidth="1.5"
      />
      <path d="M12 36C18 30 26 24 38 10" stroke="#DCFCE7" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 24L30 22" stroke="#DCFCE7" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 28L24 30" stroke="#DCFCE7" strokeWidth="1.5" strokeLinecap="round" />
    </motion.svg>
  );
};
