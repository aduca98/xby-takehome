import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { config } from "../../config";
import { setContext } from "@apollo/client/link/context";
import { getAuthToken } from "src/utils";

const uri = `${config.apiUrl}/graphql`;
const cache = new InMemoryCache();

const httpLink = createHttpLink({
    uri,
});

const authLink = setContext(async (_, { headers }) => {
    const token = await getAuthToken();

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    // does auth link and then after does http request
    link: authLink.concat(httpLink),
    cache,
});

export { client };
