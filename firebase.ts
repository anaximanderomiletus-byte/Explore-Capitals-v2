import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Promise<Analytics | null> = Promise.resolve(null);

// PERFORMANCE: Track initialization state
let isInitialized = false;
let initPromise: Promise<void> | null = null;

// PERFORMANCE: Lazy initialization function - call this when Firebase is actually needed
export const initializeFirebase = (): Promise<void> => {
  if (isInitialized) return Promise.resolve();
  if (initPromise) return initPromise;
  
  initPromise = new Promise((resolve) => {
    try {
      if (firebaseConfig.apiKey) {
        app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        // Defer analytics - not critical for app function
        analytics = isSupported().then(yes => yes ? getAnalytics(app!) : null).catch(() => null);

        const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY;
        const debugToken = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;
        
        if (import.meta.env.DEV) {
          (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken || true;
          if (auth) {
            auth.settings.appVerificationDisabledForTesting = true;
          }
        }

        if (appCheckSiteKey) {
          initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(appCheckSiteKey),
            isTokenAutoRefreshEnabled: true
          });
        }
      }
      isInitialized = true;
      resolve();
    } catch (error) {
      console.error("Firebase initialization failed:", error);
      resolve(); // Still resolve to not block the app
    }
  });
  
  return initPromise;
};

// PERFORMANCE: Initialize Firebase after a short delay to not block initial render
// This allows the app shell to render first
if (typeof window !== 'undefined') {
  // Use requestIdleCallback if available, otherwise setTimeout
  const scheduleInit = () => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => initializeFirebase(), { timeout: 2000 });
    } else {
      setTimeout(initializeFirebase, 100);
    }
  };
  
  // Schedule after initial paint
  if (document.readyState === 'complete') {
    scheduleInit();
  } else {
    window.addEventListener('load', scheduleInit, { once: true });
  }
}

export { app, auth, db, analytics };
