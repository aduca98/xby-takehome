import {
    addResolversToSchema,
    GraphQLFileLoader,
    loadSchemaSync,
} from "graphql-tools";
import { merge } from "lodash/fp";
import rootPath from "app-root-path";

const resolvers = [].reduce(merge);

export const schema = addResolversToSchema({
    schema: loadSchemaSync(rootPath + "/**/*.graphql", {
        loaders: [new GraphQLFileLoader()],
    }),
    resolvers,
});
