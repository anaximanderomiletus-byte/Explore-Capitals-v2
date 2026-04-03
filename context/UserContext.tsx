import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COUNTRIES } from '../constants';
import {
  Achievement,
  GameResultPayload,
  LoyaltyTier,
  UserProfile,
  UserStats,
} from '../types';

const GUEST_KEY = 'explorecapitals:user:guest';

type UserContextType = {
  user: UserProfile;
  userProfile: UserProfile;
  isAuthenticated: false;
  isLoading: boolean;
  recordGameResult: (payload: GameResultPayload) => void;
  updateUserStats: (stats: UserStats) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  strengths: { countryId: string; score: number }[];
  weaknesses: { countryId: string; score: number }[];
  regionStrengths: { region: string; accuracy: number; attempts: number }[];
  regionWeaknesses: { region: string; accuracy: number; attempts: number }[];
  loyaltyProgress: {
    tier: LoyaltyTier;
    nextTier?: LoyaltyTier;
    progressToNext: number;
    points: number;
  };
};

const defaultStats: UserStats = {
  totalCorrect: 0,
  totalWrong: 0,
  totalTimeSeconds: 0,
  games: {},
  byRegion: {},
  byCountry: {},
};

const tierThresholds: { tier: LoyaltyTier; minPoints: number; benefits: string[] }[] = [
  { tier: 'Explorer', minPoints: 0, benefits: ['Standard Profile Icon', 'Basic Progress Tracking'] },
  { tier: 'Voyager', minPoints: 500, benefits: ['Voyager Badge', 'Unlocked Analytics', 'New Profile Icons'] },
  { tier: 'Pathfinder', minPoints: 1200, benefits: ['Pathfinder Badge', 'Custom Map Markers', 'Enhanced Stats'] },
  { tier: 'Navigator', minPoints: 2500, benefits: ['Navigator Badge', 'Global Leaderboard Access', 'New Avatars'] },
  { tier: 'Cartographer', minPoints: 5000, benefits: ['Gold Cartographer Badge', 'Exclusive Map Themes', 'Priority Support'] },
  { tier: 'Ambassador', minPoints: 10000, benefits: ['Ambassador Status', 'Diplomatic Profile Glow', 'Early Game Access'] },
  { tier: 'Strategist', minPoints: 20000, benefits: ['Strategist Badge', 'Advanced Game Modes', 'Expert Analytics'] },
  { tier: 'Master', minPoints: 40000, benefits: ['Master Icon', 'Hall of Fame Eligibility', 'Custom Themes'] },
  { tier: 'Legend', minPoints: 75000, benefits: ['Legendary Status', 'Special Profile Aura', 'All-Time Recognition'] },
  { tier: 'Grandmaster', minPoints: 150000, benefits: ['Ultimate Grandmaster Title', 'Gold Profile Frame', 'Eternal Fame'] },
];

const nowIso = () => new Date().toISOString();

const makeUser = (id: string, name: string): UserProfile => ({
  id,
  name: name.trim() || 'Guest Explorer',
  joinedAt: nowIso(),
  loyaltyPoints: 0,
  tier: 'Explorer',
  stats: { ...defaultStats },
  achievements: [],
  streakDays: 1,
  lastSessionAt: nowIso(),
  isSupporter: false,
});

const calculateTier = (points: number): LoyaltyTier => {
  let current: LoyaltyTier = 'Explorer';
  tierThresholds.forEach((t) => {
    if (points >= t.minPoints) current = t.tier;
  });
  return current;
};

const calculateProgress = (points: number) => {
  const currentTier = tierThresholds
    .slice()
    .reverse()
    .find((t) => points >= t.minPoints) ?? tierThresholds[0];
  const currentIndex = tierThresholds.findIndex((t) => t.tier === currentTier.tier);
  const nextTier = tierThresholds[currentIndex + 1];
  if (!nextTier) {
    return { tier: currentTier.tier, nextTier: undefined, progressToNext: 100, points };
  }
  const span = nextTier.minPoints - currentTier.minPoints;
  const progressed = points - currentTier.minPoints;
  const pct = Math.min(100, Math.round((progressed / span) * 100));
  return { tier: currentTier.tier, nextTier: nextTier.tier, progressToNext: pct, points };
};

const upsertRegion = (stats: UserStats, region: string, isCorrect: boolean) => {
  const entry = stats.byRegion[region] ?? { correct: 0, wrong: 0 };
  if (isCorrect) entry.correct += 1;
  else entry.wrong += 1;
  stats.byRegion[region] = entry;
};

const upsertCountry = (stats: UserStats, countryId: string, isCorrect: boolean) => {
  const entry = stats.byCountry[countryId] ?? { correct: 0, wrong: 0 };
  if (isCorrect) entry.correct += 1;
  else entry.wrong += 1;
  stats.byCountry[countryId] = entry;
};

const ensureGameProgress = (stats: UserStats, gameId: string) => {
  if (!stats.games[gameId]) {
    stats.games[gameId] = {
      gameId,
      plays: 0,
      bestScore: 0,
      lastScore: 0,
      lastPlayedAt: nowIso(),
      totalCorrect: 0,
      totalWrong: 0,
      totalTimeSeconds: 0,
    };
  }
};

const normalizeStats = (raw: any): UserStats => ({
  totalCorrect: raw?.totalCorrect ?? 0,
  totalWrong: raw?.totalWrong ?? 0,
  totalTimeSeconds: raw?.totalTimeSeconds ?? 0,
  games: raw?.games ?? {},
  byRegion: raw?.byRegion ?? {},
  byCountry: raw?.byCountry ?? {},
});

const evaluateAchievements = (
  user: UserProfile,
  payload?: GameResultPayload,
  countryLookup?: Map<string, string>,
) => {
  const totalPlays = Object.values(user.stats.games).reduce((sum, g) => sum + g.plays, 0);
  if (totalPlays >= 1 && !user.achievements.some((a) => a.id === 'first-game')) {
    user.achievements.push({
      id: 'first-game',
      title: 'First Expedition',
      description: 'Completed your first game.',
      earnedAt: nowIso(),
      icon: '🧭',
    });
  }

  if (payload?.gameId === 'capital-quiz' && payload.score >= 500) {
    if (!user.achievements.some((a) => a.id === 'capital-quiz-500')) {
      user.achievements.push({
      id: 'capital-quiz-500',
      title: 'Rapid Recall',
      description: 'Scored 500+ points in Capital Quiz.',
      earnedAt: nowIso(),
      icon: '⚡',
    });
    }
  }

  if (payload?.gameId === 'map-dash' && payload.score >= 800) {
    if (!user.achievements.some((a) => a.id === 'map-dash-800')) {
      user.achievements.push({
      id: 'map-dash-800',
      title: 'Cartographic Ace',
      description: 'Scored 800+ points in Map Dash.',
      earnedAt: nowIso(),
      icon: '🗺️',
    });
    }
  }

  if (payload?.gameId === 'flag-frenzy' && payload.score >= 400) {
    if (!user.achievements.some((a) => a.id === 'flag-frenzy-400')) {
      user.achievements.push({
      id: 'flag-frenzy-400',
      title: 'Flag Savant',
      description: 'Scored 400+ points in Flag Frenzy.',
      earnedAt: nowIso(),
      icon: '🚩',
    });
    }
  }

  if (countryLookup) {
    const regionData: Record<string, { icon: string; title: string }> = {
      'Africa': { icon: '🌍', title: 'Africa Master' },
      'Europe': { icon: '🌍', title: 'Europe Master' },
      'Asia': { icon: '🌏', title: 'Asia Master' },
      'North America': { icon: '🌎', title: 'North America Master' },
      'South America': { icon: '🌎', title: 'South America Master' },
      'Oceania': { icon: '🌏', title: 'Oceania Master' },
      'Middle East': { icon: '🕌', title: 'Oasis Oracle' },
      'Caribbean': { icon: '🌺', title: 'Island Virtuoso' },
      'Central America': { icon: '🌋', title: 'Mayan Maven' },
      'Southeast Asia': { icon: '🐘', title: 'Spice Route Savant' },
      'East Asia': { icon: '🐉', title: 'Dragon Dynasty Scholar' },
      'South Asia': { icon: '🕉️', title: 'Monsoon Maestro' },
      'Western Europe': { icon: '🗼', title: 'Renaissance Virtuoso' },
      'Eastern Europe': { icon: '⛪', title: 'Slavic Scholar' },
      'Northern Europe': { icon: '🏔️', title: 'Nordic Navigator' },
      'Southern Europe': { icon: '🏛️', title: 'Mediterranean Maestro' },
      'Central Asia': { icon: '🐫', title: 'Silk Road Scholar' },
      'Pacific': { icon: '🌊', title: 'Polynesian Pioneer' },
    };

    Object.entries(user.stats.byRegion).forEach(([region, stat]) => {
      const attempts = (stat as any).correct + (stat as any).wrong;
      const accuracy = attempts > 0 ? (stat as any).correct / attempts : 0;
      if (attempts >= 15 && accuracy >= 0.7) {
        const id = `region-master-${region.toLowerCase().replace(/\s+/g, '-')}`;
        if (!user.achievements.some((a) => a.id === id)) {
          const data = regionData[region] ||
            Object.entries(regionData).find(([key]) =>
              region.toLowerCase().includes(key.toLowerCase()) ||
              key.toLowerCase().includes(region.toLowerCase())
            )?.[1] || { icon: '🌐', title: `${region} Expert` };

          user.achievements.push({
            id,
            title: data.title,
            description: `Answered 15+ questions about ${region} with 70%+ accuracy.`,
            earnedAt: nowIso(),
            icon: data.icon,
          });
        }
      }
    });
  }
};

const getLocalGuest = (): UserProfile => {
  const fallback = makeUser('guest', 'Guest Explorer');
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    if (!raw || raw === 'undefined' || raw === 'null') return fallback;

    const data = JSON.parse(raw);
    if (!data || typeof data !== 'object') return fallback;

    data.stats = normalizeStats(data.stats);
    data.achievements = Array.isArray(data.achievements) ? data.achievements : [];
    data.loyaltyPoints = typeof data.loyaltyPoints === 'number' ? data.loyaltyPoints : 0;

    if (data.loyaltyPoints > 1000000) {
      data.loyaltyPoints = 150000;
      data.tier = 'Grandmaster';
    }

    return {
      ...fallback,
      ...data,
      id: 'guest'
    } as UserProfile;
  } catch (e) {
    return fallback;
  }
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(getLocalGuest);
  const [loading] = useState(false);

  // Persist guest profile to localStorage
  useEffect(() => {
    if (profile.id === 'guest') {
      localStorage.setItem(GUEST_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  const countryLookup = useMemo(() => {
    const map = new Map<string, string>();
    COUNTRIES.forEach((c) => map.set(c.id, c.region));
    return map;
  }, []);

  const recordGameResult = useCallback(
    async (payload: GameResultPayload) => {
      setProfile((prev) => {
        const next: UserProfile = JSON.parse(JSON.stringify(prev));
        const stats = next.stats;
        ensureGameProgress(stats, payload.gameId);
        const gameProgress = stats.games[payload.gameId];

        gameProgress.plays += 1;
        gameProgress.lastScore = payload.score;
        gameProgress.bestScore = Math.max(gameProgress.bestScore, payload.score);
        gameProgress.lastPlayedAt = nowIso();

        const duration = Math.min(Math.max(0, payload.durationSeconds ?? 0), 3600);
        gameProgress.totalTimeSeconds += duration;
        next.stats.totalTimeSeconds += duration;

        const correct = payload.correctCountries ?? [];
        const wrong = payload.incorrectCountries ?? [];

        correct.forEach((id) => {
          stats.totalCorrect += 1;
          gameProgress.totalCorrect += 1;
          upsertCountry(stats, id, true);
          const region = countryLookup.get(id);
          if (region) upsertRegion(stats, region, true);
        });

        wrong.forEach((id) => {
          stats.totalWrong += 1;
          gameProgress.totalWrong += 1;
          upsertCountry(stats, id, false);
          const region = countryLookup.get(id);
          if (region) upsertRegion(stats, region, false);
        });

        const attemptCount = correct.length + wrong.length;
        const accuracyBonus = attemptCount > 0 ? Math.round((correct.length / attemptCount) * 50) : 10;
        const rawDelta = payload.score + accuracyBonus + correct.length * 5;
        const deltaPoints = Math.min(rawDelta, 5000);

        next.loyaltyPoints += deltaPoints;
        next.tier = calculateTier(next.loyaltyPoints);
        next.lastSessionAt = nowIso();

        evaluateAchievements(next, payload, countryLookup);

        return next;
      });
    },
    [countryLookup],
  );

  const updateUserStats = useCallback(async (stats: UserStats) => {
    setProfile(prev => ({ ...prev, stats }));
  }, []);

  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const strengthWeakness = useMemo(() => {
    const entries = Object.entries(profile.stats.byCountry).map(([countryId, stat]) => {
      const attempts = (stat as any).correct + (stat as any).wrong;
      const accuracy = attempts === 0 ? 0 : (stat as any).correct / attempts;
      return { countryId, score: accuracy, attempts };
    });
    const strengths = entries
      .filter((e) => e.attempts >= 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    const weaknesses = entries
      .filter((e) => e.attempts >= 2)
      .sort((a, b) => a.score - b.score)
      .slice(0, 6);
    return { strengths, weaknesses };
  }, [profile]);

  const regionBreakdown = useMemo(() => {
    const entries = Object.entries(profile.stats.byRegion).map(([region, stat]) => {
      const attempts = (stat as any).correct + (stat as any).wrong;
      const accuracy = attempts === 0 ? 0 : (stat as any).correct / attempts;
      return { region, accuracy, attempts };
    });
    const strengths = entries
      .filter((e) => e.attempts >= 3)
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 5);
    const weaknesses = entries
      .filter((e) => e.attempts >= 3)
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);
    return { strengths, weaknesses };
  }, [profile]);

  const loyaltyProgress = useMemo(() => {
    return calculateProgress(profile.loyaltyPoints);
  }, [profile.loyaltyPoints]);

  const value: UserContextType = {
    user: profile,
    userProfile: profile,
    isAuthenticated: false,
    isLoading: loading,
    recordGameResult,
    updateUserStats,
    updateUserProfile,
    strengths: strengthWeakness.strengths.map(({ countryId, score }) => ({ countryId, score })),
    weaknesses: strengthWeakness.weaknesses.map(({ countryId, score }) => ({ countryId, score })),
    regionStrengths: regionBreakdown.strengths,
    regionWeaknesses: regionBreakdown.weaknesses,
    loyaltyProgress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
