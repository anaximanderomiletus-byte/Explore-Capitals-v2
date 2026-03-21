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
    primary: 'bg-primary/20 text-primary',
    danger: 'bg-error/20 text-error',
    warning: 'bg-warning/20 text-warning',
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
              className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm my-auto"
            >
              <div className="relative bg-[#1E293B] border border-red-500/20 rounded-3xl overflow-hidden shadow-2xl">
                {/* Red accent glow */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="relative p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center">
                      <LogOut size={28} className="text-red-400" />
                    </div>
                  </div>

                  {/* Title & Message */}
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter mb-2">
                      Are You Sure?
                    </h2>
                    <p className="text-sm text-white/50 leading-relaxed">
                      Your progress is saved automatically.<br />
                      You can return anytime.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={onConfirm}
                      disabled={isLoading}
                      className="w-full h-13 py-3.5 rounded-2xl text-white font-bold uppercase tracking-wider text-sm transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                      style={{
                        background: 'linear-gradient(180deg, rgba(239,68,68,0.7) 0%, rgba(185,28,28,0.85) 100%)',
                        boxShadow: '0 8px 32px rgba(239,68,68,0.3), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -1px 1px rgba(0,0,0,0.15)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    >
                      {/* Liquid glass layers */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-white/5 to-transparent pointer-events-none" style={{ height: '55%' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
                      <div className="absolute inset-x-3 top-[3px] h-[40%] bg-white/15 rounded-xl blur-[2px] pointer-events-none" />
                      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/10 pointer-events-none" />

                      <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Signing Out...
                        </>
                      ) : (
                        'Sign Out'
                      )}
                      </span>
                    </button>

                    <button
                      onClick={() => !isLoading && onClose()}
                      disabled={isLoading}
                      className="w-full h-12 rounded-2xl text-white/60 hover:text-white font-bold uppercase tracking-wider text-sm transition-all relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.1), inset 0 -1px 1px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" style={{ height: '50%' }} />
                      <div className="absolute inset-x-3 top-[3px] h-[35%] bg-white/8 rounded-xl blur-[2px] pointer-events-none" />
                      <span className="relative z-10">Cancel</span>
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
            className="fixed inset-0 bg-surface-dark/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative w-full max-w-[440px] bg-surface-dark/95 border-2 border-white/20 rounded-[2.5rem] p-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl overflow-hidden my-auto"
          >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${variant === 'danger' ? 'from-error/40 via-error to-error/40' : 'from-primary/40 via-primary to-primary/40'}`} />
            
            <button 
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-all z-20"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-3xl ${iconColors[variant]} border border-white/20 flex items-center justify-center mb-8 relative group`}>
                <div className="absolute inset-0 bg-white/5 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity" />
                <AlertTriangle size={32} className="relative z-10" />
              </div>
              
              <div className="space-y-2 mb-10">
                <h2 className="text-4xl font-display font-black text-white uppercase tracking-tighter drop-shadow-2xl italic leading-none">
                  {title}
                </h2>
                <p className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-black">
                  Confirmation Required
                </p>
              </div>

              <div className="mb-12 px-6">
                <p className="text-[13px] text-white font-black uppercase tracking-[0.2em] leading-relaxed">
                {message}
                </p>
              </div>

              <div className="w-full flex flex-col gap-4">
                <Button
                  variant={variant === 'danger' ? 'danger' : 'primary'}
                  onClick={onConfirm}
                  disabled={isLoading}
                  className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-2xl transition-all"
                >
                  {isLoading ? 'Processing...' : confirmText}
                </Button>
                
                <button
                  onClick={() => !isLoading && onClose()}
                  disabled={isLoading}
                  className="w-full py-4 text-[10px] font-black text-white/30 hover:text-white uppercase tracking-[0.4em] transition-all"
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
