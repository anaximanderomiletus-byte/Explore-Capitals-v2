import React, { useEffect, useMemo, useRef, useState } from 'react';
import { 
  CheckCircle2, Mail, ShieldCheck,
  AlertCircle, ShieldAlert,
  Eye, EyeOff, LogOut, ArrowLeft,
  Smartphone, Monitor, Lock, Camera, Upload, X, Pencil, Heart,
  Crown, Sparkles, Loader2
} from 'lucide-react';
import { createCheckoutSession } from '../services/payment';
import { 
  getCustomerPortalUrl, 
  cancelSubscription, 
  isPremiumUser, 
  getSubscriptionInfo 
} from '../services/subscription';
import { useSearchParams } from 'react-router-dom';
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
import SEO from '../components/SEO';

// Section component for consistent styling
const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 px-1">{title}</h2>
    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.04]">
      {children}
    </div>
  </section>
);

// Row component for consistent item styling
const SettingsRow: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => (
  <div 
    className={`p-5 ${onClick ? 'cursor-pointer hover:bg-white/[0.02] transition-colors' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const Settings: React.FC = () => {
  const { setPageLoading } = useLayout();
  const { user: userProfile, isLoading: userLoading } = useUser();
  const { 
    user, updateProfileInfo, changePassword, sendVerifyEmail, 
    enrollPhoneMfa, confirmPhoneMfa, enrolledFactors, disableMfaFactor,
    reloadUser, updateEmail: updateUserEmail,
    reauthenticate, deleteAccount, signOut, loading: authLoading,
    mfaResolver, solveMfaPhone, sendMfaSms, setMfaResolver
  } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  // Payment state
  const [donationBusy, setDonationBusy] = useState(false);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setStatus('Thank you for your support! You are now a supporter.');
    }
  }, [searchParams]);

  const handleDonation = async (amount: number) => {
    setDonationBusy(true);
    clearMessages();
    try {
      const { url } = await createCheckoutSession(amount * 100); // Convert to cents
      window.location.href = url;
    } catch (err: any) {
      console.error('Donation failed:', err);
      setError(err?.message ?? 'Failed to start donation');
      setDonationBusy(false);
    }
  };

  const currentDeviceInfo = useMemo(() => {
    const ua = navigator.userAgent;
    let browser = "Unknown Browser";
    let os = "Unknown OS";

    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Edge")) browser = "Edge";

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

  // New email change state
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Profile photo state
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password section state
  const [showPasswordSection, setShowPasswordSection] = useState(false);

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
  const [mfaChallengeStep, setMfaChallengeStep] = useState<1 | 2>(1);
  const [reauthVerificationId, setReauthVerificationId] = useState<string | null>(null);

  // Auto-clear error when user starts typing or changes state
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Auto-clear status
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleVerifyReauthMfa = async (code: string) => {
    setBusy(true);
    setError(null);
    try {
      const hint = mfaResolver!.hints[0];
      if (hint.factorId === 'phone') {
        if (!reauthVerificationId) throw new Error('No verification session');
        await solveMfaPhone(reauthVerificationId, code);
      }
      
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
      setStatus('Display name updated');
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
      setStatus('Profile picture updated');
      setShowAvatarPicker(false);
    } catch (err: any) {
      setError('Failed to update profile picture');
    } finally {
      setBusy(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }
    
    setBusy(true);
    clearMessages();
    try {
      // Convert to base64 for now (in production, upload to storage)
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        // Store custom photo URL
        await updateProfileInfo({ photoURL: base64 });
        setStatus('Profile photo uploaded');
        setShowAvatarPicker(false);
        setBusy(false);
      };
      reader.onerror = () => {
        setError('Failed to read image');
        setBusy(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError('Failed to upload photo');
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
      setError('Password does not meet requirements');
      return;
    }
    setBusy(true);
    clearMessages();
    try {
      await changePassword(oldPassword, password);
      setStatus('Password updated successfully');
      setPassword('');
      setOldPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to change password');
    } finally {
      setBusy(false);
    }
  };

  const handleEmailChange = async () => {
    if (!newEmail || !emailPassword) {
      setFieldErrors({ newEmail: !newEmail, emailPassword: !emailPassword });
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setBusy(true);
    clearMessages();
    try {
      await reauthenticate(emailPassword);
      await updateUserEmail(newEmail);
      setStatus('Verification email sent to new address');
      setShowEmailModal(false);
      setNewEmail('');
      setEmailPassword('');
    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Incorrect password');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email already in use by another account');
      } else {
        setError(err?.message ?? 'Failed to update email');
      }
    } finally {
      setBusy(false);
    }
  };

  const handleSendVerifyEmail = async () => {
    setBusy(true);
    clearMessages();
    try {
      await sendVerifyEmail();
      setStatus('Verification email sent');
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
      try {
        if (!mfaPassword) {
          setError('Please enter your password');
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
        if (authErr.code === 'auth/wrong-password' || authErr.code === 'auth/invalid-credential') {
          setError('Incorrect password');
          setFieldErrors({ mfaPassword: true });
        } else if (authErr.code === 'auth/too-many-requests') {
          setError('Too many attempts. Please try again later.');
        } else {
          setError(`Verification failed: ${authErr.message}`);
        }
        setBusy(false);
        return;
      }

      const verifier = ensureRecaptcha();
      if (!verifier) throw new Error('Security check failed. Please refresh.');
      
      const vId = await enrollPhoneMfa(phone, verifier);
      setSmsVerificationId(vId);
      setPhoneModalStep(2);
      setStatus('Code sent');
      setMfaPassword('');
    } catch (err: any) {
      console.error('Phone start error:', err.code, err);
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number format');
      } else if (err.code === 'auth/quota-exceeded') {
        setError('SMS limit reached. Try again later.');
      } else {
        setError(err?.message ?? 'Failed to send code');
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
      setStatus('Two-factor authentication enabled');
      setSmsVerificationId(null);
      setSmsCode('');
      
      setPhoneModalStep(2);
      setShowVerifySuccess(true);
      
      setTimeout(() => {
        setShowPhoneModal(false);
        setShowVerifySuccess(false);
      }, 2000);
    } catch (err: any) {
      console.error('Phone confirmation error:', err.code, err);
      if (err?.code === 'auth/invalid-verification-code') {
        setError('Incorrect code');
      } else if (err?.code === 'auth/code-expired') {
        setError('Code expired. Request a new one.');
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
      setStatus('Status refreshed');
    } catch (err: any) {
      setError('Failed to refresh');
    } finally {
      setBusy(false);
    }
  };

  const handleDisableFactor = async (uid: string) => {
    setBusy(true);
    clearMessages();
    try {
      try {
        if (!mfaPassword) {
          setError('Please enter your password');
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
      setStatus('Two-factor authentication disabled');
      setShowDisableMfaModal(null);
      setMfaPassword('');
    } catch (err: any) {
      console.error('MFA disable error:', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Incorrect password');
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
      try {
        if (!deletePassword) {
          setDeleteError('Please enter your password');
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

      await deleteAccount();
      navigate('/auth');
    } catch (err: any) {
      console.error('Deletion failed:', err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setDeleteError('Incorrect password');
        setFieldErrors({ deletePassword: true });
      } else {
        setDeleteError(err?.message ?? 'Deletion failed');
      }
    } finally {
      setBusy(false);
    }
  };

  // Format phone number for display
  const formatPhoneDisplay = (phoneNumber: string | null) => {
    if (!phoneNumber) return null;
    // Format: +1 (860) 324-2349
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
  };

  const renderAvatarContent = (photoURL: string | null, initials: string, size: 'sm' | 'lg' | 'xl' = 'lg') => {
    const avatar = getAvatarById(photoURL);
    const sizeClasses = size === 'xl' ? 'w-28 h-28' : size === 'lg' ? 'w-20 h-20' : 'w-12 h-12';
    const iconSize = size === 'xl' ? 56 : size === 'lg' ? 40 : 24;
    const textSize = size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-3xl' : 'text-xl';
    
    // Check if it's a custom uploaded photo (base64 or URL)
    if (photoURL && (photoURL.startsWith('data:') || photoURL.startsWith('http'))) {
      return (
        <div className={`${sizeClasses} rounded-full overflow-hidden ring-4 ring-white/10`}>
          <img src={photoURL} alt="Profile" className="w-full h-full object-cover" />
        </div>
      );
    }
    
    if (avatar) {
      return (
        <div className={`${sizeClasses} rounded-full ${avatar.color} text-white flex items-center justify-center ring-4 ring-white/10`}>
          {React.cloneElement(avatar.icon as React.ReactElement, { size: iconSize })}
        </div>
      );
    }
    return (
      <div className={`${sizeClasses} rounded-full bg-gradient-to-br from-sky to-primary text-white flex items-center justify-center font-display font-bold ${textSize} ring-4 ring-white/10`}>
        {initials}
      </div>
    );
  };

  // Show spinner only if we don't have any auth data yet
  if ((authLoading || userLoading) && !user) {
    return (
      <div className="pt-32 pb-16 px-6 bg-surface-dark min-h-screen flex flex-col items-center justify-center text-center">
        <div className="w-12 h-12 border-4 border-sky border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-32 pb-16 px-6 bg-surface-dark min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[100%] h-[100%] bg-sky/10 rounded-full blur-[180px] opacity-60" />
        </div>
        
        <div className="bg-white/[0.03] backdrop-blur-3xl p-12 rounded-3xl border border-white/10 max-w-md text-center relative z-10">
          <div className="w-20 h-20 rounded-2xl bg-sky/10 border border-sky/20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={40} className="text-sky" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tight">SIGN IN REQUIRED</h2>
          <p className="text-white/40 mt-3 mb-8 text-sm">You must be logged in to view settings.</p>
          <Button onClick={() => navigate('/auth')} className="w-full h-14 text-[11px] font-black uppercase tracking-widest">
            GO TO SIGN IN
          </Button>
        </div>
      </div>
    );
  }

  const initials = user.displayName?.[0]?.toUpperCase() || 'E';
  const phoneFactorInfo = enrolledFactors.find(f => f.factorId === 'phone');

  return (
    <div className="min-h-screen bg-surface-dark font-sans relative">
      <SEO 
        title="Account Settings" 
        description="Manage your ExploreCapitals account settings. Update your profile, security options, and preferences."
      />
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
      </div>
          
      {/* Status Toast */}
      <AnimatePresence>
        {(status || error) && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50"
          >
            <div className={`px-5 py-3 rounded-full text-sm font-bold backdrop-blur-xl border ${error ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-accent/20 border-accent/30 text-accent'}`}>
              {error ?? status}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-xl mx-auto">
          
          {/* Header */}
          <div className="mb-10">
            <button 
              onClick={() => navigate('/profile')} 
              className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-[0.15em]">BACK TO PROFILE</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">SETTINGS</h1>
          </div>

          {/* Profile Section */}
          <SettingsSection title="PROFILE">
            {/* Profile Photo */}
            <SettingsRow>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    {renderAvatarContent(user.photoURL, initials, 'lg')}
                    <button 
                      onClick={() => setShowAvatarPicker(true)}
                      className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Camera size={24} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.15em] mb-1">PROFILE PHOTO</h3>
                    <p className="text-sm text-white/60">Choose an avatar or upload a photo</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAvatarPicker(true)}
                  className="text-[11px] font-black text-sky uppercase tracking-[0.1em] hover:text-sky-light transition-colors"
                >
                  EDIT
                </button>
              </div>
            </SettingsRow>

            {/* Display Name */}
            <SettingsRow>
              <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.15em] mb-3">DISPLAY NAME</h3>
              <div className="flex gap-3">
                <input
                  className={`flex-1 bg-white/5 border ${fieldErrors.displayName ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-sky/50 focus:bg-white/[0.08] transition-all`}
                  value={displayName} 
                  onChange={(e) => { setDisplayName(e.target.value); setFieldErrors({ ...fieldErrors, displayName: false }); }}
                  placeholder="Enter display name"
                />
                <button 
                  onClick={handleProfileSave} 
                  disabled={busy || displayName === user?.displayName || !displayName} 
                  className="px-5 py-3 bg-sky hover:bg-sky-light disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                >
                  SAVE
                </button>
              </div>
            </SettingsRow>

            {/* Email */}
            <SettingsRow>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.15em] mb-1">EMAIL ADDRESS</h3>
                  <p className="text-sm text-white">{user.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  {user.emailVerified ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-black text-accent uppercase tracking-[0.1em]">
                      <CheckCircle2 size={14} />
                      VERIFIED
                    </span>
                  ) : (
                    <button 
                      onClick={handleSendVerifyEmail}
                      disabled={busy}
                      className="text-[11px] font-black text-amber-400 uppercase tracking-[0.1em] hover:text-amber-300 transition-colors"
                    >
                      VERIFY
                    </button>
                  )}
                  <button 
                    onClick={() => setShowEmailModal(true)}
                    className="text-[11px] font-black text-sky uppercase tracking-[0.1em] hover:text-sky-light transition-colors"
                  >
                    CHANGE
                  </button>
                </div>
              </div>
            </SettingsRow>
          </SettingsSection>

          {/* Security Section */}
          <SettingsSection title="SECURITY">
            {/* Two-Factor */}
            <SettingsRow>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.15em] mb-1">TWO-FACTOR AUTHENTICATION</h3>
                  <p className="text-sm text-white/60">
                    {phoneFactorInfo 
                      ? `Enabled · ${formatPhoneDisplay(phoneFactorInfo.phone)}`
                      : 'Protect your account with SMS verification'
                    }
                  </p>
                </div>
                {!user.emailVerified ? (
                  <span className="text-[10px] font-bold text-white/30 uppercase">Verify email first</span>
                ) : phoneFactorInfo ? (
                  <button 
                    onClick={() => setShowDisableMfaModal(phoneFactorInfo.uid)} 
                    className="text-[11px] font-black text-red-400 uppercase tracking-[0.1em] hover:text-red-300 transition-colors"
                  >
                    DISABLE
                  </button>
                ) : (
                  <button 
                    onClick={() => { setShowPhoneModal(true); setPhoneModalStep(1); }}
                    disabled={busy}
                    className="text-[11px] font-black text-sky uppercase tracking-[0.1em] hover:text-sky-light transition-colors"
                  >
                    ENABLE
                  </button>
                )}
              </div>
            </SettingsRow>

            {/* Password */}
            <SettingsRow onClick={() => setShowPasswordSection(!showPasswordSection)} className="cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.15em] mb-1">PASSWORD</h3>
                  <p className="text-sm text-white/60">Change your account password</p>
                </div>
                <span className="text-[11px] font-black text-sky uppercase tracking-[0.1em]">
                  {showPasswordSection ? 'CLOSE' : 'CHANGE'}
                </span>
              </div>
            </SettingsRow>

            {/* Password Form (Expandable) */}
            <AnimatePresence>
              {showPasswordSection && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-white/[0.04]"
                >
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">CURRENT PASSWORD</label>
                      <input
                        type="password"
                        className={`w-full bg-white/5 border ${fieldErrors.oldPassword ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky/50 transition-all`}
                        value={oldPassword}
                        onChange={(e) => { setOldPassword(e.target.value); setFieldErrors({ ...fieldErrors, oldPassword: false }); }}
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">NEW PASSWORD</label>
                        <input
                          type="password"
                          className={`w-full bg-white/5 border ${fieldErrors.password ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky/50 transition-all`}
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setFieldErrors({ ...fieldErrors, password: false }); }}
                          placeholder="New password"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">CONFIRM PASSWORD</label>
                        <input
                          type="password"
                          className={`w-full bg-white/5 border ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky/50 transition-all`}
                          value={confirmPassword}
                          onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors({ ...fieldErrors, confirmPassword: false }); }}
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] mb-3">REQUIREMENTS</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { key: 'length', label: '8+ characters' },
                          { key: 'uppercase', label: 'Uppercase' },
                          { key: 'lowercase', label: 'Lowercase' },
                          { key: 'number', label: 'Number' },
                          { key: 'special', label: 'Special char' },
                        ].map(({ key, label }) => (
                          <p key={key} className={`flex items-center gap-2 text-xs ${passwordCriteria[key as keyof typeof passwordCriteria] ? 'text-accent' : 'text-white/30'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${passwordCriteria[key as keyof typeof passwordCriteria] ? 'bg-accent' : 'bg-white/20'}`} />
                            {label}
                          </p>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={handlePasswordChange} 
                      disabled={busy || !password || !oldPassword || !isPasswordValid}
                      className="w-full py-3 bg-sky hover:bg-sky-light disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[11px] font-black text-white uppercase tracking-[0.15em] transition-all"
                    >
                      UPDATE PASSWORD
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SettingsSection>

          {/* Subscription Section */}
          <SettingsSection title="SUBSCRIPTION">
            <SettingsRow>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${isPremiumUser(userProfile?.subscriptionStatus, userProfile?.subscriptionPlan) ? 'bg-amber-500/20' : 'bg-white/5'} flex items-center justify-center shrink-0`}>
                  <Crown size={24} className={isPremiumUser(userProfile?.subscriptionStatus, userProfile?.subscriptionPlan) ? 'text-amber-400' : 'text-white/40'} />
                </div>
                <div className="flex-1">
                  {isPremiumUser(userProfile?.subscriptionStatus, userProfile?.subscriptionPlan) ? (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">PREMIUM MEMBER</h3>
                        <span className="px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 rounded-full text-[9px] font-black text-amber-400 uppercase tracking-wider">
                          {userProfile?.subscriptionPlan}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 mb-4 leading-relaxed">
                        {userProfile?.subscriptionPlan === 'lifetime' 
                          ? 'You have lifetime access to all premium features.'
                          : `Your subscription ${userProfile?.subscriptionStatus === 'canceled' ? 'ends' : 'renews'} on ${
                              userProfile?.currentPeriodEnd 
                                ? new Date(userProfile.currentPeriodEnd?.seconds ? userProfile.currentPeriodEnd.seconds * 1000 : userProfile.currentPeriodEnd).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                : 'N/A'
                            }`
                        }
                      </p>
                      <div className="flex gap-3">
                        {userProfile?.subscriptionPlan !== 'lifetime' && (
                          <button
                            onClick={async () => {
                              setBusy(true);
                              try {
                                const url = await getCustomerPortalUrl();
                                window.location.href = url;
                              } catch (err: any) {
                                setError(err?.message || 'Failed to open portal');
                              } finally {
                                setBusy(false);
                              }
                            }}
                            disabled={busy}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black text-white uppercase tracking-widest transition-all disabled:opacity-50"
                          >
                            MANAGE
                          </button>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm font-bold text-white mb-1">UPGRADE TO PREMIUM</h3>
                      <p className="text-xs text-white/60 mb-4 leading-relaxed">
                        Get unlimited games, remove ads, and unlock advanced analytics.
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          onClick={() => navigate('/premium')}
                          className="col-span-3 py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/30 rounded-xl text-[11px] font-black text-amber-400 uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                        >
                          <Sparkles size={14} />
                          VIEW PLANS
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </SettingsRow>
          </SettingsSection>

          {/* Support Section */}
          <SettingsSection title="SUPPORT US">
            <SettingsRow>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 shrink-0">
                  <Heart size={24} className={user.isSupporter ? "fill-current" : ""} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">
                    {user.isSupporter ? "THANK YOU FOR YOUR SUPPORT!" : "BECOME A SUPPORTER"}
                  </h3>
                  <p className="text-xs text-white/60 mb-4 leading-relaxed">
                    ExploreCapitals is a passion project. Your support helps cover server costs and keeps the game free for everyone.
                    {user.isSupporter && " You have a special badge on your profile!"}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[5, 10, 20].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleDonation(amount)}
                        disabled={donationBusy || busy}
                        className="py-2.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black text-white uppercase tracking-widest transition-all disabled:opacity-50"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-white/20 mt-3 text-center uppercase tracking-widest">
                    SECURE PAYMENT VIA STRIPE
                  </p>
                </div>
              </div>
            </SettingsRow>
          </SettingsSection>

          {/* Session Section */}
          <SettingsSection title="SESSION">
            <SettingsRow>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sky/10 flex items-center justify-center text-sky">
                  {currentDeviceInfo.isMobile ? <Smartphone size={22} /> : <Monitor size={22} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">{currentDeviceInfo.browser} on {currentDeviceInfo.os}</h3>
                  <p className="text-xs text-white/40">Current session</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-accent uppercase tracking-[0.1em]">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  ACTIVE
                </span>
              </div>
            </SettingsRow>
            <SettingsRow>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] mb-1">ACCOUNT CREATED</p>
                  <p className="text-sm text-white">{user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] mb-1">LAST SIGN IN</p>
                  <p className="text-sm text-white">{user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</p>
                </div>
              </div>
            </SettingsRow>
          </SettingsSection>

          {/* Account Actions */}
          <SettingsSection title="ACCOUNT">
            <SettingsRow>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-black text-white/40 uppercase tracking-[0.15em] mb-1">SIGN OUT</h3>
                  <p className="text-sm text-white/60">End your current session</p>
                </div>
                <button 
                  onClick={() => setShowSignOutModal(true)}
                  className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                >
                  SIGN OUT
                </button>
              </div>
            </SettingsRow>
            <SettingsRow>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[11px] font-black text-red-400/60 uppercase tracking-[0.15em] mb-1">DELETE ACCOUNT</h3>
                  <p className="text-sm text-white/60">Permanently remove all your data</p>
                </div>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-[11px] font-black text-red-400 uppercase tracking-[0.1em] transition-all"
                >
                  DELETE
                </button>
              </div>
            </SettingsRow>
          </SettingsSection>

        </div>
      </div>

      {/* Avatar Picker Modal */}
      <AnimatePresence>
        {showAvatarPicker && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !busy && setShowAvatarPicker(false)}
              className="absolute inset-0 bg-surface-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-black text-white uppercase tracking-tight">CHOOSE PHOTO</h2>
                  <button 
                    onClick={() => setShowAvatarPicker(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-white/60" />
                  </button>
                </div>

                {/* Current Avatar Preview */}
                <div className="flex justify-center mb-6">
                  {renderAvatarContent(user.photoURL, initials, 'xl')}
                </div>

                {/* Upload Button */}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={busy}
                  className="w-full py-3 mb-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black text-white uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2"
                >
                  <Upload size={16} />
                  UPLOAD PHOTO
                </button>

                {/* Preset Avatars */}
                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] mb-3">OR CHOOSE AN AVATAR</p>
                <div className="grid grid-cols-5 gap-3">
                  {AVATAR_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handleAvatarSelect(p.id)}
                      disabled={busy}
                      className={`aspect-square rounded-xl ${p.color} flex items-center justify-center transition-all ${user.photoURL === p.id ? 'ring-2 ring-white ring-offset-2 ring-offset-surface-dark scale-105' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                    >
                      {React.cloneElement(p.icon as React.ReactElement, { size: 20 })}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !busy && setShowEmailModal(false)}
              className="absolute inset-0 bg-surface-dark/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tight">CHANGE EMAIL</h2>
                    <p className="text-xs text-white/40 mt-1">Current: {user.email}</p>
                  </div>
                  <button 
                    onClick={() => setShowEmailModal(false)}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-white/60" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">NEW EMAIL ADDRESS</label>
                    <input
                      type="email"
                      className={`w-full bg-white/5 border ${fieldErrors.newEmail ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky/50 transition-all`}
                      value={newEmail}
                      onChange={(e) => { setNewEmail(e.target.value); setFieldErrors({ ...fieldErrors, newEmail: false }); }}
                      placeholder="Enter new email address"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">CURRENT PASSWORD</label>
                    <input
                      type="password"
                      className={`w-full bg-white/5 border ${fieldErrors.emailPassword ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky/50 transition-all`}
                      value={emailPassword}
                      onChange={(e) => { setEmailPassword(e.target.value); setFieldErrors({ ...fieldErrors, emailPassword: false }); }}
                      placeholder="Confirm with your password"
                    />
                  </div>
                </div>

                <div className="p-4 bg-sky/5 border border-sky/10 rounded-xl text-xs text-white/60">
                  A verification link will be sent to your new email address. Your email won't change until you verify it.
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowEmailModal(false)}
                    disabled={busy}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={handleEmailChange}
                    disabled={busy || !newEmail || !emailPassword}
                    className="flex-1 py-3 bg-sky hover:bg-sky-light disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                  >
                    {busy ? 'UPDATING...' : 'UPDATE EMAIL'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        
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
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                    <AlertCircle size={28} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tight">DELETE ACCOUNT</h2>
                    <p className="text-xs text-white/40 mt-0.5">This action cannot be undone</p>
                  </div>
                </div>

                <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-red-400/80 leading-relaxed">
                  All your progress, achievements, loyalty points, and personal data will be permanently deleted.
                </div>

                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">CONFIRM PASSWORD</label>
                  <input
                    type="password"
                    className={`w-full bg-white/5 border ${fieldErrors.deletePassword ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-red-500/50 transition-all`}
                    value={deletePassword}
                    onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(null); setFieldErrors({ ...fieldErrors, deletePassword: false }); }}
                    placeholder="Enter your password"
                  />
                  {deleteError && (
                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {deleteError}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => { setShowDeleteModal(false); setDeletePassword(''); setDeleteError(null); }}
                    disabled={busy}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={handleDeleteAccount}
                    disabled={busy || !deletePassword}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                  >
                    {busy ? 'DELETING...' : 'DELETE ACCOUNT'}
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
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sky/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky/10 flex items-center justify-center text-sky border border-sky/20">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white uppercase tracking-tight">
                        {phoneModalStep === 1 ? 'SETUP 2FA' : 'VERIFY PHONE'}
                      </h2>
                      <p className="text-xs text-white/40">
                        {phoneModalStep === 1 ? 'Enter your phone number' : 'Check your messages'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { if (!busy) { setShowPhoneModal(false); setMfaPassword(''); setSmsCode(''); } }}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-white/60" />
                  </button>
                </div>

                {showVerifySuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto mb-4 border-2 border-accent/30">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">VERIFIED</h3>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Two-factor authentication enabled</p>
                  </motion.div>
                ) : phoneModalStep === 1 ? (
                  <div className="space-y-4">
                    <PhoneInput 
                      value={phone} 
                      onChange={setPhone} 
                      placeholder="(555) 123-4567" 
                      error={fieldErrors.phone}
                    />

                    <div>
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">ACCOUNT PASSWORD</label>
                      <div className="relative">
                        <input 
                          type={showMfaPassword ? "text" : "password"}
                          className={`w-full bg-white/5 border ${fieldErrors.mfaPassword ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-sky/50 transition-all pr-12`} 
                          value={mfaPassword} 
                          onChange={(e) => { setMfaPassword(e.target.value); setFieldErrors({ ...fieldErrors, mfaPassword: false }); }} 
                          placeholder="Enter password to confirm"
                        />
                        <button
                          type="button"
                          onClick={() => setShowMfaPassword(!showMfaPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                        >
                          {showMfaPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-center py-2">
                      <div ref={recaptchaRef} id="recaptcha-settings-container" />
                    </div>
                    
                    <button 
                      onClick={handleStartPhone}
                      disabled={busy || !phone || !mfaPassword}
                      className="w-full py-3 bg-sky hover:bg-sky-light disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[11px] font-black text-white uppercase tracking-[0.15em] transition-all"
                    >
                      {busy ? 'SENDING...' : 'SEND VERIFICATION CODE'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-sky/5 border border-sky/10 rounded-xl text-xs text-white/60 text-center">
                      We sent a 6-digit code to <span className="text-white font-bold">{formatPhoneDisplay(phone)}</span>
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">VERIFICATION CODE</label>
                      <input 
                        className={`w-full bg-white/5 border ${fieldErrors.smsCode ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-4 text-center text-2xl font-black tracking-[0.3em] text-white outline-none focus:border-sky/50 transition-all`} 
                        value={smsCode} 
                        onChange={(e) => { setSmsCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setFieldErrors({ ...fieldErrors, smsCode: false }); }} 
                        placeholder="000000" 
                        autoFocus
                      />
                    </div>
                    
                    <button 
                      onClick={handleConfirmPhone}
                      disabled={busy || smsCode.length < 6}
                      className="w-full py-3 bg-sky hover:bg-sky-light disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[11px] font-black text-white uppercase tracking-[0.15em] transition-all"
                    >
                      {busy ? 'VERIFYING...' : 'VERIFY & ENABLE'}
                    </button>
                    
                    <button 
                      onClick={() => setPhoneModalStep(1)}
                      disabled={busy}
                      className="w-full py-2 text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                    >
                      CHANGE NUMBER
                    </button>
                  </div>
                )}

                {error && (
                  <p className="text-xs text-red-400 flex items-center justify-center gap-1">
                    <AlertCircle size={12} />
                    {error}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOut}
        title="Sign Out?"
        message="Are you sure you want to end your session? You can sign back in at any time."
        confirmText="Sign Out"
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
              className="relative w-full max-w-md bg-white/[0.03] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <ShieldAlert size={28} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white uppercase tracking-tight">DISABLE 2FA</h2>
                    <p className="text-xs text-white/40 mt-0.5">Your account will be less secure</p>
                  </div>
                </div>

                <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-xs text-amber-500/80 leading-relaxed">
                  Removing two-factor authentication will make your account more vulnerable to unauthorized access.
                </div>

                <div>
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em] block mb-2">ACCOUNT PASSWORD</label>
                  <div className="relative">
                    <input 
                      type={showMfaPassword ? "text" : "password"}
                      className={`w-full bg-white/5 border ${fieldErrors.mfaPassword ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500/50 transition-all pr-12`} 
                      value={mfaPassword} 
                      onChange={(e) => { setMfaPassword(e.target.value); setFieldErrors({ ...fieldErrors, mfaPassword: false }); }} 
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMfaPassword(!showMfaPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                    >
                      {showMfaPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {error}
                  </p>
                )}

                <div className="flex gap-3">
                  <button 
                    onClick={() => { setShowDisableMfaModal(null); setMfaPassword(''); }}
                    disabled={busy}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                  >
                    CANCEL
                  </button>
                  <button 
                    onClick={() => handleDisableFactor(showDisableMfaModal)}
                    disabled={busy || !mfaPassword}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl text-[11px] font-black text-white uppercase tracking-[0.1em] transition-all"
                  >
                    {busy ? 'DISABLING...' : 'DISABLE 2FA'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
