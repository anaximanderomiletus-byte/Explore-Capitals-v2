import React, { useState } from "react";
import { Check, FileText, Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="flex items-center gap-3 px-4 py-3 bg-accent-soft border border-primary/20 rounded-xl">
        <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Check size={14} className="text-text" />
        </div>
        <span className="text-primary text-sm font-semibold">
          Terms of Service accepted
        </span>
      </div>
    );
  }

  return (
    <div className="bg-elevated border border-border rounded-2xl p-5 shadow-premium">
      <div className="flex items-start gap-3 mb-4">
        <Shield size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-text font-semibold text-sm mb-1">
            Payment Authorization Required
          </h4>
          <p className="text-muted text-xs leading-relaxed">
            Before making a purchase, please review and accept our terms of
            service and privacy policy.
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <Link
          to="/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-surface hover:bg-accent-soft border border-border rounded-xl transition-all group"
        >
          <FileText size={16} className="text-muted" />
          <span className="text-text text-sm font-medium flex-1">
            Terms of Service
          </span>
          <ExternalLink
            size={14}
            className="text-muted group-hover:text-primary transition-colors"
          />
        </Link>

        <Link
          to="/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-3 bg-surface hover:bg-accent-soft border border-border rounded-xl transition-all group"
        >
          <FileText size={16} className="text-muted" />
          <span className="text-text text-sm font-medium flex-1">
            Privacy Policy
          </span>
          <ExternalLink
            size={14}
            className="text-muted group-hover:text-primary transition-colors"
          />
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
          <div className="w-5 h-5 bg-surface border-2 border-border rounded peer-checked:bg-primary peer-checked:border-primary transition-all" />
          {isChecked && (
            <Check
              size={14}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-text"
            />
          )}
        </div>
        <span className="text-text/80 text-sm leading-relaxed">
          I have read and agree to the{" "}
          <Link
            to="/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            Privacy Policy
          </Link>
        </span>
      </label>

      {error && (
        <div className="px-4 py-2 bg-error/10 border border-error/30 rounded-lg mb-4">
          <p className="text-error text-xs font-medium">{error}</p>
        </div>
      )}

      <button
        onClick={handleAccept}
        disabled={!isChecked || isLoading}
        className="w-full px-6 py-3 bg-primary hover:bg-primary-hover disabled:bg-border disabled:text-muted disabled:cursor-not-allowed rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-border border-t-white rounded-full animate-spin" />
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
