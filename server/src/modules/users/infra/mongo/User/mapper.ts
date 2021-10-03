import { UserDocument } from "src/core/infra/mongo/models/User";
import { User } from "src/modules/users/domain";

const UserMapper = {
    toDomain: (user: UserDocument): User => ({
        ...user.toJSON(),
    }),
    toPersistence: (user: User): UserDocument => ({
        ...user,
    }),
};

export { UserMapper };
