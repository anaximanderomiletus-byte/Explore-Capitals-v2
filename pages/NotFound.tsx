import React from "react";
import { Link } from "react-router-dom";
import { Gamepad2, Home, Search } from "lucide-react";
import SEO from "../components/SEO";
import { useLayout } from "../context/LayoutContext";
import { useTranslation } from "../context/LocaleContext";
import Button from "../components/Button";

const NotFound: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { t } = useTranslation();

  React.useEffect(() => {
    setPageLoading(false);
    window.__dismissLoader?.();
  }, []);

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-text">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore world capitals, flags, and geography games at ExploreCapitals."
        keywords="404, page not found, explorecapitals"
        noIndex
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-elevated px-6 py-8 text-center shadow-premium sm:p-10">
        <p className="relative mb-4 font-display italic text-2xl tracking-tight text-text">
          Explore<span className="text-primary not-italic">Capitals</span>
        </p>

        <p className="relative mb-2 text-[10px] font-semibold uppercase tracking-wide text-primary">
          Route Missing
        </p>
        <h1 className="relative mb-3 font-display text-7xl font-black leading-none tracking-tight text-text sm:text-8xl">
          404
        </h1>
        <p className="relative mb-3 text-xl font-black uppercase tracking-tight text-text">
          {t("notFound.title")}
        </p>
        <p className="relative mx-auto mb-8 max-w-sm text-sm font-semibold leading-relaxed text-muted">
          {t("notFound.desc")}
        </p>

        <div className="relative flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/" className="w-full sm:w-auto">
            <Button
              as="div"
              variant="primary"
              className="w-full px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
            >
              <Home size={16} />
              {t("notFound.goHome")}
            </Button>
          </Link>
          <Link
            to="/games/all"
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-border bg-elevated px-6 py-3 font-display text-[11px] font-semibold uppercase tracking-wide text-text shadow-premium transition-all duration-300 hover:bg-accent-soft hover:border-primary/25 sm:w-auto"
          >
            <Gamepad2 size={16} />
            {t("notFound.allGames")}
          </Link>
        </div>

        <Link
          to="/database"
          className="relative mt-5 inline-flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-wide text-muted transition-colors hover:text-primary"
        >
          <Search size={14} />
          {t("notFound.browseCountries")}
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
