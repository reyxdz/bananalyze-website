import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion';

/*
 * Every icon is drawn on a 24px grid and split into parts that animate on
 * their own timelines. Icons listen for the 'rest' / 'active' variant from the
 * nearest motion ancestor (see useIconTrigger), or can be driven directly with
 * the `play` prop. Accent strokes pick up --icon-accent.
 */

export interface IconProps {
  size?: number;
  className?: string;
  play?: boolean;
  strokeWidth?: number;
}

const Svg: React.FC<IconProps & { children: React.ReactNode; viewBox?: string }> = ({
  size = 24,
  className = '',
  play,
  strokeWidth = 1.75,
  viewBox = '0 0 24 24',
  children
}) => {
  const control = play === undefined ? {} : { initial: 'rest', animate: play ? 'active' : 'rest' };
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`ic ${className}`}
      aria-hidden="true"
      focusable="false"
      {...control}
    >
      {children}
    </motion.svg>
  );
};

const accent = { stroke: 'var(--icon-accent, currentColor)' };
const accentFill = { fill: 'var(--icon-accent, currentColor)', stroke: 'none' };

/* ---------------------------------------------------------------- arrows */

const arrowExit: Variants = {
  rest: { x: 0, opacity: 1 },
  active: {
    x: [0, 12, -12, 0],
    opacity: [1, 0, 0, 1],
    transition: { duration: 0.75, times: [0, 0.4, 0.41, 1], ease: EASE_IN_OUT }
  }
};

export const ArrowIcon: React.FC<IconProps & { direction?: 'right' | 'up' | 'down' }> = ({
  direction = 'right',
  ...props
}) => {
  const rotation = { right: 0, up: -90, down: 90 }[direction];
  return (
    <Svg {...props}>
      <g transform={`rotate(${rotation} 12 12)`}>
        <motion.g variants={arrowExit}>
          <motion.path
            d="M4 12h15"
            variants={{
              rest: { pathLength: 1 },
              active: { pathLength: [1, 1, 0.15, 1], transition: { duration: 0.75, times: [0, 0.4, 0.41, 1] } }
            }}
          />
          <motion.path
            d="M13 6l6 6-6 6"
            variants={{
              rest: { x: 0 },
              active: { x: [0, 0, -5, 0], transition: { duration: 0.75, times: [0, 0.4, 0.41, 1], ease: EASE_OUT } }
            }}
          />
        </motion.g>
      </g>
    </Svg>
  );
};

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.path
      d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
      variants={{
        rest: { y: 0 },
        active: { y: [0, 0, 1.6, 0], transition: { duration: 0.9, times: [0, 0.34, 0.46, 0.8], ease: EASE_OUT } }
      }}
    />
    <motion.g
      variants={{
        rest: { y: 0, opacity: 1 },
        active: {
          y: [0, 5, -11, 0],
          opacity: [1, 0, 0, 1],
          transition: { duration: 0.9, times: [0, 0.36, 0.37, 1], ease: EASE_IN_OUT }
        }
      }}
    >
      <path d="M12 4v11" />
      <path d="M7.5 10.5L12 15l4.5-4.5" />
    </motion.g>
  </Svg>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.path
      d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
      variants={{
        rest: { scaleX: 1 },
        active: { scaleX: [1, 0.86, 1], transition: { duration: 0.6, ease: EASE_OUT } }
      }}
    />
    <motion.g
      variants={{
        rest: { y: 0, opacity: 1 },
        active: {
          y: [0, -6, 9, 0],
          opacity: [1, 0, 0, 1],
          transition: { duration: 0.85, times: [0, 0.38, 0.39, 1], ease: EASE_IN_OUT }
        }
      }}
    >
      <path d="M12 15V4" />
      <path d="M7.5 8.5L12 4l4.5 4.5" />
    </motion.g>
  </Svg>
);

/* ---------------------------------------------------------------- camera & scanning */

const corners = [
  { d: 'M4 8V6a2 2 0 0 1 2-2h2', dx: 1.6, dy: 1.6 },
  { d: 'M16 4h2a2 2 0 0 1 2 2v2', dx: -1.6, dy: 1.6 },
  { d: 'M20 16v2a2 2 0 0 1-2 2h-2', dx: -1.6, dy: -1.6 },
  { d: 'M8 20H6a2 2 0 0 1-2-2v-2', dx: 1.6, dy: -1.6 }
];

export const ScanIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    {corners.map((c, i) => (
      <motion.path
        key={c.d}
        d={c.d}
        variants={{
          rest: { x: 0, y: 0 },
          active: { x: [0, c.dx, 0], y: [0, c.dy, 0], transition: { duration: 0.65, delay: i * 0.06, ease: EASE_OUT } }
        }}
      />
    ))}
    <motion.path
      d="M7.5 12h9"
      style={accent}
      variants={{
        rest: { y: 0 },
        active: { y: [0, -4.5, 4.5, 0], transition: { duration: 1.2, ease: EASE_IN_OUT } }
      }}
    />
  </Svg>
);

export const CameraIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.path
      d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.6l1.4-2h5l1.4 2h1.6A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z"
      variants={{
        rest: { y: 0 },
        active: { y: [0, 0.8, 0], transition: { duration: 0.35, ease: EASE_OUT } }
      }}
    />
    <motion.circle
      cx="12"
      cy="12.5"
      r="3.6"
      variants={{
        rest: { scale: 1 },
        active: { scale: [1, 0.8, 1.06, 1], transition: { duration: 0.7, ease: EASE_OUT } }
      }}
    />
    <motion.circle
      cx="12"
      cy="12.5"
      r="1.4"
      style={accentFill}
      variants={{
        rest: { scale: 1 },
        active: { scale: [1, 0, 1.5, 1], transition: { duration: 0.8, delay: 0.08, ease: EASE_OUT } }
      }}
    />
    <motion.circle
      cx="16.9"
      cy="9"
      r="0.7"
      fill="currentColor"
      stroke="none"
      variants={{
        rest: { opacity: 1 },
        active: { opacity: [1, 0, 1, 0, 1], transition: { duration: 0.6, delay: 0.1 } }
      }}
    />
  </Svg>
);

export const RotateIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.g
      variants={{
        rest: { rotate: 0 },
        active: { rotate: [0, 180], transition: { duration: 0.7, ease: EASE_IN_OUT } }
      }}
    >
      <path d="M19.5 10.5A7.7 7.7 0 0 0 5.6 7.4" />
      <path d="M5 3.8v3.9h3.9" />
      <path d="M4.5 13.5a7.7 7.7 0 0 0 13.9 3.1" />
      <path d="M19 20.2v-3.9h-3.9" />
    </motion.g>
  </Svg>
);

export const GalleryIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="4" y="5" width="16" height="14" rx="2.6" />
    <motion.path
      d="M4.5 16.5l4.2-4.2 3.4 3.4 2.4-2.4 4.8 4.8"
      variants={{
        rest: { pathLength: 1 },
        active: { pathLength: [0, 1], transition: { duration: 0.7, ease: EASE_OUT } }
      }}
    />
    <motion.circle
      cx="15.4"
      cy="9.4"
      r="1.4"
      style={accentFill}
      variants={{
        rest: { y: 0 },
        active: { y: [3, -0.8, 0], transition: { duration: 0.7, delay: 0.15, ease: EASE_OUT } }
      }}
    />
  </Svg>
);

export const FlashIcon: React.FC<IconProps & { on?: boolean }> = ({ on = false, ...props }) => (
  <Svg {...props}>
    <motion.g
      variants={{
        rest: { scale: 1, rotate: 0 },
        active: { scale: [1, 0.82, 1.08, 1], rotate: [0, -8, 4, 0], transition: { duration: 0.55, ease: EASE_OUT } }
      }}
    >
      <motion.path
        d="M13.2 3L5.8 13.2h5.4L10.4 21l7.8-10.6h-5.4z"
        initial={false}
        animate={{ fillOpacity: on ? 1 : 0 }}
        fill="currentColor"
        transition={{ duration: 0.25 }}
      />
    </motion.g>
  </Svg>
);

const historyHands = (
  <>
    <circle cx="12" cy="12" r="4.6" stroke="none" />
    <path d="M12 8.2V12l2.6 1.6" />
  </>
);

export const HistoryIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.path
      d="M4.6 12a7.4 7.4 0 1 0 2.2-5.3L4.6 9"
      variants={{
        rest: { pathLength: 1 },
        active: { pathLength: [1, 0.25, 1], transition: { duration: 0.8, ease: EASE_IN_OUT } }
      }}
    />
    <path d="M4.6 5v4h4" />
    <motion.g
      variants={{
        rest: { rotate: 0 },
        active: { rotate: [0, -360], transition: { duration: 0.9, ease: EASE_IN_OUT } }
      }}
    >
      {historyHands}
    </motion.g>
  </Svg>
);

/* ---------------------------------------------------------------- connectivity & compute */

const bars = [
  { x: 3.6, h: 3.4 },
  { x: 8.1, h: 6.4 },
  { x: 12.6, h: 9.4 },
  { x: 17.1, h: 12.4 }
];

export const SignalOffIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    {bars.map((b, i) => (
      <motion.rect
        key={b.x}
        x={b.x}
        y={19.5 - b.h}
        width="2.8"
        height={b.h}
        rx="1"
        fill="currentColor"
        stroke="none"
        style={{ originY: 1 }}
        variants={{
          rest: { opacity: 0.28, scaleY: 1 },
          active: { opacity: [0.28, 1, 0.28], scaleY: [1, 0.25, 1], transition: { duration: 0.75, delay: i * 0.08, ease: EASE_OUT } }
        }}
      />
    ))}
    <motion.path
      d="M3.5 4l17 16"
      style={accent}
      strokeWidth={2}
      variants={{
        rest: { pathLength: 1 },
        active: { pathLength: [1, 0, 1], transition: { duration: 1, times: [0, 0.35, 1], ease: EASE_IN_OUT } }
      }}
    />
  </Svg>
);

export const CloudIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.path
      d="M7 18.5h10a4 4 0 0 0 .7-7.94A6 6 0 0 0 6.2 9.6 4.5 4.5 0 0 0 7 18.5z"
      variants={{
        rest: { y: 0 },
        active: { y: [0, -1, 0], transition: { duration: 1, ease: EASE_IN_OUT } }
      }}
    />
    {[9.5, 12, 14.5].map((cx, i) => (
      <motion.circle
        key={cx}
        cx={cx}
        cy="14.4"
        r="0.85"
        fill="currentColor"
        stroke="none"
        variants={{
          rest: { opacity: 0.35 },
          active: { opacity: [0.35, 1, 0.35], transition: { duration: 0.6, delay: 0.15 + i * 0.15 } }
        }}
      />
    ))}
  </Svg>
);

const pins = ['M10 7V4', 'M14 7V4', 'M17 10h3', 'M17 14h3', 'M14 17v3', 'M10 17v3', 'M7 14H4', 'M7 10H4'];

export const ChipIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <rect x="7" y="7" width="10" height="10" rx="2.5" />
    {pins.map((d, i) => (
      <motion.path
        key={d}
        d={d}
        variants={{
          rest: { pathLength: 1, opacity: 1 },
          active: { pathLength: [1, 0, 1], opacity: [1, 0.3, 1], transition: { duration: 0.45, delay: i * 0.055, ease: EASE_OUT } }
        }}
      />
    ))}
    <motion.rect
      x="10.2"
      y="10.2"
      width="3.6"
      height="3.6"
      rx="0.9"
      style={accentFill}
      variants={{
        rest: { rotate: 0, scale: 1 },
        active: { rotate: [0, 90], scale: [1, 0.6, 1], transition: { duration: 0.8, ease: EASE_IN_OUT } }
      }}
    />
  </Svg>
);

export const DatabaseIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M5 6v12c0 1.45 3.13 2.6 7 2.6s7-1.15 7-2.6V6" />
    <motion.path
      d="M5 12c0 1.45 3.13 2.6 7 2.6s7-1.15 7-2.6"
      variants={{
        rest: { y: 0, opacity: 1 },
        active: { y: [-5, 0], opacity: [0, 1], transition: { duration: 0.5, delay: 0.1, ease: EASE_OUT } }
      }}
    />
    <motion.ellipse
      cx="12"
      cy="6"
      rx="7"
      ry="2.6"
      style={accent}
      variants={{
        rest: { y: 0, opacity: 1 },
        active: { y: [-6, 0], opacity: [0, 1], transition: { duration: 0.55, delay: 0.24, ease: EASE_OUT } }
      }}
    />
  </Svg>
);

export const LockIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.path
      d="M8 11V8a4 4 0 0 1 8 0v3"
      variants={{
        rest: { y: 0 },
        active: { y: [0, -2.6, -2.6, 0], transition: { duration: 0.95, times: [0, 0.3, 0.6, 1], ease: EASE_IN_OUT } }
      }}
    />
    <motion.rect
      x="5.5"
      y="11"
      width="13"
      height="9.5"
      rx="2.5"
      variants={{
        rest: { y: 0 },
        active: { y: [0, 0, 0.7, 0], transition: { duration: 0.95, times: [0, 0.82, 0.9, 1] } }
      }}
    />
    <motion.path
      d="M12 14.6v2.4"
      style={accent}
      strokeWidth={2}
      variants={{
        rest: { scaleY: 1 },
        active: { scaleY: [1, 0.2, 1], transition: { duration: 0.5, delay: 0.45, ease: EASE_OUT } }
      }}
    />
  </Svg>
);

export const StopwatchIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="13.5" r="7" />
    <motion.g
      variants={{
        rest: { y: 0 },
        active: { y: [0, 1.2, 0], transition: { duration: 0.28, ease: EASE_OUT } }
      }}
    >
      <path d="M10 3h4" />
      <path d="M12 3v3.4" />
    </motion.g>
    <motion.g
      variants={{
        rest: { rotate: 0 },
        active: { rotate: [0, 360], transition: { duration: 0.85, delay: 0.12, ease: EASE_IN_OUT } }
      }}
    >
      <circle cx="12" cy="13.5" r="4.2" stroke="none" />
      <path d="M12 13.5V9.6" style={accent} strokeWidth={2} />
    </motion.g>
  </Svg>
);

/* ---------------------------------------------------------------- field design */

export const TapIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    {[0.1, 0.52].map((delay) => (
      <motion.circle
        key={delay}
        cx="12"
        cy="5.6"
        r="2.6"
        style={accent}
        variants={{
          rest: { scale: 0.4, opacity: 0 },
          active: { scale: [0.4, 1.9], opacity: [0.9, 0], transition: { duration: 0.6, delay, ease: EASE_OUT } }
        }}
      />
    ))}
    <motion.path
      d="M9.2 21l-2.7-4.3a1.6 1.6 0 0 1 2.6-1.8l1.4 1.6V7.6a1.5 1.5 0 0 1 3 0V13l4 .8a2 2 0 0 1 1.6 2.3L18.4 21"
      variants={{
        rest: { y: 0 },
        active: { y: [0, 1.6, 0, 1.6, 0], transition: { duration: 0.95, times: [0, 0.14, 0.38, 0.56, 0.85], ease: EASE_OUT } }
      }}
    />
  </Svg>
);

export const TargetIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.rect
      x="7.5"
      y="7.5"
      width="11"
      height="11"
      rx="3"
      variants={{
        rest: { scale: 1 },
        active: { scale: [1, 0.84, 1.04, 1], transition: { duration: 0.7, ease: EASE_OUT } }
      }}
    />
    <motion.circle
      cx="13"
      cy="13"
      r="1.7"
      style={accentFill}
      variants={{
        rest: { scale: 1 },
        active: { scale: [1, 1.8, 1], transition: { duration: 0.6, delay: 0.1, ease: EASE_OUT } }
      }}
    />
    <motion.g
      variants={{
        rest: { scaleX: 1, opacity: 1 },
        active: { scaleX: [0.2, 1], opacity: [0, 1], transition: { duration: 0.6, delay: 0.25, ease: EASE_OUT } }
      }}
    >
      <path d="M7.5 3.6h11" />
      <path d="M7.5 2.6v2M18.5 2.6v2" />
    </motion.g>
    <motion.g
      variants={{
        rest: { scaleY: 1, opacity: 1 },
        active: { scaleY: [0.2, 1], opacity: [0, 1], transition: { duration: 0.6, delay: 0.35, ease: EASE_OUT } }
      }}
    >
      <path d="M3.6 7.5v11" />
      <path d="M2.6 7.5h2M2.6 18.5h2" />
    </motion.g>
  </Svg>
);

const rays = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const p = (r: number) => `${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`;
  return `M${p(6.2)}L${p(8.8)}`;
});

export const SunIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.circle
      cx="12"
      cy="12"
      r="3.6"
      style={accent}
      variants={{
        rest: { scale: 1 },
        active: { scale: [1, 1.22, 1], transition: { duration: 0.9, ease: EASE_IN_OUT } }
      }}
    />
    <motion.g
      variants={{
        rest: { rotate: 0 },
        active: { rotate: [0, 45], transition: { duration: 1.1, ease: EASE_IN_OUT } }
      }}
    >
      {rays.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          variants={{
            rest: { pathLength: 1 },
            active: { pathLength: [1, 0.1, 1], transition: { duration: 0.6, delay: i * 0.045, ease: EASE_OUT } }
          }}
        />
      ))}
    </motion.g>
  </Svg>
);

export const LeafIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.g
      style={{ originX: 0, originY: 1 }}
      variants={{
        rest: { rotate: 0 },
        active: { rotate: [0, -8, 5, 0], transition: { duration: 1.1, ease: EASE_IN_OUT } }
      }}
    >
      <path d="M5 19C5 10.4 10.4 4.6 19.5 4.6c0 9.4-5.6 14.4-14.5 14.4z" />
      <motion.path
        d="M5 19L15.2 8.8"
        style={accent}
        variants={{
          rest: { pathLength: 1 },
          active: { pathLength: [0, 1], transition: { duration: 0.6, ease: EASE_OUT } }
        }}
      />
      {['M9.4 14.6h3.8', 'M12 12V8.4'].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          variants={{
            rest: { pathLength: 1 },
            active: { pathLength: [0, 1], transition: { duration: 0.4, delay: 0.35 + i * 0.12, ease: EASE_OUT } }
          }}
        />
      ))}
    </motion.g>
  </Svg>
);

export const ThermometerIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <path d="M10 14.6V5a2 2 0 0 1 4 0v9.6a4 4 0 1 1-4 0z" />
    <motion.path
      d="M12 16.6V8"
      style={accent}
      strokeWidth={2}
      variants={{
        rest: { pathLength: 0.55 },
        active: { pathLength: [0.55, 1, 0.8], transition: { duration: 1, ease: EASE_OUT } }
      }}
    />
    <circle cx="12" cy="17.6" r="1.6" style={accentFill} />
  </Svg>
);

/* ---------------------------------------------------------------- ui */

export const SpeakerIcon: React.FC<IconProps & { on: boolean }> = ({ on, ...props }) => (
  <Svg {...props}>
    <motion.path
      d="M4 9.5h3l4.5-4v13L7 14.5H4z"
      variants={{
        rest: { scale: 1 },
        active: { scale: [1, 0.9, 1], transition: { duration: 0.4, ease: EASE_OUT } }
      }}
    />
    {['M15 9.5a3.6 3.6 0 0 1 0 5', 'M17.6 7a7.2 7.2 0 0 1 0 10'].map((d, i) => (
      <motion.path
        key={d}
        d={d}
        initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={{ duration: 0.4, delay: on ? i * 0.1 : 0, ease: EASE_OUT }}
      />
    ))}
    {['M15.8 9.6l4.8 4.8', 'M20.6 9.6l-4.8 4.8'].map((d, i) => (
      <motion.path
        key={d}
        d={d}
        initial={false}
        animate={{ pathLength: on ? 0 : 1, opacity: on ? 0 : 1 }}
        transition={{ duration: 0.3, delay: on ? 0 : 0.1 + i * 0.08, ease: EASE_OUT }}
      />
    ))}
  </Svg>
);

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

/** Sun to moon: rays draw back into the disc one by one while a shadow slides over to cut the crescent. */
export const ThemeIcon: React.FC<IconProps & { dark: boolean }> = ({ dark, ...props }) => {
  const maskId = `theme-bite-${React.useId().replace(/:/g, '')}`;
  return (
    <Svg {...props}>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#fff" />
          <motion.circle
            r="6.4"
            fill="#000"
            initial={false}
            animate={dark ? { cx: 17.6, cy: 6.4 } : { cx: 27, cy: -3 }}
            transition={{ duration: 0.7, delay: dark ? 0.12 : 0, ease: EASE_IN_OUT }}
          />
        </mask>
      </defs>

      <motion.g
        variants={{
          rest: { rotate: 0, transition: { duration: 0 } },
          active: { rotate: dark ? 0 : 45, transition: { duration: 0.8, ease: EASE_OUT } }
        }}
      >
        <motion.g
          initial={false}
          animate={{ rotate: dark ? 90 : 0 }}
          transition={{ duration: 0.75, ease: EASE_IN_OUT }}
        >
          {RAY_ANGLES.map((angle, i) => (
            <g key={angle} transform={`rotate(${angle} 12 12)`}>
              <motion.path
                d="M12 2.6v2.2"
                initial={false}
                animate={dark ? { y: 3.2, opacity: 0 } : { y: 0, opacity: 1 }}
                transition={{ duration: 0.45, delay: (dark ? i : 7 - i) * 0.035 + (dark ? 0 : 0.2), ease: EASE_OUT }}
              />
            </g>
          ))}
        </motion.g>
      </motion.g>

      <motion.g
        variants={{
          rest: { rotate: 0 },
          active: dark
            ? { rotate: [0, -16, 7, 0], transition: { duration: 0.9, ease: EASE_IN_OUT } }
            : { rotate: 0 }
        }}
      >
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          stroke="none"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: dark ? 7.6 : 4.4 }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
        />
      </motion.g>

      <motion.g
        variants={{
          rest: { scale: 1 },
          active: dark ? { scale: [1, 1.5, 1], rotate: [0, 90], transition: { duration: 0.6, delay: 0.15 } } : { scale: 1 }
        }}
      >
        <motion.path
          d="M19.4 2.9v3.4M17.7 4.6h3.4"
          strokeWidth="1.4"
          initial={false}
          animate={dark ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0, opacity: 0, rotate: -90 }}
          transition={{ duration: 0.5, delay: dark ? 0.45 : 0, ease: EASE_OUT }}
        />
      </motion.g>
    </Svg>
  );
};

export const PlusMinusIcon: React.FC<IconProps & { open: boolean }> = ({ open, ...props }) => (
  <Svg {...props}>
    <motion.g initial={false} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.5, ease: EASE_IN_OUT }}>
      <path d="M5 12h14" />
      <motion.path
        d="M12 5v14"
        initial={false}
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.4, ease: EASE_IN_OUT }}
      />
    </motion.g>
  </Svg>
);

export const MenuIcon: React.FC<IconProps & { open: boolean }> = ({ open, ...props }) => (
  <Svg {...props}>
    <motion.path
      d="M4 9h16"
      initial={false}
      animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_IN_OUT }}
    />
    <motion.path
      d="M4 15h16"
      initial={false}
      animate={open ? { rotate: -45, y: -3, scaleX: 1 } : { rotate: 0, y: 0, scaleX: 0.6 }}
      style={{ originX: 0 }}
      transition={{ duration: 0.45, ease: EASE_IN_OUT }}
    />
  </Svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.g
      variants={{
        rest: { rotate: 0 },
        active: { rotate: 90, transition: { duration: 0.45, ease: EASE_OUT } }
      }}
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </motion.g>
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.path
      d="M5 12.5l4.5 4.5L19 7.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    />
  </Svg>
);

export const CopyIcon: React.FC<IconProps> = (props) => (
  <Svg {...props}>
    <motion.rect
      x="9"
      y="9"
      width="11"
      height="11"
      rx="2.4"
      variants={{
        rest: { x: 0, y: 0 },
        active: { x: [0, 1.2, 0], y: [0, 1.2, 0], transition: { duration: 0.5, ease: EASE_OUT } }
      }}
    />
    <motion.path
      d="M5.6 15H5a1.5 1.5 0 0 1-1.5-1.5V5A1.5 1.5 0 0 1 5 3.5h8.5A1.5 1.5 0 0 1 15 5v.6"
      variants={{
        rest: { x: 0, y: 0 },
        active: { x: [0, -1, 0], y: [0, -1, 0], transition: { duration: 0.5, ease: EASE_OUT } }
      }}
    />
  </Svg>
);

/* ---------------------------------------------------------------- brand mark */

/** The banana picks up the page's current ripeness colour; the cobalt oval is the produce sticker. */
export const BananaMark: React.FC<IconProps> = ({ size = 32, className = '', play }) => {
  const control = play === undefined ? {} : { initial: 'rest', animate: play ? 'active' : 'rest' };
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={`ic ${className}`}
      aria-hidden="true"
      focusable="false"
      {...control}
    >
      <motion.path
        d="M5.4 9.8L4.3 5.4"
        stroke="var(--stem, #4B5A2A)"
        strokeWidth="2.6"
        strokeLinecap="round"
        style={{ originX: 1, originY: 1 }}
        variants={{
          rest: { rotate: 0 },
          active: { rotate: [0, 22, -10, 0], transition: { duration: 0.9, delay: 0.06, ease: EASE_OUT } }
        }}
      />
      <motion.g
        style={{ originX: 0.06, originY: 0.05 }}
        variants={{
          rest: { rotate: 0 },
          active: { rotate: [0, -11, 6, -2, 0], transition: { duration: 1.1, ease: EASE_IN_OUT } }
        }}
      >
        <path
          d="M6.5 9.5C7.5 19 15 25.5 26 22.5c1.6-.5 1.6 1.3.4 2.1C16 30.5 4.2 24 4.6 10.2c.1-1.1 1.8-1.6 1.9-.7z"
          fill="var(--ripe)"
          stroke="var(--mark-outline, #0F2219)"
          strokeWidth="1.15"
          strokeLinejoin="round"
          style={{ transition: 'fill 0.6s ease' }}
        />
        <path d="M7.7 12.8c1.6 7.3 7.4 11.4 15.6 10.9" stroke="rgba(255,255,255,0.55)" strokeWidth="1" strokeLinecap="round" />
        <motion.path
          d="M7.7 12.8c1.6 7.3 7.4 11.4 15.6 10.9"
          stroke="#FFFFFF"
          strokeWidth="1.4"
          strokeLinecap="round"
          variants={{
            rest: { pathLength: 0, pathOffset: 0, opacity: 0 },
            active: {
              pathLength: [0, 0.3, 0],
              pathOffset: [0, 0.4, 1],
              opacity: [0, 1, 0],
              transition: { duration: 0.9, delay: 0.25, ease: EASE_IN_OUT }
            }
          }}
        />
        <circle cx="26.9" cy="23.5" r="0.85" fill="#3B2A12" />
        <g transform="rotate(-28 13.2 22.2)">
          <motion.g
            variants={{
              rest: { scale: 1 },
              active: { scale: [1, 1.35, 0.92, 1], transition: { duration: 0.7, delay: 0.3, ease: EASE_OUT } }
            }}
          >
            <ellipse cx="13.2" cy="22.2" rx="3.2" ry="2.05" fill="var(--sticker)" />
            <path d="M11.6 22.2h3.2" stroke="#F3F5FF" strokeWidth="0.8" strokeLinecap="round" />
          </motion.g>
        </g>
      </motion.g>
    </motion.svg>
  );
};
