import { ApolloServer } from "apollo-server-express";
import { Express } from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import * as http from "http";
import { schema } from "./schema";

const startApolloServer = async (app: Express) => {
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

    return server;
};

export { startApolloServer };
