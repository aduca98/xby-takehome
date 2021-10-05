import { success, failure } from "src/core/logic";
import { UnexpectedError, NotFoundError } from "src/core/logic/errors";
import {
    UserRepository,
    UserResponse,
    User,
    AuthProvider,
    Answer,
    AnswerArrayResponse,
} from "src/modules/users/domain";
import { UserModel } from "src/core/infra/mongo/models";
import { UserMapper, AnswerMapper } from "./mapper";

export class MongoUserRepository implements UserRepository {
    constructor(
        private model: typeof UserModel,
        private mapper: typeof UserMapper,
        private answerMapper: typeof AnswerMapper
    ) {}

    async findById(userId: string): Promise<UserResponse> {
        try {
            const user = await this.model.findById(userId);

            if (!user) {
                return failure(new NotFoundError("User not found."));
            }

            return success(this.mapper.toDomain(user));
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

            return success(this.mapper.toDomain(user));
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }

    async findByAuthProviderId(authProviderId: string): Promise<UserResponse> {
        try {
            const user = await this.model.findOne({
                "auth.providerId": authProviderId,
            });

            if (!user) {
                return failure(new NotFoundError("User not found."));
            }

            return success(this.mapper.toDomain(user));
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }

    answerQuestions = async (
        userId: string,
        answers: Answer[]
    ): Promise<AnswerArrayResponse> => {
        try {
            const user = await this.model.findById(userId);

            if (!user) {
                return failure(new NotFoundError("User not found."));
            }

            const persistedAnswers = answers.map(
                this.answerMapper.toPersistence
            );

            user.set({
                answers: persistedAnswers,
            });

            await user.save();

            return success(answers);
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    };

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

            return success(this.mapper.toDomain(user));
        } catch (err) {
            console.error(err);
            return failure(new UnexpectedError(err));
        }
    }

    async create(user: User): Promise<UserResponse> {
        try {
            const newUser = new this.model(user);

            await newUser.save();

            return success(this.mapper.toDomain(newUser));
        } catch (err) {
            return failure(new UnexpectedError(err));
        }
    }
}
