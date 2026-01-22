import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Mail, Phone, ShieldCheck, User, Lock, ArrowRight, CheckCircle2, AlertCircle, Globe2, Compass, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/Button';
import PhoneInput from '../components/PhoneInput';
import { useAuth } from '../context/AuthContext';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase';
import { useLayout } from '../context/LayoutContext';

type Mode = 'signin' | 'signup' | 'forgotpassword';

const Auth: React.FC = () => {
  const { 
    signUpEmail, signInEmail, signInSms, confirmSmsLogin, 
    linkPhoneToUser, confirmLinkPhoneCode, resetPasswordEmail, 
    confirmResetPassword, user: authUser, 
    mfaResolver, solveMfaPhone, sendMfaSms, setMfaResolver,
    setConfirmationResult, reloadUser, sendVerifyEmail
  } = useAuth();
  const { setPageLoading, setNavbarMode } = useLayout();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mode, setMode] = useState<Mode>('signin');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mfaStep, setMfaStep] = useState<1 | 2>(1); // 1: choose/send, 2: verify
  const [mfaVerificationId, setMfaVerificationId] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  
  const [smsVerificationId, setSmsVerificationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showVerifySuccess, setShowVerifySuccess] = useState(false);
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
  
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (authUser) {
      const isVerified = authUser.emailVerified;

      // If fully verified, kick them out of auth page
      if (isVerified) {
        const from = (location.state as any)?.from?.pathname || '/';
        const target = from === '/auth' ? '/' : from;
        
        if (showVerifySuccess) {
          const timer = setTimeout(() => {
            navigate(target, { replace: true });
          }, 1500);
          return () => clearTimeout(timer);
        } else {
          navigate(target, { replace: true });
        }
        return;
      }

      // If signed in but NOT verified, ensure they are seeing the verification step
      if (mode !== 'signup' || step !== 2) {
        setMode('signup');
        setStep(2);
        setEmail(authUser.email || '');
      }
    }
  }, [authUser, navigate, location, mode, step, showVerifySuccess]);

  useEffect(() => {
    setPageLoading(false);
    setNavbarMode('hero');
    return () => setNavbarMode('default');
  }, [setPageLoading, setNavbarMode]);

  // Reset busy state when MFA resolver is cleared to prevent UI locks
  useEffect(() => {
    if (!mfaResolver) {
      setBusy(false);
    }
  }, [mfaResolver]);

  const ensureRecaptcha = useMemo(
    () => () => {
      if (verifierRef.current) return verifierRef.current;
      if (!recaptchaRef.current) return null;
      
      verifierRef.current = new RecaptchaVerifier(
        auth,
        recaptchaRef.current,
        { 
          'size': 'normal',
          'callback': () => {
            console.log('reCAPTCHA solved');
          },
          'expired-callback': () => {
            if (verifierRef.current) {
              verifierRef.current.clear();
              verifierRef.current = null;
            }
          }
        }
      );
      return verifierRef.current;
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (verifierRef.current) {
        verifierRef.current.clear();
        verifierRef.current = null;
      }
    };
  }, []);

  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom validation
    const errors: Record<string, boolean> = {
      name: !name,
      email: !email,
      password: !password,
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    if (!isPasswordValid) {
      setError('Password does not meet the security requirements.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await signUpEmail({ name, email, password });
      setStep(2); // Move to Email Verification screen
    } catch (err: any) {
      console.error('Sign up error:', err.code, err);
      if (err.code === 'auth/email-already-in-use') {
        // If account exists but they are clicking Sign Up again,
        // it's likely they are trying to "re-sign-up" because they aren't verified yet.
        // We try to sign them in with the password they just gave to see if it's theirs.
        try {
          await signInEmail(email, password);
          // If sign-in succeeds, we can just move them to the verification step
          // if they aren't verified yet.
          setStep(2);
          setError(null);
          return;
        } catch (signInErr: any) {
          // If sign-in fails, it means the account exists but the password is different,
          // so we show the standard "already in use" error.
          setError('An account with this email already exists. Try signing in instead.');
        }
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else if (err.code === 'auth/weak-password') {
        setError('The password is too weak. Please use a more complex password.');
      } else {
        setError(err?.message ?? 'Sign up failed');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleResendVerification = async () => {
    setBusy(true);
    setError(null);
    try {
      await sendVerifyEmail();
      setSuccess('Verification email sent! Check your inbox.');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to resend email');
    } finally {
      setBusy(false);
    }
  };

  const handleCheckVerification = async () => {
    setBusy(true);
    setError(null);
    try {
      await reloadUser();
      if (authUser?.emailVerified) {
        setShowVerifySuccess(true);
      } else {
        setError('Email not verified yet. Please click the link in your email.');
      }
    } catch (err: any) {
      setError('Failed to check status. Try again.');
    } finally {
      setBusy(false);
    }
  };

  const handleSendPhoneVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const verifier = ensureRecaptcha();
      if (!verifier) throw new Error('Security check failed to initialize');

      const vId = await linkPhoneToUser(phone, verifier);
      setSmsVerificationId(vId);
      setStep(3); // Move to SMS Code input step
    } catch (err: any) {
      console.error('Phone link error:', err.code, err);
      
      // Reset reCAPTCHA on error so user can try again
      if (verifierRef.current) {
        verifierRef.current.clear();
        verifierRef.current = null;
      }

      if (err?.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Please check the country code and number length.');
      } else if (err?.code === 'auth/too-many-requests') {
        setError('Too many SMS requests. Please wait a while before trying again.');
      } else if (err?.code === 'auth/captcha-check-failed') {
        setError('Security check failed. Please refresh and try again.');
      } else {
        setError(err?.message ?? 'Failed to send code');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmSignupSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsCode) {
      setFieldErrors({ signupCode: true });
      return;
    }
    if (!smsVerificationId) return;
    setBusy(true);
    setError(null);
    try {
      await confirmLinkPhoneCode(smsVerificationId, smsCode);
      setShowVerifySuccess(true);
      // Redirect will happen after a short delay via useEffect or state
    } catch (err: any) {
      console.error('Phone confirm error:', err.code, err);
      if (err?.code === 'auth/invalid-verification-code') {
        setError('Incorrect verification code. Please check your messages and try again.');
      } else if (err?.code === 'auth/code-expired') {
        setError('Verification code has expired. Please go back and request a new one.');
      } else {
        setError(err?.message ?? 'Invalid code');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setStep(1);
    setMfaStep(1);
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    setBusy(false);
    if (newMode === 'signin') setAuthMethod('email');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Custom validation
    const errors: Record<string, boolean> = {
      email: !email,
      password: !password,
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    setBusy(true);
    setError(null);
    try {
      await signInEmail(email, password);
      // Navigation will be handled by useEffect redirect
    } catch (err: any) {
      console.error('Sign in error:', err.code, err);
      
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again or reset your password.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please check your credentials and try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled. Please contact support.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later or reset your password.');
          break;
        default:
          setError(err?.message ?? 'Sign in failed. Please try again.');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleStartSmsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const verifier = ensureRecaptcha();
      if (!verifier) throw new Error('Security check failed');
      const vId = await signInSms(phone, verifier);
      setSmsVerificationId(vId);
      setStep(2); // In sign-in mode, step 2 is SMS code entry
    } catch (err: any) {
      console.error('SMS Sign-in error:', err.code, err);
      
      // Reset reCAPTCHA on error
      if (verifierRef.current) {
        verifierRef.current.clear();
        verifierRef.current = null;
      }

      if (err?.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format. Ensure you have the correct country selected.');
      } else if (err?.code === 'auth/user-not-found') {
        setError('No account found with this phone number. Please sign up first.');
      } else if (err?.code === 'auth/too-many-requests') {
        setError('Throttled: Too many attempts. Please try again later.');
      } else {
        setError(err?.message ?? 'Could not send verification code');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmSignInSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsVerificationId) return;
    setBusy(true);
    setError(null);
    try {
      await confirmSmsLogin(smsVerificationId, smsCode);
      // Navigation will be handled by useEffect redirect
    } catch (err: any) {
      console.error('SMS Sign-in confirm error:', err.code, err);
      if (err?.code === 'auth/invalid-verification-code') {
        setError('Incorrect verification code. Please check your messages and try again.');
      } else if (err?.code === 'auth/code-expired') {
        setError('Verification code has expired. Please request a new one.');
      } else {
        setError(err?.message ?? 'Invalid code');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleStartMfa = async () => {
    if (!mfaResolver) return;
    setBusy(true);
    setError(null);
    try {
      const hint = mfaResolver.hints[0];
      if (hint.factorId === 'phone') {
        const verifier = ensureRecaptcha();
        if (!verifier) throw new Error('Security check failed');
        const vId = await sendMfaSms(verifier);
        setMfaVerificationId(vId);
        setMfaStep(2);
      }
    } catch (err: any) {
      setError(err?.message ?? 'MFA initialization failed');
    } finally {
      setBusy(false);
    }
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsCode) {
      setFieldErrors({ mfaCode: true });
      return;
    }
    if (!mfaResolver) return;
    setBusy(true);
    setError(null);
    try {
      const hint = mfaResolver.hints[0];
      if (hint.factorId === 'phone') {
        if (!mfaVerificationId) throw new Error('No verification session');
        await solveMfaPhone(mfaVerificationId, smsCode);
      }
      setMfaResolver(null);
    } catch (err: any) {
      console.error('MFA verification error:', err);
      if (err.code === 'auth/invalid-verification-code') {
        setError('Incorrect code. Please try again.');
      } else {
        setError(err?.message ?? 'MFA verification failed');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setBusy(true);
    setError(null);
    setSuccess(null);
    try {
      await resetPasswordEmail(email);
      setSuccess('Reset code sent to your email.');
      setStep(2); // Move to code entry step
    } catch (err: any) {
      setError(err?.message ?? 'Failed to send reset link.');
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = { resetCode: !resetCode, password: !password };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    if (!resetCode || !password) {
      setError('Please enter both the code and your new password');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await confirmResetPassword(resetCode, password);
      setSuccess('Password updated successfully! You can now sign in.');
      handleModeChange('signin');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to reset password. The code might be invalid or expired.');
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.12] pointer-events-none">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Globe" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] object-contain animate-spin-slow" />
        </div>
      </div>

      <div className="relative z-10 flex-grow flex items-center justify-center px-4 pt-20 pb-8 sm:pt-32 sm:pb-12">
        <div className="w-full max-w-[1000px] grid lg:grid-cols-2 bg-white/20 backdrop-blur-3xl rounded-[3rem] shadow-[0_40px_100px_rgba(0,194,255,0.3)] border-2 border-white/40 overflow-hidden relative">
          <div className="absolute inset-0 bg-glossy-gradient opacity-30 pointer-events-none" />
          
          {/* Visual Content - Hidden on small screens */}
          <div className="hidden lg:flex bg-sky/10 flex-col justify-between p-10 relative overflow-hidden border-r-2 border-white/20 group">
            <div className="absolute inset-0 bg-aurora opacity-30 group-hover:opacity-40 transition-opacity pointer-events-none" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/30 backdrop-blur-3xl rounded-full text-[9px] font-black uppercase tracking-[0.4em] text-white mb-6 border-2 border-white/40 shadow-glow-sky relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                <Compass size={12} className="animate-spin-slow relative z-10 text-sky-light" />
                <span className="relative z-10 drop-shadow-md">MASTER THE MAP</span>
              </div>
            <h1 className="text-5xl font-display font-black text-white leading-tight tracking-tighter mb-4 uppercase drop-shadow-lg">
              Master the <br />
              <span className="bg-clip-text bg-gradient-to-b from-white via-sky-light to-sky drop-shadow-[0_0_20px_rgba(0,194,255,0.5)] [-webkit-text-fill-color:transparent]">Capitals.</span>
            </h1>
              <p className="text-[11px] text-white font-black uppercase tracking-[0.2em] max-w-xs leading-relaxed drop-shadow-lg opacity-90">
                Sign up to track your progress and earn rewards.
              </p>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-display font-black text-white tracking-tighter drop-shadow-md">195+</div>
                  <div className="text-[9px] text-white/50 uppercase font-black tracking-widest mt-0.5">Nations</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-black text-white tracking-tighter drop-shadow-md">50k+</div>
                  <div className="text-[9px] text-white/50 uppercase font-black tracking-widest mt-0.5">Explorers</div>
                </div>
              </div>
              
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-glass-bubble flex items-center gap-4 group hover:bg-white/15 transition-all relative overflow-hidden">
                <div className="absolute inset-0 bg-glossy-gradient opacity-30 pointer-events-none" />
                <div className="w-10 h-10 bg-gel-blue rounded-full flex items-center justify-center text-white shadow-glow-sky relative overflow-hidden shrink-0 border border-white/30">
                  <ShieldCheck size={24} className="relative z-10 drop-shadow-lg" />
                  <div className="absolute inset-0 bg-glossy-gradient opacity-50" />
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase tracking-tight drop-shadow-md">Secure Account</div>
                  <div className="text-[9px] text-white/60 font-black uppercase tracking-widest mt-0.5">Encrypted Progress</div>
                </div>
              </div>
            </div>

            {/* Background Decorative Logo */}
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Globe" className="absolute -bottom-16 -right-16 w-[450px] h-[450px] opacity-15 -rotate-12 pointer-events-none animate-spin-slow drop-shadow-[0_0_80px_rgba(0,194,255,0.7)]" />
          </div>

          {/* Form Content */}
          <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center bg-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
            <div className="max-w-md mx-auto w-full relative z-10">
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-display font-black text-white tracking-tighter mb-1.5 uppercase leading-none drop-shadow-md">
                  {mfaResolver 
                    ? (mfaStep === 1 ? 'Security Check' : 'Verify Identity')
                    : (mode === 'signup' 
                      ? (step === 1 ? 'SIGN UP' : step === 2 ? 'VERIFY PHONE' : 'CONFIRM CODE')
                      : mode === 'forgotpassword' 
                        ? (step === 1 ? 'RESET PASSWORD' : 'NEW PASSWORD')
                        : 'SIGN IN')}
                </h2>
                <p className="text-white/60 leading-relaxed font-bold uppercase text-[9px] tracking-widest drop-shadow-lg">
                  {mfaResolver 
                    ? (mfaStep === 1 
                        ? `Account protected with SMS (•••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}).`
                      : `Enter the code sent to •••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}.`)
                    : (mode === 'signup' && step === 1 && 'Create an account to start tracking progress.')}
                  {!mfaResolver && mode === 'signup' && step === 2 && 'Enter your phone number for verification.'}
                  {!mfaResolver && mode === 'signup' && step === 3 && `Verification code sent to ${phone}.`}
                  {!mfaResolver && mode === 'signin' && 'Sign in to access your stats.'}
                  {!mfaResolver && mode === 'forgotpassword' && step === 1 && 'Enter your email to receive a reset link.'}
                  {!mfaResolver && mode === 'forgotpassword' && step === 2 && 'Enter the code from your email to reset.'}
                </p>
              </div>

              {step === 1 && mode !== 'forgotpassword' && !mfaResolver && (
                <div className="space-y-6 mb-8">
                  <div className="flex bg-black/20 p-1 rounded-full border border-white/20 shadow-inner relative overflow-hidden">
                    <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                    <TabButton active={mode === 'signin'} layoutId="mode-toggle" onClick={() => handleModeChange('signin')}>SIGN IN</TabButton>
                    <TabButton active={mode === 'signup'} layoutId="mode-toggle" onClick={() => handleModeChange('signup')}>SIGN UP</TabButton>
                  </div>
                </div>
              )}

              {error && (
                <div className="flex items-start gap-3 bg-red-500/20 p-4 rounded-xl border border-red-500/30 mb-8 animate-in zoom-in-95 shadow-glass-bubble relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                  <AlertCircle className="text-red-500 shrink-0 mt-0.5 relative z-10" size={16} />
                  <p className="text-[9px] font-black text-red-500 uppercase tracking-widest leading-snug relative z-10">{error}</p>
                </div>
              )}

              {success && (
                <div className="flex items-start gap-3 bg-green-500/20 p-4 rounded-xl border border-green-500/30 mb-8 animate-in zoom-in-95 shadow-glass-bubble relative overflow-hidden">
                  <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5 relative z-10" size={16} />
                  <p className="text-[9px] font-black text-green-500 uppercase tracking-widest leading-snug relative z-10">{success}</p>
                </div>
              )}

              <div className="space-y-6">
                <AnimatePresence initial={false}>
                {mfaResolver ? (
                  <motion.div
                    key="mfa"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    {mfaStep === 1 ? (
                      <div className="space-y-6">
                        <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-glass-bubble text-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-glossy-gradient opacity-20 pointer-events-none" />
                          <ShieldCheck size={48} className="mx-auto text-sky-light mb-4 drop-shadow-glow-sky relative z-10" />
                          <p className="text-xs font-bold text-white uppercase tracking-widest mb-2 relative z-10">Two-Factor Authentication</p>
                          <p className="text-[10px] text-white/60 font-medium relative z-10">
                            Verify your identity via SMS sent to •••• {(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}.
                          </p>
                        </div>
                        
                        {/* Visible reCAPTCHA container for MFA */}
                        <div className="flex justify-center" ref={recaptchaRef} id="recaptcha-container-mfa" />

                        <Button onClick={handleStartMfa} disabled={busy} className="w-full h-14 shadow-glow-sky uppercase tracking-widest font-black">
                          {busy ? 'INITIALIZING...' : 'VERIFY VIA SMS'}
                        </Button>
                        <button onClick={() => { setMfaResolver(null); setBusy(false); setError(null); }} className="w-full text-[9px] font-black text-white/40 hover:text-sky uppercase tracking-[0.3em] py-2">Cancel</button>
                      </div>
                    ) : (
                      <form className="space-y-6" onSubmit={handleVerifyMfa} noValidate>
                        <PremiumInput 
                          icon={<CheckCircle2 size={18} />} 
                          label="Verification Code" 
                          value={smsCode} 
                          onChange={(v) => { setSmsCode(v); setFieldErrors({ ...fieldErrors, mfaCode: false }); }} 
                          placeholder="000 000" 
                          required 
                          error={fieldErrors.mfaCode}
                        />
                        <Button type="submit" disabled={busy} className="w-full h-14 shadow-glow-sky uppercase tracking-widest font-black">
                          {busy ? 'VERIFYING...' : 'VERIFY & SIGN IN'}
                        </Button>
                        <button onClick={() => { setMfaStep(1); setBusy(false); setError(null); }} className="w-full text-[9px] font-black text-white/40 hover:text-sky uppercase tracking-[0.3em] py-2">Go Back</button>
                      </form>
                    )}
                  </motion.div>
                ) : (
                  <>
                {mode === 'signup' && (
                  <motion.div
                    key={`signup-step-${step}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {step === 1 && (
                      <form className="space-y-4" onSubmit={handleSignUp} noValidate>
                        <PremiumInput icon={<User size={16} />} label="Name" value={name} onChange={(v) => { setName(v); setFieldErrors({ ...fieldErrors, name: false }); }} placeholder="Your Name" required error={fieldErrors.name} />
                        <PremiumInput icon={<Mail size={16} />} label="Email" type="email" value={email} onChange={(v) => { setEmail(v); setFieldErrors({ ...fieldErrors, email: false }); }} placeholder="Email" required error={fieldErrors.email} />
                        <PremiumInput icon={<Lock size={16} />} label="Password" type="password" value={password} onChange={(v) => { setPassword(v); setFieldErrors({ ...fieldErrors, password: false }); }} placeholder="••••••••" required error={fieldErrors.password} />
                        
                        {/* Password Requirements Indicator */}
                        <div className="grid grid-cols-2 gap-2 mt-2 px-1">
                          <RequirementItem met={passwordCriteria.length} label="8-4096 characters" />
                          <RequirementItem met={passwordCriteria.uppercase} label="Uppercase (A-Z)" />
                          <RequirementItem met={passwordCriteria.lowercase} label="Lowercase (a-z)" />
                          <RequirementItem met={passwordCriteria.number} label="Numeric (0-9)" />
                          <RequirementItem met={passwordCriteria.special} label="Special char (!@#$)" />
                        </div>

                        <Button type="submit" className="w-full h-14 text-lg mt-4 shadow-glow-sky uppercase tracking-widest border border-white/20" disabled={busy || !isPasswordValid}>
                          {busy ? <span className="animate-pulse text-sm">LOADING...</span> : 
                          <span className="flex items-center gap-2 text-sm">SIGN UP <ArrowRight size={20} /></span>}
                        </Button>
                      </form>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <AnimatePresence mode="wait">
                          {showVerifySuccess ? (
                            <motion.div
                              key="success"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                            >
                              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shadow-glow-accent border border-green-500/30">
                                <CheckCircle2 size={48} />
                              </div>
                              <h3 className="text-xl font-black text-white uppercase tracking-tighter">Verified</h3>
                              <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Completing registration...</p>
                            </motion.div>
                          ) : (
                            <motion.div key="input" className="space-y-6 text-center">
                              <div className="w-20 h-20 bg-sky/10 rounded-full flex items-center justify-center text-sky-light mx-auto border-2 border-white/20 shadow-glow-sky">
                                <Mail size={32} />
                              </div>
                              <div className="space-y-2">
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter">Check Your Email</h3>
                                <p className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-relaxed">
                                  We've sent a verification link to <br />
                                  <span className="text-white">{email}</span>
                                </p>
                              </div>

                              <div className="flex flex-col gap-3 pt-4">
                                <Button onClick={handleCheckVerification} disabled={busy} className="w-full h-14 shadow-glow-sky uppercase tracking-widest">
                                  {busy ? 'CHECKING...' : "I'VE VERIFIED MY EMAIL"}
                                </Button>
                                <button type="button" onClick={handleResendVerification} disabled={busy} className="w-full text-[9px] font-black text-white/40 hover:text-sky transition-all uppercase tracking-widest py-2">
                                  RESEND EMAIL
                                </button>
                                <button type="button" onClick={() => { setStep(1); setBusy(false); setError(null); }} className="w-full text-[9px] font-black text-white/40 hover:text-sky transition-all uppercase tracking-widest py-2">
                                  GO BACK
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                )}

                {mode === 'signin' && (
                  <motion.div
                    key="signin"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className="flex bg-black/20 p-1 rounded-full border border-white/20 shadow-inner relative overflow-hidden">
                      <div className="absolute inset-0 bg-glossy-gradient opacity-10 pointer-events-none" />
                      <TabButton 
                        active={authMethod === 'email'} 
                        layoutId="auth-method" 
                        onClick={() => { setAuthMethod('email'); setError(null); }}
                      >
                        Email
                      </TabButton>
                      <TabButton 
                        active={authMethod === 'phone'} 
                        layoutId="auth-method" 
                        onClick={() => { setAuthMethod('phone'); setError(null); }}
                      >
                        Phone
                      </TabButton>
                    </div>

                    <AnimatePresence>
                      <motion.div
                        key={authMethod}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {authMethod === 'email' ? (
                          <form className="space-y-4" onSubmit={handleSignIn} noValidate>
                            <PremiumInput icon={<Mail size={16} />} label="Email" type="email" value={email} onChange={(v) => { setEmail(v); setFieldErrors({ ...fieldErrors, email: false }); }} placeholder="Email" required error={fieldErrors.email} />
                            <PremiumInput icon={<Lock size={16} />} label="Password" type="password" value={password} onChange={(v) => { setPassword(v); setFieldErrors({ ...fieldErrors, password: false }); }} placeholder="••••••••" required error={fieldErrors.password} />
                            <div className="flex justify-end">
                              <button 
                                type="button" 
                                onClick={() => handleModeChange('forgotpassword')}
                                className="text-[9px] font-black text-sky hover:text-white uppercase tracking-widest transition-all"
                              >
                                FORGOT PASSWORD?
                              </button>
                            </div>
                            <Button type="submit" className="w-full h-14 text-lg mt-2 shadow-glow-sky uppercase tracking-widest border border-white/20" disabled={busy}>
                              {busy ? <span className="text-sm">SIGNING IN...</span> : <span className="text-sm">SIGN IN</span>}
                            </Button>
                          </form>
                        ) : (
                          <div className="space-y-4">
                            {step === 1 ? (
                              <form className="space-y-4" onSubmit={handleStartSmsSignIn} noValidate>
                                <PhoneInput label="Phone" value={phone} onChange={(v) => { setPhone(v); setFieldErrors({ ...fieldErrors, phone: false }); }} placeholder="Phone" required error={fieldErrors.phone} />
                                
                                {/* Visible reCAPTCHA container for Signin Phone Auth */}
                                <div className="flex justify-center py-2" ref={recaptchaRef} id="recaptcha-container-signin" />

                                <Button type="submit" className="w-full h-14 text-lg mt-4 shadow-glow-sky uppercase tracking-widest border border-white/20" disabled={busy}>
                                  {busy ? <span className="text-sm">SENDING...</span> : <span className="text-sm">SIGN IN</span>}
                                </Button>
                              </form>
                            ) : (
                              <form className="space-y-4" onSubmit={handleConfirmSignInSms} noValidate>
                                <PremiumInput icon={<CheckCircle2 size={16} />} label="Code" value={smsCode} onChange={(v) => { setSmsCode(v); setFieldErrors({ ...fieldErrors, signinCode: false }); }} placeholder="000 000" required error={fieldErrors.signinCode} />
                                <Button type="submit" className="w-full h-14 text-lg mt-4 shadow-glow-sky uppercase tracking-widest border border-white/20" disabled={busy}>
                                  {busy ? <span className="text-sm">VERIFYING...</span> : <span className="text-sm">SIGN IN</span>}
                                </Button>
                                <button type="button" onClick={() => { setStep(1); setBusy(false); setError(null); }} className="w-full text-[9px] font-black text-white/40 hover:text-sky transition-all uppercase tracking-widest py-3">
                                  CHANGE NUMBER
                                </button>
                              </form>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}

                {mode === 'forgotpassword' && (
                  <motion.div
                    key={`forgotpassword-step-${step}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="space-y-4"
                  >
                    {step === 1 ? (
                      <form className="space-y-4" onSubmit={handleForgotPassword} noValidate>
                        <PremiumInput icon={<Mail size={16} />} label="Email" type="email" value={email} onChange={(v) => { setEmail(v); setFieldErrors({ ...fieldErrors, email: false }); }} placeholder="Email" required error={fieldErrors.email} />
                        <Button type="submit" className="w-full h-14 text-lg mt-4 shadow-glow-sky uppercase tracking-widest border border-white/20" disabled={busy}>
                          {busy ? <span className="text-sm">SENDING...</span> : <span className="text-sm">SEND RESET LINK</span>}
                        </Button>
                        <button 
                          type="button" 
                          onClick={() => handleModeChange('signin')} 
                          className="w-full text-[9px] font-black text-white/40 hover:text-sky transition-all uppercase tracking-widest py-3"
                        >
                          BACK TO SIGN IN
                        </button>
                      </form>
                    ) : (
                      <form className="space-y-4" onSubmit={handleConfirmReset} noValidate>
                        <PremiumInput icon={<CheckCircle2 size={16} />} label="Reset Code" value={resetCode} onChange={(v) => { setResetCode(v); setFieldErrors({ ...fieldErrors, resetCode: false }); }} placeholder="Enter code from email" required error={fieldErrors.resetCode} />
                        <PremiumInput icon={<Lock size={16} />} label="New Password" type="password" value={password} onChange={(v) => { setPassword(v); setFieldErrors({ ...fieldErrors, password: false }); }} placeholder="••••••••" required error={fieldErrors.password} />
                        <Button type="submit" className="w-full h-14 text-lg mt-4 shadow-glow-sky uppercase tracking-widest border border-white/20" disabled={busy}>
                          {busy ? <span className="text-sm">UPDATING...</span> : <span className="text-sm">RESET PASSWORD</span>}
                        </Button>
                        <button 
                          type="button" 
                          onClick={() => { setStep(1); setBusy(false); setError(null); setSuccess(null); }} 
                          className="w-full text-[9px] font-black text-white/40 hover:text-sky transition-all uppercase tracking-widest py-3"
                        >
                          RESEND CODE
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
                  </>
                )}
                </AnimatePresence>
              </div>

              <div ref={recaptchaRef} id="recaptcha-container" />
              
              <p className="mt-12 text-center text-[9px] text-white/30 font-bold uppercase tracking-[0.3em]">
                By signing in, you agree to our <span className="text-sky hover:underline cursor-pointer">Terms of Service</span>.
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
    <div className={`w-1 h-1 rounded-full ${met ? 'bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'bg-white/20'}`} />
    <span className="text-[8px] font-black uppercase tracking-widest leading-none">{label}</span>
  </div>
);

  const TabButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode; layoutId: string; className?: string }> = ({ active, onClick, children, layoutId, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-colors duration-300 relative z-10 ${
      active ? 'text-sky' : 'text-white/40 hover:text-white'
    } ${className}`}
  >
    <span className="relative z-10">{children}</span>
    {active && (
      <motion.div
        layoutId={layoutId}
        className="absolute inset-0 bg-white rounded-full shadow-glow-sky overflow-hidden"
        transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-glossy-gradient opacity-40 pointer-events-none" />
      </motion.div>
    )}
  </button>
);

const PremiumInput: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  icon: React.ReactNode;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: boolean;
}> = ({ label, value, onChange, icon, type = 'text', placeholder, required, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2.5">
      <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 ml-1 block">{label}</label>
      <div className="relative group">
        <div className={`absolute left-5 top-1/2 -translate-y-1/2 ${error ? 'text-red-500' : 'text-white/30 group-focus-within:text-sky'} transition-colors duration-300`}>
          {icon}
        </div>
        <input
          className={`w-full bg-white/5 border ${error ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/20'} rounded-2xl pl-14 ${isPassword ? 'pr-12' : 'pr-5'} py-3.5 focus:ring-4 ${error ? 'focus:ring-red-500/10 focus:border-red-500' : 'focus:ring-sky/10 focus:border-sky/40'} outline-none transition-all duration-300 font-black text-[11px] text-white placeholder:text-white/10 tracking-wider shadow-inner`}
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
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500/50 hover:text-red-500' : 'text-white/30 hover:text-sky'} transition-colors`}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        
        {/* Visual Error Underline */}
        <div className={`absolute bottom-0 left-6 right-6 h-0.5 rounded-full transition-all duration-500 ${error ? 'bg-red-500 opacity-100 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : 'bg-transparent opacity-0'}`} />
      </div>
    </div>
  );
};

export default Auth;
