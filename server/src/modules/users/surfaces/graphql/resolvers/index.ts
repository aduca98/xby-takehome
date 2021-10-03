import { Resolvers } from "src/core/surfaces/graphql/generated/types";
import { featureQueryResolver } from "./featureQueryResolver";
import { featureResolver } from "./featureResolver";

export const featureResolvers: Resolvers = {
    Query: featureQueryResolver,
    Feature: featureResolver,
};
