import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import * as http from "http";
import * as express from "express";
import { schema } from "./schema";

const app = express();

const startApolloServer = async () => {
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    server.applyMiddleware({
        app,
        path: "/graphql",
    });

    // Modified server startup
    await httpServer.listen({ port: 4000 });

    console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
};

export { startApolloServer };
