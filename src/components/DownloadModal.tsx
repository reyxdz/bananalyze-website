import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { encode } from 'uqr';
import { EASE_OUT, useIconTrigger } from '../lib/motion';
import { lockScroll } from '../lib/smoothScroll';
import { RELEASES_URL, formatMegabytes, useRelease, type ReleaseState } from '../lib/release';
import { BananaMark, CheckIcon, CloseIcon, CopyIcon, DownloadIcon, LockIcon } from './AnimatedIcons';
import { GithubIcon } from './GithubIcon';
import './DownloadModal.css';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUIET = 1;

interface QrShape {
  size: number;
  modules: string;
}

const qrCache = new Map<string, QrShape>();

/** A fixed mask pattern skips scoring all eight; any of them scans. */
function qrShape(value: string): QrShape {
  const cached = qrCache.get(value);
  if (cached) return cached;
  const { size, data } = encode(value, { ecc: 'M', border: 0, maskPattern: 0 });
  const inFinder = (x: number, y: number) =>
    (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
  let modules = '';
  data.forEach((row, y) =>
    row.forEach((dark, x) => {
      if (dark && !inFinder(x, y)) modules += `M${x + 0.13} ${y + 0.13}h0.74v0.74h-0.74z`;
    })
  );
  const shape = { size, modules };
  qrCache.set(value, shape);
  return shape;
}

const Finder: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect width="7" height="7" rx="1.6" fill="var(--ink)" />
    <rect x="1" y="1" width="5" height="5" rx="1" fill="#fff" />
    <rect x="2" y="2" width="3" height="3" rx="0.6" fill="var(--ink)" />
  </g>
);

/**
 * A real, scannable code; the three finder squares are drawn as rounded marks instead of modules.
 * All other modules share one path (a round-joined stroke rounds their corners) and are wiped in
 * together; one animated node per module stalls the modal's first frame.
 */
const QrCode: React.FC<{ value: string }> = ({ value }) => {
  const { size, modules } = qrShape(value);

  const full = size + QUIET * 2;
  return (
    <svg viewBox={`${-QUIET} ${-QUIET} ${full} ${full}`} className="modal__qr-code tone-light" aria-hidden="true">
      <rect x={-QUIET} y={-QUIET} width={full} height={full} fill="#fff" />
      <motion.path
        d={modules}
        fill="var(--ink)"
        stroke="var(--ink)"
        strokeWidth="0.18"
        strokeLinejoin="round"
        initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%)' }}
        animate={{ clipPath: 'polygon(0% 0%, 200% 0%, 0% 200%)' }}
        transition={{ delay: 0.25, duration: 0.7, ease: EASE_OUT }}
      />
      <Finder x={0} y={0} />
      <Finder x={size - 7} y={0} />
      <Finder x={0} y={size - 7} />
    </svg>
  );
};

interface ModalBodyProps {
  release: ReleaseState;
  copied: boolean;
  onCopy: () => void;
  titleId?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ release, copied, onCopy, titleId }) => {
  const trigger = useIconTrigger();
  const ready = release.status === 'ready' ? release : null;

  return (
    <>
      <motion.div
        className="modal__head"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: EASE_OUT }}
      >
        <BananaMark size={44} play />
        <div>
          <h2 id={titleId} className="modal__title">
            Get Bananalyze
          </h2>
          <p className="mono modal__sub">
            {ready
              ? `v${ready.apk.version} · Android ${ready.apk.minAndroid}+ · ${formatMegabytes(ready.apk.bytes)}`
              : 'Android 5.0+ · first public build on the way'}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="modal__qr"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.6, ease: EASE_OUT }}
      >
        <QrCode value={ready ? ready.url : RELEASES_URL} />
        <div>
          <p className="modal__qr-title">Scan with your phone</p>
          <p className="modal__qr-text">
            {ready
              ? 'The APK downloads straight to the phone. Open it to install — Android asks once to allow installs from your browser.'
              : 'The first public build is being finalised. Scan to follow releases on GitHub and grab it the day it lands.'}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.6, ease: EASE_OUT }}
      >
        {ready ? (
          <motion.a
            href={ready.url}
            download={ready.apk.file}
            type="application/vnd.android.package-archive"
            className="btn btn--sticker modal__download"
            {...trigger}
          >
            <DownloadIcon size={20} />
            Download Bananalyze v{ready.apk.version}
          </motion.a>
        ) : (
          <motion.a
            href={RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--sticker modal__download"
            {...trigger}
          >
            <GithubIcon size={18} />
            Follow releases on GitHub
            <span className="visually-hidden"> (opens in a new tab)</span>
          </motion.a>
        )}
      </motion.div>

      {ready && (
        <motion.div
          className="modal__hash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34, duration: 0.6 }}
        >
          <span className="modal__hash-icon" aria-hidden="true">
            <LockIcon size={16} play={copied} />
          </span>
          <span className="mono modal__hash-text">
            SHA-256 <span>{ready.apk.sha256.slice(0, 20)}…</span>
          </span>
          <motion.button className="modal__copy mono" onClick={onCopy} {...trigger}>
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            {copied ? 'Copied' : 'Copy'}
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

/**
 * Lays the card out once, invisibly, while the page is idle. The first layout of its text and QR
 * is several times slower than later ones, and would otherwise land on the click that opens it.
 */
function usePrimer(release: ReleaseState) {
  const [priming, setPriming] = useState(false);
  const primed = useRef(false);

  useEffect(() => {
    if (primed.current || release.status === 'loading') return;
    primed.current = true;
    const start = () => setPriming(true);
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(start, { timeout: 5000 });
      return () => window.cancelIdleCallback(handle);
    }
    const timer = window.setTimeout(start, 3000);
    return () => window.clearTimeout(timer);
  }, [release.status]);

  useEffect(() => {
    if (!priming) return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setPriming(false));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [priming]);

  return priming;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const trigger = useIconTrigger();
  const release = useRelease();
  const ready = release.status === 'ready' ? release : null;
  const priming = usePrimer(release);

  useEffect(() => {
    lockScroll(isOpen);
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [isOpen, onClose]);

  const copyHash = () => {
    if (!ready) return;
    navigator.clipboard?.writeText(ready.apk.sha256);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {priming && !isOpen && (
        <div className="modal modal--primer" aria-hidden="true" inert>
          <div className="modal__card">
            <ModalBody release={release} copied={false} onCopy={copyHash} />
          </div>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="download-title">
            <motion.div
              className="modal__backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={onClose}
            />

            <motion.div
              className="modal__card"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.25 } }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <motion.button
                ref={closeRef}
                className="icon-btn modal__close"
                onClick={onClose}
                aria-label="Close"
                {...trigger}
              >
                <CloseIcon size={18} />
              </motion.button>

              <ModalBody release={release} copied={copied} onCopy={copyHash} titleId="download-title" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
