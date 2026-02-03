
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="bg-surface-dark pt-16 pb-8 md:pt-24 md:pb-12 relative z-10 overflow-hidden">
    {/* Atmospheric Top Transition */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    
    {/* Decorative Background Glows */}
    <div className="absolute top-0 right-0 w-[40%] h-full bg-sky/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
    <div className="absolute bottom-0 left-0 w-[30%] h-full bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Link to="/" className="text-white font-display font-black text-3xl tracking-tighter inline-block mb-6 uppercase drop-shadow-lg">
            Explore<span className="text-sky bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm font-bold drop-shadow-md">
            The world's first high-fidelity geography arcade. Mastering the atlas through immersive design and gamified education.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-black text-sky text-[10px] uppercase tracking-[0.4em] mb-8">Navigation</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Home</Link>
            </li>
            <li>
              <Link to="/games" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Games</Link>
            </li>
            <li>
              <Link to="/database" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Database</Link>
            </li>
            <li>
              <Link to="/map" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Map</Link>
            </li>
          </ul>
        </div>

        {/* Project Column */}
        <div>
          <h4 className="font-black text-sky text-[10px] uppercase tracking-[0.4em] mb-8">About</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/about" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">About Us</Link>
            </li>
            <li>
              <Link to="/about#contact" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Contact</Link>
            </li>
            <li>
              <Link to="/terms" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Terms</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Privacy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-10 border-t-2 border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2026 ExploreCapitals
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
