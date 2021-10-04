// FIXME: shouldn't import another domain into user domain
import { Maybe } from "src/core/logic";
import { QuestionType } from "src/modules/questions/domain";

export enum AuthProvider {
    Firebase = "firebase",
}

export type UserAuth = {
    provider: AuthProvider;
    providerId: string;
};

export type AnswerOption = {
    optionId: string;
    value: string;
    label: string;
};

export type Answer = {
    questionId: string;
    type: QuestionType;
    question: string;
    answer: Maybe<string>;
    option: Maybe<AnswerOption>;
};

export type User = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePictureUrl: Maybe<string>;
    auth: UserAuth;
    answers: Answer[];
    createdAt: Date;
    updatedAt: Date;
};
