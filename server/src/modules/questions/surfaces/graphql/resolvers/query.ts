import { QUESTIONS } from "src/modules/questions/infra/memory";

const _fetchQuestions: Resolvers["Query"]["featureFeed"] = async (
    _parent,
    args,
    ctx
) => {
    return QUESTIONS;
};

export const questionQueryResolver: Resolvers["Query"] = {
    questions: _fetchQuestions,
};
