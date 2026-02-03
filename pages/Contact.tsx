
import React, { useEffect } from 'react';
import { MessageSquare, Globe, Compass } from 'lucide-react';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';

const Contact: React.FC = () => {
  const { setPageLoading } = useLayout();

  useEffect(() => {
    setPageLoading(false);
  }, [setPageLoading]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact ExploreCapitals",
    "description": "Get in touch with the team behind ExploreCapitals for technical feedback, institutional inquiries, or collaboration.",
    "url": "https://explorecapitals.com/contact"
  };

  return (
    <main className="pt-32 pb-20 px-6 bg-surface-dark min-h-screen overflow-x-hidden relative">
      <SEO
        title="Contact"
        description="Get in touch with ExploreCapitals. Questions, feedback, or partnership inquiries welcome. We love hearing from geography enthusiasts."
        structuredData={structuredData}
      />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[100%] h-[100%] bg-sky/20 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-sky/20 border-2 border-white/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-glossy-gradient opacity-30" />
              <MessageSquare size={14} className="relative z-10" /> <span className="relative z-10">Communication Hub</span>
           </div>
           <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter mb-8 uppercase leading-[0.85] drop-shadow-2xl">
             Get in <span className="text-sky">Touch.</span>
           </h1>
           <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-widest drop-shadow-md">
             Our architecture team is dedicated to building the most precise geography platform on the web.
           </p>
        </header>

        <section className="bg-white/10 backdrop-blur-3xl rounded-[4rem] p-10 md:p-20 border-2 border-white/20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 relative overflow-hidden">
           <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
           <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-8 tracking-tighter uppercase drop-shadow-lg">Direct Outreach</h2>
           <div className="p-8 bg-black/20 rounded-3xl border-2 border-white/10 shadow-inner relative overflow-hidden group">
             <div className="absolute inset-0 bg-glossy-gradient opacity-5" />
             <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-medium italic relative z-10">
               Feel free to dispatch an inquiry to <a href="mailto:anaximanderomiletus@gmail.com" className="text-sky font-black whitespace-nowrap hover:text-white transition-all underline decoration-sky/40 underline-offset-8">anaximanderomiletus@gmail.com</a>
             </p>
           </div>
        </section>

        {/* Categories Section */}
        <section className="mt-16 grid sm:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
           {[
             { title: "Collaborations", icon: <Globe size={24} />, text: "Educational institutions seeking precision integration." },
             { title: "Technical Support", icon: <Compass size={24} />, text: "Reporting interface anomalies or cartographic errors." },
             { title: "Media & Press", icon: <MessageSquare size={24} />, text: "Interviews or project documentation requests." },
           ].map((cat, i) => (
             <div key={i} className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-white/10 hover:bg-white/10 hover:border-sky/30 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-5 pointer-events-none" />
                <div className="text-sky mb-4 transition-all origin-left relative z-10">{cat.icon}</div>
                <h4 className="font-display font-black text-white mb-3 text-xs uppercase tracking-[0.2em] relative z-10">{cat.title}</h4>
                <p className="text-[10px] text-white/30 font-bold leading-relaxed uppercase tracking-widest relative z-10">{cat.text}</p>
             </div>
           ))}
        </section>
      </div>
    </main>
  );
};

export default Contact;
