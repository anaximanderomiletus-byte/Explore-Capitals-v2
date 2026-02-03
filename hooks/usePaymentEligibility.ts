import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { checkPaymentEligibility, acceptTermsOfService } from '../services/subscription';
import type { PaymentEligibility } from '../types';

export interface PaymentEligibilityResult {
  eligibility: PaymentEligibility | null;
  isLoading: boolean;
  error: string | null;
  checkEligibility: (amount?: number) => Promise<PaymentEligibility>;
  acceptTerms: () => Promise<void>;
  refreshEligibility: () => void;
}

/**
 * Hook to check and manage payment eligibility
 */
export function usePaymentEligibility(): PaymentEligibilityResult {
  const { user } = useAuth();
  const { userProfile, updateUserProfile } = useUser();
  const [eligibility, setEligibility] = useState<PaymentEligibility | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkEligibility = useCallback(async (amount?: number): Promise<PaymentEligibility> => {
    if (!user) {
      const result: PaymentEligibility = {
        allowed: false,
        reason: 'Please sign in to make a purchase.',
      };
      setEligibility(result);
      return result;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await checkPaymentEligibility(amount);
      setEligibility(result);
      return result;
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to check eligibility';
      setError(errorMsg);
      const result: PaymentEligibility = {
        allowed: false,
        reason: errorMsg,
      };
      setEligibility(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const acceptTerms = useCallback(async (): Promise<void> => {
    if (!user) {
      throw new Error('Please sign in first.');
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await acceptTermsOfService();
      
      // Update local user profile
      updateUserProfile({
        termsAcceptedAt: new Date().toISOString(),
        termsVersion: result.version,
        privacyAcceptedAt: new Date().toISOString(),
      });

      // Re-check eligibility after accepting terms
      await checkEligibility();
    } catch (err: any) {
      const errorMsg = err.message || 'Failed to accept terms';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [user, updateUserProfile, checkEligibility]);

  const refreshEligibility = useCallback(() => {
    checkEligibility();
  }, [checkEligibility]);

  // Check eligibility on mount and when user changes
  useEffect(() => {
    if (user) {
      checkEligibility();
    } else {
      setEligibility(null);
    }
  }, [user?.uid]);

  return {
    eligibility,
    isLoading,
    error,
    checkEligibility,
    acceptTerms,
    refreshEligibility,
  };
}

export default usePaymentEligibility;
