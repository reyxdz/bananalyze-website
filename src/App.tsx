import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhoneSimulator } from './components/PhoneSimulator';
import { RipenessSlider } from './components/RipenessSlider';
import { VarietyGrid } from './components/VarietyGrid';
import { OfflineVsCloud } from './components/OfflineVsCloud';
import { FieldFirstUX } from './components/FieldFirstUX';
import { ArchitectureSpecs } from './components/ArchitectureSpecs';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { sound } from './utils/audio';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);

  // Sync theme with html root attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sync sound setting
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  const toggleTheme = () => {
    sound.playTap();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      sound.enabled = next;
      if (next) sound.playTap();
      return next;
    });
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('simulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="banana-app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Sticky Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        openDownloadModal={() => setDownloadModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        <HeroSection
          openDownloadModal={() => setDownloadModalOpen(true)}
          scrollToSimulator={scrollToSimulator}
        />

        <PhoneSimulator />

        <RipenessSlider />

        <VarietyGrid />

        <OfflineVsCloud />

        <FieldFirstUX />

        <ArchitectureSpecs />

        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Download / QR Code Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

export default App;
