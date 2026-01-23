import React, { useEffect } from 'react';
import { Target, Award, Compass, ShieldCheck, Microscope, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';

const About: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { hash } = useLocation();

  useEffect(() => {
    setPageLoading(false);
    
    if (hash === '#contact') {
      const element = document.getElementById('contact');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [setPageLoading, hash]);

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
        title="About Our World Geography Platform"
        description="Learn about the mission of ExploreCapitals and connect with our team. We bridge the gap between institutional data and modern interactive education."
        structuredData={structuredData}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-surface-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(0,194,255,0.12)_0%,transparent_70%)] blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_center,rgba(52,199,89,0.06)_0%,transparent_60%)] blur-[100px] animate-pulse-slow delay-700" />
      </div>

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Mission & Hero Section */}
        <section className="bg-white/5 backdrop-blur-3xl rounded-[3rem] shadow-glass border border-white/20 overflow-hidden relative group">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
          
          <div className="p-8 md:p-16 relative z-10">
            <header className="max-w-3xl mb-10 md:mb-14">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-sky/20 border-2 border-white/40 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/90 mb-6 shadow-glass-bubble relative overflow-hidden group/badge">
                <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
                <Compass size={12} className="text-sky-light relative z-10" /> 
                <span className="relative z-10 drop-shadow-md">Our Mission</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-display font-black text-white leading-tight mb-5 tracking-tighter uppercase drop-shadow-lg">
                Redefining the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-light to-white drop-shadow-glow-sky">Digital Atlas</span>
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
                    By leveraging <strong className="text-sky-light font-black drop-shadow-glow-sky">high-fidelity interfaces</strong> and <strong className="text-white font-black drop-shadow-sm">gamified logic</strong>, we've created a premium environment for mastering the global landscape.
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
                  <article key={i} className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl border-2 border-white/20 shadow-glass-bubble relative overflow-hidden flex flex-col h-full hover:border-white/40 transition-colors duration-300">
                    <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                    <div className="text-sky mb-6 drop-shadow-glow-sky">{item.icon}</div>
                    <h3 className="font-display font-black text-white text-base mb-2 uppercase tracking-tighter drop-shadow-sm">{item.title}</h3>
                    <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.2em] leading-relaxed mt-auto">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Section Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-10 md:my-14 shadow-glow-white/5"></div>

            {/* Contact Section */}
            <div id="contact" className="scroll-mt-32 relative z-10">
              <h2 className="text-2xl md:text-5xl font-display font-black text-white tracking-tighter mb-4 uppercase leading-none drop-shadow-md">Contact</h2>
              <p className="text-white/50 text-sm md:text-lg font-bold mb-8 max-w-2xl leading-relaxed">
                Direct all inquiries, technical feedback, or partnership requests to <a href="mailto:anaximanderomiletus@gmail.com" className="text-sky-light font-black hover:text-white transition-all underline underline-offset-8 decoration-sky/30 hover:decoration-white/50 drop-shadow-glow-sky">anaximanderomiletus@gmail.com</a>.
              </p>

              {/* Protocols */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="group bg-white/5 p-8 rounded-[2rem] border-2 border-white/20 shadow-glass-bubble hover:border-white/40 hover:bg-white/10 transition-all duration-500 flex flex-col items-start gap-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                  <div className="w-14 h-14 rounded-2xl bg-sky/20 flex items-center justify-center text-sky border-2 border-white/30 shadow-glow-sky">
                    <ShieldCheck size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-2">Privacy Protocol</h4>
                    <p className="text-sm text-white/60 leading-relaxed font-bold">
                      User data is handled with strict encryption standards. We never share archives with third-party entities.
                    </p>
                  </div>
                </div>
                
                <div className="group bg-white/5 p-8 rounded-[2rem] border-2 border-white/20 shadow-glass-bubble hover:border-white/40 hover:bg-white/10 transition-all duration-500 flex flex-col items-start gap-5 relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-accent border-2 border-white/30 shadow-glow-accent">
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
                <h2 className="text-3xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter uppercase leading-tight drop-shadow-lg">Start Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-light via-white to-sky-light drop-shadow-glow-sky">Expedition</span></h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link to="/map" className="w-full sm:w-auto">
                      <Button variant="secondary" size="lg" className="h-16 px-14 text-lg w-full uppercase tracking-[0.2em] font-black border-white/40">
                        Open Map
                      </Button>
                    </Link>
                    <Link to="/games" className="w-full sm:w-auto">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="h-16 px-12 text-xl w-full uppercase tracking-[0.2em] flex items-center justify-center font-black text-white"
                      >
                        Play Now <Compass size={24} className="ml-4 shrink-0 text-white drop-shadow-md" />
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
