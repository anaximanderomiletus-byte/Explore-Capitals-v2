
import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../context/LocaleContext';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
  <footer className="bg-surface-dark pt-12 sm:pt-16 md:pt-24 pb-8 md:pb-12 relative z-10 overflow-hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 32px), 32px)' }}>
    {/* Atmospheric Top Transition */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    
    {/* Decorative Background Glows */}
    <div className="absolute top-0 right-0 w-[40%] h-full bg-sky/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-[30%] h-full bg-accent/5 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <Link to="/" className="text-white font-display font-black text-3xl tracking-tighter inline-block mb-6 uppercase drop-shadow-lg">
            Explore<span className="text-sky bg-clip-text bg-gel-blue [-webkit-text-fill-color:transparent]">Capitals</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm font-bold drop-shadow-md">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="font-black text-sky text-[10px] uppercase tracking-[0.4em] mb-8">{t('footer.navigation')}</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('nav.home')}</Link>
            </li>
            <li>
              <Link to="/games" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('nav.games')}</Link>
            </li>
            <li>
              <Link to="/database" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('nav.database')}</Link>
            </li>
            <li>
              <Link to="/blog" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('nav.blog')}</Link>
            </li>
            <li>
              <Link to="/map" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('nav.map')}</Link>
            </li>
          </ul>
        </div>

        {/* Project Column */}
        <div>
          <h4 className="font-black text-sky text-[10px] uppercase tracking-[0.4em] mb-8">{t('footer.about')}</h4>
          <ul className="space-y-4">
            <li>
              <Link to="/about" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('footer.about')}</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('footer.contact')}</Link>
            </li>
            <li>
              <Link to="/donate" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">Donate</Link>
            </li>
            <li>
              <Link to="/terms" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('footer.terms')}</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-white/40 hover:text-white transition-all text-xs font-black uppercase tracking-widest">{t('footer.privacy')}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-10 border-t-2 border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          {t('footer.copyright', { year: String(new Date().getFullYear()) })}
        </div>
        <LanguageSwitcher variant="footer" />
      </div>
    </div>
  </footer>
  );
};

export default Footer;
