import { Resolvers } from "src/core/surfaces/graphql/generated/types";
import { questionQueryResolver } from "./query";

export const questionResolvers: Resolvers = {
    Query: questionQueryResolver,
};
