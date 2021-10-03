import { startServer } from "./surfaces/express";
import { connectMongo } from "./infra/mongo";

export const start = async (): Promise<void> => {
    await connectMongo();
    await startServer();
};
