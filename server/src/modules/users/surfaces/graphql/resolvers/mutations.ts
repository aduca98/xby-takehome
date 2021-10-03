import { ApolloError } from "apollo-server-errors";
import {
    MutationResolvers,
    Resolvers,
} from "src/core/surfaces/graphql/generated/types";
import { UserRepository } from "src/modules/users/domain";
import HttpStatus from "http-status-codes";

const _updateUserResolver =
    (userRepo: UserRepository): MutationResolvers["updateMe"] =>
    async (_parent, args, ctx) => {
        return null as any;
    };

const _createUserResolver =
    (userRepo: UserRepository): MutationResolvers["createUser"] =>
    async (_parent) => {
        return null as any;
    };

export const userMutationResolver = (
    userRepo: UserRepository
): Resolvers["Mutation"] => ({
    updateMe: _updateUserResolver(userRepo),
    createUser: _createUserResolver(userRepo),
});
