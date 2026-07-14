const path = require("path");
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require(path.join(
    __dirname,
    "credentials",
    "serviceAccountKey.json"
));

if (getApps().length === 0) {
    initializeApp({
        credential: cert(serviceAccount),
    });

    console.log("🔥 Firebase Admin Initialized");
}

module.exports = getAuth();