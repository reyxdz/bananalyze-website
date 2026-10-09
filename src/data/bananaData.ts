/**
 * Everything here mirrors the Bananalyze app (bananaCheck repo):
 * copy from `banana_info_data.dart`, `ripeness_helpers.dart`, `result_card.dart`
 * and `confidence_indicator.dart`; test results from `ml/output/evaluation_metrics.json`.
 * Keep it in step with the app rather than adding figures the app doesn't make.
 */

export type Ripeness = 'Unripe' | 'Ripe' | 'Overripe';

export const RIPENESS_ORDER: Ripeness[] = ['Unripe', 'Ripe', 'Overripe'];

/* ---------- model test results ---------- */

export const MODEL = {
  architecture: 'MobileNetV2',
  runtime: 'TensorFlow Lite',
  sizeMb: 8.6,
  inputPx: 224,
  classes: 19,
  testPhotos: 591,
  testCorrect: 571,
  accuracy: 96.6,
  bananaPhotos: 530,
  varietyCorrect: 525,
  notBananaPhotos: 61
} as const;

/* ---------- ripeness ---------- */

export interface RipenessLevel {
  id: Ripeness;
  color: string;
  image: string;
  /** One-line meaning shown under the result headline. */
  summary: string;
  /** "Handling tip" card on the result screen. */
  handlingTip: string;
  peel: string;
  health: string[];
  /** 0 = all starch, 1 = all sugar. Drawn as a position, never quoted as a number. */
  sweetness: number;
}

export const RIPENESS_LEVELS: RipenessLevel[] = [
  {
    id: 'Unripe',
    color: '#689A2B',
    image: '/assets/ripeness_unripe.jpg',
    summary: 'Still green. Give it a few days',
    handlingTip: 'Store at room temperature. Best for market sale in 2 to 4 days.',
    peel: 'Green, firm peel',
    health: [
      'More resistant starch, digested slowly for a gentler rise in blood sugar',
      'Its resistant starch feeds the good bacteria in your gut'
    ],
    sweetness: 0.16
  },
  {
    id: 'Ripe',
    color: '#E8C02D',
    image: '/assets/ripeness_ripe.jpg',
    summary: 'Ready to eat today',
    handlingTip: 'Ready for immediate consumption or market display today!',
    peel: 'Yellow peel, flesh gives a little',
    health: [
      'Starch has turned into natural sugars for quick energy',
      'Softer and easier to digest than when green'
    ],
    sweetness: 0.62
  },
  {
    id: 'Overripe',
    color: '#D2901C',
    image: '/assets/variety_latundan.jpg',
    summary: 'Very soft, best for cooking and baking',
    handlingTip: 'Best used immediately for baking, smoothies, or processing.',
    peel: 'Brown spots, very soft',
    health: [
      'Sweetest stage, when most of the starch is now sugar',
      'Very soft, easy to mash, ideal for cooking and baking'
    ],
    sweetness: 0.9
  }
];

export const RIPENESS_COLORS = RIPENESS_LEVELS.map((r) => r.color);

export const ripenessLevel = (id: Ripeness) => RIPENESS_LEVELS.find((r) => r.id === id) ?? RIPENESS_LEVELS[1];

/* ---------- confidence ---------- */

export interface ConfidenceLevel {
  label: string;
  bars: 1 | 2 | 3;
}

export const confidenceLevel = (confidence: number): ConfidenceLevel =>
  confidence >= 0.85
    ? { label: "We're pretty sure", bars: 3 }
    : confidence >= 0.65
      ? { label: 'This looks likely', bars: 2 }
      : { label: 'Not very clear. Try another photo', bars: 1 };

/* ---------- varieties ---------- */

export interface TestResult {
  correct: number;
  total: number;
}

export interface Variety {
  id: string;
  name: string;
  kind: 'Cooking banana' | 'Dessert banana';
  genome: 'AA' | 'AAA' | 'AAB' | 'ABB';
  /** Absent for varieties we don't have a photo of yet. */
  image?: string;
  description: string;
  benefits: string[];
  dishes: Record<Ripeness, string[]>;
  /** Test photos where both variety and ripeness were right, per ripeness level. */
  tested: Record<Ripeness, TestResult>;
}

const B6 = 'Good source of vitamin B6, which helps the body turn food into energy';
const POTASSIUM = 'Contains potassium, which helps the heart and muscles work';
const VITAMIN_C = 'Contains vitamin C, which supports the immune system';
const FIBER = 'Provides dietary fiber, which supports healthy digestion';
const STARCHY = 'Starchy cooking banana, filling and energy-giving when cooked';

export const VARIETIES: Variety[] = [
  {
    id: 'saba',
    name: 'Saba',
    kind: 'Cooking banana',
    genome: 'ABB',
    image: '/assets/variety_saba.jpg',
    description:
      'The banana behind Filipino street food. Angular and thick-skinned, with dense starchy flesh that is boiled, grilled or fried, often while still green.',
    benefits: [STARCHY, B6, POTASSIUM, FIBER],
    dishes: {
      Unripe: ['Nilagang saging', 'Banana chips', 'Nilupak'],
      Ripe: ['Banana cue', 'Turon', 'Maruya', 'Ginanggang', 'Minatamis na saging'],
      Overripe: ['Maruya', 'Minatamis na saging']
    },
    tested: {
      Unripe: { correct: 29, total: 29 },
      Ripe: { correct: 26, total: 31 },
      Overripe: { correct: 13, total: 22 }
    }
  },
  {
    id: 'cardaba',
    name: 'Cardaba',
    kind: 'Cooking banana',
    genome: 'ABB',
    description:
      'A large cooking banana from the same family as Saba and cooked the same ways. It looks a lot like Saba, and Bananalyze tells the two apart.',
    benefits: [STARCHY, B6, POTASSIUM, FIBER],
    dishes: {
      Unripe: ['Nilagang saging', 'Banana chips'],
      Ripe: ['Banana cue', 'Turon', 'Maruya', 'Minatamis na saging'],
      Overripe: ['Maruya', 'Minatamis na saging']
    },
    tested: {
      Unripe: { correct: 30, total: 30 },
      Ripe: { correct: 30, total: 30 },
      Overripe: { correct: 30, total: 30 }
    }
  },
  {
    id: 'cavendish',
    name: 'Cavendish',
    kind: 'Dessert banana',
    genome: 'AAA',
    image: '/assets/variety_cavendish.jpg',
    description:
      'The supermarket banana. Long, evenly curved fingers with a clean yellow peel and mild, creamy flesh, eaten ripe.',
    benefits: [B6, POTASSIUM, VITAMIN_C, FIBER],
    dishes: {
      Unripe: [],
      Ripe: ['Eaten fresh', 'Banana shake', 'Fruit salad', 'Banana pancakes'],
      Overripe: ['Banana bread', 'Banana muffins', 'Smoothie', 'Banana ice cream']
    },
    tested: {
      Unripe: { correct: 31, total: 32 },
      Ripe: { correct: 29, total: 29 },
      Overripe: { correct: 25, total: 27 }
    }
  },
  {
    id: 'senorita',
    name: 'Señorita',
    kind: 'Dessert banana',
    genome: 'AA',
    description:
      'Small enough to finish in a few bites, with a thin peel and very sweet flesh. A ready-made snack portion.',
    benefits: ['Small and very sweet, a ready-made snack portion', B6, POTASSIUM, VITAMIN_C],
    dishes: {
      Unripe: [],
      Ripe: ['Eaten fresh', 'Fruit platter', 'Dessert topping'],
      Overripe: ['Smoothie', 'Mashed for baby food']
    },
    tested: {
      Unripe: { correct: 29, total: 30 },
      Ripe: { correct: 30, total: 30 },
      Overripe: { correct: 30, total: 30 }
    }
  },
  {
    id: 'latundan',
    name: 'Latundan',
    kind: 'Dessert banana',
    genome: 'AAB',
    image: '/assets/variety_latundan.jpg',
    description:
      'A household staple. Short, plump fingers with a thin peel and soft ivory flesh with a light, slightly tangy sweetness.',
    benefits: [B6, POTASSIUM, VITAMIN_C, FIBER],
    dishes: {
      Unripe: [],
      Ripe: ['Eaten fresh', 'Fruit salad', 'Banana shake'],
      Overripe: ['Banana bread', 'Smoothie', 'Mashed for baby food']
    },
    tested: {
      Unripe: { correct: 30, total: 30 },
      Ripe: { correct: 28, total: 30 },
      Overripe: { correct: 30, total: 30 }
    }
  },
  {
    id: 'lakatan',
    name: 'Lakatan',
    kind: 'Dessert banana',
    genome: 'AAA',
    image: '/assets/variety_lakatan.jpg',
    description:
      'The favourite table banana in Philippine markets. Golden-orange flesh and a strong, sweet aroma, eaten ripe.',
    benefits: [B6, POTASSIUM, VITAMIN_C, FIBER],
    dishes: {
      Unripe: [],
      Ripe: ['Eaten fresh', 'Banana shake', 'Fruit salad'],
      Overripe: ['Banana bread', 'Banana pancakes', 'Smoothie']
    },
    tested: {
      Unripe: { correct: 30, total: 30 },
      Ripe: { correct: 30, total: 30 },
      Overripe: { correct: 30, total: 30 }
    }
  }
];

export const VARIETY_NAMES = VARIETIES.map((v) => v.name);

export const varietyByName = (name: string) => VARIETIES.find((v) => v.name === name) ?? VARIETIES[0];

/* ---------- phone demo ---------- */

export interface BananaSample {
  id: string;
  variety: string;
  ripeness: Ripeness;
  confidence: number;
  image: string;
}

export const BANANA_SAMPLES: BananaSample[] = [
  { id: 'lakatan-ripe', variety: 'Lakatan', ripeness: 'Ripe', confidence: 0.94, image: '/assets/variety_lakatan.jpg' },
  { id: 'saba-unripe', variety: 'Saba', ripeness: 'Unripe', confidence: 0.91, image: '/assets/variety_saba.jpg' },
  { id: 'cavendish-ripe', variety: 'Cavendish', ripeness: 'Ripe', confidence: 0.88, image: '/assets/variety_cavendish.jpg' },
  { id: 'latundan-overripe', variety: 'Latundan', ripeness: 'Overripe', confidence: 0.76, image: '/assets/variety_latundan.jpg' }
];

export interface ScanRecord {
  id: string;
  variety: string;
  ripeness: Ripeness;
  confidence: number;
  timestamp: string;
  image: string;
}

export const INITIAL_MOCK_HISTORY: ScanRecord[] = [
  {
    id: 'scan-0941',
    variety: 'Lakatan',
    ripeness: 'Ripe',
    confidence: 0.94,
    timestamp: 'Today, 07:12',
    image: '/assets/variety_lakatan.jpg'
  },
  {
    id: 'scan-0940',
    variety: 'Saba',
    ripeness: 'Unripe',
    confidence: 0.91,
    timestamp: 'Today, 06:58',
    image: '/assets/variety_saba.jpg'
  },
  {
    id: 'scan-0939',
    variety: 'Cavendish',
    ripeness: 'Ripe',
    confidence: 0.88,
    timestamp: 'Yesterday, 17:40',
    image: '/assets/variety_cavendish.jpg'
  }
];
