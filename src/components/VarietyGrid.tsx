import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Info, Award, Shield, BarChart3, Check } from 'lucide-react';
import { sound } from '../utils/audio';
import { AnimatedBananaIcon } from './AnimatedIcons';

interface VarietyItem {
  name: string;
  localTag: string;
  genome: string;
  scientificName: string;
  brixSweetness: string;
  peelThickness: string;
  shelfLife: string;
  image: string;
  badgeColor: string;
  highlight: string;
  description: string;
  culinaryRoles: string[];
}

const VARIETIES: VarietyItem[] = [
  {
    name: 'Lakatan',
    localTag: 'King of Dessert Bananas',
    genome: 'AA Diploid',
    scientificName: 'Musa acuminata',
    brixSweetness: '22° - 24° Brix',
    peelThickness: 'Medium (3.2 mm)',
    shelfLife: '5 - 7 Days',
    image: '/assets/variety_lakatan.jpg',
    badgeColor: '#F59E0B',
    highlight: 'Deep aromatic orange-yellow pulp, rich in beta-carotene.',
    description: 'The premier dessert banana of the Philippines. Prized for its distinct golden flesh, fragrant floral aroma, and high consumer market valuation in urban trade centers.',
    culinaryRoles: ['Table fruit', 'Fruit platters', 'Premium export', 'Infant dietary supplements']
  },
  {
    name: 'Saba (Cardaba)',
    localTag: 'The Culinary Workhorse',
    genome: 'BBB Triploid',
    scientificName: 'Musa balbisiana cross',
    brixSweetness: '14° - 18° Brix',
    peelThickness: 'Very Thick (4.8 mm)',
    shelfLife: '10 - 14 Days',
    image: '/assets/variety_saba.jpg',
    badgeColor: '#84CC16',
    highlight: 'Angular squared shape, dense heat-resistant starch core.',
    description: 'The foundation of Filipino street food and comfort cooking. Exceptionally hardy, resistant to drought and typhoons, with dense starchy pulp that caramelizes under intense heat.',
    culinaryRoles: ['Turon (Lumpia)', 'Banana Cue', 'Nilagang Saging', 'Maruya (Fritters)', 'Pochero Stew']
  },
  {
    name: 'Latundan',
    localTag: 'The Silk Apple Banana',
    genome: 'AAB Triploid',
    scientificName: 'Musa acuminata × balbisiana',
    brixSweetness: '23° - 26° Brix',
    peelThickness: 'Ultra Thin (1.8 mm)',
    shelfLife: '3 - 4 Days',
    image: '/assets/variety_latundan.jpg',
    badgeColor: '#FBBF24',
    highlight: 'Delicate thin skin with apple-like sweet tangy acidity.',
    description: 'A beloved family staple across Luzon and the Visayas. Plump, rounder fingers with papery peel and ivory white flesh that has a subtle, refreshing tartness.',
    culinaryRoles: ['Digestive table fruit', 'Convalescence recovery', 'Traditional banana bread', 'Baby food']
  },
  {
    name: 'Cavendish',
    localTag: 'Global Export Flagship',
    genome: 'AAA Triploid',
    scientificName: 'Musa acuminata',
    brixSweetness: '19° - 21° Brix',
    peelThickness: 'Medium-Thick (3.5 mm)',
    shelfLife: '7 - 10 Days',
    image: '/assets/variety_cavendish.jpg',
    badgeColor: '#EAB308',
    highlight: 'Uniform cylindrical curvature, long shelf life in reefer transit.',
    description: 'The standard of international maritime banana commerce, produced extensively in Davao and Northern Mindanao. Reliable yield, mild taste, and steady ripening curves.',
    culinaryRoles: ['Commercial retail', 'International export', 'Gym & athletic nutrition', 'Breakfast cereal']
  }
];

export const VarietyGrid: React.FC = () => {
  const [activeVariety, setActiveVariety] = useState<VarietyItem>(VARIETIES[0]);

  return (
    <section id="varieties" style={{
      position: 'relative',
      padding: '100px 0'
    }}>
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
          <div className="glass-pill" style={{ marginBottom: '14px' }}>
            <Award size={18} color="#FBBF24" />
            <span style={{ color: '#FBBF24', fontWeight: 700 }}>INDIGENOUS &amp; EXPORT TAXONOMY</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            fontWeight: 800,
            marginBottom: '16px',
            letterSpacing: '-0.03em'
          }}>
            Four Dominant <span className="gradient-text-banana">Philippine Varieties</span>
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Trained on localized field photographs reflecting actual agricultural cultivars.
            The on-device model extracts morphological traits including pedicel angle, peel thickness, and cross-sectional geometry.
          </p>
        </div>

        {/* Variety Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {VARIETIES.map((variety) => {
            const isActive = activeVariety.name === variety.name;
            return (
              <motion.div
                key={variety.name}
                whileHover={{ y: -8 }}
                onClick={() => {
                  sound.playTap();
                  setActiveVariety(variety);
                }}
                className="glass-panel"
                style={{
                  padding: '20px',
                  borderRadius: '22px',
                  cursor: 'pointer',
                  border: isActive ? `2px solid ${variety.badgeColor}` : '1px solid var(--border-subtle)',
                  boxShadow: isActive ? `0 0 25px rgba(251, 191, 36, 0.25)` : 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  {/* Photo container */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '190px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '16px'
                  }}>
                    <img
                      src={variety.image}
                      alt={variety.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(0, 0, 0, 0.8)',
                      color: '#34D399',
                      border: '1px solid rgba(52, 211, 153, 0.4)'
                    }}>
                      {variety.genome}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: variety.badgeColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '4px'
                  }}>
                    {variety.localTag}
                  </div>

                  <h3 style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    marginBottom: '6px'
                  }}>
                    {variety.name}
                  </h3>

                  <p style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    marginBottom: '12px'
                  }}>
                    {variety.scientificName}
                  </p>

                  <p style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '16px'
                  }}>
                    {variety.highlight}
                  </p>
                </div>

                {/* Key Spec Badges */}
                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.76rem',
                  color: 'var(--text-muted)'
                }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 700 }}>
                      {variety.brixSweetness.split(' ')[0]}
                    </span>
                    <span>Sweetness</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 700 }}>
                      {variety.shelfLife}
                    </span>
                    <span>Post-Harvest</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 700 }}>
                      {variety.peelThickness.split(' ')[0]}
                    </span>
                    <span>Peel Skin</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Variety Detailed Inspector Banner */}
        <div className="glass-panel" style={{
          padding: '32px',
          borderRadius: '24px',
          background: 'rgba(14, 26, 17, 0.92)',
          border: '1px solid rgba(52, 211, 153, 0.3)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: activeVariety.badgeColor,
                  color: '#000000',
                  fontSize: '0.72rem',
                  fontWeight: 800
                }}>
                  {activeVariety.genome}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
                  Model Accuracy on Dataset: <strong>98.7%</strong>
                </span>
              </div>

              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: '#FFFFFF',
                marginBottom: '10px'
              }}>
                {activeVariety.name}: Agronomic &amp; Market Profile
              </h3>

              <p style={{ fontSize: '0.92rem', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '20px' }}>
                {activeVariety.description}
              </p>

              <div>
                <div style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#FBBF24',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  Primary Uses &amp; Recipes:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {activeVariety.culinaryRoles.map((role) => (
                    <span
                      key={role}
                      style={{
                        fontSize: '0.78rem',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#F0FDF4',
                        border: '1px solid rgba(255, 255, 255, 0.12)'
                      }}
                    >
                      ✓ {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Metrics Comparison Table */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '24px',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.05rem',
                color: '#FFFFFF',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <BarChart3 size={18} color="#34D399" />
                <span>Field Classification Parameters</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { label: 'Sugar Concentration', value: activeVariety.brixSweetness },
                  { label: 'Peel Caliper Thickness', value: activeVariety.peelThickness },
                  { label: 'Ambient Holding Shelf Life', value: activeVariety.shelfLife },
                  { label: 'Botanical Cross Group', value: activeVariety.genome }
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: '8px',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      fontSize: '0.85rem'
                    }}
                  >
                    <span style={{ color: '#94A3B8' }}>{row.label}</span>
                    <span style={{ fontWeight: 700, color: '#34D399', fontFamily: 'var(--font-mono)' }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
