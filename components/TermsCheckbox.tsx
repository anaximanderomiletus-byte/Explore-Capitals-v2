import React, { useState } from 'react';
import { Check, FileText, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TermsCheckboxProps {
  accepted: boolean;
  onAccept: () => void;
  isLoading?: boolean;
  error?: string | null;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  accepted,
  onAccept,
  isLoading = false,
  error = null,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleAccept = () => {
    if (isChecked && !isLoading) {
      onAccept();
    }
  };

  if (accepted) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 bg-green-500/20 border border-green-500/40 rounded-xl">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Check size={14} className="text-white" />
        </div>
        <span className="text-green-400 text-sm font-bold">Terms of Service accepted</span>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5">
      <div className="flex items-start gap-3 mb-4">
        <Shield size={20} className="text-sky-light flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-white font-bold text-sm mb-1">Payment Authorization Required</h4>
          <p className="text-white/60 text-xs leading-relaxed">
            Before making a purchase, please review and accept our terms of service and privacy policy.
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <Link 
          to="/terms" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
        >
          <FileText size={16} className="text-white/60" />
          <span className="text-white/80 text-sm font-medium flex-1">Terms of Service</span>
          <ExternalLink size={14} className="text-white/40 group-hover:text-white/60 transition-colors" />
        </Link>

        <Link 
          to="/privacy" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
        >
          <FileText size={16} className="text-white/60" />
          <span className="text-white/80 text-sm font-medium flex-1">Privacy Policy</span>
          <ExternalLink size={14} className="text-white/40 group-hover:text-white/60 transition-colors" />
        </Link>
      </div>

      <label className="flex items-start gap-3 cursor-pointer mb-4 group">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-5 h-5 bg-white/10 border-2 border-white/30 rounded peer-checked:bg-sky peer-checked:border-sky transition-all" />
          {isChecked && (
            <Check 
              size={14} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white" 
            />
          )}
        </div>
        <span className="text-white/80 text-sm leading-relaxed">
          I have read and agree to the{' '}
          <span className="text-sky-light">Terms of Service</span> and{' '}
          <span className="text-sky-light">Privacy Policy</span>
        </span>
      </label>

      {error && (
        <div className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg mb-4">
          <p className="text-red-400 text-xs font-medium">{error}</p>
        </div>
      )}

      <button
        onClick={handleAccept}
        disabled={!isChecked || isLoading}
        className="w-full px-6 py-3 bg-sky/80 hover:bg-sky disabled:bg-white/10 disabled:cursor-not-allowed rounded-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Check size={16} />
            <span>Accept & Continue</span>
          </>
        )}
      </button>
    </div>
  );
};

export default TermsCheckbox;
