import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';

const NotFound: React.FC = () => {
  const { setPageLoading } = useLayout();

  React.useEffect(() => {
    setPageLoading(false);
    window.__dismissLoader?.();
  }, []);

  return (
    <main className="min-h-screen bg-surface-dark flex items-center justify-center px-4 pt-24 pb-12 text-white">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore world capitals, flags, and geography games at ExploreCapitals."
        keywords="404, page not found, explorecapitals"
        noIndex
      />

      <div className="text-center max-w-md">
        {/* Globe icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Globe className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-4xl font-display font-black mb-3">404</h1>
        <p className="text-xl text-white/70 mb-2">Page Not Found</p>
        <p className="text-sm text-white/40 mb-8">
          This page doesn't exist — but there's a whole world to explore.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link
            to="/database"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/80 font-semibold rounded-xl border border-white/10 transition-colors"
          >
            <Search size={16} />
            Browse Countries
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
