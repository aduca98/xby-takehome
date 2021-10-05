import { LeanDocument } from "mongoose";
import { UserDocument, AnswerDocument } from "src/core/infra/mongo/models/User";
import { User, Answer } from "src/modules/users/domain";

const AnswerMapper = {
    toDomain: (a: AnswerDocument): Answer => ({
        questionId: a.questionId,
        type: a.type,
        question: a.question,
        answer: a.answer,
        option: a.option
            ? {
                  optionId: a.option.optionId,
                  label: a.option.label,
                  value: a.option.value,
              }
            : null,
    }),
    toPersistence: (a: Answer): LeanDocument<AnswerDocument> => ({
        questionId: a.questionId,
        type: a.type,
        question: a.question,
        answer: a.answer,
        option: a.option
            ? {
                  optionId: a.option.optionId,
                  label: a.option.label,
                  value: a.option.value,
              }
            : null,
    }),
};

const UserMapper = {
    toDomain: (u: UserDocument): User => ({
        id: u._id.toString(),
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        name: u.name,
        username: u.username,
        profilePictureUrl: u.profilePictureUrl,
        auth: u.auth,
        answers: u.answers.map(AnswerMapper.toDomain),
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    }),
    toPersistence: (u: User): LeanDocument<UserDocument> => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        name: u.name,
        username: u.username,
        profilePictureUrl: u.profilePictureUrl,
        auth: u.auth,
        answers: u.answers.map(AnswerMapper.toPersistence),
        createdAt: u.createdAt,
        updatedAt: u.updatedAt,
    }),
};

export { UserMapper, AnswerMapper };
