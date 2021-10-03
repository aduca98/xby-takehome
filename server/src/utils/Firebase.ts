import * as FirebaseClient from "firebase-admin";
import { config } from "../config";

const Firebase = FirebaseClient.initializeApp({
    credential: FirebaseClient.credential.cert({
        projectId: config.firebase.projectId,
        privateKey: config.firebase.privateKey,
        clientEmail: config.firebase.clientEmail,
    }),
});

export { Firebase };
