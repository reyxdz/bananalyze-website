import { useEffect, useState } from 'react';
import { MotionConfig, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
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
import { RIPENESS_COLORS } from './data/bananaData';
import { startSmoothScroll } from './lib/smoothScroll';

const RIPEN_STOPS = RIPENESS_COLORS.map((_, i) => i / (RIPENESS_COLORS.length - 1));

/** The page ripens from unripe to overripe as you scroll; --ripe carries the current peel colour. */
function useRipeningPage() {
  const { scrollYProgress } = useScroll();
  const ripe = useTransform(scrollYProgress, RIPEN_STOPS, RIPENESS_COLORS);

  useEffect(() => {
    document.documentElement.style.setProperty('--ripe', ripe.get());
  }, [ripe]);

  useMotionValueEvent(ripe, 'change', (value) => {
    document.documentElement.style.setProperty('--ripe', value);
  });

  return scrollYProgress;
}

export function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const progress = useRipeningPage();

  useEffect(() => startSmoothScroll(), []);

  const openDownload = () => setDownloadOpen(true);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar progress={progress} openDownloadModal={openDownload} />

      <main style={{ flex: 1 }}>
        <HeroSection openDownloadModal={openDownload} />
        <PhoneSimulator />
        <RipenessSlider />
        <VarietyGrid />
        <OfflineVsCloud />
        <FieldFirstUX />
        <ArchitectureSpecs />
        <FAQSection />
      </main>

      <Footer openDownloadModal={openDownload} />

      <DownloadModal isOpen={downloadOpen} onClose={() => setDownloadOpen(false)} />
    </MotionConfig>
  );
}

export default App;
