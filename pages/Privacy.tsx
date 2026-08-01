import React, { useEffect } from "react";
import { Shield, FileText, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import RevealSection from "../components/RevealSection";
import { useLayout } from "../context/LayoutContext";
import { VerticalSidebarAd } from "../components/AdSense";

interface Section {
  title: string;
  body: React.ReactNode;
}

const Privacy: React.FC = () => {
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
    window.scrollTo(0, 0);
  }, [setPageLoading]);

  const sections: Section[] = [
    {
      title: "The iOS app",
      body: (
        <div className="space-y-3">
          <p>
            The ExploreCapitals iOS app follows a stricter standard than this
            website: it is{" "}
            <span className="font-black text-text">
              local-first, with zero third-party SDKs
            </span>{" "}
            — no analytics, no ad frameworks, and no tracking of any kind.
          </p>
          <p>
            <span className="font-black text-text">On your device.</span> Your
            progress, card collection, match record, favorites, explorer name,
            and passport photo are stored locally. The app is fully functional
            without an account and without a network connection.
          </p>
          <p>
            <span className="font-black text-text">Optional iCloud sync.</span>{" "}
            If you choose Sign in with Apple, progress syncs through your own
            private iCloud database (Apple CloudKit). That container belongs to
            your Apple account — we cannot read it. Sign in with Apple shares
            only the name and email you approve.
          </p>
          <p>
            <span className="font-black text-text">Network use.</span> The app
            fetches landmark and tour photographs from our own server as
            ordinary web requests, with no account identifiers attached. Game
            Center and purchases, if used, are handled by Apple under Apple's
            privacy terms. Notifications are local-only and opt-in; there is no
            remote push.
          </p>
          <p>
            The app never sells or shares your data, runs ads, embeds analytics
            or tracking SDKs, sends remote push notifications, or requires an
            account to play.
          </p>
        </div>
      ),
    },
    {
      title: "What we collect on the website",
      body: (
        <div className="space-y-3">
          <p>
            <span className="font-black text-text">Personal info.</span> With an
            account: email, username, and anything added to your profile.
          </p>
          <p>
            <span className="font-black text-text">Usage data.</span> Device
            type, browser, IP address, pages visited, and basic diagnostics.
          </p>
          <p>
            <span className="font-black text-text">Game progress.</span> Scores,
            achievements, and progress, saved across sessions.
          </p>
        </div>
      ),
    },
    {
      title: "Cookies & tracking on the website",
      body: (
        <div className="space-y-3">
          <p>
            Cookies used on the site (the iOS app uses none of these — see
            section 01):
          </p>
          <ul className="space-y-2 pl-0">
            <li>
              <span className="font-black text-text">Essential —</span> required
              for basic functionality.
            </li>
            <li>
              <span className="font-black text-text">Analytics —</span>{" "}
              anonymous usage patterns via Google Analytics.
            </li>
            <li>
              <span className="font-black text-text">Advertising —</span> Google
              AdSense serves ads to fund the platform.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Third-party services on the website",
      body: (
        <div className="space-y-3">
          <p>
            <span className="font-black text-text">Google Analytics</span>{" "}
            measures traffic.{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
            >
              How Google uses data <ExternalLink size={11} />
            </a>
          </p>
          <p>
            <span className="font-black text-text">Google AdSense</span> serves
            ads and may use cookies to personalize them. Opt out at{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
            >
              Google Ads Settings <ExternalLink size={11} />
            </a>
          </p>
        </div>
      ),
    },
    {
      title: "How we use information",
      body: (
        <ul className="space-y-2 pl-0">
          <li>— Operate and maintain the platform</li>
          <li>— Save progress and personalize the experience</li>
          <li>— Analyze usage patterns to improve the product</li>
          <li>— Serve advertisements that fund the platform</li>
          <li>— Send occasional updates about new features</li>
        </ul>
      ),
    },
    {
      title: "Data sharing",
      body: (
        <div className="space-y-3">
          <p>
            Personal information is not sold — on either surface. Website data
            is shared only in these cases (the iOS app shares nothing):
          </p>
          <ul className="space-y-2 pl-0">
            <li>
              <span className="font-black text-text">Service providers</span> —
              hosting, analytics, and advertising partners.
            </li>
            <li>
              <span className="font-black text-text">Legal requirements</span> —
              when required by law or to protect our rights.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "Your rights",
      body: (
        <ul className="space-y-2 pl-0">
          <li>
            <span className="font-black text-text">Access & update</span> —
            manage account info in profile settings.
          </li>
          <li>
            <span className="font-black text-text">Delete your account</span> —
            request via the contact page.
          </li>
          <li>
            <span className="font-black text-text">Cookie preferences</span> —
            control via your browser or the consent banner.
          </li>
          <li>
            <span className="font-black text-text">
              Opt out of personalized ads
            </span>{" "}
            — via Google Ads Settings.
          </li>
        </ul>
      ),
    },
    {
      title: "Children's privacy",
      body: "The service is intended for general audiences. Personal information is not knowingly collected from children under 13. Parents who believe a child has submitted information can request its removal via the contact page.",
    },
    {
      title: "Questions",
      body: (
        <>
          Use the{" "}
          <Link
            to="/contact"
            className="text-primary hover:text-primary-hover underline underline-offset-4 transition-colors"
          >
            contact page
          </Link>
          .
        </>
      ),
    },
  ];

  return (
    <main
      className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 64px), 64px)" }}
    >
      <SEO
        title="Privacy Policy"
        description="How ExploreCapitals collects, uses, and protects your information — written in plain English."
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
        />

        {/* Hero */}
        <RevealSection className="mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent-soft border border-border rounded-xl text-[9px] font-semibold uppercase tracking-wide text-primary mb-6">
            <Shield size={12} className="text-primary" />
            <span>Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-text tracking-tighter uppercase leading-tight mb-5">
            Privacy{" "}
            <span
              className="opacity-80"
              style={{
                display: "inline-block",
                paddingBottom: "0.15em",
                paddingRight: "0.1em",
              }}
            >
              policy
            </span>
            .
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed font-medium max-w-2xl mb-4">
            What is collected, why, and how it is handled. Personal data is not
            sold.
          </p>
          <p className="text-[11px] font-semibold text-muted uppercase tracking-wide">
            Last updated · July 31, 2026
          </p>
        </RevealSection>

        {/* Intro card */}
        <RevealSection className="mb-8">
          <div className="relative bg-elevated border border-border rounded-2xl p-6 sm:p-7 shadow-premium overflow-hidden">
            <p className="relative z-10 text-base text-muted leading-relaxed font-medium">
              This policy explains how ExploreCapitals ("we," "our," or "us")
              collects, uses, and safeguards information across{" "}
              <span className="text-text font-black">explorecapitals.com</span>{" "}
              and the{" "}
              <span className="text-text font-black">
                ExploreCapitals iOS app
              </span>
              . The two are different by design: the website is ad-supported,
              while the iOS app is local-first and ships with no ads, no
              analytics, and no trackers at all.
            </p>
          </div>
        </RevealSection>

        {/* Sections */}
        <RevealSection>
          <ol className="space-y-3">
            {sections.map((s, i) => (
              <li
                key={s.title}
                className="group relative bg-elevated hover:bg-accent-soft/30 border border-border hover:border-primary/20 rounded-2xl p-5 sm:p-6 shadow-premium transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-accent-soft border border-border flex items-center justify-center text-[11px] font-semibold text-primary tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h2 className="text-sm sm:text-base font-black text-text uppercase tracking-tight mb-3">
                      {s.title}
                    </h2>
                    <div className="text-[14px] sm:text-[15px] text-muted leading-relaxed font-medium">
                      {s.body}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </RevealSection>

        {/* Footer link */}
        <RevealSection className="mt-10 md:mt-12">
          <Link
            to="/terms"
            className="group inline-flex items-center gap-2.5 px-5 py-3 bg-elevated hover:bg-accent-soft border border-border hover:border-primary/25 rounded-xl text-xs font-semibold text-text uppercase tracking-wide shadow-premium transition-all"
          >
            <FileText size={14} className="text-primary" />
            Read the Terms of Service
          </Link>
        </RevealSection>
      </div>
    </main>
  );
};

export default Privacy;
