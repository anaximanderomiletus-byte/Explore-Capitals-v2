import { useCallback, useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { isPremiumUser, canPlayGame } from '../services/subscription';

const FREE_DAILY_LIMIT = 5;

export interface GameLimitResult {
  canPlay: boolean;
  gamesRemaining: number;
  gamesPlayed: number;
  dailyLimit: number;
  isPremium: boolean;
  incrementGamesPlayed: () => void;
  resetDailyCount: () => void;
}

/**
 * Hook to track and enforce daily game limits for free users
 */
export function useGameLimit(): GameLimitResult {
  const { userProfile, updateUserProfile } = useUser();

  const isPremium = useMemo(() => {
    return isPremiumUser(
      userProfile?.subscriptionStatus,
      userProfile?.subscriptionPlan
    );
  }, [userProfile?.subscriptionStatus, userProfile?.subscriptionPlan]);

  const gamesPlayed = useMemo(() => {
    // Check if last game date is today
    const today = new Date().toISOString().split('T')[0];
    const lastGameDate = userProfile?.lastGameDate;

    if (lastGameDate !== today) {
      return 0; // Reset count for new day
    }

    return userProfile?.dailyGamesPlayed || 0;
  }, [userProfile?.dailyGamesPlayed, userProfile?.lastGameDate]);

  const { allowed: canPlay, remaining: gamesRemaining } = useMemo(() => {
    return canPlayGame(isPremium, gamesPlayed, FREE_DAILY_LIMIT);
  }, [isPremium, gamesPlayed]);

  const incrementGamesPlayed = useCallback(() => {
    if (isPremium) return; // Premium users don't need tracking

    const today = new Date().toISOString().split('T')[0];
    const currentCount = userProfile?.lastGameDate === today
      ? (userProfile?.dailyGamesPlayed || 0)
      : 0;

    updateUserProfile({
      dailyGamesPlayed: currentCount + 1,
      lastGameDate: today,
    });
  }, [isPremium, userProfile?.lastGameDate, userProfile?.dailyGamesPlayed, updateUserProfile]);

  const resetDailyCount = useCallback(() => {
    updateUserProfile({
      dailyGamesPlayed: 0,
      lastGameDate: new Date().toISOString().split('T')[0],
    });
  }, [updateUserProfile]);

  return {
    canPlay,
    gamesRemaining: gamesRemaining === Infinity ? FREE_DAILY_LIMIT : gamesRemaining,
    gamesPlayed,
    dailyLimit: FREE_DAILY_LIMIT,
    isPremium,
    incrementGamesPlayed,
    resetDailyCount,
  };
}

export default useGameLimit;
