require("dotenv").config();

const parsePrivateKey = (key?: string) => (key || "").replace(/\\n/g, "\n");

export const config = {
    port: process.env.PORT || "5000",
    mongoUri: process.env.MONGO_URI || "",
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID || "",
        privateKey: parsePrivateKey(process.env.FIREBASE_PRIVATE_KEY),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    },
    google: {
        projectId: process.env.GOOGLE_PROJECT_ID || "",
        privateKey: parsePrivateKey(process.env.GOOGLE_PRIVATE_KEY),
        clientEmail: process.env.GOOGLE_CLIENT_EMAIL || "",
    },
};
