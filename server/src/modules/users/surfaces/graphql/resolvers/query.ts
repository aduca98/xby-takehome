import { UserRepository } from "src/modules/users/domain";

const _resolveMe =
    (userRepo: UserRepository): Resolvers["Query"]["featureFeed"] =>
    async (_parent, args, ctx) => {
        const { user: mongooseUser } = ctx;
        const { lng, lat, logUserId, sessionId, viewId, limit = 100 } = args;

        return null;
    };

const _resolveProfile =
    (userRepo: UserRepository): Resolvers["Query"]["featureFeed"] =>
    async (_parent, args, ctx) => {
        const { username } = args;

        return null;
    };

export const userQueryResolver: Resolvers["Query"] = (
    userRepo: UserRepository
) => ({
    me: _resolveMe(userRepo),
    profile: _resolveProfile(userRepo),
});
