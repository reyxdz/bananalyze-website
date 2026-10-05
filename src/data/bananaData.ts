export interface BananaSample {
  id: string;
  variety: string;
  scientificName: string;
  ripeness: 'Unripe' | 'Ripe' | 'Overripe';
  ripenessStageNumber: number; // 1 to 7
  confidence: number;
  image: string;
  description: string;
  culinaryUse: string;
  storageTip: string;
  nutritionalHighlights: {
    resistantStarch: string;
    naturalSugars: string;
    potassium: string;
    vitaminC: string;
  };
  fieldNotes: string;
  badgeColor: string;
}

export const BANANA_SAMPLES: BananaSample[] = [
  {
    id: 'lakatan-ripe',
    variety: 'Lakatan',
    scientificName: 'Musa acuminata (AA Group)',
    ripeness: 'Ripe',
    ripenessStageNumber: 5,
    confidence: 0.987,
    image: '/assets/variety_lakatan.jpg',
    description: 'The golden crown of Philippine dessert bananas. Deep orange-yellow flesh rich in beta-carotene with a distinct aromatic floral sweetness.',
    culinaryUse: 'Best enjoyed fresh as premium table fruit or in fruit parfaits.',
    storageTip: 'Store at 13°C - 16°C in ventilated ambient shade. Never refrigerate before peak ripeness.',
    nutritionalHighlights: {
      resistantStarch: '12%',
      naturalSugars: '68%',
      potassium: '450 mg',
      vitaminC: '14 mg'
    },
    fieldNotes: 'Thick protective peel, moderate fungal resilience, high market retail margin in Metro Manila & Cebu markets.',
    badgeColor: '#F59E0B'
  },
  {
    id: 'saba-cooking',
    variety: 'Saba (Cardaba)',
    scientificName: 'Musa acuminata × balbisiana (BBB Group)',
    ripeness: 'Unripe',
    ripenessStageNumber: 2,
    confidence: 0.992,
    image: '/assets/variety_saba.jpg',
    description: 'Heavy angular Philippine cooking banana with thick green-yellow peel and ultra-dense starchy pulp that withstands high heat frying.',
    culinaryUse: 'Essential for Turon, Banana Cue, Maruya, Nilaga, and savory Pochero.',
    storageTip: 'Can be stored in open crates up to 10 days in field conditions without quality loss.',
    nutritionalHighlights: {
      resistantStarch: '74%',
      naturalSugars: '14%',
      potassium: '520 mg',
      vitaminC: '18 mg'
    },
    fieldNotes: 'Exceptional drought tolerance; pseudostem highly resistant to typhoons and wind stress.',
    badgeColor: '#84CC16'
  },
  {
    id: 'cavendish-ripe',
    variety: 'Cavendish',
    scientificName: 'Musa acuminata (AAA Group)',
    ripeness: 'Ripe',
    ripenessStageNumber: 5,
    confidence: 0.981,
    image: '/assets/variety_cavendish.jpg',
    description: 'International export flagship banana with uniform cylindrical curvature, clean yellow peel, and balanced sweet creamy texture.',
    culinaryUse: 'Standard table banana, athletic training fuel, smoothies, and breakfast cereals.',
    storageTip: 'Sensitive to mechanical bruising. Pack in padded cardboard crates at 13.5°C export reefer containers.',
    nutritionalHighlights: {
      resistantStarch: '15%',
      naturalSugars: '62%',
      potassium: '422 mg',
      vitaminC: '10 mg'
    },
    fieldNotes: 'Davao and Mindanao export standard; requires strict canopy management against Black Sigatoka.',
    badgeColor: '#FBBF24'
  },
  {
    id: 'latundan-overripe',
    variety: 'Latundan',
    scientificName: 'Musa acuminata × balbisiana (AAB Group)',
    ripeness: 'Overripe',
    ripenessStageNumber: 7,
    confidence: 0.974,
    image: '/assets/variety_latundan.jpg',
    description: 'The Silk banana. Delicate, paper-thin peel with classic sugar leopard freckles. Pleasantly subacid, apple-like sweet tangy flavor.',
    culinaryUse: 'Peak aromatic sweetness; perfect for baked banana bread, pancakes, and infant complementary feeding.',
    storageTip: 'Fragile thin peel prone to skin splitting; consume within 48 hours of sugar spotting.',
    nutritionalHighlights: {
      resistantStarch: '4%',
      naturalSugars: '82%',
      potassium: '390 mg',
      vitaminC: '16 mg'
    },
    fieldNotes: 'Easily bruised during motorcycle / jeepney transit; primarily traded in localized farm gates.',
    badgeColor: '#D97706'
  }
];

export interface ScanRecord {
  id: string;
  variety: string;
  ripeness: string;
  confidence: number;
  timestamp: string;
  image: string;
}

export const INITIAL_MOCK_HISTORY: ScanRecord[] = [
  {
    id: 'scan-0941',
    variety: 'Lakatan',
    ripeness: 'Ripe',
    confidence: 0.987,
    timestamp: 'Just now • Field Sector 4',
    image: '/assets/variety_lakatan.jpg'
  },
  {
    id: 'scan-0940',
    variety: 'Saba (Cardaba)',
    ripeness: 'Unripe',
    confidence: 0.992,
    timestamp: '14 min ago • Sorting Crate B',
    image: '/assets/variety_saba.jpg'
  },
  {
    id: 'scan-0939',
    variety: 'Cavendish',
    ripeness: 'Ripe',
    confidence: 0.981,
    timestamp: '1 hour ago • Export Shed 1',
    image: '/assets/variety_cavendish.jpg'
  }
];
