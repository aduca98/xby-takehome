import { model, Schema, Document, Model } from "mongoose";
import { AuthProvider } from "src/modules/users/domain";

const AUTH_PROVIDER_ENUM = Object.values(AuthProvider);

const AuthProviderSchema = new Schema({
    provider: { type: String, enum: AUTH_PROVIDER_ENUM, required: true },
    providerId: { type: String, default: null },
});

const UserResponseSchema = new Schema({
    questionId: { type: String, required: true },
    title: { type: String, enum: AUTH_PROVIDER_ENUM, required: true },
    answer: { type: String, default: null },
});

const UserSchema = new Schema({
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    auth: { type: AuthProviderSchema, required: true },
    responses: [UserResponseSchema],
});

export interface UserAuthDocument extends Document {
    provider: AuthProvider;
    providerId: string;
}

export interface UserDocument extends Document {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    auth: UserAuthDocument;
}

export const UserModel = model<UserDocument, Model<UserDocument>>(
    "User",
    UserSchema
);
