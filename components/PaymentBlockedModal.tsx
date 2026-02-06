import React, { useState } from 'react';
import { X, AlertTriangle, Mail, FileText, Shield, Check, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './Button';
import type { PaymentEligibility } from '../types';

interface PaymentBlockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  eligibility: PaymentEligibility | null;
  onAcceptTerms?: () => void;
  onResendVerification?: () => void;
  isLoading?: boolean;
}

const PaymentBlockedModal: React.FC<PaymentBlockedModalProps> = ({
  isOpen,
  onClose,
  eligibility,
  onAcceptTerms,
  onResendVerification,
  isLoading = false,
}) => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [expandedSection, setExpandedSection] = useState<'terms' | 'privacy' | null>(null);

  if (!isOpen || !eligibility || eligibility.allowed) return null;

  const getIcon = () => {
    if (eligibility.requiresEmailVerification) return Mail;
    if (eligibility.requiresTermsAcceptance) return FileText;
    return AlertTriangle;
  };

  const Icon = getIcon();

  const getTitle = () => {
    if (eligibility.requiresEmailVerification) return 'Email Verification Required';
    if (eligibility.requiresTermsAcceptance) return 'Review & Accept Terms';
    return 'Unable to Process Payment';
  };

  // Get user-friendly message, hiding internal/technical errors
  const getMessage = () => {
    if (eligibility.requiresTermsAcceptance) {
      return 'Please review and accept our terms to continue with your purchase.';
    }
    
    const reason = eligibility.reason?.toLowerCase() || '';
    
    // Hide technical error messages from users
    if (
      reason === 'internal' || 
      reason.includes('internal') ||
      reason.includes('error') ||
      reason.includes('failed') ||
      reason.includes('exception') ||
      !eligibility.reason
    ) {
      return 'We\'re experiencing a temporary issue processing payments. Please try again in a few moments, or contact support if the problem persists.';
    }
    
    return eligibility.reason;
  };

  const canAccept = termsChecked && privacyChecked;

  const handleAccept = () => {
    if (canAccept && onAcceptTerms) {
      onAcceptTerms();
    }
  };

  // Terms content summary
  const termsContent = `
By using ExploreCapitals, you agree to:

• Use the service for personal, non-commercial purposes
• Not share your account credentials with others
• Not attempt to circumvent any security features
• Accept that subscription fees are billed according to your chosen plan
• Understand that lifetime access is a one-time purchase with no recurring charges

Cancellation & Refunds:
• Monthly/Annual subscriptions can be canceled anytime
• Access continues until the end of the billing period
• Refunds available within 24 hours of purchase for eligible transactions

We reserve the right to:
• Modify pricing with 30 days notice
• Suspend accounts that violate these terms
• Update features and content at our discretion
  `.trim();

  const privacyContent = `
Your privacy matters to us. Here's how we handle your data:

Information We Collect:
• Email address for account management
• Game progress and statistics
• Payment information (processed securely by Stripe)

How We Use Your Data:
• Provide and improve our services
• Process payments and subscriptions
• Send important account notifications
• Analyze usage to enhance user experience

We Never:
• Sell your personal data to third parties
• Share your information without consent
• Store complete payment card details

Data Security:
• All data transmitted using SSL encryption
• Payments processed through PCI-compliant Stripe
• Regular security audits and updates

You Can:
• Request a copy of your data
• Delete your account at any time
• Opt out of non-essential communications
  `.trim();

  const getAction = () => {
    if (eligibility.requiresEmailVerification && onResendVerification) {
      return (
        <Button
          variant="primary"
          onClick={onResendVerification}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Sending...' : 'Resend Verification Email'}
        </Button>
      );
    }

    if (eligibility.requiresTermsAcceptance && onAcceptTerms) {
      return (
        <div className="space-y-4">
          {/* Terms Section */}
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'terms' ? null : 'terms')}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setTermsChecked(!termsChecked);
                  }}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                    termsChecked 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  {termsChecked && <Check size={14} className="text-white" />}
                </div>
                <span className="text-white text-sm font-medium">Terms of Service</span>
              </div>
              {expandedSection === 'terms' ? (
                <ChevronUp size={18} className="text-white/50" />
              ) : (
                <ChevronDown size={18} className="text-white/50" />
              )}
            </button>
            {expandedSection === 'terms' && (
              <div className="px-4 pb-4">
                <div className="bg-white/5 rounded-lg p-3 max-h-40 overflow-y-auto">
                  <pre className="text-white/60 text-xs whitespace-pre-wrap font-sans leading-relaxed">
                    {termsContent}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Privacy Section */}
          <div className="border border-white/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'privacy' ? null : 'privacy')}
              className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPrivacyChecked(!privacyChecked);
                  }}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                    privacyChecked 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  {privacyChecked && <Check size={14} className="text-white" />}
                </div>
                <span className="text-white text-sm font-medium">Privacy Policy</span>
              </div>
              {expandedSection === 'privacy' ? (
                <ChevronUp size={18} className="text-white/50" />
              ) : (
                <ChevronDown size={18} className="text-white/50" />
              )}
            </button>
            {expandedSection === 'privacy' && (
              <div className="px-4 pb-4">
                <div className="bg-white/5 rounded-lg p-3 max-h-40 overflow-y-auto">
                  <pre className="text-white/60 text-xs whitespace-pre-wrap font-sans leading-relaxed">
                    {privacyContent}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Accept Button */}
          <Button
            variant="primary"
            onClick={handleAccept}
            disabled={!canAccept || isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : canAccept ? 'Continue to Payment' : 'Check both boxes to continue'}
          </Button>
        </div>
      );
    }

    return (
      <Button variant="secondary" onClick={onClose} className="w-full">
        Close
      </Button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface-dark border-2 border-white/20 rounded-3xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={20} className="text-white/60" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center">
            <Icon size={32} className="text-amber-400" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-display font-bold text-white text-center mb-2">
          {getTitle()}
        </h3>

        {/* Message */}
        <p className="text-white/70 text-center text-sm mb-6 leading-relaxed">
          {getMessage()}
        </p>

        {/* Security note - only show for non-terms modals */}
        {!eligibility.requiresTermsAcceptance && (
          <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl mb-6">
            <Shield size={16} className="text-sky-light flex-shrink-0" />
            <p className="text-white/60 text-xs">
              These requirements help protect your account and ensure secure transactions.
            </p>
          </div>
        )}

        {/* Action */}
        {getAction()}
      </div>
    </div>
  );
};

export default PaymentBlockedModal;
