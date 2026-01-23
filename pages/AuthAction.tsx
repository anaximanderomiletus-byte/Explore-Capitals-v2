import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Compass, CheckCircle2, AlertCircle, ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';

const AuthAction: React.FC = () => {
  const { verifyEmailCode, confirmResetPassword, user: authUser } = useAuth();
  const { setPageLoading, setNavbarMode } = useLayout();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState<string | null>(null);
  const [oobCode, setOobCode] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Ref to prevent double-execution in React StrictMode
  const verificationStarted = useRef(false);
  
  // Password reset state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  useEffect(() => {
    setPageLoading(false);
    setNavbarMode('hero');
    
    const getParams = () => {
      // Check standard search params
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('oobCode')) return searchParams;

      // Check hash params (for HashRouter)
      const hash = window.location.hash;
      const hashSearchParams = new URLSearchParams(hash.split('?')[1] || '');
      if (hashSearchParams.get('oobCode')) return hashSearchParams;

      // Check full URL in case of strange redirects
      const fullUrlParams = new URLSearchParams(window.location.search);
      return fullUrlParams;
    };

    const params = getParams();
    const m = params.get('mode');
    const c = params.get('oobCode');
    
    setMode(m);
    setOobCode(c);

    if (!m || !c) {
      setStatus('error');
      setErrorMessage('Invalid action link. Please request a new one.');
      return;
    }

    if (m === 'verifyEmail' && !verificationStarted.current) {
      // If user is already verified and signed in, just show success
      if (authUser?.emailVerified) {
        setStatus('success');
        return;
      }
      verificationStarted.current = true;
      // Small delay to ensure Auth SDK is fully initialized
      setTimeout(() => handleVerifyEmail(c), 500);
    } else if (m === 'resetPassword') {
      setStatus('loading');
    } else if (m !== 'verifyEmail') {
      setStatus('error');
      setErrorMessage('Unsupported action mode.');
    }

    return () => setNavbarMode('default');
  }, [location]);

  const handleVerifyEmail = async (code: string) => {
    try {
      await verifyEmailCode(code);
      
      // If user is already signed in, reload their profile to reflect verification status
      if (authUser) {
        await authUser.reload();
      }
      
      setStatus('success');
      
      // Logical redirect: if signed in, go home/profile. If not, go to auth.
      const timer = setTimeout(() => {
        if (authUser) {
          navigate('/profile', { replace: true });
        } else {
          navigate('/auth', { replace: true });
        }
      }, 4000);
      
      return () => clearTimeout(timer);
    } catch (err: any) {
      console.error('Email verification error:', err);
      setStatus('error');
      setErrorMessage(err?.message ?? 'Failed to verify email. The link may be expired.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oobCode) return;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setBusy(true);
    setErrorMessage(null);
    try {
      await confirmResetPassword(oobCode, password);
      setStatus('success');
      setTimeout(() => navigate('/auth'), 3000);
    } catch (err: any) {
      setErrorMessage(err?.message ?? 'Failed to reset password.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-dark flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-sky/30 rounded-full blur-[150px] animate-pulse-slow opacity-80" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-sky/15 rounded-full blur-[120px] animate-pulse-slow opacity-50" />
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-[600px] bg-white/20 backdrop-blur-3xl rounded-[4rem] border-2 border-white/40 overflow-hidden relative">
          <div className="p-10 sm:p-16 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/30 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-white mb-10 border-2 border-white/40">
              <Compass size={14} className="animate-spin-slow text-sky-light" />
              <span>SECURITY PORTAL</span>
            </div>

            {status === 'loading' && mode === 'verifyEmail' && (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-sky/20 rounded-full flex items-center justify-center text-sky mx-auto animate-pulse">
                  <Mail size={40} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Verifying...</h2>
              </div>
            )}

            {status === 'loading' && mode === 'resetPassword' && (
              <form className="space-y-8 text-left" onSubmit={handleResetPassword}>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">New Password</h2>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-2">Enter your new secure password</p>
                </div>
                
                {errorMessage && (
                  <div className="bg-red-500/20 p-4 rounded-2xl border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest mb-6">
                    {errorMessage}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-sky transition-colors" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-2xl pl-14 pr-12 py-4 focus:border-sky/50 outline-none text-white font-black text-sm transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-sky transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Confirm</label>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-sky transition-colors" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-2xl pl-14 pr-12 py-4 focus:border-sky/50 outline-none text-white font-black text-sm transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Password Requirements Indicator */}
                <div className="grid grid-cols-2 gap-2 mt-4 px-1">
                  <RequirementItem met={passwordCriteria.length} label="8-4096 characters" />
                  <RequirementItem met={passwordCriteria.uppercase} label="Uppercase (A-Z)" />
                  <RequirementItem met={passwordCriteria.lowercase} label="Lowercase (a-z)" />
                  <RequirementItem met={passwordCriteria.number} label="Numeric (0-9)" />
                  <RequirementItem met={passwordCriteria.special} label="Special char (!@#$)" />
                </div>

                <Button type="submit" disabled={busy || !isPasswordValid} className="w-full h-16 mt-6 uppercase tracking-widest font-black">
                  {busy ? 'UPDATING...' : 'RESET PASSWORD'}
                </Button>
              </form>
            )}

            {status === 'success' && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mx-auto">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">SUCCESS!</h2>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-relaxed">
                  {mode === 'verifyEmail' ? 'YOUR EMAIL IS VERIFIED.' : 'PASSWORD RESET SUCCESSFUL.'}
                  <br />REDIRECTING TO SIGN IN...
                </p>
                <Button onClick={() => navigate('/auth')} className="w-full h-14 mt-4 uppercase tracking-widest font-black">SIGN IN NOW</Button>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mx-auto">
                  <AlertCircle size={48} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter">ERROR</h2>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest leading-relaxed max-w-[250px] mx-auto">
                  {errorMessage}
                </p>
                <Button onClick={() => navigate('/auth')} className="w-full h-14 mt-4 uppercase tracking-widest font-black">BACK TO SAFETY</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RequirementItem: React.FC<{ met: boolean; label: string }> = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 transition-colors duration-300 ${met ? 'text-green-400' : 'text-white/20'}`}>
    <div className={`w-1 h-1 rounded-full ${met ? 'bg-green-400' : 'bg-white/20'}`} />
    <span className="text-[8px] font-black uppercase tracking-widest leading-none text-left">{label}</span>
  </div>
);

export default AuthAction;

