
export interface Country {
  id: string;
  name: string;
  capital: string;
  population: string;
  region: string;
  flag: string; // Emoji or URL
  lat: number;
  lng: number;
  description: string;
  area: string;       // e.g. "652 K km²"
  currency: string;   // e.g. "Afghan afghani"
  languages: string[]; // e.g. ["Pashto", "Dari"]
  borders?: string[]; // Array of bordering country names
  gdp?: string;       // e.g. "$20.1 Billion"
  timeZone?: string;  // e.g. "UTC +4:30"
  callingCode?: string; // e.g. "+93"
  driveSide?: string;  // e.g. "Right"
  alsoKnownAs?: string[]; // Array of alternative names
}

export interface Territory extends Country {
  sovereignty: string; // The sovereign state claiming the territory
}

export interface Game {
  id: string;
  title: string;
  image: string;
  status: 'active' | 'coming_soon';
  description: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface TourStop {
  stopName: string;
  imageKeyword: string;
  description: string[]; // Changed to array for strict paragraph separation
  question: string;
  options: string[];
  answer: string;
  explanation?: string; // Additional context for the answer
}

export interface TourData {
  tourTitle: string;
  introText: string;
  stops: TourStop[];
}

// --- User, Loyalty, and Progress Tracking ---
export type LoyaltyTier = 'Explorer' | 'Voyager' | 'Pathfinder' | 'Navigator' | 'Cartographer' | 'Ambassador' | 'Strategist' | 'Master' | 'Legend' | 'Grandmaster';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
  icon?: string;
}

export interface GameProgress {
  gameId: string;
  plays: number;
  bestScore: number;
  lastScore: number;
  lastPlayedAt: string;
  totalCorrect: number;
  totalWrong: number;
  totalTimeSeconds: number;
}

export interface RegionStat {
  correct: number;
  wrong: number;
}

export interface CountryStat extends RegionStat {}

export interface UserStats {
  totalCorrect: number;
  totalWrong: number;
  totalTimeSeconds: number;
  games: Record<string, GameProgress>;
  byRegion: Record<string, RegionStat>;
  byCountry: Record<string, CountryStat>;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  photoURL?: string;
  joinedAt: string;
  loyaltyPoints: number;
  tier: LoyaltyTier;
  stats: UserStats;
  achievements: Achievement[];
  streakDays: number;
  lastSessionAt?: string;
}

export interface GameResultPayload {
  gameId: string;
  score: number;
  correctCountries?: string[];
  incorrectCountries?: string[];
  durationSeconds?: number;
}
