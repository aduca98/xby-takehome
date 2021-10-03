import { Resolvers } from "src/core/surfaces/graphql/generated/types";
import { QuestionRepository } from "src/modules/questions/domain/repos";
import { questionQueryResolver } from "./queries";

export const questionResolvers = (
    questionRepo: QuestionRepository
): Resolvers => ({
    Query: questionQueryResolver(questionRepo),
});
