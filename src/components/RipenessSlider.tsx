import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Utensils, HeartPulse, ShieldCheck, Thermometer } from 'lucide-react';
import { sound } from '../utils/audio';
import { AnimatedLeafIcon } from './AnimatedIcons';

interface RipenessStageData {
  stage: number;
  label: string;
  classificationGroup: 'Unripe' | 'Ripe' | 'Overripe';
  color: string;
  image: string;
  starchPct: number;
  sugarPct: number;
  glycemicIndex: number;
  antioxidantScore: number; // 1-100
  culinaryUse: string;
  biologicalProfile: string;
  fieldAdvice: string;
}

const RIPENESS_STAGES: RipenessStageData[] = [
  {
    stage: 1,
    label: 'All Green',
    classificationGroup: 'Unripe',
    color: '#65A30D',
    image: '/assets/ripeness_unripe.jpg',
    starchPct: 88,
    sugarPct: 3,
    glycemicIndex: 30,
    antioxidantScore: 25,
    culinaryUse: 'Crispy deep-fried banana chips, Saba boiling with salt, savory meat stews (Pochero).',
    biologicalProfile: 'Maximum prebiotic resistant starch. Feeds healthy gut microbiome bacteria.',
    fieldAdvice: 'Optimal stage for long-distance maritime export shipping; lowest ethylene emission.'
  },
  {
    stage: 2,
    label: 'Green with Yellow Trace',
    classificationGroup: 'Unripe',
    color: '#84CC16',
    image: '/assets/ripeness_unripe.jpg',
    starchPct: 76,
    sugarPct: 12,
    glycemicIndex: 38,
    antioxidantScore: 35,
    culinaryUse: 'Ginataan, Saba Nilaga, boiling as rice substitute for diabetic meal planning.',
    biologicalProfile: 'High fiber structure; enzyme amylase starts breaking polysaccharides into maltose.',
    fieldAdvice: 'Handle gently during harvesting to avoid latex staining on the peel.'
  },
  {
    stage: 3,
    label: 'More Green Than Yellow',
    classificationGroup: 'Unripe',
    color: '#A3E635',
    image: '/assets/ripeness_unripe.jpg',
    starchPct: 62,
    sugarPct: 24,
    glycemicIndex: 44,
    antioxidantScore: 48,
    culinaryUse: 'Firm cooking, shallow pan-frying, savory curry thickening.',
    biologicalProfile: 'Chlorophyll breakdown begins; carotenoid pigment synthesis accelerates.',
    fieldAdvice: 'Store in shaded packing shed at 13°C. Protect from direct midday heat.'
  },
  {
    stage: 4,
    label: 'More Yellow Than Green',
    classificationGroup: 'Ripe',
    color: '#FACC15',
    image: '/assets/ripeness_ripe.jpg',
    starchPct: 40,
    sugarPct: 45,
    glycemicIndex: 51,
    antioxidantScore: 65,
    culinaryUse: 'Mild table fruit, fruit salads, oatmeal toppings, and light smoothies.',
    biologicalProfile: 'Balanced starch-to-sugar ratio with pleasant semi-firm mouthfeel.',
    fieldAdvice: 'Target distribution stage for wholesale wet markets and supermarket shelves.'
  },
  {
    stage: 5,
    label: 'Yellow with Green Tips',
    classificationGroup: 'Ripe',
    color: '#FBBF24',
    image: '/assets/ripeness_ripe.jpg',
    starchPct: 22,
    sugarPct: 64,
    glycemicIndex: 56,
    antioxidantScore: 78,
    culinaryUse: 'The quintessential eating banana. Peak potassium bio-availability & aroma.',
    biologicalProfile: 'Tannins completely neutralized; aromatic esters (isoamyl acetate) at zenith.',
    fieldAdvice: 'High consumer demand; sells at peak retail market price per kilogram.'
  },
  {
    stage: 6,
    label: 'All Golden Yellow',
    classificationGroup: 'Ripe',
    color: '#F59E0B',
    image: '/assets/ripeness_ripe.jpg',
    starchPct: 8,
    sugarPct: 78,
    glycemicIndex: 62,
    antioxidantScore: 88,
    culinaryUse: 'Table snacking, creamy fruit shakes, Turon, Banana Cue, and halo-halo toppings.',
    biologicalProfile: 'Nearly full starch conversion into easily digestible glucose and fructose.',
    fieldAdvice: 'Rapid inventory turnover needed; 2 to 3 days remaining before sugar freckling.'
  },
  {
    stage: 7,
    label: 'Yellow with Sugar Freckles',
    classificationGroup: 'Overripe',
    color: '#D97706',
    image: '/assets/variety_latundan.jpg',
    starchPct: 4,
    sugarPct: 86,
    glycemicIndex: 68,
    antioxidantScore: 98,
    culinaryUse: 'Decadent baked banana bread, banana cue, Maruya fritters, pancakes, natural baby puree.',
    biologicalProfile: 'Peak antioxidant and TNF (Tumor Necrosis Factor) cytokine-stimulating activity.',
    fieldAdvice: 'Divert immediately from fresh table retail to bakeries and confectionery processing.'
  }
];

export const RipenessSlider: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(4); // Default to Stage 5
  const currentStage = RIPENESS_STAGES[activeStageIdx];

  const handleStageSelect = (idx: number) => {
    sound.playTap();
    setActiveStageIdx(idx);
  };

  return (
    <section id="ripeness" style={{
      position: 'relative',
      padding: '100px 0',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(9, 15, 10, 0.6)'
    }}>
      <div className="container">
        {/* Section Heading */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 50px' }}>
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <AnimatedLeafIcon size={18} />
            <span style={{ color: '#FBBF24', fontWeight: 700 }}>PHYSIOLOGICAL RIPENESS MATRIX</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Dynamic Ripeness <span className="gradient-text-emerald">Science &amp; Grading</span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Banana Check’s quantized model evaluates color histograms, peel texture, and curvature to map specimens
            into 3 primary operational classes and 7 physiological maturity stages. Drag the slider to observe nutritional shifts.
          </p>
        </div>

        {/* Interactive Slider Controller */}
        <div style={{
          maxWidth: '880px',
          margin: '0 auto 50px',
          padding: '24px 30px',
          borderRadius: '24px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Top Label */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <span style={{
              fontSize: '0.88rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-muted)'
            }}>
              Harvest Maturity Index
            </span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: `1px solid ${currentStage.color}`
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentStage.color,
                boxShadow: `0 0 10px ${currentStage.color}`
              }} />
              <span style={{ fontWeight: 800, fontSize: '0.9rem', color: currentStage.color }}>
                Stage {currentStage.stage}: {currentStage.label} ({currentStage.classificationGroup})
              </span>
            </div>
          </div>

          {/* Stepped Buttons / Interactive Track */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px',
            marginBottom: '16px'
          }}>
            {RIPENESS_STAGES.map((s, idx) => {
              const isSelected = idx === activeStageIdx;
              return (
                <motion.button
                  key={s.stage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStageSelect(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px 6px',
                    borderRadius: '12px',
                    background: isSelected ? s.color : 'rgba(255, 255, 255, 0.05)',
                    color: isSelected ? '#000000' : 'var(--text-secondary)',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: isSelected ? `0 0 20px ${s.color}` : 'none',
                    transition: 'background-color 0.2s ease, color 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '0.74rem', opacity: isSelected ? 0.9 : 0.6 }}>S{s.stage}</span>
                  <span style={{ fontSize: '0.85rem' }}>{s.label.split(' ')[0]}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Range Slider for smooth scrubbing */}
          <input
            type="range"
            min="0"
            max="6"
            value={activeStageIdx}
            onChange={(e) => handleStageSelect(parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: currentStage.color,
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Stage In-Depth Analytical Card */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'stretch'
        }}>
          {/* Left: Specimen Snapshot */}
          <div className="glass-panel" style={{
            padding: '24px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '18px',
                overflow: 'hidden',
                height: '240px',
                marginBottom: '18px'
              }}>
                <img
                  src={currentStage.image}
                  alt={currentStage.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: currentStage.color,
                  color: '#000000',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                }}>
                  {currentStage.classificationGroup.toUpperCase()} GRADING
                </span>
              </div>

              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '6px'
              }}>
                Stage {currentStage.stage}: {currentStage.label}
              </h3>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {currentStage.biologicalProfile}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              marginTop: '16px'
            }}>
              <Thermometer size={18} color="#FBBF24" />
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <strong>Agronomic Guidance:</strong> {currentStage.fieldAdvice}
              </div>
            </div>
          </div>

          {/* Right: Real-time Biochemical Transformation Metrics */}
          <div className="glass-panel" style={{
            padding: '28px',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.88rem',
                color: '#34D399',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '18px'
              }}>
                <HeartPulse size={18} />
                <span>Nutritional &amp; Chemical Transformation</span>
              </div>

              {/* Progress Bars Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                {/* Resistant Starch */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    <span>Resistant Starch (Prebiotic fiber)</span>
                    <span style={{ color: '#84CC16', fontFamily: 'var(--font-mono)' }}>{currentStage.starchPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <motion.div
                      animate={{ width: `${currentStage.starchPct}%` }}
                      transition={{ duration: 0.4 }}
                      style={{ height: '100%', background: '#84CC16' }}
                    />
                  </div>
                </div>

                {/* Natural Fructose / Sugars */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    <span>Free Sugars (Fructose &amp; Glucose)</span>
                    <span style={{ color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>{currentStage.sugarPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <motion.div
                      animate={{ width: `${currentStage.sugarPct}%` }}
                      transition={{ duration: 0.4 }}
                      style={{ height: '100%', background: '#F59E0B' }}
                    />
                  </div>
                </div>

                {/* Antioxidant Index */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                    <span>Antioxidant &amp; Polyphenol Activity</span>
                    <span style={{ color: '#EC4899', fontFamily: 'var(--font-mono)' }}>{currentStage.antioxidantScore} / 100</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <motion.div
                      animate={{ width: `${currentStage.antioxidantScore}%` }}
                      transition={{ duration: 0.4 }}
                      style={{ height: '100%', background: '#EC4899' }}
                    />
                  </div>
                </div>
              </div>

              {/* Culinary & Market Fit */}
              <div style={{
                padding: '16px',
                borderRadius: '16px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  color: '#FBBF24',
                  marginBottom: '6px'
                }}>
                  <Utensils size={16} />
                  <span>Culinary &amp; Commercial Processing Destination:</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.5 }}>
                  {currentStage.culinaryUse}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
