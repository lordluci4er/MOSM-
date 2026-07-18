import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import serviceAccount from "../../credentials/firebase-service-account.json";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: serviceAccount.private_key,
    }),
  });

  console.log("✅ Firebase Admin SDK Initialized");
}

export const firebaseAuth = getAuth();