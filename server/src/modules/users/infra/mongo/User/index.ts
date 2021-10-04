import { UserModel } from "src/core/infra/mongo/models";
import { MongoUserRepository } from "./repo";
import { UserMapper, AnswerMapper } from "./mapper";

const mongoUserRepository = new MongoUserRepository(
    UserModel,
    UserMapper,
    AnswerMapper
);

export { mongoUserRepository };
