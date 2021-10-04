import { model, Schema, Document, Model } from "mongoose";
import { Maybe } from "src/core/logic";
import { QuestionType } from "src/modules/questions/domain";
import { AuthProvider } from "src/modules/users/domain";

const AUTH_PROVIDER_ENUM = Object.values(AuthProvider);
const QUESTION_TYPE_ENUM = Object.values(QuestionType);

const AuthProviderSchema = new Schema(
    {
        provider: { type: String, enum: AUTH_PROVIDER_ENUM, required: true },
        providerId: { type: String, required: true },
    },
    {
        _id: false,
    }
);

const OptionSchema = new Schema(
    {
        optionId: { type: String, required: true },
        value: { type: String, required: true },
        label: { type: String, required: true },
    },
    {
        _id: false,
    }
);

const AnswerSchema = new Schema(
    {
        questionId: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: QUESTION_TYPE_ENUM,
        },
        question: { type: String, required: true },
        answer: {
            type: String,
            default: null,
            required: function () {
                return this.type === QuestionType.ShortAnswer;
            },
        },
        option: {
            type: OptionSchema,
            default: null,
            required: function () {
                return this.type === QuestionType.MultipleChoice;
            },
        },
    },
    {
        _id: false,
    }
);

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, required: true },
        profilePictureUrl: { type: String, default: null },
        auth: { type: AuthProviderSchema, required: true },
        answers: [AnswerSchema],
    },
    {
        timestamps: true,
    }
);

UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ "auth.providerId": 1 }, { unique: true });
UserSchema.index({ email: 1 }, { unique: true });

export interface UserAuthDocument extends Document {
    provider: AuthProvider;
    providerId: string;
}

export interface AnswerOptionDocument extends Document {
    optionId: string;
    value: string;
    label: string;
}

export interface AnswerDocument extends Document {
    questionId: string;
    type: QuestionType;
    question: string;
    answer: Maybe<string>;
    option: Maybe<AnswerOptionDocument>;
}

export interface UserDocument extends Document {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    profilePictureUrl: Maybe<string>;
    auth: UserAuthDocument;
    answers: AnswerDocument[];
    createdAt: Date;
    updatedAt: Date;
}

export const UserModel = model<UserDocument, Model<UserDocument>>(
    "User",
    UserSchema
);
