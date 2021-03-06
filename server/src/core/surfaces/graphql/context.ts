import {
    AuthProvider,
    User,
    UserAuth,
    UserRepository,
} from "src/modules/users/domain";
import { Maybe } from "src/core/logic";
import { propOr } from "lodash/fp";
import { FirebaseProvider } from "src/shared/authorization";

export type Context = {
    user: Maybe<User>;
    authProvider: Maybe<UserAuth>;
    errorType: Maybe<string>;
    isAuthorized: boolean;
    message: Maybe<string>;
};

const createContext =
    (userRepo: UserRepository) =>
    async ({ req }): Promise<Context> => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return {
                user: null,
                authProvider: null,
                errorType: "Unauthorized",
                isAuthorized: false,
                message: "Missing authorization header.",
            };
        }

        const authParts = authorization.split(" ");

        if (authParts.length !== 2) {
            return {
                user: null,
                authProvider: null,
                errorType: "Unauthorized",
                isAuthorized: false,
                message: "Invalid authorization header.",
            };
        }

        const token = authParts[1];

        try {
            const firebaseResponse = await FirebaseProvider.verifyToken(token);

            if (firebaseResponse.isFailure()) {
                return {
                    errorType: "Forbidden",
                    authProvider: null,
                    isAuthorized: false,
                    user: null,
                    message: firebaseResponse.error.message,
                };
            }

            const authProvider = {
                provider: AuthProvider.Firebase,
                providerId: firebaseResponse.value.uid,
            };

            const decodedToken = firebaseResponse.value;

            const response = await userRepo.findByAuthProviderId(
                decodedToken.uid
            );

            if (response.isFailure()) {
                return {
                    errorType: "Forbidden",
                    authProvider,
                    isAuthorized: false,
                    user: null,
                    message: "No user with this uid.",
                };
            }

            return {
                errorType: null,
                authProvider,
                isAuthorized: true,
                user: response.value,
                message: null,
            };
        } catch (err) {
            return {
                errorType: "Forbidden",
                authProvider: null,
                isAuthorized: false,
                user: null,
                message: propOr("Authorization failed.", "message", err),
            };
        }
    };

export { createContext };
