import { Resolvers } from "shared/types";
import { UserRepository } from "src/modules/users/domain";
import { userQueryResolver } from "./query";
import { userResolver } from "./user";
import { userMutationResolver } from "./mutations";

export const userResolvers = (userRepo: UserRepository): Resolvers => ({
    Query: userQueryResolver(userRepo),
    Mutation: userMutationResolver(userRepo),
    User: userResolver,
});
