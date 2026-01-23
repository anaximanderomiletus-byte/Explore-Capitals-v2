import React, { useEffect, useMemo, useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, Compass } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';

const ResetPassword: React.FC = () => {
  const { confirmResetPassword } = useAuth();
  const { setPageLoading, setNavbarMode } = useLayout();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const passwordCriteria = useMemo(() => ({
    length: password.length >= 8 && password.length <= 4096,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }), [password]);

  const isPasswordValid = useMemo(() => 
    Object.values(passwordCriteria).every(Boolean),
  [passwordCriteria]);

  // Get oobCode from URL
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get('oobCode');

  useEffect(() => {
    setPageLoading(false);
    setNavbarMode('hero');
    if (!oobCode) {
      setError('Invalid or expired reset link.');
    }
    return () => setNavbarMode('default');
  }, [setPageLoading, setNavbarMode, oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!isPasswordValid) {
      setError('Password does not meet the security requirements.');
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await confirmResetPassword(oobCode, password);
      setSuccess(true);
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to reset password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark flex flex-col relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-sky/30 rounded-full blur-[150px] animate-pulse-slow opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-sky/15 rounded-full blur-[120px] animate-pulse-slow opacity-50" />
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center px-6 py-24 sm:py-32">
        <div className="w-full max-w-[600px] bg-white/20 backdrop-blur-3xl rounded-[4rem] border-2 border-white/40 overflow-hidden relative">
          <div className="absolute inset-0 bg-glossy-gradient opacity-30 pointer-events-none" />
          
          <div className="p-10 sm:p-16 flex flex-col justify-center bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
            <div className="max-w-md mx-auto w-full relative z-10">
              <div className="mb-14 text-center">
                <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/30 backdrop-blur-3xl rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white mb-10 border-2 border-white/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                  <Compass size={14} className="animate-spin-slow relative z-10 text-sky-light" />
                  <span className="relative z-10 drop-shadow-md">SECURE ACCESS</span>
                </div>
                <h2 className="text-4xl font-display font-black text-white tracking-tighter mb-2 uppercase leading-none drop-shadow-md">
                  Reset Password
                </h2>
                <p className="text-white/60 leading-relaxed font-bold uppercase text-[10px] tracking-widest drop-shadow-lg">
                  {success ? 'Success! Redirecting you to sign in...' : 'Enter your new password below.'}
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-red-500/20 p-6 rounded-2xl border border-red-500/30 mb-10 animate-in zoom-in-95 relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5 relative z-10" size={20} />
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-snug relative z-10">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex items-start gap-3 bg-green-500/20 p-6 rounded-2xl border border-green-500/30 mb-10 animate-in zoom-in-95 relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5 relative z-10" size={20} />
                  <p className="text-[10px] font-black text-green-500 uppercase tracking-widest leading-snug relative z-10">Password reset successfully!</p>
                </div>
              )}

              {!success && oobCode && (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <PremiumInput 
                    icon={<Lock size={18} />} 
                    label="New Password" 
                    type="password" 
                    value={password} 
                    onChange={setPassword} 
                    placeholder="••••••••" 
                    required 
                  />
                  <PremiumInput 
                    icon={<Lock size={18} />} 
                    label="Confirm Password" 
                    type="password" 
                    value={confirmPassword} 
                    onChange={setConfirmPassword} 
                    placeholder="••••••••" 
                    required 
                  />
                  
                  {/* Password Requirements Indicator */}
                  <div className="grid grid-cols-2 gap-2 mt-2 px-1">
                    <RequirementItem met={passwordCriteria.length} label="8-4096 characters" />
                    <RequirementItem met={passwordCriteria.uppercase} label="Uppercase (A-Z)" />
                    <RequirementItem met={passwordCriteria.lowercase} label="Lowercase (a-z)" />
                    <RequirementItem met={passwordCriteria.number} label="Numeric (0-9)" />
                    <RequirementItem met={passwordCriteria.special} label="Special char (!@#$)" />
                  </div>

                  <Button type="submit" className="w-full h-16 text-xl mt-6 uppercase tracking-widest border border-white/20" disabled={busy || !isPasswordValid}>
                    {busy ? <span className="animate-pulse">RESETTING...</span> : 
                    <span className="flex items-center gap-3">RESET PASSWORD <ArrowRight size={24} /></span>}
                  </Button>
                </form>
              )}

              {!oobCode && (
                <Button onClick={() => navigate('/auth')} className="w-full h-16 text-xl mt-6 uppercase tracking-widest border border-white/20">
                  BACK TO SIGN IN
                </Button>
              )}

              <p className="mt-20 text-center text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">
                ExploreCapitals Security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RequirementItem: React.FC<{ met: boolean; label: string }> = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 transition-colors duration-300 ${met ? 'text-green-400' : 'text-white/20'}`}>
    <div className={`w-1 h-1 rounded-full ${met ? 'bg-green-400' : 'bg-white/20'}`} />
    <span className="text-[8px] font-black uppercase tracking-widest leading-none">{label}</span>
  </div>
);

const PremiumInput: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  required?: boolean;
}> = ({ label, value, onChange, icon, type = 'text', placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2.5">
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1 block">{label}</label>
      <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-sky transition-colors duration-300">
          {icon}
        </div>
        <input
          className={`w-full bg-white/5 border border-white/20 rounded-2xl pl-14 ${isPassword ? 'pr-12' : 'pr-5'} py-3.5 focus:ring-4 focus:ring-sky/10 focus:border-sky/40 outline-none transition-all duration-300 font-black text-[11px] text-white placeholder:text-white/10 tracking-wider shadow-inner`}
          value={value}
          type={inputType}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-sky transition-colors"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

