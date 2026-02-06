import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Crown, Check, X, Sparkles, Zap, BarChart3, 
  Gamepad2, Shield, Star, ArrowRight, Loader2
} from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import TermsCheckbox from '../components/TermsCheckbox';
import PaymentBlockedModal from '../components/PaymentBlockedModal';
import { useLayout } from '../context/LayoutContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { usePaymentEligibility } from '../hooks/usePaymentEligibility';
import { 
  createSubscriptionCheckout, 
  getSubscriptionInfo,
  isPremiumUser 
} from '../services/subscription';
import type { SubscriptionPlan } from '../types';

const Premium: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { user } = useAuth();
  const { userProfile } = useUser();
  const navigate = useNavigate();
  const { 
    eligibility, 
    isLoading: eligibilityLoading, 
    acceptTerms, 
    checkEligibility 
  } = usePaymentEligibility();

  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('annual');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showBlockedModal, setShowBlockedModal] = useState(false);

  const plans = getSubscriptionInfo();
  const isAlreadyPremium = isPremiumUser(
    userProfile?.subscriptionStatus,
    userProfile?.subscriptionPlan
  );

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!user) {
      navigate('/auth?redirect=/premium');
      return;
    }

    // Show loading immediately
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      // Check eligibility first
      const result = await checkEligibility();
      if (!result.allowed) {
        setIsCheckingOut(false);
        setShowBlockedModal(true);
        return;
      }

      const { url } = await createSubscriptionCheckout(plan);
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message || 'Failed to start checkout. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleAcceptTerms = async () => {
    try {
      await acceptTerms();
      setShowBlockedModal(false);
      // Retry the checkout after accepting terms
      handleSubscribe(selectedPlan);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const features = [
    { name: 'Daily Game Limit', free: '5 games/day', premium: 'Unlimited', icon: Gamepad2 },
    { name: 'Advertisements', free: 'Yes', premium: 'None', icon: Shield },
    { name: 'Basic Statistics', free: true, premium: true, icon: BarChart3 },
    { name: 'Advanced Analytics', free: false, premium: true, icon: BarChart3 },
    { name: 'Regional Breakdown', free: false, premium: true, icon: BarChart3 },
    { name: 'Premium Badge', free: false, premium: true, icon: Crown },
    { name: 'Exclusive Avatars', free: false, premium: true, icon: Sparkles },
    { name: 'Early Access Features', free: false, premium: true, icon: Zap },
    { name: 'Priority Support', free: false, premium: true, icon: Star },
  ];

  // Paywall: require authentication to view premium page
  if (!user) {
    return (
      <div className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-surface-dark min-h-screen relative overflow-hidden">
        {/* Background Decor */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-amber-500/5 rounded-full blur-[180px] animate-pulse-slow opacity-50" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-sky/3 rounded-full blur-[150px] animate-pulse-slow opacity-40" />
        </div>

        <SEO 
          title="Premium - Unlimited Access"
          description="Upgrade to ExploreCapitals Premium for unlimited games, ad-free experience, advanced analytics, and exclusive features."
        />

        <div className="max-w-lg mx-auto relative z-10 text-center">
          <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl p-8 md:p-12">
            <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown size={40} className="text-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-4 tracking-tighter uppercase">
              Premium Access
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Sign in to view our premium plans and unlock unlimited games, ad-free experience, and advanced analytics.
            </p>
            <Button 
              variant="accent" 
              size="lg"
              className="w-full"
              onClick={() => navigate('/auth?redirect=/premium')}
            >
              Sign In to Continue <ArrowRight size={20} />
            </Button>
            <p className="text-white/50 text-sm mt-4">
              Don't have an account? You can create one for free.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-6 bg-surface-dark min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-amber-500/5 rounded-full blur-[180px] animate-pulse-slow opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-sky/3 rounded-full blur-[150px] animate-pulse-slow opacity-40" />
      </div>

      <SEO 
        title="Premium - Unlimited Access"
        description="Upgrade to ExploreCapitals Premium for unlimited games, ad-free experience, advanced analytics, and exclusive features."
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/30 border border-amber-500/40 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-amber-300 mb-6 relative overflow-hidden">
            <Crown size={12} className="text-amber-400" />
            <span>Premium</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white mb-4 tracking-tighter uppercase leading-none">
            Go Premium
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Unlock unlimited games, remove ads, and access advanced analytics to master world geography.
          </p>
        </div>

        {/* Already Premium Banner */}
        {isAlreadyPremium && (
          <div className="mb-8 p-6 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border-2 border-amber-500/40 rounded-2xl text-center">
            <Crown size={32} className="text-amber-400 mx-auto mb-2" />
            <h3 className="text-xl font-bold text-white mb-1">You're a Premium Member!</h3>
            <p className="text-white/70 text-sm">
              Plan: <span className="text-amber-400 font-bold capitalize">{userProfile?.subscriptionPlan}</span>
            </p>
            <Button 
              variant="secondary" 
              className="mt-4"
              onClick={() => navigate('/settings')}
            >
              Manage Subscription
            </Button>
          </div>
        )}

        {/* Pricing Cards */}
        {!isAlreadyPremium && (
          <div className="grid md:grid-cols-3 gap-6 mb-12 items-stretch">
            {/* Monthly */}
            <div 
              className={`relative flex flex-col bg-white/10 backdrop-blur-xl border-2 rounded-2xl p-6 transition-all cursor-pointer ${
                selectedPlan === 'monthly' 
                  ? 'border-sky shadow-[0_0_30px_rgba(56,189,248,0.3)]' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setSelectedPlan('monthly')}
            >
              <div className="h-3" /> {/* Spacer to align with badges */}
              <h3 className="text-lg font-bold text-white mb-1">{plans.monthly.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-white">$5.99</span>
                <span className="text-white/50 text-sm">/month</span>
              </div>
              <div className="h-5" /> {/* Spacer to align with savings */}
              <p className="text-white/60 text-sm flex-1">{plans.monthly.description}</p>
              <Button 
                variant={selectedPlan === 'monthly' ? 'primary' : 'secondary'}
                className="w-full mt-4 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe('monthly');
                }}
                disabled={isCheckingOut}
              >
                {isCheckingOut && selectedPlan === 'monthly' ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>

            {/* Annual - Highlighted */}
            <div 
              className={`relative flex flex-col bg-white/10 backdrop-blur-xl border-2 rounded-2xl p-6 transition-all cursor-pointer ${
                selectedPlan === 'annual' 
                  ? 'border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setSelectedPlan('annual')}
            >
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 rounded-full text-[10px] font-black uppercase tracking-wider text-black">
                Most Popular
              </div>
              <div className="h-3" /> {/* Spacer for badge */}
              <h3 className="text-lg font-bold text-white mb-1">{plans.annual.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-white">$49.99</span>
                <span className="text-white/50 text-sm">/year</span>
              </div>
              <p className="text-amber-400 text-xs font-bold h-5">{plans.annual.savings}</p>
              <p className="text-white/60 text-sm flex-1">{plans.annual.description}</p>
              <Button 
                variant={selectedPlan === 'annual' ? 'accent' : 'secondary'}
                className="w-full mt-4 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe('annual');
                }}
                disabled={isCheckingOut}
              >
                {isCheckingOut && selectedPlan === 'annual' ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  'Subscribe'
                )}
              </Button>
            </div>

            {/* Lifetime */}
            <div 
              className={`relative flex flex-col bg-white/10 backdrop-blur-xl border-2 rounded-2xl p-6 transition-all cursor-pointer ${
                selectedPlan === 'lifetime' 
                  ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.3)]' 
                  : 'border-white/20 hover:border-white/40'
              }`}
              onClick={() => setSelectedPlan('lifetime')}
            >
              {/* Best Value badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 rounded-full text-[10px] font-black uppercase tracking-wider text-white">
                Best Value
              </div>
              <div className="h-3" /> {/* Spacer for badge */}
              <h3 className="text-lg font-bold text-white mb-1">{plans.lifetime.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-black text-white">$99.99</span>
                <span className="text-white/50 text-sm">once</span>
              </div>
              <div className="h-5" /> {/* Spacer to align with savings */}
              <p className="text-white/60 text-sm flex-1">{plans.lifetime.description}</p>
              <Button 
                variant={selectedPlan === 'lifetime' ? 'primary' : 'secondary'}
                className="w-full mt-4 h-12"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubscribe('lifetime');
                }}
                disabled={isCheckingOut}
              >
                {isCheckingOut && selectedPlan === 'lifetime' ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  'Get Lifetime'
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {checkoutError && (
          <div className="mb-8 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-center">
            <p className="text-red-400 text-sm">
              {checkoutError.toLowerCase().includes('internal') || checkoutError.toLowerCase().includes('error')
                ? 'We\'re experiencing a temporary issue. Please try again in a few moments.'
                : checkoutError}
            </p>
          </div>
        )}

        {/* Feature Comparison */}
        <div className="bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold text-white">Compare Plans</h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {/* Header row */}
            <div className="grid grid-cols-3 px-6 py-4 bg-white/5">
              <div className="text-white/60 text-sm font-bold uppercase tracking-wider">Feature</div>
              <div className="text-white/60 text-sm font-bold uppercase tracking-wider text-center">Free</div>
              <div className="text-amber-400 text-sm font-bold uppercase tracking-wider text-center">Premium</div>
            </div>

            {/* Feature rows */}
            {features.map((feature, index) => (
              <div key={index} className="grid grid-cols-3 px-6 py-4 items-center hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <feature.icon size={18} className="text-white/40" />
                  <span className="text-white text-sm font-medium">{feature.name}</span>
                </div>
                <div className="text-center">
                  {typeof feature.free === 'boolean' ? (
                    feature.free ? (
                      <Check size={18} className="text-green-400 mx-auto" />
                    ) : (
                      <X size={18} className="text-white/30 mx-auto" />
                    )
                  ) : (
                    <span className="text-white/60 text-sm">{feature.free}</span>
                  )}
                </div>
                <div className="text-center">
                  {typeof feature.premium === 'boolean' ? (
                    feature.premium ? (
                      <Check size={18} className="text-amber-400 mx-auto" />
                    ) : (
                      <X size={18} className="text-white/30 mx-auto" />
                    )
                  ) : (
                    <span className="text-amber-400 text-sm font-bold">{feature.premium}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-8 flex items-center justify-center gap-3 text-white/50 text-sm">
          <Shield size={16} />
          <span>Secure payments powered by Stripe. Cancel anytime.</span>
        </div>
      </div>

      {/* Payment Blocked Modal */}
      <PaymentBlockedModal
        isOpen={showBlockedModal}
        onClose={() => setShowBlockedModal(false)}
        eligibility={eligibility}
        onAcceptTerms={handleAcceptTerms}
        isLoading={eligibilityLoading}
      />
    </div>
  );
};

export default Premium;
