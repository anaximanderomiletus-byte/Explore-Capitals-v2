import React, { useEffect } from 'react';
import { Shield, Lock, FileText, Scale, Info, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';

const Terms: React.FC = () => {
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(false);
    window.scrollTo(0, 0);
  }, [setPageLoading]);

  return (
    <main className="pt-28 pb-16 px-4 md:px-6 bg-surface-dark min-h-screen overflow-x-hidden relative">
      <SEO
        title="Terms and Conditions | ExploreCapitals"
        description="Review the terms of service and usage protocols for the ExploreCapitals geography platform."
      />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-sky transition-all mb-12"
        >
          <ArrowLeft size={14} className="transition-transform" />
          Back
        </button>

        <section className="bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none rounded-[inherit]" />
          
          <div className="p-8 md:p-16 relative z-10">
            <header className="mb-16">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-sky/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/90 mb-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
                <Scale size={12} className="text-sky-light relative z-10" /> 
                <span className="relative z-10 drop-shadow-md">Legal Protocol</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-white leading-tight mb-6 tracking-tighter uppercase drop-shadow-lg">
                Terms of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-light to-white">Service</span>
              </h1>
              <p className="text-white/40 text-xs font-black uppercase tracking-widest">Effective Date: December 28, 2025</p>
            </header>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sky mb-4">
                  <Info size={20} />
                  <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter drop-shadow-sm">1. Acceptance of Terms</h2>
                </div>
                <p className="text-white/60 leading-relaxed font-bold uppercase tracking-wide text-xs">
                  By accessing or using the ExploreCapitals platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our services.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sky mb-4">
                  <FileText size={20} />
                  <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter drop-shadow-sm">2. Use of Service</h2>
                </div>
                <p className="text-white/60 leading-relaxed font-bold uppercase tracking-wide text-xs">
                  ExploreCapitals provides interactive geography games and data for educational purposes. You agree to use the service only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of the service by any third party.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sky mb-4">
                  <Shield size={20} />
                  <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter drop-shadow-sm">3. Intellectual Property</h2>
                </div>
                <p className="text-white/60 leading-relaxed font-bold uppercase tracking-wide text-xs">
                  All content, interfaces, and code on ExploreCapitals are the exclusive property of ExploreCapitals. Reproduction, redistribution, or modification of any material without express written consent is strictly prohibited.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sky mb-4">
                  <Lock size={20} />
                  <h2 className="text-xl font-display font-black text-white uppercase tracking-tighter drop-shadow-sm">4. Data Privacy</h2>
                </div>
                <p className="text-white/60 leading-relaxed font-bold uppercase tracking-wide text-xs">
                  Your privacy is paramount. We handle user data according to our privacy protocols, ensuring encryption and secure transmission. We do not sell or trade your personal archives to third-party entities.
                </p>
              </div>

              <div className="pt-12 border-t border-white/10">
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em] italic">
                  ExploreCapitals reserves the right to modify these terms at any time. Continued use of the platform constitutes acceptance of updated protocols.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Terms;




