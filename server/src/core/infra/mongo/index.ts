import { connect, ConnectOptions, connection } from "mongoose";
import { config } from "src/config";
import { last } from "lodash/fp";

const DATABASE_URI = config.mongoUri;

const CONNECT_OPTIONS: ConnectOptions = {
    keepAlive: true,
    minPoolSize: 10,
};

const connectMongo = async (): Promise<void> => {
    connection.on("connected", function () {
        console.log(`Database connected: ${last(DATABASE_URI.split("/"))}`);
    });

    connection.on("error", (err) => {
        console.log("Error connecting to database. " + err);
        void connect(DATABASE_URI, CONNECT_OPTIONS);
    });

    connection.on("disconnected", (err) => {
        console.log("Database disconnected. " + err);
        void connect(DATABASE_URI, CONNECT_OPTIONS);
    });

    connection.on("reconnectFailed", (err) => {
        console.log("Reconnect failed. " + err);
    });

    await connect(DATABASE_URI, CONNECT_OPTIONS);
};

export { connectMongo };
