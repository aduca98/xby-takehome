import { LeanDocument } from "mongoose";
import { UserDocument } from "src/core/infra/mongo/models/User";
import { User } from "src/modules/users/domain";

const UserMapper = {
    toDomain: (user: UserDocument): User => ({
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        name: user.name,
        username: user.username,
        auth: user.auth,
    }),
    toPersistence: (user: User): LeanDocument<UserDocument> => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        name: user.name,
        username: user.username,
        auth: user.auth,
    }),
};

export { UserMapper };
