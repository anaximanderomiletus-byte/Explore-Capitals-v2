import React, { useEffect, useState } from 'react';
import { Target, Award, Compass, ShieldCheck, Microscope, Clock, Heart, Loader2 } from 'lucide-react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useAuth } from '../context/AuthContext';
import { VerticalSidebarAd } from '../components/AdSense';
import { createCheckoutSession } from '../services/payment';

const About: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { hash } = useLocation();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
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
    <main className="pt-28 pb-16 px-4 md:px-6 bg-surface-dark min-h-screen overflow-x-hidden relative">
      <SEO
        title="About"
        description="ExploreCapitals is a free geography education platform. Learn about our mission to make world geography engaging through interactive games and tools."
        structuredData={structuredData}
      />

      {/* Vertical Sidebar Ads - Large screens only */}
      <VerticalSidebarAd slot="9489406693" position="left" />
      <VerticalSidebarAd slot="9489406693" position="right" />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-surface-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.04)_0%,transparent_70%)] blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.02)_0%,transparent_60%)] blur-[100px] animate-pulse-slow delay-700" />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Mission & Hero Section */}
        <section className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
          
          <div className="p-8 md:p-16 relative z-10">
            <header className="max-w-3xl mb-10 md:mb-14">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-sky/20 border-2 border-white/40 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/90 mb-6 relative overflow-hidden group/badge">
                <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
                <Compass size={12} className="text-sky-light relative z-10" /> 
                <span className="relative z-10 drop-shadow-md">Our Mission</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black text-white leading-tight mb-5 tracking-tighter uppercase drop-shadow-lg">
                Redefining the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-light to-white">Digital Atlas</span>
              </h1>
              <p className="text-white/60 text-base md:text-xl leading-relaxed font-bold max-w-2xl">
                ExploreCapitals is a premier digital gateway designed to bridge the gap between complex global data and high-fidelity interactive education.
              </p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch mb-10 md:mb-14">
              <div className="space-y-6 text-white/50 leading-relaxed text-base font-bold flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter uppercase leading-none drop-shadow-md">Our Story</h2>
                <div className="space-y-6">
                  <p className="text-lg md:text-2xl border-l-4 border-sky/30 pl-8 italic leading-relaxed">
                    We architected ExploreCapitals from a singular vision: geography should be as beautiful as it is informative. Most educational tools prioritize function over form; we choose both.
                  </p>
                  <p className="text-lg md:text-2xl border-l-4 border-white/10 pl-8 leading-relaxed">
                    By leveraging <strong className="text-sky-light font-black">high-fidelity interfaces</strong> and <strong className="text-white font-black">gamified logic</strong>, we've created a premium environment for mastering the global landscape.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: <Target size={22} />, title: "Precision", text: "Curated datasets for every sovereign nation." },
                  { icon: <ShieldCheck size={22} />, title: "Security", text: "Encrypted progress and private data protocols." },
                  { icon: <Microscope size={22} />, title: "Analysis", text: "Deep demographic insights and analytics." },
                  { icon: <Award size={22} />, title: "Excellence", text: "A new benchmark for digital cartography." },
                ].map((item, i) => (
                  <article key={i} className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border-2 border-white/20 relative overflow-hidden flex flex-col h-full hover:border-white/40 transition-colors duration-300">
                    <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                    <div className="text-sky mb-6">{item.icon}</div>
                    <h3 className="font-display font-black text-white text-base mb-2 uppercase tracking-tighter drop-shadow-sm">{item.title}</h3>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed mt-auto">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Section Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 md:my-14"></div>

            {/* Support Section */}
            <div id="support" className="scroll-mt-32 relative z-10 mb-10 md:mb-14">
              <h2 className="text-2xl md:text-5xl font-display font-black text-white tracking-tighter mb-4 uppercase leading-none drop-shadow-md">Support Us</h2>
              <p className="text-white/50 text-sm md:text-lg font-bold mb-8 max-w-2xl leading-relaxed">
                ExploreCapitals is a passion project. Your support helps cover server costs and keeps the game free for everyone.
              </p>

              {/* Status Messages */}
              {donationStatus && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400 text-sm font-bold">
                  {donationStatus}
                </div>
              )}
              {donationError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-bold">
                  {donationError}
                </div>
              )}

              <div className="group bg-white/5 p-8 rounded-[2rem] border-2 border-white/20 hover:border-pink-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-500 border-2 border-white/30 shrink-0">
                    <Heart size={32} strokeWidth={2} className={user?.isSupporter ? "fill-current" : ""} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-black text-white mb-2 uppercase tracking-tight">
                      {user?.isSupporter ? "Thank You for Your Support!" : "Become a Supporter"}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed font-bold mb-6">
                      {user?.isSupporter 
                        ? "Your contribution helps keep ExploreCapitals running. You have a special supporter badge on your profile!"
                        : "Choose an amount below to support the project. All supporters receive a special badge on their profile."
                      }
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 max-w-md">
                      {[5, 10, 20].map((amount) => (
                        <button
                          key={amount}
                          onClick={() => handleDonation(amount)}
                          disabled={donationBusy}
                          className="py-4 px-4 bg-white/5 hover:bg-pink-500/20 border-2 border-white/20 hover:border-pink-500/40 rounded-2xl text-base font-black text-white uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {donationBusy ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            `$${amount}`
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-white/30 mt-4 uppercase tracking-[0.2em] font-bold">
                      Secure payment via Stripe
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 md:my-14"></div>

            {/* Contact Section */}
            <div id="contact" className="scroll-mt-32 relative z-10">
              <h2 className="text-2xl md:text-5xl font-display font-black text-white tracking-tighter mb-4 uppercase leading-none drop-shadow-md">Contact</h2>
              <p className="text-white/50 text-sm md:text-lg font-bold mb-8 max-w-2xl leading-relaxed">
                Direct all inquiries, technical feedback, or partnership requests to <a href="mailto:anaximanderomiletus@gmail.com" className="text-sky-light font-black hover:text-white transition-all underline underline-offset-8 decoration-sky/30 hover:decoration-white/50">anaximanderomiletus@gmail.com</a>.
              </p>

              {/* Protocols */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="group bg-white/5 p-8 rounded-[2rem] border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-500 flex flex-col items-start gap-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                  <div className="w-14 h-14 rounded-2xl bg-sky/20 flex items-center justify-center text-sky border-2 border-white/30">
                    <ShieldCheck size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Privacy Protocol</h4>
                    <p className="text-sm text-white/60 leading-relaxed font-bold">
                      User data is handled with strict encryption standards. We never share archives with third-party entities.
                    </p>
                  </div>
                </div>
                
                <div className="group bg-white/5 p-8 rounded-[2rem] border-2 border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-500 flex flex-col items-start gap-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent border-2 border-white/30">
                    <Clock size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Response Time</h4>
                    <p className="text-sm text-white/60 leading-relaxed font-bold">
                      Our mission control aims to process and respond to all frequency transmissions within 24-48 business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Banner - Expedition Call to Action */}
          <section className="bg-white/10 backdrop-blur-3xl p-10 md:p-14 text-center border-t border-white/20 relative overflow-hidden group/banner">
             <div className="absolute inset-0 bg-aurora opacity-30 group-hover/banner:opacity-60 transition-opacity duration-300 group-hover/banner:duration-1000 ease-in-out pointer-events-none" />
             <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
             
             <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter uppercase leading-tight drop-shadow-lg">Start Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-light via-white to-sky-light">Expedition</span></h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link to="/map" className="w-full sm:w-auto">
                      <Button variant="secondary" size="lg" className="h-16 px-14 text-lg w-full uppercase tracking-[0.2em] font-black border-white/40">
                        Open Map
                      </Button>
                    </Link>
                    <Link to="/games" className="w-full sm:w-auto">
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="h-16 px-12 text-xl w-full uppercase tracking-[0.2em] flex items-center justify-center font-black"
                      >
                        Play Now <Compass size={24} className="ml-4 shrink-0 drop-shadow-md" />
                      </Button>
                    </Link>
                </div>
             </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default About;
