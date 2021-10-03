import { mongooseFeatureRepository } from "#feature/infra/mongoose/repos";
import { FeatureGQLRootMapper } from "#feature/surfaces/graphql/mappers/graphql";
import { FeatureUseCases } from "#feature/useCases";
import { UserMongoosePersistenceMapper } from "#user/infra/mongoose/mappers/UserMongoosePersistenceMapper";
import { ApolloError } from "apollo-server-express";
import HttpStatus from "http-status-codes";
import { Resolvers } from "src/core/surfaces/graphql/generated/types";
import { makeByIdResolver } from "src/core/surfaces/graphql/makeByIdResolver";

const _resolveFeatureById: Resolvers["Query"]["featureById"] = makeByIdResolver(
    mongooseFeatureRepository.findById.bind(mongooseFeatureRepository),
    FeatureGQLRootMapper.toGQLRoot
);

const _resolveFeatureFeed: Resolvers["Query"]["featureFeed"] = async (
    _parent,
    args,
    ctx
) => {
    const { user: mongooseUser } = ctx;
    const { lng, lat, logUserId, sessionId, viewId, limit = 100 } = args;

    if (!mongooseUser) {
        throw new ApolloError(
            "User not found.",
            HttpStatus.INTERNAL_SERVER_ERROR.toString()
        );
    }

    const user = UserMongoosePersistenceMapper.toDomain(mongooseUser);

    // make sure lng & lat either both exist or are both falsey
    if ((!lng && !!lat) || (!lat && !!lng)) {
        throw new ApolloError(
            "Please provide complete coordinates or no coordinates.",
            HttpStatus.BAD_REQUEST.toString()
        );
    }

    const features = await FeatureUseCases.getFeaturesFeed.execute({
        user,
        ...(!!lng &&
            !!lat && {
                coords: {
                    lng,
                    lat,
                },
            }),
        logUserId,
        sessionId,
        viewId,
    });

    if (features.isFailure()) {
        throw new ApolloError(
            "Failed to get feature feed.",
            HttpStatus.INTERNAL_SERVER_ERROR.toString()
        );
    }

    return features.value.slice(0, limit).map(FeatureGQLRootMapper.toGQLRoot);
};

export const featureQueryResolver: Resolvers["Query"] = {
    featureById: _resolveFeatureById,
    featureFeed: _resolveFeatureFeed,
};
