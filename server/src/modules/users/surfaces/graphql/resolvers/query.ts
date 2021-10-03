import { ApolloError } from "apollo-server-errors";
import { Resolvers, User } from "shared/types";
import { UserRepository } from "src/modules/users/domain";
import HttpStatus from "http-status-codes";

const _resolveMe = (userRepo: UserRepository) => async (_parent, args, ctx) => {
    return {} as User;
};

const _resolveByUsername =
    (userRepo: UserRepository) => async (_parent, args) => {
        const { username } = args;

        const response = await userRepo.findByUsername(username);

        if (response.isFailure()) {
            throw new ApolloError(
                "Failed to load user!",
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        return response.value;
    };

export const userQueryResolver = (
    userRepo: UserRepository
): Resolvers["Query"] => ({
    me: _resolveMe(userRepo),
    getByUsername: _resolveByUsername(userRepo),
});
