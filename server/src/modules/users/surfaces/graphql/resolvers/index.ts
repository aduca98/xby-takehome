import { Resolvers } from "src/core/surfaces/graphql/generated/types";
import { UserRepository } from "src/modules/users/domain";
import { userQueryResolver } from "./queries";
import { userMutationResolver } from "./mutations";

export const userResolvers = (userRepo: UserRepository): Resolvers => ({
    Query: userQueryResolver(userRepo),
    Mutation: userMutationResolver(userRepo),
});
