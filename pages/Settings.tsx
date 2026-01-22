import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  CheckCircle2, Mail, ShieldCheck, User, 
  AlertCircle, ShieldAlert, History,
  Eye, EyeOff, LogOut, ArrowLeft,
  Smartphone, Monitor, Camera,
  Lock, Key
} from 'lucide-react';
import Button from '../components/Button';
import PhoneInput from '../components/PhoneInput';
import ConfirmationModal from '../components/ConfirmationModal';
import { useLayout } from '../context/LayoutContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AVATAR_PRESETS, getAvatarById } from '../constants/avatars';
import { motion, AnimatePresence } from 'framer-motion';

const RequirementItem: React.FC<{ met: boolean; label: string }> = ({ met, label }) => (
  <div className={`flex items-center gap-1.5 transition-colors duration-300 ${met ? 'text-accent' : 'text-white/10'}`}>
    <div className={`w-1 h-1 rounded-full ${met ? 'bg-accent shadow-[0_0_5px_rgba(52,199,89,0.5)]' : 'bg-white/10'}`} />
    <span className="text-[8px] font-bold uppercase tracking-widest leading-none">{label}</span>
  </div>
);

const LabeledInput: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
}> = ({ label, value, onChange, type = 'text', placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2.5 w-full">
      <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/20 ml-1 block">{label}</label>
      <div className="relative group">
        <input
          className={`w-full bg-white/[0.03] border ${error ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-white/10'} rounded-2xl ${isPassword ? 'pl-5 pr-12' : 'px-5'} py-4 text-sm font-medium text-white placeholder:text-white/10 outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all shadow-inner group-hover:border-white/20`}
          value={value}
          type={inputType}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${error ? 'text-red-500/50 hover:text-red-500' : 'text-white/20 hover:text-white'} transition-colors`}
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

const Settings: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { user: userProfile, isLoading: userLoading } = useUser();
  const { 
    user, updateProfileInfo, changePassword, sendVerifyEmail, 
    enrollPhoneMfa, confirmPhoneMfa, enrolledFactors, disableMfaFactor,
    reloadUser,
    reauthenticate, deleteAccount, signOut, loading: authLoading,
    mfaResolver, solveMfaPhone, sendMfaSms, setMfaResolver
  } = useAuth();
  const navigate = useNavigate();

  const currentDeviceInfo = useMemo(() => {
    const ua = navigator.userAgent;
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    if (ua.includes("Chrome")) browser = "Google Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edge")) browser = "Microsoft Edge";

    if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Win")) os = "Windows";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";

    return { browser, os, isMobile: /Mobi|Android/i.test(ua) };
  }, []);

  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showVerifySuccess, setShowVerifySuccess] = useState(false);

  // Sync display fields when user data arrives
  useEffect(() => {
    if (user) {
      if (!displayName) setDisplayName(user.displayName ?? '');
      if (!phone) setPhone(user.phoneNumber ?? '');
    }
  }, [user]);

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
  
  const [smsVerificationId, setSmsVerificationId] = useState<string | null>(null);
  
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    setPageLoading(false);
    return () => {
      if (verifierRef.current) {
        verifierRef.current.clear();
        verifierRef.current = null;
      }
    };
  }, [setPageLoading]);

  const ensureRecaptcha = useMemo(
    () => () => {
      if (!auth) return null;
      if (verifierRef.current) {
        try {
          verifierRef.current.clear();
        } catch (e) {}
        verifierRef.current = null;
      }
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

  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [phoneModalStep, setPhoneModalStep] = useState<1 | 2>(1);
  const [mfaPassword, setMfaPassword] = useState('');
  const [showMfaPassword, setShowMfaPassword] = useState(false);
  const [mfaChallengeStep, setMfaChallengeStep] = useState<1 | 2>(1); // 1: password, 2: mfa code
  const [reauthVerificationId, setReauthVerificationId] = useState<string | null>(null);

  // Auto-clear error when user starts typing or changes state
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleVerifyReauthMfa = async (code: string) => {
    setBusy(true);
    setError(null);
    try {
      const hint = mfaResolver!.hints[0];
      if (hint.factorId === 'phone') {
        if (!reauthVerificationId) throw new Error('No verification session');
        await solveMfaPhone(reauthVerificationId, code);
      }
      
      // Successfully re-authenticated with MFA!
      // Now retry the original operation based on which modal is open
      if (showPhoneModal) {
        handleStartPhone();
      } else if (showDeleteModal) {
        handleDeleteAccount();
      } else if (showDisableMfaModal) {
        handleDisableFactor(showDisableMfaModal);
      }
      
      setMfaChallengeStep(1);
      setReauthVerificationId(null);
    } catch (err: any) {
      console.error('MFA challenge error:', err);
      setError(err?.message ?? 'Verification failed');
    } finally {
      setBusy(false);
    }
  };

  const handleStartReauthMfa = async () => {
    setBusy(true);
    setError(null);
    try {
      const verifier = ensureRecaptcha();
      if (!verifier) throw new Error('Security check failed');
      const vId = await sendMfaSms(verifier);
      setReauthVerificationId(vId);
      setMfaChallengeStep(2);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to send SMS code');
    } finally {
      setBusy(false);
    }
  };

  const clearMessages = () => {
    setStatus(null);
    setError(null);
  };

  const handleProfileSave = async () => {
    if (!displayName) {
      setFieldErrors({ displayName: true });
      return;
    }
    setBusy(true);
    clearMessages();
    try {
      await updateProfileInfo({ displayName });
      setStatus('Profile updated.');
    } catch (err: any) {
      setError(err?.message ?? 'Update failed');
    } finally {
      setBusy(false);
    }
  };

  const handleAvatarSelect = async (avatarId: string) => {
    setBusy(true);
    clearMessages();
    try {
      await updateProfileInfo({ photoURL: avatarId }); 
      setStatus('Avatar updated.');
    } catch (err: any) {
      setError('Failed to update avatar.');
    } finally {
      setBusy(false);
    }
  };

  const handlePasswordChange = async () => {
    const errors = { oldPassword: !oldPassword, password: !password, confirmPassword: !confirmPassword };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!isPasswordValid) {
      setError('Password does not meet security requirements.');
      return;
    }
    setBusy(true);
    clearMessages();
    try {
      await changePassword(oldPassword, password);
      setStatus('Password updated.');
      setPassword('');
      setOldPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to change password.');
    } finally {
      setBusy(false);
    }
  };

  const handleSendVerifyEmail = async () => {
    setBusy(true);
    clearMessages();
    try {
      await sendVerifyEmail();
      setStatus('Verification email sent.');
      // Using status indicator instead of window.alert
    } catch (err: any) {
      setError(err?.message ?? 'Failed to send email');
    } finally {
      setBusy(false);
    }
  };

  const handleStartPhone = async () => {
    if (!phone) {
      setFieldErrors({ phone: true });
      return;
    }
    setBusy(true);
    clearMessages();
    try {
      // Re-authenticate first for sensitive MFA operation
      try {
        if (!mfaPassword) {
          setError('Please enter your password to confirm identity.');
          setFieldErrors({ mfaPassword: true });
          setBusy(false);
          return;
        }
        await reauthenticate(mfaPassword);
      } catch (authErr: any) {
        if (authErr.code === 'auth/multi-factor-auth-required') {
          // Keep modal open, but show MFA challenge UI
            setMfaChallengeStep(1); // Password confirmed, now start SMS
          setBusy(false);
          return;
        }
        if (authErr.code === 'auth/wrong-password' || authErr.code === 'auth/invalid-credential') {
          setError('Incorrect password. Please try again.');
          setFieldErrors({ mfaPassword: true });
        } else if (authErr.code === 'auth/too-many-requests') {
          setError('Too many failed attempts. Please try again later.');
        } else {
          setError(`Security verification failed: ${authErr.message}`);
        }
        setBusy(false);
        return;
      }

      const verifier = ensureRecaptcha();
      if (!verifier) throw new Error('Security check initialization failed. Please refresh.');
      
      const vId = await enrollPhoneMfa(phone, verifier);
      setSmsVerificationId(vId);
      setPhoneModalStep(2);
      setStatus('Code sent.');
      setMfaPassword(''); // Clear password after success
    } catch (err: any) {
      console.error('Phone start error:', err.code, err);
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Include country code (e.g. +1).');
      } else if (err.code === 'auth/quota-exceeded') {
        setError('SMS quota exceeded. Please try again later or use a test number.');
      } else {
        setError(err?.message ?? 'Failed to send code. Please try again.');
      }
      
      if (verifierRef.current) {
        try {
          verifierRef.current.clear();
        } catch (e) {}
        verifierRef.current = null;
      }
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmPhone = async () => {
    if (!smsCode) {
      setFieldErrors({ smsCode: true });
      return;
    }
    if (!smsVerificationId) return;
    setBusy(true);
    clearMessages();
    try {
      await confirmPhoneMfa(smsVerificationId, smsCode);
      setStatus('2FA enabled.');
      setSmsVerificationId(null);
      setSmsCode('');
      
      // Briefly show success state in modal before closing
      setPhoneModalStep(2); // Ensure we are on verification step
      setShowVerifySuccess(true);
      
      setTimeout(() => {
        setShowPhoneModal(false);
        setShowVerifySuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error('Phone confirmation error:', err.code, err);
      if (err?.code === 'auth/invalid-verification-code') {
        setError('Incorrect code. Please try again.');
      } else if (err?.code === 'auth/code-expired') {
        setError('Code expired. Please request a new one.');
      } else {
      setError(err?.message ?? 'Invalid code');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleReloadUser = async () => {
    setBusy(true);
    try {
      await reloadUser();
      setStatus('Status refreshed.');
    } catch (err: any) {
      setError('Failed to refresh status.');
    } finally {
      setBusy(false);
    }
  };

  const handleDisableFactor = async (uid: string) => {
    setBusy(true);
    clearMessages();
    try {
      // Re-authenticate first
      try {
        if (!mfaPassword) {
          setError('Please enter your password to confirm identity.');
          setFieldErrors({ mfaPassword: true });
          setBusy(false);
          return;
        }
        await reauthenticate(mfaPassword);
      } catch (authErr: any) {
        if (authErr.code === 'auth/multi-factor-auth-required') {
            setMfaChallengeStep(1);
          setBusy(false);
          return;
        }
        throw authErr;
      }

      await disableMfaFactor(uid);
      setStatus('2FA disabled.');
      setShowDisableMfaModal(null);
      setMfaPassword('');
    } catch (err: any) {
      console.error('MFA disable error:', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Incorrect password. Please try again.');
        setFieldErrors({ mfaPassword: true });
      } else {
      setError(err?.message ?? 'Failed to disable');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
      try {
        await signOut();
        navigate('/auth');
      } catch (err) {
        console.error('Logout failed', err);
    } finally {
      setBusy(false);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showDisableMfaModal, setShowDisableMfaModal] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
      setBusy(true);
    setDeleteError(null);
    try {
      // Step 1: Re-authenticate
      try {
        if (!deletePassword) {
          setDeleteError('Please enter your password to confirm.');
          setFieldErrors({ deletePassword: true });
          setBusy(false);
          return;
        }
        await reauthenticate(deletePassword);
      } catch (authErr: any) {
        if (authErr.code === 'auth/multi-factor-auth-required') {
            setMfaChallengeStep(1);
          setBusy(false);
          return;
        }
        throw authErr;
      }

      // Step 2: Delete
        await deleteAccount();
        navigate('/auth');
      } catch (err: any) {
      console.error('Deletion failed:', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setDeleteError('Incorrect password. Please try again.');
        setFieldErrors({ deletePassword: true });
      } else {
        setDeleteError(err?.message ?? 'Deletion failed. Please try again later.');
      }
      } finally {
        setBusy(false);
    }
  };

  const renderAvatarContent = (photoURL: string | null, initials: string) => {
    const avatar = getAvatarById(photoURL);
    if (avatar) {
      return (
        <div className={`w-20 h-20 rounded-full ${avatar.color} text-white flex items-center justify-center shadow-md ring-2 ring-white/10`}>
          {React.cloneElement(avatar.icon as React.ReactElement, { size: 40 })}
        </div>
      );
    }
    return (
      <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-3xl shadow-md ring-2 ring-white/10">
        {initials}
      </div>
    );
  };

  // Show spinner only if we don't have any auth data yet or if an operation is in progress without a user
  if ((authLoading || userLoading) && !user) {
    return (
      <div className="pt-32 pb-16 px-6 bg-surface-dark min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-lg shadow-primary/10" />
      </div>
    );
  }

  // If busy and we HAVE a user, the page content will show the busy state via buttons/inputs
  // No need to block the whole page with a spinner once the user object is present.

  if (!user) {
    return (
      <div className="pt-32 pb-16 px-6 bg-surface-dark min-h-screen flex items-center justify-center">
        <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-3xl shadow-glass border border-white/10 max-w-md text-center">
          <ShieldAlert size={48} className="mx-auto text-primary mb-6" />
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">SIGN IN REQUIRED</h2>
          <p className="text-white/40 mt-3 mb-8 text-sm">You must be logged in to view your settings.</p>
          <button onClick={() => navigate('/auth')} className="w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest hover:bg-primary-light transition-all">
            GO TO SIGN IN
          </button>
        </div>
      </div>
    );
  }

  const initials = user.displayName?.[0] || 'E';

  return (
    <div className="pt-24 pb-20 px-4 bg-surface-dark min-h-screen font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Simple Sticky Header */}
        <div className="flex items-center justify-between sticky top-0 z-20 bg-surface-dark/90 backdrop-blur-md py-6 -mx-4 px-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/profile')} 
              className="p-1 -ml-1 text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold text-white">Settings</h1>
          </div>
          
          <AnimatePresence>
            {(status || error) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm ${error ? 'bg-red-500 text-white' : 'bg-accent text-white'}`}
              >
                {error ?? status}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 1. Account Section */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/20 ml-1">Account Profile</label>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-sm">
            {/* Avatar picker nested inside account section for simplicity */}
            <div className="p-6 border-b border-white/5 flex items-center gap-6">
              <div className="relative shrink-0">
                {renderAvatarContent(user.photoURL, initials)}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-surface-dark border border-white/10 rounded-full flex items-center justify-center text-white/40 shadow-md">
                  <Camera size={14} />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-2">Change Avatar</span>
                <div className="flex flex-wrap gap-2">
                  {AVATAR_PRESETS.slice(0, 8).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleAvatarSelect(p.id)}
                      className={`w-8 h-8 rounded-lg ${p.color} flex items-center justify-center transition-all border ${user.photoURL === p.id ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-transparent opacity-30 hover:opacity-100'}`}
                    >
                      {React.cloneElement(p.icon as React.ReactElement, { size: 12 })}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <LabeledInput 
                label="Display Name" 
                value={displayName} 
                onChange={(v) => { setDisplayName(v); setFieldErrors({ ...fieldErrors, displayName: false }); }} 
                placeholder="Enter display name" 
                error={fieldErrors.displayName}
              />
              
              <div className="flex items-center justify-between py-2 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Email Address</span>
                  <span className="text-sm text-white/60">{user.email}</span>
                </div>
              </div>

              <Button 
                onClick={handleProfileSave} 
                disabled={busy || displayName === user?.displayName} 
                variant="primary" 
                className="w-full h-12 text-[11px] font-bold uppercase tracking-widest"
              >
                SAVE CHANGES
              </Button>
            </div>
          </div>
        </div>

        {/* 2. Security Section */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/20 ml-1">Login & Security</label>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-sm divide-y divide-white/5">
            {/* Email Verification */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Email Verification</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${user.emailVerified ? 'text-accent' : 'text-red-400'}`}>
                    {user.emailVerified ? 'Verified' : 'Action Required'}
                  </div>
                </div>
              </div>
              {!user.emailVerified ? (
                <div className="flex items-center gap-2">
                  <button onClick={handleReloadUser} className="p-2 text-white/20 hover:text-white transition-colors" title="Refresh status">
                    <History size={16} />
                  </button>
                <button onClick={handleSendVerifyEmail} className="px-4 py-2 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg border border-primary/20 hover:bg-primary/20 transition-all">Verify Now</button>
                </div>
              ) : null}
            </div>

            {/* 2FA Section */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
                    <ShieldCheck size={20} />
                    </div>
                    <div className="text-sm font-bold text-white">Two-Factor Authentication</div>
                  </div>
                {!user.emailVerified && (
                  <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-[9px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle size={12} />
                    Verify Email to Enable
                    </div>
                  )}
                </div>

              {user.emailVerified ? (
                <div className="space-y-8">
                  {/* Phone MFA */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone size={18} className="text-white/30" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Phone SMS</span>
                      </div>
                      {enrolledFactors.some(f => f.factorId === 'phone') && (
                        <div className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded-md text-[8px] font-black text-accent uppercase tracking-widest">
                          Enabled
                    </div>
                      )}
                  </div>

                    {!enrolledFactors.some(f => f.factorId === 'phone') ? (
                            <Button 
                        variant="secondary" 
                        onClick={() => { setShowPhoneModal(true); setPhoneModalStep(1); }}
                        disabled={busy}
                        className="w-full h-12 text-[10px] font-black uppercase tracking-widest"
                      >
                        SETUP PHONE SMS
                            </Button>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-2xl border border-white/5 group">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Linked Device</span>
                          <span className="text-xs font-medium text-white/80">{enrolledFactors.find(f => f.factorId === 'phone')?.phone}</span>
                          </div>
                        <button 
                          onClick={() => setShowDisableMfaModal(enrolledFactors.find(f => f.factorId === 'phone')!.uid)} 
                          className="text-[10px] font-bold text-red-500/40 hover:text-red-500 uppercase tracking-widest transition-all hover:bg-red-500/10 px-3 py-1.5 rounded-lg border border-transparent hover:border-red-500/20"
                        >
                          DISABLE
                        </button>
                        </div>
                    )}
                  </div>
              </div>
              ) : (
                <div className="p-8 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl text-center space-y-4">
                  <Mail size={32} className="mx-auto text-white/10" />
                  <p className="text-[10px] text-white/30 font-medium leading-relaxed max-w-[200px] mx-auto uppercase tracking-widest">
                    Your email address must be verified before you can enable two-factor authentication.
                  </p>
              </div>
            )}
            </div>

            {/* Password Management */}
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
                    <Key size={20} />
                  </div>
                  <div className="text-sm font-bold text-white">Update Password</div>
                </div>
                <div className="space-y-4">
                <LabeledInput label="Current Password" type="password" value={oldPassword} onChange={(v) => { setOldPassword(v); setFieldErrors({ ...fieldErrors, oldPassword: false }); }} error={fieldErrors.oldPassword} />
                  <div className="grid grid-cols-2 gap-4">
                  <LabeledInput label="New Password" type="password" value={password} onChange={(v) => { setPassword(v); setFieldErrors({ ...fieldErrors, password: false }); }} error={fieldErrors.password} />
                  <LabeledInput label="Confirm New" type="password" value={confirmPassword} onChange={(v) => { setConfirmPassword(v); setFieldErrors({ ...fieldErrors, confirmPassword: false }); }} error={fieldErrors.confirmPassword} />
                  </div>
                
                {/* Password Requirements Indicator */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 px-1">
                  <RequirementItem met={passwordCriteria.length} label="8-4096 chars" />
                  <RequirementItem met={passwordCriteria.uppercase} label="Uppercase" />
                  <RequirementItem met={passwordCriteria.lowercase} label="Lowercase" />
                  <RequirementItem met={passwordCriteria.number} label="Numeric" />
                  <RequirementItem met={passwordCriteria.special} label="Special char" />
                </div>

                  <div className="flex justify-end">
                  <Button onClick={handlePasswordChange} disabled={busy || !password || !oldPassword || !isPasswordValid} variant="secondary" className="w-full sm:w-auto px-12 h-12 text-[11px] font-black uppercase tracking-widest shadow-sm">
                    UPDATE PASSWORD
                    </Button>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* 3. Session Section */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/20 ml-1">Session & History</label>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden shadow-sm divide-y divide-white/5">
            <div className="p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-surface-dark flex items-center justify-center text-primary border border-white/10">
                {currentDeviceInfo.isMobile ? <Smartphone size={24} /> : <Monitor size={24} />}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{currentDeviceInfo.os} • {currentDeviceInfo.browser}</div>
                <div className="text-[10px] text-accent font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  Active Session
                </div>
              </div>
            </div>
            
            <div className="p-6 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Joined Date</div>
                <div className="text-sm font-medium text-white/60">{user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : '—'}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Last Logged In</div>
                <div className="text-sm font-medium text-white/60">{user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : '—'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Action Section */}
        <div className="pt-6 space-y-4">
          <button 
            onClick={() => setShowSignOutModal(true)}
            className="w-full py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] text-red-500/80 transition-all flex items-center justify-center gap-3 group shadow-sm shadow-red-500/5"
          >
            <LogOut size={16} className="text-red-500/40 group-hover:text-red-500 transition-colors" />
            SIGN OUT
          </button>
          
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="w-full py-4 bg-red-500/5 hover:bg-red-500/10 border border-red-500/20 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] text-red-500/80 transition-all flex items-center justify-center gap-3 group shadow-sm shadow-red-500/5"
          >
            <ShieldAlert size={16} className="text-red-500/40 group-hover:text-red-500 transition-colors" />
            DELETE ACCOUNT
          </button>
        </div>
        </div>
        
      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !busy && setShowDeleteModal(false)}
              className="absolute inset-0 bg-surface-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                    <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Delete Account?</h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">This action is permanent</p>
                  </div>
                </div>

                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl text-[11px] text-red-400/80 leading-relaxed font-medium">
                  All your progress, achievements, loyalty points, and personal data will be permanently erased from our systems. This cannot be undone.
                </div>

                <div className="space-y-3">
                  <LabeledInput 
                    label="Confirm Password" 
                    type="password" 
                    value={deletePassword} 
                    onChange={(v) => { setDeletePassword(v); setDeleteError(null); setFieldErrors({ ...fieldErrors, deletePassword: false }); }} 
                    placeholder="Enter your password"
                    error={fieldErrors.deletePassword}
                  />
                  {deleteError && (
                    <div className="px-1 text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle size={12} />
                      {deleteError}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  {mfaResolver ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-sky/5 border border-sky/10 rounded-2xl text-[11px] text-sky-light/70 leading-relaxed font-medium text-center">
                        {mfaChallengeStep === 1 
                          ? `Security verification: verify your identity via SMS (•••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}) before deleting.` 
                          : `Enter the 6-digit code sent to your phone (•••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}).`}
                      </div>
                      
                      {mfaChallengeStep === 1 ? (
                        <Button 
                          variant="primary" 
                          onClick={handleStartReauthMfa}
                          disabled={busy}
                          className="w-full h-14 bg-red-500 hover:bg-red-600 border-none text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/20"
                        >
                          {busy ? 'SENDING...' : 'SEND CODE'}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <input 
                            className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center text-2xl font-black tracking-[0.5em] text-white outline-none focus:border-red-500/50 transition-all shadow-inner`} 
                            value={deletePassword} 
                            onChange={(e) => { 
                              const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setDeletePassword(val);
                              if (val.length === 6) handleVerifyReauthMfa(val);
                            }} 
                            placeholder="000000" 
                            autoFocus
                          />
                          <Button 
                            variant="primary" 
                            onClick={() => handleVerifyReauthMfa(deletePassword)}
                            disabled={busy || deletePassword.length < 6}
                            className="w-full h-14 bg-red-500 hover:bg-red-600 border-none text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/20"
                          >
                            {busy ? 'VERIFYING...' : 'VERIFY & DELETE'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Button 
                        variant="primary" 
            onClick={handleDeleteAccount}
                        disabled={busy}
                        className="w-full h-14 bg-red-500 hover:bg-red-600 border-none text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/20"
                      >
                        {busy ? 'PROCESSING...' : 'PERMANENTLY DELETE'}
                      </Button>
                    </>
                  )}
                  <button 
                    onClick={() => {
                      if (!busy) {
                        setShowDeleteModal(false);
                        setMfaResolver(null);
                        setMfaChallengeStep(1);
                        setReauthVerificationId(null);
                      }
                    }}
                    disabled={busy}
                    className="w-full py-4 text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Cancel
          </button>
        </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Phone Verification Modal */}
      <AnimatePresence>
        {showPhoneModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !busy && setShowPhoneModal(false)}
              className="absolute inset-0 bg-surface-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Smartphone size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {phoneModalStep === 1 ? 'Setup Phone SMS' : 'Verify Phone'}
                    </h2>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold mt-1">
                      {phoneModalStep === 1 ? 'Enter your mobile number' : 'Check your messages'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {showVerifySuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 space-y-4"
                    >
                      <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto border-2 border-accent/30 shadow-glow-accent">
                        <CheckCircle2 size={48} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Verified</h3>
                        <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">Phone protection active</p>
                      </div>
                    </motion.div>
                  ) : mfaResolver ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-sky/5 border border-sky/10 rounded-2xl text-[11px] text-sky-light/70 leading-relaxed font-medium text-center">
                        {mfaChallengeStep === 1 
                          ? `To proceed, verify your identity via SMS (•••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}).` 
                          : `Enter the 6-digit code sent to your phone (•••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}).`}
                      </div>
                      
                      {mfaChallengeStep === 1 ? (
                        <Button 
                          variant="primary" 
                          onClick={handleStartReauthMfa}
                          disabled={busy}
                          className="w-full h-14 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 mt-2"
                        >
                          {busy ? 'SENDING...' : 'SEND CODE'}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <input 
                            className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center text-2xl font-black tracking-[0.5em] text-white outline-none focus:border-primary/50 transition-all shadow-inner`} 
                            value={smsCode} 
                            onChange={(e) => { 
                              const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setSmsCode(val);
                              if (val.length === 6) handleVerifyReauthMfa(val);
                            }} 
                            placeholder="000000" 
                            autoFocus
                          />
                          <Button 
                            variant="primary" 
                            onClick={() => handleVerifyReauthMfa(smsCode)}
                            disabled={busy || smsCode.length < 6}
                            className="w-full h-14 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 mt-2"
                          >
                            {busy ? 'VERIFYING...' : 'VERIFY IDENTITY'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : phoneModalStep === 1 ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-sky/5 border border-sky/10 rounded-2xl text-[11px] text-sky-light/70 leading-relaxed font-medium">
                        Enter your mobile number to receive a verification code. This number will be used for secure logins.
                      </div>
                      <div className="text-left">
                        <PhoneInput 
                          value={phone} 
                          onChange={setPhone} 
                          placeholder="000-000-0000" 
                          error={fieldErrors.phone}
                        />
                      </div>

                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1 block">Account Password</label>
                        <div className="relative">
                          <input 
                            type={showMfaPassword ? "text" : "password"}
                            className={`w-full bg-white/5 border ${fieldErrors.mfaPassword ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-2xl px-5 py-4 text-white outline-none focus:border-primary/50 transition-all font-black text-sm pr-20`} 
                            value={mfaPassword} 
                            onChange={(e) => { setMfaPassword(e.target.value); setFieldErrors({ ...fieldErrors, mfaPassword: false }); }} 
                            placeholder="••••••••" 
                          />
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => setShowMfaPassword(!showMfaPassword)}
                              className="text-white/20 hover:text-white transition-colors"
                            >
                              {showMfaPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            <Lock className="text-white/20" size={18} />
                          </div>
                        </div>
                        <p className="text-[8px] text-white/30 uppercase font-black tracking-widest ml-1 italic">Required for security confirmation</p>
                      </div>

                      <div className="flex justify-center py-2">
        <div ref={recaptchaRef} id="recaptcha-settings-container" />
      </div>
                      
                      <Button 
                        variant="primary" 
                        onClick={handleStartPhone}
                        disabled={busy || !phone}
                        className="w-full h-14 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 mt-2"
                      >
                        {busy ? 'SENDING...' : 'CONTINUE'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-sky/5 border border-sky/10 rounded-2xl text-[11px] text-sky-light/70 leading-relaxed font-medium text-center">
                        We've sent a 6-digit verification code to <span className="text-white font-bold">{phone}</span>.
                      </div>
                      <div className="space-y-2 text-left">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1 block">Verification Code</label>
                        <input 
                          className={`w-full bg-white/5 border ${fieldErrors.smsCode ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-2xl px-5 py-4 text-center text-2xl font-black tracking-[0.5em] text-white outline-none focus:border-primary/50 transition-all shadow-inner`} 
                          value={smsCode} 
                          onChange={(e) => { setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setFieldErrors({ ...fieldErrors, smsCode: false }); }} 
                          placeholder="000000" 
                          autoFocus
                        />
                      </div>
                      
                      <Button 
                        variant="primary" 
                        onClick={handleConfirmPhone}
                        disabled={busy || smsCode.length < 6}
                        className="w-full h-14 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 mt-2"
                      >
                        {busy ? 'VERIFYING...' : 'VERIFY & ENABLE'}
                      </Button>
                      
                      <button 
                        onClick={() => setPhoneModalStep(1)}
                        disabled={busy}
                        className="w-full py-2 text-[10px] font-bold text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                      >
                        Change Number
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="px-1 text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center justify-center gap-2">
                      <AlertCircle size={12} />
                      {error}
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {
                      if (!busy) {
                        setShowPhoneModal(false);
                        setMfaResolver(null);
                        setMfaChallengeStep(1);
                        setReauthVerificationId(null);
                      }
                    }}
                    disabled={busy}
                    className="w-full py-4 text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
        title="SIGN OUT?"
        message="Are you sure you want to end your session? You can sign back in at any time to access your stats."
        confirmText="SIGN OUT"
        variant="danger"
      />

      {/* Disable MFA Modal */}
      <AnimatePresence>
        {showDisableMfaModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !busy && setShowDisableMfaModal(null)}
              className="absolute inset-0 bg-surface-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-500/10">
                    <ShieldAlert size={32} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Disable 2FA?</h2>
                    <p className="text-xs text-amber-500/60 uppercase tracking-widest font-black mt-1">Identity Verification Required</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl text-[11px] text-amber-500/80 leading-relaxed font-medium text-center">
                  Are you sure you want to remove this security layer? To proceed, please confirm your identity.
                </div>

                <div className="space-y-4">
                  {mfaResolver ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-sky/5 border border-sky/10 rounded-2xl text-[11px] text-sky-light/70 leading-relaxed font-medium text-center">
                        {mfaChallengeStep === 1 
                          ? `Security verification: verify your identity via SMS (•••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}) before disabling.` 
                          : `Enter the 6-digit code sent to your phone (•••• ${(mfaResolver.hints[0] as any).phoneNumber?.slice(-4) || 'XXXX'}).`}
                      </div>
                      
                      {mfaChallengeStep === 1 ? (
                        <Button 
                          variant="primary" 
                          onClick={handleStartReauthMfa}
                          disabled={busy}
                          className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20 mt-2"
                        >
                          {busy ? 'SENDING...' : 'SEND CODE'}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <input 
                            className={`w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center text-2xl font-black tracking-[0.5em] text-white outline-none focus:border-amber-500/50 transition-all shadow-inner`} 
                            value={mfaPassword} 
                            onChange={(e) => { 
                              const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                              setMfaPassword(val);
                              if (val.length === 6) handleVerifyReauthMfa(val);
                            }} 
                            placeholder="000000" 
                            autoFocus
                          />
                          <Button 
                            variant="primary" 
                            onClick={() => handleVerifyReauthMfa(mfaPassword)}
                            disabled={busy || mfaPassword.length < 6}
                            className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20 mt-2"
                          >
                            {busy ? 'VERIFYING...' : 'VERIFY & DISABLE'}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1 block">Account Password</label>
                      <div className="relative">
                        <input 
                          type={showMfaPassword ? "text" : "password"}
                          className={`w-full bg-white/5 border ${fieldErrors.mfaPassword ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-2xl px-5 py-4 text-white outline-none focus:border-amber-500/50 transition-all font-black text-sm pr-20`} 
                          value={mfaPassword} 
                          onChange={(e) => { setMfaPassword(e.target.value); setFieldErrors({ ...fieldErrors, mfaPassword: false }); }} 
                          placeholder="••••••••" 
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setShowMfaPassword(!showMfaPassword)}
                            className="text-white/20 hover:text-white transition-colors"
                          >
                            {showMfaPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                          <Lock className="text-white/20" size={18} />
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="px-1 text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center justify-center gap-2">
                      <AlertCircle size={12} />
                      {error}
                    </div>
                  )}
                </div>

                {!mfaResolver && (
                  <div className="flex flex-col gap-3 pt-2">
                    <Button 
                      variant="primary" 
                      onClick={() => handleDisableFactor(showDisableMfaModal)}
                      disabled={busy}
                      className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20"
                    >
                      {busy ? 'CONFIRMING...' : 'DISABLE PROTECTION'}
                    </Button>
                  <button 
                    onClick={() => {
                      if (!busy) {
                        setShowDisableMfaModal(null);
                        setMfaResolver(null);
                        setMfaChallengeStep(1);
                        setReauthVerificationId(null);
                      }
                    }}
                    disabled={busy}
                    className="w-full py-4 text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Cancel
                  </button>
                  </div>
                )}
                
                {mfaResolver && (
                  <div className="pt-2">
                  <button 
                    onClick={() => {
                      if (!busy) {
                        setShowDisableMfaModal(null);
                        setMfaResolver(null);
                        setMfaChallengeStep(1);
                        setReauthVerificationId(null);
                      }
                    }}
                    disabled={busy}
                    className="w-full py-4 text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Cancel
                  </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
