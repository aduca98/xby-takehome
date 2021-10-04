import { ApolloError } from "apollo-server-errors";
import {
    MutationResolvers,
    Resolvers,
} from "src/core/surfaces/graphql/generated/types";
import { AuthProvider, UserRepository } from "src/modules/users/domain";
import HttpStatus from "http-status-codes";
import { Firebase } from "src/utils";
import { Context } from "src/core/surfaces/graphql/context";
import { FirebaseProvider } from "src/shared/authorization";
import { UserGQLRootMapper } from "../mappers/UserGQLMapper";
import { Types } from "mongoose";
import { AnswerGQLRootMapper } from "../mappers";

const _updateUserResolver =
    (userRepo: UserRepository): MutationResolvers["updateMe"] =>
    async (_parent, args, ctx: Context) => {
        if (!ctx.user) {
            throw new ApolloError(
                ctx.message || "Forbidden.",
                ctx.errorType || "Forbidden"
            );
        }

        const data = args.data;

        // FIXME: allow for uploading more than just profile url
        const response = await userRepo.update(ctx.user.id, {
            profilePictureUrl: data.profileUrl,
        });

        if (response.isFailure()) {
            throw new ApolloError(
                response.error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        return UserGQLRootMapper.toGQLRoot(response.value);
    };

const _createUserResolver =
    (userRepo: UserRepository): MutationResolvers["createUser"] =>
    async (_parent, args) => {
        const { email, firstName, lastName, password, profileUrl, username } =
            args.data;

        const name = `${firstName || ""} ${lastName || ""}`.trim();

        const fbUser = await FirebaseProvider.createUser({
            email,
            displayName: name,
            password,
        });

        if (fbUser.isFailure()) {
            throw new ApolloError(
                fbUser.error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        const response = await userRepo.create({
            name,
            lastName,
            firstName,
            email,
            id: new Types.ObjectId().toHexString(),
            username,
            profilePictureUrl: profileUrl || null,
            answers: [],
            auth: {
                provider: AuthProvider.Firebase,
                providerId: fbUser.value.uid,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // if the firebase succeeded but the mongo failed,
        // we should delete the firebase so the user can retry
        if (response.isFailure()) {
            await FirebaseProvider.deleteUser(fbUser.value.uid);

            throw new ApolloError(
                response.error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        return UserGQLRootMapper.toGQLRoot(response.value);
    };

const _answerQuestionsResolver =
    (userRepo: UserRepository): MutationResolvers["answerQuestions"] =>
    async (_parent, args, ctx) => {
        if (!ctx.user) {
            throw new ApolloError(
                ctx.message || "Forbidden.",
                ctx.errorType || "Forbidden"
            );
        }

        const answers = args.data.answers.map(AnswerGQLRootMapper.fromGQLRoot);

        const response = await userRepo.answerQuestions(ctx.user.id, answers);

        if (response.isFailure()) {
            throw new ApolloError(
                response.error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        return response.value.map(AnswerGQLRootMapper.toGQLRoot);
    };

export const userMutationResolver = (
    userRepo: UserRepository
): Resolvers["Mutation"] => ({
    updateMe: _updateUserResolver(userRepo),
    createUser: _createUserResolver(userRepo),
    answerQuestions: _answerQuestionsResolver(userRepo),
});
