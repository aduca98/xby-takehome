import { ApolloError } from "apollo-server-errors";
import { Resolvers } from "shared/types";
import { QuestionRepository } from "src/modules/questions/domain/repos";
import HttpStatus from "http-status-codes";

const _fetchQuestions = (questionRepo: QuestionRepository) => async () => {
    const response = await questionRepo.findActive();

    if (response.isFailure()) {
        throw new ApolloError(
            "Failed to get questions!",
            HttpStatus.INTERNAL_SERVER_ERROR.toString()
        );
    }

    return response.value as any[]; // TODO: fix
};

export const questionQueryResolver = (
    questionRepo: QuestionRepository
): Resolvers["Query"] => ({
    activeQuestions: _fetchQuestions(questionRepo),
});
