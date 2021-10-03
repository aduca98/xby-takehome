const _resolveMe: Resolvers["Query"]["featureFeed"] = async (
    _parent,
    args,
    ctx
) => {
    const { user: mongooseUser } = ctx;
    const { lng, lat, logUserId, sessionId, viewId, limit = 100 } = args;

    return null;
};

export const userQueryResolver: Resolvers["Query"] = {
    me: _resolveMe,
    profile: _resolveMe,
};
