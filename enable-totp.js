/**
 * enable-totp.js
 * 
 * This script enables TOTP MFA for your Firebase project.
 * It must be run in a Node.js environment with proper authentication.
 * 
 * USAGE:
 * 1. Download your Service Account Key (JSON) from Firebase Console > Settings > Service Accounts.
 * 2. Set the environment variable: export GOOGLE_APPLICATION_CREDENTIALS="path/to/your/key.json"
 * 3. Run: node enable-totp.js
 */

const admin = require('firebase-admin');

// Initialize with default credentials from environment variable
admin.initializeApp();

async function enableTotpMfa() {
  try {
    const auth = admin.auth();
    const projectConfig = await auth.projectConfigManager().getProjectConfig();
    
    console.log('Current Multi-Factor State:', projectConfig.multiFactorConfig?.state || 'DISABLED');

    await auth.projectConfigManager().updateProjectConfig({
      multiFactorConfig: {
        state: 'ENABLED',
        factorConfigs: [
          {
            state: 'ENABLED',
            factorType: 'PHONE_SMS',
          },
          {
            state: 'ENABLED',
            factorType: 'TOTP',
            totpMfaProviderConfig: {
              numAdjacentIntervals: 5, // Allows a 2.5 min window (5 * 30s before and after)
            }
          }
        ]
      }
    });

    console.log('✅ TOTP MFA has been successfully enabled for your project.');
  } catch (error) {
    console.error('❌ Error enabling TOTP MFA:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Ensure you have set GOOGLE_APPLICATION_CREDENTIALS to your service account key path.');
    console.log('2. Ensure your project is upgraded to Identity Platform.');
  }
}

enableTotpMfa();
