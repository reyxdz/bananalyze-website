import React from 'react';
import { motion } from 'framer-motion';
import { WifiOff, CloudOff, Zap, Shield, Check, X, Server, Smartphone, DollarSign, Database } from 'lucide-react';
import { AnimatedOfflineWifiIcon, AnimatedCpuChipIcon } from './AnimatedIcons';

export const OfflineVsCloud: React.FC = () => {
  return (
    <section id="offline" style={{
      position: 'relative',
      padding: '100px 0',
      background: 'rgba(46, 125, 50, 0.08)'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <AnimatedOfflineWifiIcon size={18} />
            <span style={{ color: '#34D399', fontWeight: 700 }}>THE FIELD REALITY</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Why Cloud AI Fails in the <span className="gradient-text-banana">Banana Plantation</span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Most AI agriculture apps require continuous high-speed cellular connections. But real harvest sorting
            happens under dense tree canopies, mountain ridges, and rural farm-gates with spotty or zero cellular coverage.
          </p>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          alignItems: 'stretch',
          marginBottom: '50px'
        }}>
          {/* Cloud-Dependent App (The Old Problem) */}
          <div className="glass-panel" style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(23, 14, 14, 0.65)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#F87171',
              fontSize: '0.78rem',
              fontWeight: 800,
              marginBottom: '16px'
            }}>
              <Server size={14} />
              <span>TRADITIONAL CLOUD-BASED AI APPS</span>
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#FCA5A5',
              marginBottom: '12px'
            }}>
              Network Dependent &amp; Fragile
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '24px' }}>
              Every scan uploads heavy 4MB uncompressed camera buffers over 3G/4G to remote cloud GPU servers, stalling when towers are out of reach.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Latency', value: '3,000ms - 8,000ms roundtrip', bad: true },
                { label: 'Rural Reliability', value: 'Fails without cellular signal', bad: true },
                { label: 'Mobile Data Cost', value: 'Consumes farmer’s prepaid SIM load', bad: true },
                { label: 'Cloud Infrastructure', value: 'Requires recurring GPU server bills', bad: true },
                { label: 'Field Privacy', value: 'Photos transmitted to external databases', bad: true }
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '0.86rem'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F87171',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <X size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{item.label}: </span>
                    <span style={{ color: '#F87171' }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banana Check (The Edge-AI Solution) */}
          <div className="glass-panel" style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(12, 28, 17, 0.8)',
            border: '2px solid rgba(52, 211, 153, 0.5)',
            boxShadow: '0 0 35px rgba(52, 211, 153, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '999px',
              background: 'rgba(52, 211, 153, 0.2)',
              color: '#34D399',
              fontSize: '0.78rem',
              fontWeight: 800,
              marginBottom: '16px'
            }}>
              <Smartphone size={14} />
              <span>BANANA CHECK • ON-DEVICE TFLITE</span>
            </div>

            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: '#F0FDF4',
              marginBottom: '12px'
            }}>
              100% Autonomous Edge Intelligence
            </h3>

            <p style={{ fontSize: '0.88rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '24px' }}>
              The quantized neural network resides natively inside the Flutter APK. Inference executes directly on the phone’s ARM CPU in milliseconds.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { label: 'Latency', value: 'Under 38 milliseconds instant response', good: true },
                { label: 'Rural Reliability', value: 'Works in deep jungle or concrete basements', good: true },
                { label: 'Mobile Data Cost', value: '0 KB internet used • 100% Free forever', good: true },
                { label: 'Cloud Infrastructure', value: 'Zero cloud servers needed ($0/month)', good: true },
                { label: 'Field Privacy', value: 'All records stay in local encrypted SQLite', good: true }
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '0.86rem'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(52, 211, 153, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#34D399',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <span style={{ color: '#F0FDF4', fontWeight: 600 }}>{item.label}: </span>
                    <span style={{ color: '#34D399', fontWeight: 600 }}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quantization & Battery Impact Card */}
        <div className="glass-panel" style={{
          padding: '28px 32px',
          borderRadius: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'rgba(251, 191, 36, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FBBF24'
            }}>
              <Zap size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Negligible Battery Consumption During Full-Day Sorting
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: 0 }}>
                Int8 post-training quantization eliminates floating-point arithmetic overhead, drawing less than 0.2% battery per 100 scans.
              </p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem'
          }}>
            <span style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: '#34D399'
            }}>
              MODEL SIZE: 12.4 MB
            </span>
            <span style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: '#FBBF24'
            }}>
              RAM: 42 MB PEAK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
