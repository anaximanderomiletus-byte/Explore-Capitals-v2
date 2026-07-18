import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, LogOut } from 'lucide-react';
import Button from './Button';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger' | 'warning';
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'primary',
  isLoading = false,
}) => {
  const isSignOut = variant === 'danger' && title.toLowerCase().includes('sign out');

  const iconColors = {
    primary: 'bg-accent-soft text-primary',
    danger: 'bg-red-50 text-red-600',
    warning: 'bg-amber-50 text-amber-600',
  };

  // Clean red-themed sign-out modal
  if (isSignOut) {
    const signOutContent = (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isLoading && onClose()}
              className="fixed inset-0 bg-text/40"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm my-auto"
            >
              <div className="relative bg-elevated border border-border rounded-2xl overflow-hidden shadow-premium">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-error/10 border border-error/30 rounded-2xl flex items-center justify-center">
                      <LogOut size={28} className="text-red-500" />
                    </div>
                  </div>

                  {/* Title & Message */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-black text-text uppercase tracking-tighter mb-2">
                      Are You Sure?
                    </h2>
                    <p className="text-sm text-muted leading-relaxed">
                      Your progress is saved automatically.<br />
                      You can return anytime.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={onConfirm}
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing Out...
                        </>
                      ) : (
                        'Sign Out'
                      )}
                    </button>

                    <button
                      onClick={() => !isLoading && onClose()}
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-elevated border border-border hover:bg-accent-soft text-muted hover:text-text font-semibold uppercase tracking-wide text-sm transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;
    return createPortal(signOutContent, modalRoot);
  }

  // Default modal for non-sign-out confirmations
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoading && onClose()}
            className="fixed inset-0 bg-text/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-[440px] bg-elevated border border-border rounded-2xl p-10 shadow-premium overflow-hidden my-auto"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${variant === 'danger' ? 'from-red-400/40 via-red-500 to-red-400/40' : 'from-primary/40 via-primary to-primary/40'}`} />
            
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-6 right-6 p-2 text-muted hover:text-text transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-2xl ${iconColors[variant]} border border-border flex items-center justify-center mb-8`}>
                <AlertTriangle size={32} />
              </div>
              
              <div className="space-y-2 mb-10">
                <h2 className="text-4xl font-display font-black text-text uppercase tracking-tighter italic leading-none">
                  {title}
                </h2>
                <p className="text-[10px] text-muted uppercase tracking-wide font-semibold">
                  Confirmation Required
                </p>
              </div>

              <div className="mb-12 px-6">
                <p className="text-[13px] text-muted font-medium leading-relaxed">
                {message}
                </p>
              </div>

              <div className="w-full flex flex-col gap-4">
                <Button
                  variant={variant === 'danger' ? 'danger' : 'primary'}
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="w-full h-16 text-xl font-black uppercase tracking-widest transition-all"
                >
                  {isLoading ? 'Processing...' : confirmText}
                </Button>
                
                <button
                  onClick={() => !isLoading && onClose()}
                  disabled={isLoading}
                  className="w-full py-4 text-[10px] font-semibold text-muted hover:text-text uppercase tracking-wide transition-all"
                >
                  {cancelText}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(modalContent, modalRoot);
};

export default ConfirmationModal;
