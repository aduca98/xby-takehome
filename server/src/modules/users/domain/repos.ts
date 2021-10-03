import { FailureOrSuccess } from "src/core/logic";
import {
    NotFoundError,
    UnexpectedError,
    FailedWriteError,
} from "src/core/logic/errors";
import { User } from "./types";

export type Errors = NotFoundError | UnexpectedError | FailedWriteError;

export type UserResponse = FailureOrSuccess<Errors, User>;

export interface UserRepository {
    findById(userId: string): Promise<UserResponse>;
    findByUsername(username: string): Promise<UserResponse>;
    findByAuthProviderId(authProviderId: string): Promise<UserResponse>;
    update(userId: string, updates: Partial<User>): Promise<UserResponse>;
    create(user: User): Promise<UserResponse>;
}
