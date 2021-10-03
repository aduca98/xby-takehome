import { ApolloClient, InMemoryCache } from "@apollo/client";
import { config } from "../../config";

const uri = `${config.apiUrl}/graphql`;
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri,
    cache,
});

export { client };
