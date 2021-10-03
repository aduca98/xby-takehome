import { success, failure } from "src/core/logic";
import { UnexpectedError, NotFoundError } from "src/core/logic/errors";
import { UserRepository, UserResponse, User } from "src/modules/users/domain";
import { UserModel } from "src/core/infra/mongo/models";

export class MongoUserRepository implements UserRepository {
    constructor(private model: typeof UserModel) {}

    async findById(userId: string): Promise<UserResponse> {
        try {
            const user = await this.model.findById(userId);

            if (!user) {
                return failure(new NotFoundError("User not found."));
            }

            return success(user);
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }

    async findByUsername(username: string): Promise<UserResponse> {
        try {
            const user = await this.model.findOne({
                username,
            });

            if (!user) {
                return failure(new NotFoundError("User not found."));
            }

            return success(user);
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }

    async findByAuthProviderId(authProviderId: string): Promise<UserResponse> {
        try {
            const user = await this.model.findOne({
                "auth.provider": "",
            });

            if (!user) {
                return failure(new NotFoundError("User not found."));
            }

            return success(user);
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }

    async update(
        userId: string,
        updates: Partial<User>
    ): Promise<UserResponse> {
        try {
            const user = await this.model.findById(userId);

            if (!user) {
                return failure(
                    new UnexpectedError("Returning updated row failed.")
                );
            }

            user.set(updates);

            await user.save();

            return success(this.mapper.toDomain(row));
        } catch (err) {
            console.error(err);
            return failure(new UnexpectedError(err));
        }
    }

    async create(user: User): Promise<UserResponse> {
        try {
            const newUser = new this.model(user);

            await newUser.save();

            return success(newUser);
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }
}
