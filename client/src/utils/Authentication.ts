import {
    fetchSignInMethodsForEmail,
    EmailAuthProvider,
    UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
    AuthProvider,
} from "firebase/auth";

import { auth } from "./Firebase";

type OnSuccess = (fb: UserCredential) => Promise<void>;

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

const thirdPartyAuth =
    (provider: AuthProvider) =>
    async (onSuccess: OnSuccess): Promise<void> => {
        try {
            // FIXME: this doesn't work for mobile
            const result = await signInWithPopup(auth, provider);

            await onSuccess(result);
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

    return "Failed to login.";
};

const Authentication = {
    google: thirdPartyAuth(new GoogleAuthProvider()),
};

export default Authentication;
