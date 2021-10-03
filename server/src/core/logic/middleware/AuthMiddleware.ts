import { Request, Response, NextFunction } from "express";
import { Firebase } from "src/utils/Firebase";
import { User, UserRepository } from "src/modules/users/domain";

export interface IJwtAuth {
    errorType: string;
    message: string;
    isAuthorized: boolean;
    accessToken: string | null;
    decodedToken: string | null;
    user: User | null;
}

const tokenAuthentication =
    (userRepo: UserRepository) =>
    (req: Request, res: Response, next: NextFunction): void => {
        res.locals.jwtAuth = {
            errorType: null,
            message: "",
            isAuthorized: false,
            accessToken: null,
            user: null,
        };

        const auth = req.get("Authorization");

        res.locals.jwtAuth.accessToken = auth;

        if (!auth) {
            res.locals.jwtAuth = {
                errorType: "Forbidden",
                isAuthorized: false,
                user: null,
                message: "Missing authorization header.",
            };
            return next();
        }

        const authParts = auth.split(" ");

        if (authParts.length !== 2) {
            res.locals.jwtAuth = {
                errorType: "Forbidden",
                isAuthorized: false,
                user: null,
                message: "Missing authorization header.",
            };
            return next();
        }

        const token = authParts[1];

        Firebase.auth()
            .verifyIdToken(token)
            .then(async (decodedToken) =>
                userRepo.findByAuthProviderId(decodedToken.uid)
            )
            .then((user) => {
                if (user.isSuccess()) {
                    res.locals.jwtAuth = {
                        isAuthorized: true,
                        user: user.value,
                        message: "Authorized user.",
                    };
                } else {
                    res.locals.jwtAuth = {
                        errorType: "Forbidden",
                        isAuthorized: false,
                        user: null,
                        message: "No user with this uid.",
                    };
                }
                next();
            })
            .catch((err) => {
                res.locals.jwtAuth = {
                    errorType: "Forbidden",
                    isAuthorized: false,
                    user: null,
                    message: err.message,
                };
                next();
            });
    };

export { tokenAuthentication };
