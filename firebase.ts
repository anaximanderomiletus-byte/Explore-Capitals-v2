import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getFunctions, Functions } from 'firebase/functions';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

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

    // Initialize App Check (in a separate try/catch so it never blocks core services)
    try {
      const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY;

      if (import.meta.env.DEV) {
        // In dev mode, enable the debug provider so the Firebase emulator
        // accepts requests without a real reCAPTCHA token.
        // Setting to `true` auto-generates a debug token logged to the console;
        // register that token in the Firebase Console → App Check → Debug tokens.
        // IMPORTANT: we intentionally do NOT read the debug token from a VITE_
        // env var — Vite inlines all VITE_ values into the production bundle,
        // which would leak the token to every visitor.
        (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
        if (auth) {
          auth.settings.appVerificationDisabledForTesting = true;
        }
      }

      if (appCheckSiteKey) {
        initializeAppCheck(app, {
          provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
          isTokenAutoRefreshEnabled: true
        });
      } else if (import.meta.env.DEV) {
        console.warn("App Check Site Key is missing. Requests will fail if Enforcement is enabled in Firebase.");
      }
    } catch {
      // App Check init failed — non-critical, silently continue
    }
  }
} catch {
  // Firebase initialization failed — app will run in offline/degraded mode
}

export { app, auth, db, storage, functions, analytics };
