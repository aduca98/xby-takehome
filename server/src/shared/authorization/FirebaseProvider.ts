import { auth } from "firebase-admin";
import { failure, FailureOrSuccess, success } from "src/core/logic";
import { UnexpectedError } from "src/core/logic/errors";
import { Firebase } from "src/utils";

const deleteUser = async (
    uid: string
): Promise<FailureOrSuccess<UnexpectedError, null>> => {
    try {
        await Firebase.auth().deleteUser(uid);

        return success(null);
    } catch (err) {
        return failure(new UnexpectedError(err));
    }
};

const createUser = async (
    properties: auth.CreateRequest
): Promise<FailureOrSuccess<UnexpectedError, auth.UserRecord>> => {
    try {
        const fbUser = await Firebase.auth().createUser(properties);

        return success(fbUser);
    } catch (err) {
        return failure(new UnexpectedError(err));
    }
};

const verifyToken = async (
    token: string
): Promise<FailureOrSuccess<UnexpectedError, auth.DecodedIdToken>> => {
    try {
        const decodedToken = await Firebase.auth().verifyIdToken(token);

        return success(decodedToken);
    } catch (err) {
        return failure(new UnexpectedError(err));
    }
};

export const FirebaseProvider = {
    createUser,
    verifyToken,
    deleteUser,
};
