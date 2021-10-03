import { ApolloError } from "apollo-server-errors";
import {
    QueryResolvers,
    Resolvers,
    User,
} from "src/core/surfaces/graphql/generated/types";
import { UserRepository } from "src/modules/users/domain";
import HttpStatus from "http-status-codes";

const _resolveMe =
    (userRepo: UserRepository): QueryResolvers["me"] =>
    async (_parent, args, ctx) => {
        return {} as User;
    };

const _resolveByUsername =
    (userRepo: UserRepository): QueryResolvers["getByUsername"] =>
    async (_parent, args, ctx) => {
        const { username } = ctx;

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
): QueryResolvers => ({
    me: _resolveMe(userRepo),
    getByUsername: _resolveByUsername(userRepo),
});
