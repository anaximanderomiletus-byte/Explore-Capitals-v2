import React, { useEffect, useState } from "react";
import { Heart, Loader2, Server, Globe2, Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealSection from "../components/RevealSection";
import { useLayout } from "../context/LayoutContext";
import { VerticalSidebarAd } from "../components/AdSense";

const loadPayment = () =>
  import("../services/payment").then((m) => m.createCheckoutSession);

const Donate: React.FC = () => {
  const { setPageLoading } = useLayout();
  const [searchParams] = useSearchParams();

  const [donationBusy, setDonationBusy] = useState<number | null>(null);
  const [donationStatus, setDonationStatus] = useState<string | null>(null);
  const [donationError, setDonationError] = useState<string | null>(null);

  useEffect(() => {
    setPageLoading(false);

    if (searchParams.get("success") === "true") {
      setDonationStatus("Thank you — you just helped keep the map running.");
    } else if (searchParams.get("canceled") === "true") {
      setDonationError(
        "Payment was canceled. No worries — come back any time.",
      );
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
      console.error("Donation failed:", err);
      setDonationError(
        err?.message ?? "Failed to start donation. Please try again.",
      );
      setDonationBusy(null);
    }
  };

  const amounts = [
    { value: 5, label: "Coffee", caption: "A round of thanks" },
    {
      value: 10,
      label: "Fuel",
      caption: "Keeps servers humming",
      featured: true,
    },
    { value: 20, label: "Hero", caption: "Funds new datasets" },
  ];

  const impact = [
    {
      icon: <Server size={15} />,
      title: "Keeps it free",
      desc: "Covers servers, maps, and bandwidth so everyone can learn without paywalls.",
    },
    {
      icon: <Globe2 size={15} />,
      title: "Better data",
      desc: "Funds new datasets, higher-res flags, and sharper geographic detail.",
    },
    {
      icon: <Sparkles size={15} />,
      title: "More to explore",
      desc: "Supports new games, features, and educational tools in development.",
    },
  ];

  return (
    <main
      className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden bg-surface"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 64px), 64px)" }}
    >
      <SEO
        title="Donate"
        description="Support ExploreCapitals. Your contribution keeps the platform free and funds better maps, data, and geography tools for everyone."
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Donate" }]}
        />

        <RevealSection className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-soft border border-primary/15 rounded-lg text-xs font-semibold tracking-wide text-primary mb-6">
            <Heart size={14} className="text-primary" fill="currentColor" />
            <span>Support the Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text tracking-tight leading-tight mb-5">
            Fuel the atlas.
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            ExploreCapitals is free — and we want to keep it that way. Your
            support pays for servers, better maps, and new tools that make
            learning geography a little more joyful for everyone.
          </p>
        </RevealSection>

        {donationStatus && (
          <div className="mb-5 px-4 py-3 bg-accent-soft border border-primary/20 rounded-xl text-primary text-sm font-semibold">
            {donationStatus}
          </div>
        )}
        {donationError && (
          <div className="mb-5 px-4 py-3 bg-error/10 border border-error/30 rounded-xl text-error text-sm font-semibold">
            {donationError}
          </div>
        )}

        <RevealSection className="mb-10 md:mb-14">
          <div className="bg-elevated border border-border rounded-2xl p-6 sm:p-8 shadow-premium">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-accent-soft rounded-xl text-primary flex items-center justify-center">
                <Heart size={18} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text">
                  Pick an amount
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Secure payment via Stripe
                </p>
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
                    className={`relative flex flex-col items-center justify-center gap-1 px-2 py-5 rounded-xl border transition-all disabled:opacity-60 ${
                      a.featured
                        ? "bg-primary text-white border-primary hover:bg-primary-hover"
                        : "bg-surface text-text border-border hover:border-primary/30 hover:bg-accent-soft"
                    }`}
                  >
                    {isBusy ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <span className="text-2xl font-display font-bold">
                          ${a.value}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wide ${a.featured ? "text-white/80" : "text-muted"}`}
                        >
                          {a.label}
                        </span>
                        <span
                          className={`text-[10px] ${a.featured ? "text-white/60" : "text-muted"}`}
                        >
                          {a.caption}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text tracking-tight mb-5">
            Where it goes
          </h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {impact.map((item) => (
              <div
                key={item.title}
                className="bg-elevated border border-border rounded-xl p-5 shadow-premium"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-soft text-primary flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

export default Donate;
