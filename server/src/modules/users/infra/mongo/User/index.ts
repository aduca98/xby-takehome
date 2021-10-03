import { UserModel } from "src/core/infra/mongo/models";
import { MongoUserRepository } from "./repo";
import { UserMapper } from "./mapper";

const mongoUserRepository = new MongoUserRepository(UserModel, UserMapper);

export { mongoUserRepository };
