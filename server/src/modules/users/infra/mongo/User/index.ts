import { UserModel } from "src/core/infra/mongo/models";
import { MongoUserRepository } from "./repo";

const mongoUserRepository = new MongoUserRepository(UserModel);

export { mongoUserRepository };
