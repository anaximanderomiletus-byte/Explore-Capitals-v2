import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Home, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';
import { useTranslation } from '../context/LocaleContext';
import Button from '../components/Button';

const NotFound: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();

  React.useEffect(() => {
    setPageLoading(false);
    window.__dismissLoader?.();
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-white">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore world capitals, flags, and geography games at ExploreCapitals."
        keywords="404, page not found, explorecapitals"
        noIndex
      />

      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(191,230,255,0.10)_0%,rgba(15,23,42,0)_42%,rgba(52,199,89,0.08)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(0,194,255,0.20),transparent_68%)]" />
        <img
          src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon-new.png`}
          alt=""
          className="absolute left-1/2 top-[18%] h-[340px] w-[340px] -translate-x-1/2 opacity-20 blur-[1px] sm:h-[460px] sm:w-[460px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-[2rem] border-2 border-white/45 bg-white/20 px-6 py-8 text-center shadow-[0_24px_80px_rgba(0,122,255,0.22),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-3xl sm:p-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.16)_42%,rgba(255,255,255,0)_100%)]" />
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[1.5rem] border border-white/50 bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_16px_44px_rgba(0,194,255,0.20)]">
          <img
            src={`${import.meta.env.BASE_URL}png/STYLE/explorecapitals-globe-favicon-new.png`}
            alt=""
            className="h-16 w-16 object-contain drop-shadow-[0_0_18px_rgba(191,230,255,0.45)]"
          />
        </div>

        <p className="relative mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-sky-light">Route Missing</p>
        <h1 className="relative mb-3 font-display text-7xl font-black leading-none tracking-tight text-white drop-shadow-[0_0_28px_rgba(0,194,255,0.35)] sm:text-8xl">
          404
        </h1>
        <p className="relative mb-3 text-xl font-black uppercase tracking-tight text-white">{t('notFound.title')}</p>
        <p className="relative mx-auto mb-8 max-w-sm text-sm font-semibold leading-relaxed text-white/70">
          {t('notFound.desc')}
        </p>

        <div className="relative flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="w-full sm:w-auto"
          >
            <Button as="div" variant="primary" className="w-full px-6 py-3 text-[11px] uppercase tracking-[0.18em]">
              <Home size={16} />
              {t('notFound.goHome')}
            </Button>
          </Link>
          <Link
            to="/games/all"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/15 px-6 py-3 font-display text-[11px] font-black uppercase tracking-[0.18em] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-2xl transition-all duration-300 hover:bg-white/25 sm:w-auto"
          >
            <Gamepad2 size={16} />
            {t('notFound.allGames')}
          </Link>
        </div>

        <Link
          to="/database"
          className="relative mt-5 inline-flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-white/55 transition-colors hover:text-white"
        >
          <Search size={14} />
          {t('notFound.browseCountries')}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
