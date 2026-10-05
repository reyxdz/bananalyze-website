import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Database, Code2, Terminal, CheckCircle2, GitBranch, ArrowDown } from 'lucide-react';
import { AnimatedCpuChipIcon } from './AnimatedIcons';

export const ArchitectureSpecs: React.FC = () => {
  return (
    <section id="architecture" style={{
      position: 'relative',
      padding: '100px 0',
      background: 'rgba(8, 14, 10, 0.5)',
      borderTop: '1px solid var(--border-subtle)'
    }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <AnimatedCpuChipIcon size={18} />
            <span style={{ color: '#34D399', fontWeight: 700 }}>UNDER THE HOOD</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Technical <span className="gradient-text-emerald">Monorepo Architecture</span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Designed as a high-discipline multi-workspace monorepo with strict tested boundaries between Flutter mobile client,
            on-device TFLite quantization, and Python 3.11 model training pipelines.
          </p>
        </div>

        {/* Monorepo Architecture Flow Diagram */}
        <div style={{
          maxWidth: '960px',
          margin: '0 auto 60px',
          padding: '36px',
          borderRadius: '26px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            position: 'relative'
          }}>
            {/* Layer 1: Flutter UI */}
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(52, 211, 153, 0.3)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#34D399',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                <span>LAYER 01</span>
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Flutter 3.22 Client
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                High-performance Dart 3.4.4 view layer. Zero-bloat camera feed rendering at 60 FPS with low power footprint.
              </p>
            </div>

            {/* Layer 2: Platform Channel */}
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(251, 191, 36, 0.3)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#FBBF24',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                <span>LAYER 02</span>
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Dart FFI / Channel
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Direct native memory mapping of camera YUV_420 image buffers directly into C++ pointer memory without serialization.
              </p>
            </div>

            {/* Layer 3: TFLite Engine */}
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(96, 165, 250, 0.3)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#60A5FA',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                <span>LAYER 03</span>
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                TFLite Quantized Core
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                8-bit integer weights execution. Leverages Android NNAPI &amp; iOS Metal GPU acceleration where available.
              </p>
            </div>

            {/* Layer 4: SQLite Database */}
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(167, 139, 250, 0.3)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#A78BFA',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}>
                <span>LAYER 04</span>
              </div>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Local Sqflite Storage
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                Encrypted on-device table schema logging scan timestamps, variety confidence, and crop batches with zero external sync required.
              </p>
            </div>
          </div>
        </div>

        {/* Hardware & Compatibility Matrix */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: 'Android Hardware Support',
              specs: [
                { label: 'Minimum SDK', value: 'API 21 (Android 5.0 Lollipop)' },
                { label: 'Target SDK', value: 'API 34 (Android 14)' },
                { label: 'Architecture', value: 'armeabi-v7a, arm64-v8a, x86_64' },
                { label: 'Market Compatibility', value: '99.4% of active devices worldwide' }
              ]
            },
            {
              title: 'On-Device Model Metrics',
              specs: [
                { label: 'Base Architecture', value: 'MobileNetV3-Small / EfficientNet-Lite' },
                { label: 'Quantization Type', value: 'Full Int8 Post-Training Quantization' },
                { label: 'Input Resolution', value: '224 × 224 × 3 RGB' },
                { label: 'Model File Size', value: '12.4 MB embedded in APK' }
              ]
            },
            {
              title: 'Offline Field Benchmarks',
              specs: [
                { label: 'Snapdragon 680 (Low-end)', value: '38ms CPU inference' },
                { label: 'MediaTek Helio G85', value: '44ms CPU inference' },
                { label: 'Apple A15 / Bionic', value: '12ms Neural Engine' },
                { label: 'Power Consumption', value: '< 0.2% battery per 100 scans' }
              ]
            }
          ].map((card) => (
            <div
              key={card.title}
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: '20px'
              }}
            >
              <h4 style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={18} color="#34D399" />
                <span>{card.title}</span>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {card.specs.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.82rem',
                      paddingBottom: '8px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
