import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { merge } from "lodash/fp";
import rootPath from "app-root-path";
import { addResolversToSchema } from "@graphql-tools/schema";
import { userQueryResolver } from "src/modules/users/surfaces/graphql/resolvers/query";
import { questionQueryResolver } from "src/modules/questions/surfaces/graphql/resolvers/query";
import { mongoUserRepository } from "src/modules/users/infra/mongo/User";
import { memoryQuestionRepo } from "src/modules/questions/infra/memory";
import { QueryResolvers } from "shared/types";

const resolvers = [
    userQueryResolver(mongoUserRepository),
    questionQueryResolver(memoryQuestionRepo),
].reduce(merge) as QueryResolvers;

const executableSchema = loadSchemaSync(rootPath + "/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
});

export const schema = addResolversToSchema({
    schema: executableSchema,
    resolvers,
});
