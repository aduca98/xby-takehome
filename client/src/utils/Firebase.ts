import * as firebase from "@firebase/app";
import * as auth from "@firebase/auth";

import { config } from "../config";

const Firebase = firebase.initializeApp(config.firebase);

const FirebaseAuth = auth.initializeAuth(Firebase);

async function getAuthToken(): Promise<string | null> {
    return new Promise((resolve, reject) => {
        const currentUser = auth.getAuth().currentUser;

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

export { Firebase, FirebaseAuth, auth, getAuthToken };
