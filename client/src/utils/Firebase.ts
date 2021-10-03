import { initializeAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

import { config } from "../config";

const Firebase = initializeApp(config.firebase);
const FirebaseAuth = initializeAuth(Firebase);

async function getAuthToken(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const currentUser = FirebaseAuth.currentUser;

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

export { Firebase, FirebaseAuth, getAuthToken };
