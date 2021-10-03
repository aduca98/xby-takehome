import { ApolloError } from "apollo-server-errors";
import {
    QueryResolvers,
    Resolvers,
} from "src/core/surfaces/graphql/generated/types";
import { QuestionRepository } from "src/modules/questions/domain/repos";
import HttpStatus from "http-status-codes";
import { QuestionGQLRootMapper } from "../mappers/QuestionGQLMapper";

const _fetchQuestions = (questionRepo: QuestionRepository) => async () => {
    const response = await questionRepo.findActive();

    if (response.isFailure()) {
        throw new ApolloError(
            "Failed to get questions!",
            HttpStatus.INTERNAL_SERVER_ERROR.toString()
        );
    }

    return response.value.map(QuestionGQLRootMapper.toGQLRoot);
};

export const questionQueryResolver = (
    questionRepo: QuestionRepository
): QueryResolvers => ({
    activeQuestions: _fetchQuestions(questionRepo),
});
