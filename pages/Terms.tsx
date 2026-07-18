import React, { useEffect } from 'react';
import { Scale, Lock } from 'lucide-react';
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

const Terms: React.FC = () => {
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
    window.scrollTo(0, 0);
  }, [setPageLoading]);

  const sections: Section[] = [
    {
      title: 'Acceptance of Terms',
      body: 'Using ExploreCapitals means you accept these terms. If you don\'t agree, don\'t use the service.',
    },
    {
      title: 'What we offer',
      body: 'Interactive geography games, a database of countries and capitals, progress tracking, and educational content — free to use.',
    },
    {
      title: 'Your account',
      body: 'If you create an account, provide accurate information and keep your password secure. Report unauthorized activity when you see it.',
    },
    {
      title: 'Acceptable use',
      body: 'Lawful use only. No unauthorized access, interference with the service, automated scraping, or harassment of other users.',
    },
    {
      title: 'Intellectual property',
      body: 'Content, graphics, code, and branding on ExploreCapitals are protected by copyright. Do not reproduce, distribute, or modify them without written permission.',
    },
    {
      title: 'Privacy',
      body: (
        <>
          Personal information is not sold. See the{' '}
          <Link to="/privacy" className="text-primary hover:text-primary-hover underline underline-offset-4 transition-colors">
            Privacy Policy
          </Link>{' '}for full details.
        </>
      ),
    },
    {
      title: 'Disclaimers',
      body: 'The service is provided "as is." Geographic data changes and cannot be guaranteed accurate in every detail. Access may be interrupted.',
    },
    {
      title: 'Limitation of liability',
      body: 'To the maximum extent permitted by law, ExploreCapitals is not liable for indirect, incidental, or consequential damages arising from use of the service.',
    },
    {
      title: 'Changes to these terms',
      body: 'These terms may be updated. The "last updated" date above will reflect changes. Continued use constitutes acceptance.',
    },
    {
      title: 'Questions',
      body: (
        <>
          Use the{' '}
          <Link to="/contact" className="text-primary hover:text-primary-hover underline underline-offset-4 transition-colors">
            contact page
          </Link>.
        </>
      ),
    },
  ];

  return (
    <main className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
      <SEO
        title="Terms of Service"
        description="The terms of service for ExploreCapitals — written to be read, not buried."
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />

        {/* Hero */}
        <RevealSection className="mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-accent-soft border border-border rounded-xl text-[9px] font-semibold uppercase tracking-wide text-primary mb-6">
            <Scale size={12} className="text-primary" />
            <span>Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text tracking-tight leading-tight mb-5">
            Terms of service.
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed font-medium max-w-2xl mb-4">
            The rules for using ExploreCapitals.
          </p>
          <p className="text-[11px] font-semibold text-muted uppercase tracking-wide">
            Last updated · January 25, 2026
          </p>
        </RevealSection>

        {/* Intro card */}
        <RevealSection className="mb-8">
          <div className="relative bg-elevated border border-border rounded-2xl p-6 sm:p-7 shadow-premium overflow-hidden">
            <p className="relative z-10 text-base text-muted leading-relaxed font-medium">
              By accessing or using ExploreCapitals, you agree to the terms below.
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
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h2 className="text-sm sm:text-base font-black text-text uppercase tracking-tight mb-2">
                      {s.title}
                    </h2>
                    <p className="text-[14px] sm:text-[15px] text-muted leading-relaxed font-medium">
                      {s.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </RevealSection>

        {/* Footer link */}
        <RevealSection className="mt-10 md:mt-12">
          <Link
            to="/privacy"
            className="group inline-flex items-center gap-2.5 px-5 py-3 bg-elevated hover:bg-accent-soft border border-border hover:border-primary/25 rounded-xl text-xs font-semibold text-text uppercase tracking-wide shadow-premium transition-all"
          >
            <Lock size={14} className="text-primary" />
            Read the Privacy Policy
          </Link>
        </RevealSection>
      </div>
    </main>
  );
};

export default Terms;
