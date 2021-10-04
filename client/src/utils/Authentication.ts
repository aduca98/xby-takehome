import { useEffect } from "react";
import { isMobile } from "react-device-detect";
import {
    fetchSignInMethodsForEmail,
    EmailAuthProvider,
    UserCredential,
    GoogleAuthProvider,
    getRedirectResult,
    signInWithRedirect,
    signInWithPopup,
    AuthProvider,
} from "firebase/auth";

import { auth } from "./Firebase";

const _onError = async (error) => {
    console.error(error);
    let errorMessage = error.message;

    if (error.code === "auth/account-exists-with-different-credential") {
        const methods = await fetchSignInMethodsForEmail(auth, error.email);

        errorMessage = "This user already has an account. ";

        if (
            methods.indexOf(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD) !==
            -1
        ) {
            errorMessage +=
                "Please login with the email and password associated with this account. ";
        }

        if (methods.indexOf(GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD) !== -1) {
            errorMessage +=
                "Please login with the Google account associated with this account. ";
        }
    }

    return errorMessage;
};

export const onAuthSuccess = async (firebaseUser: UserCredential | null) => {
    // The signed-in user info.

    if (!firebaseUser) {
        return null;
    }

    const user = firebaseUser.user;

    let firstName = "";
    let lastName = "";
    if (user.displayName) {
        const name = user.displayName.split(" ");
        if (name.length >= 1) {
            firstName = name[0];
        }
        if (name.length >= 2) {
            lastName = name.slice(1).join(" ");
        }
    }

    return {
        provider: "firebase",
        providerId: user.uid,
        firstName,
        lastName,
    };
};

const listenForFirebaseRedirect = () => {
    getRedirectResult(auth).then(onAuthSuccess).catch(_onError);
};

const useFirebaseRedirectListener = () => {
    useEffect(() => {
        listenForFirebaseRedirect();
    }, []);
};

const thirdPartyAuth = (provider: AuthProvider) => async (): Promise<void> => {
    try {
        // Need to use with redirect for mobile else it doesn't work
        // in safari
        const thirdPartyAuthFxn = isMobile
            ? () => signInWithRedirect(auth, provider)
            : () => signInWithPopup(auth, provider);

        console.log(thirdPartyAuthFxn);

        const result = await thirdPartyAuthFxn();

        console.log(result);

        if (result) {
            await onAuthSuccess(result);
        }
    } catch (err) {
        const errorMessage = await _onError(err);

        throw new Error(errorMessage);
    }
};

export const getLoginErrorMessage = (methods: string[]) => {
    if (!methods.length) {
        return "You do not have an account. Please sign up.";
    }

    if (methods.includes("google.com")) {
        return "Looks like you already signed up with Google. Please sign in with Google.";
    }

    if (methods.includes("facebook.com")) {
        return "Looks like you already signed up with a Facebook account. Please sign in with Facebook.";
    }

    if (methods.includes("apple.com")) {
        return "Looks like you already signed up with an Apple account. Please sign in with Apple.";
    }

    return "Failed to login.";
};

const Authentication = {
    onAuthSuccess,
    google: thirdPartyAuth(new GoogleAuthProvider()),
    listenForFirebaseRedirect,
    useFirebaseRedirectListener,
};

export default Authentication;
