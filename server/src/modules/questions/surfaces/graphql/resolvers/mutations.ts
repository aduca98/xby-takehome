import { ApolloError } from "apollo-server-errors";
import {
    MutationResolvers,
    Resolvers,
} from "src/core/surfaces/graphql/generated/types";
import { UserRepository } from "src/modules/users/domain";
import HttpStatus from "http-status-codes";

const _answerQuestionsResolver =
    (userRepo: UserRepository): MutationResolvers["answerQuestions"] =>
    async (_parent, args) => {
        // const { username } = args;

        // const response = await userRepo.findByUsername(username);

        // if (response.isFailure()) {
        //     throw new ApolloError(
        //         "Failed to load user!",
        //         HttpStatus.INTERNAL_SERVER_ERROR.toString()
        //     );
        // }

        return null as any;
    };

export const userMutationResolver = (
    userRepo: UserRepository
): MutationResolvers => ({
    answerQuestions: _answerQuestionsResolver(userRepo),
});
