import * as http from "http";
import * as express from "express";
import { startApolloServer } from "../graphql";
import { Exception } from "src/core/logic";
import ApiResponse from "src/core/logic/ApiResponse";
import apiV1 from "./routes";
import { config } from "src/config";
import { omit } from "lodash/fp";

const port = normalizePort(config.port);
const app = express();

const startServer = async () => {
    const httpServer = http.createServer(app);

    // http routes
    app.use(express.urlencoded({ extended: true }) as any);
    app.use(express.json() as any);
    app.use("/v1", apiV1);
    app.use(exceptionHandler);

    // gql server
    const gqlServer = await startApolloServer(app);

    await httpServer.listen({ port });

    console.log(
        `🚀 Server ready at http://localhost:5000${gqlServer.graphqlPath}`
    );
};

function normalizePort(val: string) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return null;
}

async function exceptionHandler(err, req, res, next) {
    try {
        console.log(`======== API Error: ${req.method} ${req.path} ========`);

        console.log("| User");
        console.log(JSON.stringify(req.user, null, 2));

        console.log("| Route Params");
        console.log(JSON.stringify(req.params, null, 2));

        console.log("| Headers");
        console.log(
            JSON.stringify(omit(["authorization"], req.headers), null, 2)
        );

        console.log("| Query");
        console.log(JSON.stringify(req.query, null, 2));

        console.log("| Body");
        console.log(JSON.stringify(req.body, null, 2));

        if (err.stack) {
            console.log("| Stacktrace");
            console.log(err.stack);
        }

        console.log("| Error");
        console.log(err);

        if (err instanceof Exception) {
            return ApiResponse.error(err.statusCode, {
                message: err.message,
                info: { type: err.type, message: err.message },
            }).send(res);
        } else {
            console.log("======== Internal Error ========");
            if (err & err.stack) {
                console.log(err.stack);
            } else {
                console.log(err);
            }

            return ApiResponse.error(500, {
                message: "Internal error.",
            }).send(res);
        }
    } catch (e) {
        ApiResponse.error(500, { message: "Internal error." }).send(res);
        console.log("======== Internal Error ========");
        console.log(err);
        console.log(e);
    }
}

export { startServer };
