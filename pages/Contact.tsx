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
    <main className="pt-20 sm:pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-5 md:px-6 min-h-screen relative overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 64px), 64px)' }}>
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

        {/* Hero */}
        <RevealSection className="mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-sky/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.3em] text-white mb-6">
            <MessageCircle size={12} className="text-sky-light" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white tracking-tighter uppercase leading-tight mb-5">
            Say{' '}
            <span
              className="bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent] overflow-visible"
              style={{ display: 'inline-block', paddingBottom: '0.15em', paddingRight: '0.1em' }}
            >hello</span>.
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed font-medium max-w-2xl">
            Feedback, ideas, or partnership inquiries — we'd love to hear from you. Every email reaches a real person and gets a real reply.
          </p>
        </RevealSection>

        {/* Email Card */}
        <RevealSection className="mb-8 md:mb-10">
          <a
            href="mailto:anaximanderomiletus@gmail.com"
            className="group relative block bg-gradient-to-br from-sky/[0.08] via-white/[0.03] to-accent/[0.05] border border-white/10 hover:border-white/20 rounded-2xl p-6 sm:p-8 transition-all overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-52 h-52 bg-sky/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-14 h-14 bg-sky/20 rounded-2xl text-sky-light border border-white/20 flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1.5">Drop us a line</p>
                <p className="text-base sm:text-xl font-black text-white tracking-tight truncate group-hover:text-sky-light transition-colors">
                  anaximanderomiletus@gmail.com
                </p>
              </div>
            </div>
          </a>
        </RevealSection>

        {/* Info Strip */}
        <RevealSection>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-accent/20 rounded-xl text-accent border border-white/20 flex items-center justify-center">
              <Sparkles size={15} />
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tighter uppercase leading-none">
              What to expect
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-sky/10 flex items-center justify-center text-sky-light shrink-0">
                <Zap size={16} />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">Fast replies</h4>
                <p className="text-base text-white/60 font-medium leading-relaxed">We respond to every message, usually within 24–48 hours.</p>
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight mb-2">Kept private</h4>
                <p className="text-base text-white/60 font-medium leading-relaxed">Your message stays between us. We never share or sell personal info.</p>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </main>
  );
};

export default Contact;
