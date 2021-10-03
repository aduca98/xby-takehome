import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { merge } from "lodash/fp";
import rootPath from "app-root-path";
import { addResolversToSchema } from "@graphql-tools/schema";
import { userQueryResolver } from "src/modules/users/surfaces/graphql/resolvers/query";
import { questionQueryResolver } from "src/modules/questions/surfaces/graphql/resolvers/query";

const resolvers = [userQueryResolver, questionQueryResolver].reduce(merge);

const executableSchema = loadSchemaSync(rootPath + "/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
});

export const schema = addResolversToSchema({
    schema: executableSchema,
    resolvers,
});
