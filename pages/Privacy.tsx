import React, { useEffect } from 'react';
import { Shield, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RevealSection from '../components/RevealSection';
import { useLayout } from '../context/LayoutContext';
import { VerticalSidebarAd } from '../components/AdSense';

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
      title: 'What we collect',
      body: (
        <div className="space-y-3">
          <p><span className="font-black text-white/80">Personal info.</span> With an account: email, username, and anything added to your profile.</p>
          <p><span className="font-black text-white/80">Usage data.</span> Device type, browser, IP address, pages visited, and basic diagnostics.</p>
          <p><span className="font-black text-white/80">Game progress.</span> Scores, achievements, and progress, saved across sessions.</p>
        </div>
      ),
    },
    {
      title: 'Cookies & tracking',
      body: (
        <div className="space-y-3">
          <p>Cookies used on the site:</p>
          <ul className="space-y-2 pl-0">
            <li><span className="font-black text-white/80">Essential —</span> required for basic functionality.</li>
            <li><span className="font-black text-white/80">Analytics —</span> anonymous usage patterns via Google Analytics.</li>
            <li><span className="font-black text-white/80">Advertising —</span> Google AdSense serves ads to fund the platform.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Third-party services',
      body: (
        <div className="space-y-3">
          <p>
            <span className="font-black text-white/80">Google Analytics</span> measures traffic.{' '}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-light hover:text-white underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
            >
              How Google uses data <ExternalLink size={11} />
            </a>
          </p>
          <p>
            <span className="font-black text-white/80">Google AdSense</span> serves ads and may use cookies to personalize them. Opt out at{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-light hover:text-white underline underline-offset-4 inline-flex items-center gap-1 transition-colors"
            >
              Google Ads Settings <ExternalLink size={11} />
            </a>
          </p>
        </div>
      ),
    },
    {
      title: 'How we use information',
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
      title: 'Data sharing',
      body: (
        <div className="space-y-3">
          <p>Personal information is not sold. Data is shared only in these cases:</p>
          <ul className="space-y-2 pl-0">
            <li><span className="font-black text-white/80">Service providers</span> — hosting, analytics, and advertising partners.</li>
            <li><span className="font-black text-white/80">Legal requirements</span> — when required by law or to protect our rights.</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Your rights',
      body: (
        <ul className="space-y-2 pl-0">
          <li><span className="font-black text-white/80">Access & update</span> — manage account info in profile settings.</li>
          <li><span className="font-black text-white/80">Delete your account</span> — request via the contact page.</li>
          <li><span className="font-black text-white/80">Cookie preferences</span> — control via your browser or the consent banner.</li>
          <li><span className="font-black text-white/80">Opt out of personalized ads</span> — via Google Ads Settings.</li>
        </ul>
      ),
    },
    {
      title: 'Children\'s privacy',
      body: 'The service is intended for general audiences. Personal information is not knowingly collected from children under 13. Parents who believe a child has submitted information can request its removal via the contact page.',
    },
    {
      title: 'Questions',
      body: (
        <>
          Use the{' '}
          <Link to="/contact" className="text-sky-light hover:text-white underline underline-offset-4 transition-colors">
            contact page
          </Link>.
        </>
      ),
    },
  ];

  return (
    <main className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="Privacy Policy"
        description="How ExploreCapitals collects, uses, and protects your information — written in plain English."
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />

        {/* Hero */}
        <RevealSection className="mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-sky/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white mb-6">
            <Shield size={12} className="text-sky-light" />
            <span>Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tighter uppercase leading-tight mb-5">
            Privacy{' '}
            <span
              className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent] overflow-visible"
              style={{ display: 'inline-block', paddingBottom: '0.15em', paddingRight: '0.1em' }}
            >policy</span>.
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-medium max-w-2xl mb-4">
            What is collected, why, and how it is handled. Personal data is not sold.
          </p>
          <p className="text-[11px] font-black text-white/35 uppercase tracking-[0.3em]">
            Last updated · February 2, 2026
          </p>
        </RevealSection>

        {/* Intro card */}
        <RevealSection className="mb-8">
          <div className="relative bg-gradient-to-br from-sky/[0.08] via-white/[0.03] to-accent/[0.05] border border-white/10 rounded-2xl p-6 sm:p-7 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-sky/10 rounded-full blur-3xl pointer-events-none" />
            <p className="relative z-10 text-base text-white/70 leading-relaxed font-medium">
              This policy explains how ExploreCapitals ("we," "our," or "us") collects, uses, and safeguards information at <span className="text-white font-black">explorecapitals.com</span>.
            </p>
          </div>
        </RevealSection>

        {/* Sections */}
        <RevealSection>
          <ol className="space-y-3">
            {sections.map((s, i) => (
              <li
                key={s.title}
                className="group relative bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-white/10 rounded-2xl p-5 sm:p-6 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-sky/10 border border-white/10 flex items-center justify-center text-[11px] font-black text-sky-light tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-tight mb-3">
                      {s.title}
                    </h2>
                    <div className="text-[14px] sm:text-[15px] text-white/60 leading-relaxed font-medium">
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
            className="group inline-flex items-center gap-2.5 px-5 py-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl text-xs font-black text-white/70 hover:text-white uppercase tracking-[0.2em] transition-all"
          >
            <FileText size={14} className="text-sky-light" />
            Read the Terms of Service
          </Link>
        </RevealSection>
      </div>
    </main>
  );
};

export default Privacy;
