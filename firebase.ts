import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
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
let storage: FirebaseStorage | null = null;
let functions: Functions | null = null;
let analytics: Promise<Analytics | null> = Promise.resolve(null);

try {
  // Only attempt initialization if we have the critical API key
  if (firebaseConfig.apiKey) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    functions = getFunctions(app);
    analytics = isSupported().then(yes => yes ? getAnalytics(app!) : null).catch(() => null);

    // Initialize App Check
    const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY;
    const debugToken = import.meta.env.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN;
    
    if (import.meta.env.DEV) {
      // Use the manual token from .env if it exists, otherwise use 'true' to auto-generate
      (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken || true;
      
      // NOTE: Only enable this for fictional phone numbers. 
      // For real SMS, this MUST be false or commented out.
      if (auth) {
        auth.settings.appVerificationDisabledForTesting = true;
      }
    }

    if (appCheckSiteKey) {
      initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(appCheckSiteKey),
        isTokenAutoRefreshEnabled: true
      });
    } else if (import.meta.env.DEV) {
      console.warn("App Check Site Key is missing. Requests will fail if Enforcement is enabled in Firebase.");
    }
  }
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

export { app, auth, db, storage, functions, analytics };
