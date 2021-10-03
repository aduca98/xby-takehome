import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { merge } from "lodash/fp";
import * as rootPath from "app-root-path";
import { addResolversToSchema } from "@graphql-tools/schema";
import { mongoUserRepository } from "src/modules/users/infra/mongo/User";
import { memoryQuestionRepo } from "src/modules/questions/infra/memory";
import { userResolvers } from "src/modules/users/surfaces/graphql/resolvers";
import { questionResolvers } from "src/modules/questions/surfaces/graphql/resolvers";

const path = rootPath + "/**/*.graphql";

const resolvers = [
    userResolvers(mongoUserRepository),
    questionResolvers(memoryQuestionRepo),
].reduce(merge);

const executableSchema = loadSchemaSync(path, {
    loaders: [new GraphQLFileLoader()],
});

export const schema = addResolversToSchema({
    schema: executableSchema,
    resolvers,
});
