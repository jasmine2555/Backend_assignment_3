import admin from "firebase-admin";

// your json is in project root (same level as package.json)
const serviceAccount = require("../../firebase-adminsdk.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();