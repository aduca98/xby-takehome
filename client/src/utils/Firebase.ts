import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
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
const storage = getStorage(Firebase);

const getAuthToken = async (): Promise<string | null> => {
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
};

const upload = async (path: string, file: File): Promise<string> => {
    const storageRef = ref(storage, `${path}/${uuidv4()}/${file.name}`);

    await uploadBytes(storageRef, file);

    const publicUrl = await getDownloadURL(storageRef);

    return publicUrl;
};

export { Firebase, auth, getAuthToken, upload };
