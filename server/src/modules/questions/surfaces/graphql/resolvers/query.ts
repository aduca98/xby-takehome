const _fetchQuestions: Resolvers["Query"]["featureFeed"] = async (
    _parent,
    args,
    ctx
) => {
    const { user: mongooseUser } = ctx;
    const { lng, lat, logUserId, sessionId, viewId, limit = 100 } = args;

    return null;
};

export const questionQueryResolver: Resolvers["Query"] = {
    questions: _fetchQuestions,
};
