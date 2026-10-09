import { useEffect, useRef, useState } from 'react';
import {
  MotionConfig,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue
} from 'framer-motion';
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
import { pauseOffscreen } from './lib/pauseOffscreen';
import { preloadImages } from './lib/preloadImages';

const RIPEN_STOPS = RIPENESS_COLORS.map((_, i) => i / (RIPENESS_COLORS.length - 1));
const RIPEN_STEPS = 40;

const scrollbarRule = (color: string) =>
  `html::-webkit-scrollbar-thumb,body::-webkit-scrollbar-thumb{background-color:${color}}` +
  `@supports not selector(::-webkit-scrollbar){html,body{scrollbar-color:${color} var(--paper)}}`;

/**
 * The page scrollbar ripens from unripe to overripe as you scroll. It is recoloured through its
 * own stylesheet: changing an inherited custom property on <html> would restyle every element.
 */
function useRipeningScrollbar(scrollYProgress: MotionValue<number>) {
  const stepped = useTransform(scrollYProgress, (p) => Math.round(p * RIPEN_STEPS) / RIPEN_STEPS);
  const ripe = useTransform(stepped, RIPEN_STOPS, RIPENESS_COLORS);
  const sheet = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = scrollbarRule(ripe.get());
    document.head.appendChild(style);
    sheet.current = style;
    return () => {
      style.remove();
      sheet.current = null;
    };
  }, [ripe]);

  useMotionValueEvent(ripe, 'change', (value) => {
    if (sheet.current) sheet.current.textContent = scrollbarRule(value);
  });
}

export function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  useRipeningScrollbar(scrollYProgress);

  useEffect(() => pauseOffscreen(), []);
  useEffect(() => preloadImages(), []);

  const openDownload = () => setDownloadOpen(true);

  return (
    <MotionConfig reducedMotion="user">
      <Navbar scrollY={scrollY} progress={scrollYProgress} openDownloadModal={openDownload} />

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
