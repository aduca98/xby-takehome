import { startApolloServer } from "./surfaces/graphql";
import { connectMongo } from "./infra/mongo";

export const start = async (): Promise<void> => {
    await connectMongo();
    await startApolloServer();
};
