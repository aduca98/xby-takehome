import { Resolvers } from "src/core/surfaces/graphql/generated/types";
import { userQueryResolver } from "./query";

export const userResolvers: Resolvers = {
    Query: userQueryResolver,
};
