import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signOut as fbSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  updatePassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  deleteUser,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithPhoneNumber,
  linkWithCredential,
  RecaptchaVerifier,
  multiFactor,
  EmailAuthProvider,
  reauthenticateWithCredential,
  PhoneMultiFactorGenerator,
  getMultiFactorResolver,
  MultiFactorResolver,
  MultiFactorAssertion,
  ConfirmationResult,
  applyActionCode
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  mfaResolver: MultiFactorResolver | null;
  setMfaResolver: (resolver: MultiFactorResolver | null) => void;
  confirmationResult: ConfirmationResult | null;
  setConfirmationResult: (result: ConfirmationResult | null) => void;
  signUpEmail: (opts: { name: string; email: string; password: string }) => Promise<void>;
  signInEmail: (email: string, password: string) => Promise<void>;
  signInSms: (phone: string, appVerifier: RecaptchaVerifier) => Promise<string>;
  confirmSmsLogin: (verificationId: string, code: string) => Promise<void>;
  linkPhoneToUser: (phone: string, appVerifier: RecaptchaVerifier) => Promise<string>;
  confirmLinkPhoneCode: (verificationId: string, code: string) => Promise<void>;
  enrollPhoneMfa: (phone: string, appVerifier: RecaptchaVerifier) => Promise<string>;
  confirmPhoneMfa: (verificationId: string, code: string) => Promise<void>;
  solveMfaPhone: (verificationId: string, code: string) => Promise<void>;
  sendMfaSms: (appVerifier: RecaptchaVerifier) => Promise<string>;
  sendVerifyEmail: () => Promise<void>;
  resetPasswordEmail: (email: string) => Promise<void>;
  confirmResetPassword: (code: string, newPassword: string) => Promise<void>;
  verifyEmailCode: (code: string) => Promise<void>;
  reauthenticate: (password?: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfileInfo: (opts: { displayName?: string; photoURL?: string }) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  disableMfaFactor: (uid: string) => Promise<void>;
  reloadUser: () => Promise<void>;
  enrolledFactors: { uid: string; displayName?: string; factorId: string; phone?: string }[];
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  mfaResolver: null,
  setMfaResolver: () => {},
  confirmationResult: null,
  setConfirmationResult: () => {},
  signUpEmail: async () => {},
  signInEmail: async () => {},
  signInSms: async () => '',
  confirmSmsLogin: async () => {},
  linkPhoneToUser: async () => '',
  confirmLinkPhoneCode: async () => {},
  enrollPhoneMfa: async () => '',
  confirmPhoneMfa: async () => {},
  solveMfaPhone: async () => {},
  sendMfaSms: async () => '',
  sendVerifyEmail: async () => {},
  resetPasswordEmail: async () => {},
  confirmResetPassword: async () => {},
  verifyEmailCode: async () => {},
  reauthenticate: async () => {},
  deleteAccount: async () => {},
  signOut: async () => {},
  updateProfileInfo: async () => {},
  changePassword: async () => {},
  disableMfaFactor: async () => {},
  reloadUser: async () => {},
  enrolledFactors: [],
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mfaResolver, setMfaResolver] = useState<MultiFactorResolver | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    let unsub: (() => void) | null = null;
    
    // Check for Firebase Auth initialization
    const checkAuth = setInterval(() => {
      if (auth) {
        clearInterval(checkAuth);
        
        // Wire up the state listener
        unsub = onAuthStateChanged(auth, (u) => {
          setUser(u);
          setLoading(false);
        });
        
        auth.useDeviceLanguage();
      }
    }, 50);

    // Safety timeout: increased to 3 seconds for slower connections
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Auth initialization timed out. Proceeding with limited state.");
        clearInterval(checkAuth);
        setLoading(false);
      }
    }, 3000);

    return () => {
      clearInterval(checkAuth);
      clearTimeout(timeout);
      if (unsub) unsub();
    };
  }, []);

  const handleMfaError = useCallback((err: any) => {
    if (err.code === 'auth/multi-factor-auth-required') {
      const resolver = getMultiFactorResolver(auth!, err);
      setMfaResolver(resolver);
      return;
    }
    throw err;
  }, []);

  const signUpEmail = useCallback(async ({ name, email, password }: { name: string; email: string; password: string }) => {
    if (!auth) throw new Error('Authentication system not initialized');
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(creds.user, { displayName: name });
    
    // Refresh user state immediately
    await creds.user.reload();
    setUser({ ...auth.currentUser! });
    
    // Explicitly send verification email
    try {
      await sendEmailVerification(creds.user);
    } catch (e) {
      console.warn('Initial email verification failed, user can resend from UI:', e);
    }
  }, []);

  const signInEmail = useCallback(async (email: string, password: string) => {
    if (!auth) throw new Error('Authentication system not initialized');
    try {
      const creds = await signInWithEmailAndPassword(auth, email, password);
      setUser(creds.user);
    } catch (err: any) {
      handleMfaError(err);
    }
  }, [handleMfaError]);

  const signInSms = useCallback(async (phone: string, appVerifier: RecaptchaVerifier) => {
    if (!auth) throw new Error('Authentication system not initialized');
    const result = await signInWithPhoneNumber(auth, phone, appVerifier);
    setConfirmationResult(result);
    return result.verificationId;
  }, []);

  const confirmSmsLogin = useCallback(async (verificationId: string, code: string) => {
    if (!confirmationResult) throw new Error('No active verification session');
    try {
      const creds = await confirmationResult.confirm(code);
      setUser(creds.user);
      setConfirmationResult(null);
    } catch (err: any) {
      handleMfaError(err);
    }
  }, [confirmationResult, handleMfaError]);

  const linkPhoneToUser = useCallback(
    async (phone: string, appVerifier: RecaptchaVerifier) => {
      if (!auth || !auth.currentUser) throw new Error('No user signed in');
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(phone, appVerifier);
      return verificationId;
    },
    [],
  );

  const confirmLinkPhoneCode = useCallback(
    async (verificationId: string, code: string) => {
      if (!auth || !auth.currentUser) throw new Error('No user signed in');
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await linkWithCredential(auth.currentUser, credential);
    },
    [],
  );

  const enrollPhoneMfa = useCallback(async (phone: string, appVerifier: RecaptchaVerifier) => {
    if (!auth || !auth.currentUser) throw new Error('No user signed in');
    const session = await multiFactor(auth.currentUser).getSession();
    const phoneInfoOptions = { phoneNumber: phone, session };
    const phoneAuthProvider = new PhoneAuthProvider(auth);
    return await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier);
  }, []);

  const confirmPhoneMfa = useCallback(async (verificationId: string, code: string) => {
    if (!auth || !auth.currentUser) throw new Error('No user signed in');
    const cred = PhoneAuthProvider.credential(verificationId, code);
    const assertion = PhoneMultiFactorGenerator.assertion(cred);
    await multiFactor(auth.currentUser).enroll(assertion, 'SMS Recovery');
    // Refresh user state immediately
    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });
  }, []);

  const solveMfaPhone = useCallback(async (verificationId: string, code: string) => {
    if (!mfaResolver) throw new Error('No MFA challenge active');
    const credential = PhoneAuthProvider.credential(verificationId, code);
    const assertion = PhoneMultiFactorGenerator.assertion(credential);
    await mfaResolver.resolveSignIn(assertion);
    setMfaResolver(null);
  }, [mfaResolver]);

  const sendMfaSms = useCallback(async (appVerifier: RecaptchaVerifier) => {
    if (!mfaResolver) throw new Error('No MFA challenge active');
    const phoneInfoOptions = {
      multiFactorHint: mfaResolver.hints[0],
      session: mfaResolver.session
    };
    const phoneAuthProvider = new PhoneAuthProvider(auth!);
    return await phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, appVerifier);
  }, [mfaResolver]);

  const sendVerifyEmail = useCallback(async () => {
    if (!auth || !auth.currentUser) throw new Error('No user signed in');
    await sendEmailVerification(auth.currentUser);
  }, []);

  const resetPasswordEmail = useCallback(async (email: string) => {
    if (!auth) throw new Error('Authentication system not initialized');
    await sendPasswordResetEmail(auth, email);
  }, []);

  const confirmResetPassword = useCallback(async (code: string, newPassword: string) => {
    if (!auth) throw new Error('Authentication system not initialized');
    await confirmPasswordReset(auth, code, newPassword);
  }, []);

  const verifyEmailCode = useCallback(async (code: string) => {
    if (!auth) throw new Error('Authentication system not initialized');
    await applyActionCode(auth, code);
  }, []);

  const reauthenticate = useCallback(async (password?: string) => {
    if (!auth || !auth.currentUser) throw new Error('No user signed in');
    
    try {
      if (password && auth.currentUser.email) {
        const cred = EmailAuthProvider.credential(auth.currentUser.email, password);
        await reauthenticateWithCredential(auth.currentUser, cred);
      } else {
        throw new Error('Re-authentication required. Please provide your password.');
      }
    } catch (err: any) {
      if (err.code === 'auth/multi-factor-auth-required') {
        handleMfaError(err);
      }
      throw err;
    }
  }, [handleMfaError]);

  const deleteAccount = useCallback(async () => {
    if (!auth || !auth.currentUser) throw new Error('No user signed in');
    
    const uid = auth.currentUser.uid;
    
    // 1. Delete user data from Firestore first
    if (db) {
      try {
        await deleteDoc(doc(db, 'users', uid));
      } catch (err) {
        console.error('Failed to delete Firestore document:', err);
        // Continue with Auth deletion anyway
      }
    }
    
    // 2. Delete the user account from Firebase Auth
    // This also signs the user out automatically
    await deleteUser(auth.currentUser);
    
    // 3. Clear local state immediately to ensure they lose access in the UI
    setUser(null);
  }, []);

  const signOut = useCallback(async () => {
    if (!auth) return;
    await fbSignOut(auth);
  }, []);

  const updateProfileInfo = useCallback(async ({ displayName, photoURL }: { displayName?: string; photoURL?: string }) => {
    if (!auth || !auth.currentUser) throw new Error('No user signed in');
    await updateProfile(auth.currentUser, { displayName, photoURL });
    
    if (db) {
      const updates: any = {};
      if (displayName) updates.name = displayName;
      if (photoURL) updates.photoURL = photoURL;
      
      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), updates);
      }
    }
    
    // Create a new user object to force state update across components
    // and ensure latest profile info is reflected
    setUser({ ...auth.currentUser });
  }, []);

  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    if (!auth || !auth.currentUser || !auth.currentUser.email) throw new Error('No user signed in');
    const cred = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
    await reauthenticateWithCredential(auth.currentUser, cred);
    await updatePassword(auth.currentUser, newPassword);
  }, []);

  const disableMfaFactor = useCallback(
    async (uid: string) => {
      if (!auth || !auth.currentUser) throw new Error('No user signed in');
      await multiFactor(auth.currentUser).unenroll(uid);
      // Refresh user state
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
    },
    [],
  );

  const reloadUser = useCallback(async () => {
    if (!auth || !auth.currentUser) return;
    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });
  }, []);

  const enrolledFactors = useMemo(() => {
    if (!user) return [];
    try {
      return multiFactor(user).enrolledFactors.map((f: any) => ({
        uid: f.uid,
        displayName: f.displayName ?? '',
        factorId: f.factorId,
        phone: f.phoneNumber,
      }));
    } catch (e) {
      return [];
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    loading,
    mfaResolver,
    setMfaResolver,
    signUpEmail,
    signInEmail,
    signInSms,
    confirmSmsLogin,
    linkPhoneToUser,
    confirmLinkPhoneCode,
    enrollPhoneMfa,
    confirmPhoneMfa,
    solveMfaPhone,
    sendMfaSms,
    sendVerifyEmail,
    resetPasswordEmail,
    confirmResetPassword,
    verifyEmailCode,
    reauthenticate,
    confirmationResult,
    setConfirmationResult,
    deleteAccount,
    signOut,
    updateProfileInfo,
    changePassword,
    disableMfaFactor,
    reloadUser,
    enrolledFactors,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
