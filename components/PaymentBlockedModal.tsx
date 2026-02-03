import React from 'react';
import { X, AlertTriangle, Mail, Clock, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  if (!isOpen || !eligibility || eligibility.allowed) return null;

  const getIcon = () => {
    if (eligibility.requiresEmailVerification) return Mail;
    if (eligibility.requiresTermsAcceptance) return FileText;
    return AlertTriangle;
  };

  const Icon = getIcon();

  const getTitle = () => {
    if (eligibility.requiresEmailVerification) return 'Email Verification Required';
    if (eligibility.requiresTermsAcceptance) return 'Accept Terms of Service';
    return 'Payment Unavailable';
  };

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
        <div className="space-y-3">
          <div className="flex gap-3">
            <Link to="/terms" target="_blank" className="flex-1">
              <Button variant="secondary" className="w-full text-sm">
                View Terms
              </Button>
            </Link>
            <Link to="/privacy" target="_blank" className="flex-1">
              <Button variant="secondary" className="w-full text-sm">
                View Privacy
              </Button>
            </Link>
          </div>
          <Button
            variant="primary"
            onClick={onAcceptTerms}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Accept Terms & Continue'}
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
      <div className="relative bg-surface-dark border-2 border-white/20 rounded-3xl p-6 w-full max-w-md shadow-2xl">
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
          {eligibility.reason}
        </p>

        {/* Security note */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl mb-6">
          <Shield size={16} className="text-sky-light flex-shrink-0" />
          <p className="text-white/60 text-xs">
            These requirements help protect your account and ensure secure transactions.
          </p>
        </div>

        {/* Action */}
        {getAction()}
      </div>
    </div>
  );
};

export default PaymentBlockedModal;
