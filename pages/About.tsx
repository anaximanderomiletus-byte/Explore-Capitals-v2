import React, { useEffect, useState } from 'react';
import { Target, Award, Compass, ShieldCheck, Microscope, Clock, Heart, Loader2, Zap, Globe2, MapPin, Trophy, Play } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { useLayout } from '../context/LayoutContext';
import { useUser } from '../context/UserContext';
import { VerticalSidebarAd } from '../components/AdSense';
import { createCheckoutSession } from '../services/payment';

const About: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();
  const { userProfile } = useUser();

  // Donation state
  const [donationBusy, setDonationBusy] = useState(false);
  const [donationStatus, setDonationStatus] = useState<string | null>(null);
  const [donationError, setDonationError] = useState<string | null>(null);

  useEffect(() => {
    setPageLoading(false);

    // Handle payment success/cancel redirects
    if (searchParams.get('success') === 'true') {
      setDonationStatus('Thank you for your support! You are now a supporter.');
    } else if (searchParams.get('canceled') === 'true') {
      setDonationError('Payment was canceled.');
    }

    if (hash === '#contact') {
      const element = document.getElementById('contact');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else if (hash === '#support') {
      const element = document.getElementById('support');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [setPageLoading, hash, searchParams]);

  const handleDonation = async (amount: number) => {
    setDonationBusy(true);
    setDonationStatus(null);
    setDonationError(null);
    try {
      const { url } = await createCheckoutSession(amount * 100); // Convert to cents
      window.location.href = url;
    } catch (err: any) {
      console.error('Donation failed:', err);
      setDonationError(err?.message ?? 'Failed to start donation. Please try again.');
      setDonationBusy(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ExploreCapitals",
    "url": "https://explorecapitals.com",
    "description": "ExploreCapitals is a premier digital atlas and geography education platform designed to help learners master world capitals, national demographics, and global cartography through interactive high-fidelity mapping.",
    "foundingDate": "2024",
    "knowsAbout": ["Geography", "World Capitals", "Cartography", "Global Education"]
  };

  return (
    <main className="pt-28 pb-16 px-4 md:px-6 min-h-screen overflow-x-hidden relative">
      <SEO
        title="About"
        description="ExploreCapitals is a free geography education platform. Learn about our mission to make world geography engaging through interactive games and tools."
        structuredData={structuredData}
      />

      {/* Vertical Sidebar Ads - Large screens only */}
      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      {/* Background glow — static, GPU-promoted */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.04)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.02)_0%,transparent_60%)] blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16 relative z-10">
        {/* Mission & Hero Section */}
        <section className="relative">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          {/* Background accent — static */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-sky/10 to-accent/5 blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-sky/20 to-accent/10 border-2 border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/90 mb-8 relative overflow-hidden group/badge hover:border-white/60 transition-all duration-300">
              <div className="absolute inset-0 bg-glossy-gradient opacity-10" />
              <Compass size={14} className="text-sky-light relative z-10" />
              <span className="relative z-10">Welcome to the Mission</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-display font-black text-white leading-[1.1] mb-6 tracking-tighter uppercase drop-shadow-xl">
              Master World<br />
              <span className="bg-clip-text bg-gradient-to-r from-sky-light via-accent to-sky-light [-webkit-text-fill-color:transparent]">Geography</span>
            </h1>

            <p className="text-lg md:text-2xl text-white/70 leading-relaxed font-bold max-w-3xl">
              High-fidelity maps, precision data, and competitive challenges.
            </p>
          </div>

          {/* Story & Pillars Grid */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start mt-16">
            {/* Story Section */}
            <div className="space-y-5">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-black text-white tracking-tighter uppercase mb-6 leading-none drop-shadow-md">The Platform</h2>
                <div className="space-y-5">
                  <div className="text-xl md:text-2xl text-white/80 leading-relaxed font-bold border-l-4 border-sky/60 pl-6 py-2">
                    Vetted datasets, immersive cartography, and a ranking system that rewards mastery.
                  </div>
                  <div className="hidden lg:block text-lg md:text-xl text-white/70 leading-relaxed font-bold border-l-4 border-accent/40 pl-6 py-2">
                    We combine <strong className="text-sky-light">premium interface design</strong>, <strong className="text-accent">accurate geographic data</strong>, and <strong className="text-white">rigorous gamification</strong> to create the standard for digital geography education.
                  </div>
                  <div className="hidden lg:block text-lg md:text-xl text-white/70 leading-relaxed font-bold border-l-4 border-accent/40 pl-6 py-2">
                    Every dataset is <strong className="text-sky-light">sourced and verified</strong>. Every interaction is designed to <strong className="text-accent">reinforce retention</strong>. Whether you're a student, educator, or geography enthusiast — this platform is <strong className="text-white">built for depth</strong>.
                  </div>
                </div>
              </div>
            </div>

            {/* Four Pillars - Fun Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
              {[
                { icon: <Trophy size={24} />, title: "Competitive", text: "Ranking and mastery tracking", color: "from-accent/30 to-accent/10", iconBg: "bg-accent/20", textColor: "text-accent" },
                { icon: <MapPin size={24} />, title: "Authoritative", text: "Verified geography data", color: "from-sky/30 to-sky/10", iconBg: "bg-sky/20", textColor: "text-sky" },
                { icon: <Zap size={24} />, title: "Immersive", text: "High-fidelity cartography", color: "from-warning/30 to-warning/10", iconBg: "bg-warning/20", textColor: "text-warning" },
                { icon: <Globe2 size={24} />, title: "Rigorous", text: "Professional-grade tools", color: "from-purple-500/30 to-purple-500/10", iconBg: "bg-purple-500/20", textColor: "text-purple-400" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${item.color} p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 border-white/20 hover:border-white/40 hover:-translate-y-1 relative overflow-hidden flex flex-col h-full transition-all duration-150 group cursor-default`}
                >
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                  <div className={`${item.iconBg} w-12 h-12 rounded-xl flex items-center justify-center ${item.textColor} mb-4 relative z-10 group-hover:scale-110 transition-transform duration-150`}>
                    {item.icon}
                  </div>
                  <h3 className="font-display font-black text-white text-lg mb-1 uppercase tracking-tight relative z-10">{item.title}</h3>
                  <p className="text-white/60 text-sm font-bold relative z-10">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Text - Mobile/Tablet Only */}
          <div className="lg:hidden mt-8 max-w-3xl">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed font-bold border-l-4 border-accent/40 pl-6 py-2">
              We combine <strong className="text-sky-light">premium interface design</strong>, <strong className="text-accent">accurate geographic data</strong>, and <strong className="text-white">rigorous gamification</strong> to create the standard for digital geography education.
            </p>
          </div>

          {/* Decorative Section Divider */}
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-sky/30 to-transparent mt-10 md:mt-12 mb-0"></div>
        </section>

        {/* Support Section */}
        <section
          id="support"
          className="scroll-mt-32 relative"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-6xl font-display font-black text-white tracking-tighter mb-4 uppercase leading-none drop-shadow-md">Support the Mission</h2>
            <p className="text-lg md:text-xl text-white/60 font-bold max-w-2xl leading-relaxed">
              ExploreCapitals remains free to use. Your contribution covers infrastructure costs and funds ongoing map improvements.
            </p>
          </div>

          {/* Status Messages */}
          {donationStatus && (
            <div className="mb-8 p-4 md:p-6 bg-green-500/10 border-2 border-green-500/30 rounded-2xl text-green-400 text-sm md:text-base font-bold animate-[fadeIn_0.3s_ease-out]">
              ✨ {donationStatus}
            </div>
          )}
          {donationError && (
            <div className="mb-8 p-4 md:p-6 bg-red-500/10 border-2 border-red-500/30 rounded-2xl text-red-400 text-sm md:text-base font-bold animate-[fadeIn_0.3s_ease-out]">
              ⚠️ {donationError}
            </div>
          )}

          <div className="group bg-gradient-to-br from-pink-500/20 to-pink-500/5 p-8 md:p-12 rounded-3xl border-2 border-white/20 hover:border-pink-500/40 hover:scale-[1.01] transition-all duration-150 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 relative z-10">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-pink-500/40 to-pink-500/10 flex items-center justify-center text-pink-400 border-2 border-white/30 shrink-0">
                <Heart size={40} className={userProfile?.isSupporter ? "fill-current" : ""} strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">
                  {userProfile?.isSupporter ? "You're Supporting ExploreCapitals" : "Support the Project"}
                </h3>
                <p className="text-white/60 text-sm md:text-base leading-relaxed font-bold mb-8">
                  {userProfile?.isSupporter
                    ? "Your contribution directly funds server infrastructure and new geographic datasets. Supporters receive a badge on their profile."
                    : "Choose an amount to support ongoing development. All supporters are recognized on their profile as contributors to geographic education."
                  }
                </p>

                <div className="grid grid-cols-3 gap-4 max-w-xs">
                  {[5, 10, 20].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleDonation(amount)}
                      disabled={donationBusy}
                      className="py-4 px-4 bg-gradient-to-br from-pink-500/20 to-pink-500/5 hover:from-pink-500/30 hover:to-pink-500/10 border-2 border-white/20 hover:border-pink-500/40 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(236,72,153,0.2)] active:scale-95 rounded-2xl text-base font-black text-white uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {donationBusy ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span>${amount}</span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] md:text-xs text-white/40 mt-4 uppercase tracking-[0.2em] font-bold">
                  🔒 Secure payment via Stripe
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative Section Divider */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>

        {/* Contact Section */}
        <section
          id="contact"
          className="scroll-mt-32 relative"
        >
          <div className="mb-12">
            <h2 className="text-3xl md:text-6xl font-display font-black text-white tracking-tighter mb-4 uppercase leading-none drop-shadow-md">Contact & Support</h2>
            <p className="text-lg md:text-xl text-white/60 font-bold max-w-2xl leading-relaxed">
              Questions, feedback, or partnership inquiries: <a href="mailto:anaximanderomiletus@gmail.com" className="text-sky-light font-black hover:text-sky transition-all underline underline-offset-4">anaximanderomiletus@gmail.com</a>
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <ShieldCheck size={28} />,
                title: "Privacy & Security",
                text: "User data is encrypted end-to-end. We never share or sell personal information.",
                color: "from-sky/30 to-sky/10",
                iconBg: "bg-sky/20",
                textColor: "text-sky"
              },
              {
                icon: <Zap size={28} />,
                title: "Response Commitment",
                text: "We respond to all inquiries within 24-48 hours.",
                color: "from-accent/30 to-accent/10",
                iconBg: "bg-accent/20",
                textColor: "text-accent"
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group bg-gradient-to-br ${item.color} p-8 md:p-10 rounded-3xl border-2 border-white/20 hover:border-white/40 hover:-translate-y-1 transition-all duration-150 flex flex-col items-start gap-6 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                <div className={`${item.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center ${item.textColor} border-2 border-white/30 relative z-10 group-hover:scale-110 transition-transform duration-150`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-black text-white mb-2 uppercase tracking-tight relative z-10">{item.title}</h4>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed font-bold relative z-10">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner - Call to Action */}
        <section
          className="bg-gradient-to-br from-sky/20 via-accent/10 to-transparent p-10 md:p-16 text-center rounded-3xl border-2 border-white/20 relative overflow-hidden group/banner"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-sky/10 to-accent/5 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-display font-black text-white mb-8 tracking-tighter uppercase leading-tight drop-shadow-lg">
              Ready to Learn<br />the World?
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-2">
              <div className="w-full sm:w-auto hover:scale-105 active:scale-95 transition-transform duration-150">
                <Link to="/games" className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-72 md:w-80 h-16 md:h-20 text-xl md:text-2xl uppercase border-2 border-white/30 transition-all group font-black"
                  >
                    Play <Play className="ml-2 w-5 h-5 md:w-7 md:h-7" fill="currentColor" />
                  </Button>
                </Link>
              </div>

              <div className="w-full sm:w-auto hover:scale-105 active:scale-95 transition-transform duration-150">
                <Link to="/map" className="block">
                  <Button variant="secondary" size="lg" className="w-full sm:w-72 md:w-80 h-16 md:h-20 text-xl md:text-2xl uppercase bg-white/5 border-2 border-white/10 hover:bg-white/20 transition-all group font-black">
                    Explore Map <Compass className="ml-2 transition-transform group-hover:scale-110 w-5 h-5 md:w-7 md:h-7" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
