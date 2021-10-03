import { Resolvers } from "shared/types";
import { QuestionRepository } from "src/modules/questions/domain/repos";
import { questionQueryResolver } from "./query";
import { questionResolver } from "./question";

export const questionResolvers = (
    questionRepo: QuestionRepository
): Resolvers => ({
    Query: questionQueryResolver(questionRepo),
    Question: questionResolver,
});
