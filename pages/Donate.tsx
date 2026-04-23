import React, { useEffect, useState } from 'react';
import { Heart, Loader2, Server, Globe2, Sparkles } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RevealSection from '../components/RevealSection';
import { useLayout } from '../context/LayoutContext';
import { VerticalSidebarAd } from '../components/AdSense';

const loadPayment = () => import('../services/payment').then(m => m.createCheckoutSession);

const Donate: React.FC = () => {
  const { setPageLoading } = useLayout();
  const [searchParams] = useSearchParams();

  const [donationBusy, setDonationBusy] = useState<number | null>(null);
  const [donationStatus, setDonationStatus] = useState<string | null>(null);
  const [donationError, setDonationError] = useState<string | null>(null);

  useEffect(() => {
    setPageLoading(false);

    if (searchParams.get('success') === 'true') {
      setDonationStatus('Thank you — you just helped keep the map running. 💙');
    } else if (searchParams.get('canceled') === 'true') {
      setDonationError('Payment was canceled. No worries — come back any time.');
    }
  }, [setPageLoading, searchParams]);

  const handleDonation = async (amount: number) => {
    setDonationBusy(amount);
    setDonationStatus(null);
    setDonationError(null);
    try {
      const checkout = await loadPayment();
      const { url } = await checkout(amount * 100);
      window.location.href = url;
    } catch (err: any) {
      console.error('Donation failed:', err);
      setDonationError(err?.message ?? 'Failed to start donation. Please try again.');
      setDonationBusy(null);
    }
  };

  const amounts = [
    { value: 5, label: 'Coffee', caption: 'A round of thanks' },
    { value: 10, label: 'Fuel', caption: 'Keeps servers humming', featured: true },
    { value: 20, label: 'Hero', caption: 'Funds new datasets' },
  ];

  const impact = [
    { icon: <Server size={15} />, title: 'Keeps it free', desc: 'Covers servers, maps, and bandwidth so everyone can learn without paywalls.', tint: 'bg-sky/10 text-sky-light' },
    { icon: <Globe2 size={15} />, title: 'Better data', desc: 'Funds new datasets, higher-res flags, and sharper geographic detail.', tint: 'bg-accent/10 text-accent' },
    { icon: <Sparkles size={15} />, title: 'More to explore', desc: 'Supports new games, features, and educational tools in development.', tint: 'bg-pink-500/10 text-pink-400' },
  ];

  return (
    <main className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="Donate"
        description="Support ExploreCapitals. Your contribution keeps the platform free and funds better maps, data, and geography tools for everyone."
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Donate' }]} />

        {/* Hero */}
        <RevealSection className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-pink-500/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white mb-6">
            <Heart size={12} className="text-pink-400" fill="currentColor" />
            <span>Support the Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tighter uppercase leading-[0.9] mb-5">
            Fuel the{' '}
            <span className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">atlas</span>.
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-medium max-w-2xl">
            ExploreCapitals is free — and we want to keep it that way. Your support pays for servers, better maps, and new tools that make learning geography a little more joyful for everyone.
          </p>
        </RevealSection>

        {/* Status banners */}
        {donationStatus && (
          <div className="mb-5 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm font-bold">
            {donationStatus}
          </div>
        )}
        {donationError && (
          <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold">
            {donationError}
          </div>
        )}

        {/* Donation Card */}
        <RevealSection className="mb-10 md:mb-14">
          <div className="relative bg-gradient-to-br from-pink-500/[0.08] via-white/[0.03] to-sky/[0.06] border border-white/10 rounded-2xl p-6 sm:p-8 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-52 h-52 bg-sky/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-pink-500/20 rounded-xl text-pink-400 border border-white/20 flex items-center justify-center">
                  <Heart size={18} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">Pick an amount</h3>
                  <p className="text-[10px] sm:text-[11px] text-white/40 font-bold uppercase tracking-widest mt-0.5">🔒 Secure payment via Stripe</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {amounts.map((a) => {
                  const isBusy = donationBusy === a.value;
                  const anyBusy = donationBusy !== null;
                  return (
                    <button
                      key={a.value}
                      onClick={() => handleDonation(a.value)}
                      disabled={anyBusy}
                      className={`group relative py-4 sm:py-5 rounded-xl border transition-all disabled:cursor-not-allowed ${
                        a.featured
                          ? 'bg-sky/15 hover:bg-sky/25 border-sky/30 hover:border-sky/50'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.08] hover:border-white/20'
                      } ${anyBusy && !isBusy ? 'opacity-30' : ''}`}
                    >
                      {a.featured && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-black text-sky-light bg-surface-dark px-2 py-0.5 rounded-full border border-sky/30 uppercase tracking-[0.2em] whitespace-nowrap">
                          Popular
                        </span>
                      )}
                      {isBusy ? (
                        <Loader2 size={18} className="animate-spin mx-auto text-white" />
                      ) : (
                        <>
                          <div className="text-lg sm:text-2xl font-display font-black text-white tracking-tight leading-none mb-1">
                            ${a.value}
                          </div>
                          <div className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase tracking-[0.15em] mb-0.5">{a.label}</div>
                          <div className="text-[8px] sm:text-[9px] font-bold text-white/30 uppercase tracking-wider hidden sm:block">{a.caption}</div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Impact */}
        <RevealSection>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-sky/20 rounded-xl text-sky-light border border-white/20 flex items-center justify-center">
              <Sparkles size={15} />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tighter uppercase leading-none">
              Where it goes
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {impact.map((item) => (
              <div key={item.title} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex flex-col">
                <div className={`w-9 h-9 rounded-lg ${item.tint} flex items-center justify-center mb-3`}>
                  {item.icon}
                </div>
                <h4 className="text-xs font-black text-white uppercase tracking-tight mb-1.5">{item.title}</h4>
                <p className="text-[11px] text-white/40 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

export default Donate;
