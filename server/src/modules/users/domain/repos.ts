import { FailureOrSuccess } from "src/core/logic";
import { DefaultErrors } from "src/core/logic/errors";
import { User } from "./types";

export type UserResponse = FailureOrSuccess<DefaultErrors, User>;

export interface UserRepository {
    findById(userId: string): Promise<UserResponse>;
    findByUsername(username: string): Promise<UserResponse>;
    findByAuthProviderId(authProviderId: string): Promise<UserResponse>;
    update(userId: string, updates: Partial<User>): Promise<UserResponse>;
    create(user: User): Promise<UserResponse>;
}
