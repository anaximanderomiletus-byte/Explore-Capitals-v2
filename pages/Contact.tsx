import React, { useEffect } from 'react';
import { Mail, MessageCircle, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import RevealSection from '../components/RevealSection';
import { useLayout } from '../context/LayoutContext';
import { VerticalSidebarAd } from '../components/AdSense';

const Contact: React.FC = () => {
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  return (
    <main
      className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden bg-surface"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}
    >
      <SEO
        title="Contact"
        description="Questions, ideas, or just saying hi — reach the ExploreCapitals team directly. Every message gets a real reply."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: 'Contact ExploreCapitals',
          url: 'https://explorecapitals.com/contact',
        }}
      />

      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      <div className="max-w-3xl mx-auto relative z-10">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <RevealSection className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-soft border border-primary/15 rounded-lg text-xs font-semibold tracking-wide text-primary mb-6">
            <MessageCircle size={14} />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-text tracking-tight leading-tight mb-5">
            Say hello.
          </h1>
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            Feedback, ideas, or partnership inquiries — we'd love to hear from you. Every email reaches a
            real person and gets a real reply.
          </p>
        </RevealSection>

        <RevealSection className="mb-8 md:mb-10">
          <a
            href="mailto:anaximanderomiletus@gmail.com"
            className="group relative block bg-elevated border border-border hover:border-primary/30 rounded-2xl p-6 sm:p-8 transition-all shadow-premium hover:shadow-premium-hover"
          >
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 bg-accent-soft rounded-xl text-primary flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1.5">
                  Drop us a line
                </p>
                <p className="text-base sm:text-xl font-semibold text-text tracking-tight truncate group-hover:text-primary transition-colors">
                  anaximanderomiletus@gmail.com
                </p>
              </div>
            </div>
          </a>
        </RevealSection>

        <RevealSection>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-accent-soft rounded-xl text-primary flex items-center justify-center">
              <Sparkles size={15} />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-text tracking-tight">
              What to expect
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-elevated border border-border rounded-xl p-5 flex items-start gap-4 shadow-premium">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-primary shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">Fast replies</h4>
                <p className="text-sm text-muted leading-relaxed">
                  We respond to every message, usually within 24–48 hours.
                </p>
              </div>
            </div>
            <div className="bg-elevated border border-border rounded-xl p-5 flex items-start gap-4 shadow-premium">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-primary shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">Kept private</h4>
                <p className="text-sm text-muted leading-relaxed">
                  Your message stays between us. We never share or sell personal info.
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

export default Contact;
