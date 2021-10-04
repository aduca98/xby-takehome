import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { config } from "src/config";

const Firebase = initializeApp({
    apiKey: config.firebase.apiKey,
    appId: config.firebase.appId,
    measurementId: config.firebase.measurementId,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
});

const auth = getAuth(Firebase);

async function getAuthToken(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const currentUser = auth.currentUser;

        if (currentUser) {
            currentUser
                .getIdToken(/* forceRefresh */ true)
                .then(resolve)
                .catch(reject);
        } else {
            return resolve(null);
        }
    });
}

export { Firebase, auth, getAuthToken };
