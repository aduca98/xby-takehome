import { ApolloError } from "apollo-server-errors";
import {
    QueryResolvers,
    Resolvers,
    User,
} from "src/core/surfaces/graphql/generated/types";
import { UserRepository } from "src/modules/users/domain";
import HttpStatus from "http-status-codes";
import { AnswerGQLRootMapper } from "../mappers";

const _resolveMe = (): QueryResolvers["me"] => async (_parent, _, ctx) => {
    return ctx.user;
};

const _resolveByUsername =
    (userRepo: UserRepository): QueryResolvers["getByUsername"] =>
    async (_parent, args) => {
        const { username } = args;

        const response = await userRepo.findByUsername(username);

        if (response.isFailure()) {
            throw new ApolloError(
                "Failed to load user!",
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        const user = response.value;

        return {
            name: user.name,
            lastName: user.lastName,
            firstName: user.firstName,
            profileUrl: user.profilePictureUrl,
            createdAt: user.createdAt,
            answers: user.answers.map(AnswerGQLRootMapper.toGQLRoot),
        };
    };

export const userQueryResolver = (
    userRepo: UserRepository
): QueryResolvers => ({
    me: _resolveMe(),
    getByUsername: _resolveByUsername(userRepo),
});
