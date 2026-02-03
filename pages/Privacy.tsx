import React, { useEffect } from 'react';
import { Shield, ArrowLeft, FileText, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useLayout } from '../context/LayoutContext';

const Privacy: React.FC = () => {
  const { setPageLoading } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoading(false);
    window.scrollTo(0, 0);
  }, [setPageLoading]);

  return (
    <main className="pt-28 pb-16 px-4 md:px-6 bg-surface-dark min-h-screen overflow-x-hidden relative">
      <SEO
        title="Privacy Policy | ExploreCapitals"
        description="Learn how ExploreCapitals collects, uses, and protects your personal information."
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
            <Shield size={12} className="text-sky-light relative z-10" /> 
            <span className="relative z-10 drop-shadow-md">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white leading-tight mb-4 tracking-tighter">
            Privacy Policy
          </h1>
          <p className="text-white/50 text-sm">
            Last updated: February 2, 2026
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <p className="text-white/70 text-base leading-relaxed mb-8">
            ExploreCapitals ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit explorecapitals.com.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">1. Information We Collect</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            <strong className="text-white/80">Personal Information:</strong> When you create an account, we may collect your email address, username, and profile information you choose to provide.
          </p>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            <strong className="text-white/80">Usage Data:</strong> We automatically collect information about your device, browser type, IP address, pages visited, time spent on pages, and other diagnostic data.
          </p>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            <strong className="text-white/80">Game Progress:</strong> We store your game scores, achievements, and progress to provide a personalized experience.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">2. Cookies & Tracking Technologies</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your experience:
          </p>
          <ul className="text-white/60 text-sm leading-relaxed mb-6 list-disc pl-6 space-y-2">
            <li><strong className="text-white/80">Essential Cookies:</strong> Required for the website to function properly.</li>
            <li><strong className="text-white/80">Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics).</li>
            <li><strong className="text-white/80">Advertising Cookies:</strong> Used to serve relevant advertisements (Google AdSense).</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">3. Third-Party Services</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            <strong className="text-white/80">Google Analytics:</strong> We use Google Analytics to analyze website traffic. For information on how Google uses data, visit{' '}
            <a 
              href="https://policies.google.com/technologies/partner-sites" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky hover:text-sky-light transition-colors inline-flex items-center gap-1"
            >
              How Google uses data <ExternalLink size={12} />
            </a>
          </p>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            <strong className="text-white/80">Google AdSense:</strong> We display advertisements through Google AdSense. Google may use cookies to personalize ads. You can opt out at{' '}
            <a 
              href="https://www.google.com/settings/ads" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sky hover:text-sky-light transition-colors inline-flex items-center gap-1"
            >
              Google Ads Settings <ExternalLink size={12} />
            </a>
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">4. How We Use Your Information</h2>
          <ul className="text-white/60 text-sm leading-relaxed mb-6 list-disc pl-6 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To personalize your experience and save your progress</li>
            <li>To analyze usage and improve our platform</li>
            <li>To display relevant advertisements</li>
            <li>To communicate with you about updates and features</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">5. Data Sharing & Disclosure</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="text-white/60 text-sm leading-relaxed mb-6 list-disc pl-6 space-y-2">
            <li><strong className="text-white/80">Service Providers:</strong> Third parties that help us operate our website (hosting, analytics, advertising)</li>
            <li><strong className="text-white/80">Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">6. Your Rights & Choices</h2>
          <ul className="text-white/60 text-sm leading-relaxed mb-6 list-disc pl-6 space-y-2">
            <li><strong className="text-white/80">Access & Update:</strong> You can access and update your account information in your profile settings</li>
            <li><strong className="text-white/80">Delete Account:</strong> You can request deletion of your account by contacting us</li>
            <li><strong className="text-white/80">Cookie Preferences:</strong> You can manage cookie preferences through your browser settings or our cookie consent banner</li>
            <li><strong className="text-white/80">Opt-Out of Ads:</strong> Visit Google Ads Settings to opt out of personalized advertising</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">7. Children's Privacy</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Our service is intended for general audiences. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us so we can delete it.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">8. Contact Us</h2>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            If you have questions about this Privacy Policy, please visit our{' '}
            <Link to="/about#contact" className="text-sky hover:text-sky-light transition-colors">
              contact page
            </Link>.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            This policy may be updated periodically.
          </p>
          <Link 
            to="/terms" 
            className="inline-flex items-center gap-2 text-sky/60 hover:text-sky transition-colors text-sm"
          >
            <FileText size={14} />
            Terms of Service
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
