import React, { useEffect } from 'react';
import { Scale, ArrowLeft, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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
        title="Terms of Service | ExploreCapitals"
        description="Review the terms of service and usage guidelines for the ExploreCapitals geography platform."
      />

      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/15 rounded-full blur-[150px] opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-accent/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-sky transition-all mb-8"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-sky/20 border border-white/30 rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white/90 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-20" />
            <Scale size={12} className="text-sky-light relative z-10" /> 
            <span className="relative z-10 drop-shadow-md">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight mb-4 tracking-tighter">
            Terms of Service
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: January 25, 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 text-base leading-relaxed mb-8">
            Welcome to ExploreCapitals. By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">1. Acceptance of Terms</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            By accessing or using the ExploreCapitals platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not access or use our services.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">2. Description of Service</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            ExploreCapitals provides interactive geography games, a world database with information about countries and capitals, progress tracking and achievements, and educational content about world geography.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">3. User Accounts</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            When you create an account, you agree to provide accurate information, maintain the security of your password, accept responsibility for all activities under your account, and notify us immediately of any unauthorized use.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">4. Acceptable Use</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            You agree to use ExploreCapitals only for lawful purposes. You may not use the service for illegal purposes, attempt to gain unauthorized access, interfere with the service, use automated systems without permission, or harass other users.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">5. Intellectual Property</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            All content, interfaces, graphics, code, and branding on ExploreCapitals are our exclusive property and protected by intellectual property laws. You may not reproduce, distribute, or modify any content without written permission.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">6. Privacy</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            Your privacy is important to us. We handle your data securely, do not sell personal information, and maintain transparent practices. For full details, please read our{' '}
            <Link to="/privacy" className="text-sky hover:text-sky-light transition-colors">
              Privacy Policy
            </Link>.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">7. Disclaimers</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            The service is provided "as is" without warranties of any kind. While we strive for accuracy, geographic data may change and we do not guarantee the accuracy of all information. We do not guarantee uninterrupted access to the service.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">8. Limitation of Liability</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            To the maximum extent permitted by law, ExploreCapitals shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">9. Changes to Terms</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            We may modify these terms at any time. We will update the date at the top of this page and notify you of material changes. Continued use after changes constitutes acceptance.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">10. Contact</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            If you have questions about these Terms, please visit our{' '}
            <Link to="/about#contact" className="text-sky hover:text-sky-light transition-colors">
              contact page
            </Link>.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            By using ExploreCapitals, you agree to these terms.
          </p>
          <Link 
            to="/privacy" 
            className="inline-flex items-center gap-2 text-sky/60 hover:text-sky transition-colors text-sm"
          >
            <Lock size={14} />
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Terms;
