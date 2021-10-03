import { pgUserRepo } from "src/modules/users/infra/postgres/User";
import config from "../../../config";
import { Request, Response, NextFunction } from "express";
import { Exception } from "src/core/logic/Exception";
import Firebase from "../../../utils/Firebase";
import { User } from "src/modules/users/domain";

export type KeyScope = "secret" | "public";
export type KeyType = "live" | "test";

export type IKeyAuth = {
    errorType: string;
    message: string;
    type: KeyType;
    scope: KeyScope;
    key: string;
};

export interface IJwtAuth {
    errorType: string;
    message: string;
    isAuthorized: boolean;
    accessToken: string | null;
    decodedToken: string | null;
    user: User | null;
    verified: boolean;
}

const tokenAuthentication = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    res.locals.jwtAuth = {
        errorType: null,
        message: "",
        isAuthorized: false,
        accessToken: null,
        user: null
    };

    if (config.env === "test") {
        // Only when testing, let us bypass authentication and just supply
        // a user ID directly. `userToken` still takes precedence if it is
        // present.
        const auth = req.get("Authorization");
        res.locals.jwtAuth.accessToken = auth;

        if (!auth) {
            res.locals.jwtAuth = {
                errorType: "Forbidden",
                isAuthorized: false,
                user: null,
                message: "Missing authorization header."
            };
            return next();
        }
        const authParts = auth.split(" ");
        if (authParts.length !== 2) {
            res.locals.jwtAuth = {
                errorType: "Forbidden",
                isAuthorized: false,
                user: null,
                message: "Missing authorization header."
            };
            return next();
        }
        const testUserId = authParts[1];

        if (testUserId) {
            pgUserRepo
                .findById(testUserId)
                .then(user => {
                    res.locals.jwtAuth = {
                        isAuthorized: true,
                        user: user,
                        message: "Authorized user."
                    };

                    next();
                })
                .catch(err => {
                    res.locals.jwtAuth = {
                        errorType: "Forbidden",
                        isAuthorized: false,
                        user: null,
                        message: err.message
                    };
                    next();
                });
            return;
        } else {
            res.locals.jwtAuth = {
                errorType: "Forbidden",
                isAuthorized: false,
                user: null,
                message: "No user."
            };
            next();
        }
    }

    const auth = req.get("Authorization");
    res.locals.jwtAuth.accessToken = auth;

    if (!auth) {
        res.locals.jwtAuth = {
            errorType: "Forbidden",
            isAuthorized: false,
            user: null,
            message: "Missing authorization header."
        };
        return next();
    }
    const authParts = auth.split(" ");
    if (authParts.length !== 2) {
        res.locals.jwtAuth = {
            errorType: "Forbidden",
            isAuthorized: false,
            user: null,
            message: "Missing authorization header."
        };
        return next();
    }
    const token = authParts[1];
    Firebase.auth()
        .verifyIdToken(token)
        .then(async decodedToken =>
            pgUserRepo.findByAuthProviderId(decodedToken.uid)
        )
        .then(user => {
            if (user.isSuccess()) {
                res.locals.jwtAuth = {
                    isAuthorized: true,
                    user: user.value,
                    message: "Authorized user."
                };
            } else {
                res.locals.jwtAuth = {
                    errorType: "Forbidden",
                    isAuthorized: false,
                    user: null,
                    message: "No user with this uid."
                };
            }
            next();
        })
        .catch(err => {
            res.locals.jwtAuth = {
                errorType: "Forbidden",
                isAuthorized: false,
                user: null,
                message: err.message
            };
            next();
        });
};

const requireAuth = (_: Request, res: Response, next: NextFunction): void => {
    const scopes: string[] = [];

    let message = "";
    let errorType = "";
    let statusCode = 403;

    if (res.locals.jwtAuth.isAuthorized && res.locals.jwtAuth.user) {
        scopes.push("token");
    } else {
        message = res.locals.jwtAuth.message;
        errorType = res.locals.jwtAuth.errorType;
        statusCode = 401;
    }

    // if (res.locals.keyAuth && res.locals.keyAuth.key) {
    //     scopes.push("key");
    // } else {
    //     message = res.locals.keyAuth.message;
    //     errorType = res.locals.keyAuth.errorType;
    // }

    // if there are scopes
    if (scopes.length > 0) {
        next();
        return;
    }

    throw new Exception(
        errorType || "Forbidden",
        message || "An error has occurred.",
        statusCode
    );
};

const requireAdmin = async (
    _: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    let message = "";
    let errorType = "";

    if (
        res.locals.jwtAuth.isAuthorized &&
        res.locals.jwtAuth.user &&
        res.locals.jwtAuth.user.admin &&
        res.locals.jwtAuth.user.admin.isAdmin
    ) {
        return next();
    } else if (res.locals.jwtAuth) {
        message = "Need admin permissions for this endpoint.";
        errorType = res.locals.jwtAuth.errorType;
    }

    throw new Exception(
        errorType || "Forbidden",
        message || "An error has occurred.",
        403
    );
};

export { requireAuth, requireAdmin, tokenAuthentication };
