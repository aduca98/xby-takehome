import { ApolloError } from "apollo-server-errors";
import {
    MutationResolvers,
    Resolvers,
} from "src/core/surfaces/graphql/generated/types";
import {
    Answer,
    AuthProvider,
    User,
    UserAuth,
    UserRepository,
} from "src/modules/users/domain";
import HttpStatus from "http-status-codes";
import { Firebase } from "src/utils";
import { Context } from "src/core/surfaces/graphql/context";
import { FirebaseProvider } from "src/shared/authorization";
import { UserGQLRootMapper } from "../mappers/UserGQLMapper";
import { Types } from "mongoose";
import { AnswerGQLRootMapper } from "../mappers";
import { Maybe } from "src/core/logic";

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

const _getUserAuth = async (
    authProvider: Maybe<UserAuth>,
    user: Maybe<User>,
    params: { name: string; password?: Maybe<string>; email: string }
): Promise<UserAuth> => {
    if (authProvider && user) {
        throw new ApolloError(
            "Already logged in with an account!",
            HttpStatus.BAD_REQUEST.toString()
        );
    }

    // if there is an auth provider and there is no user,
    // like for google sign in, return the auth provider logged in
    if (authProvider && !user) {
        return authProvider;
    }

    if (!params.password) {
        throw new ApolloError(
            "Missing password!",
            HttpStatus.BAD_REQUEST.toString()
        );
    }

    const fbUser = await FirebaseProvider.createUser({
        ...params,
        password: params.password!,
    });

    if (fbUser.isFailure()) {
        throw new ApolloError(
            fbUser.error.message,
            HttpStatus.INTERNAL_SERVER_ERROR.toString()
        );
    }

    return {
        provider: AuthProvider.Firebase,
        providerId: fbUser.value.uid,
    };
};
const _createUserResolver =
    (userRepo: UserRepository): MutationResolvers["createUser"] =>
    async (_parent, args, ctx: Context) => {
        const { user, authProvider } = ctx;

        const { email, firstName, lastName, password, profileUrl, username } =
            args.data;

        const name = `${firstName || ""} ${lastName || ""}`.trim();

        const auth: UserAuth = await _getUserAuth(authProvider, user, {
            name,
            email,
            password,
        });

        const response = await userRepo.create({
            name,
            lastName,
            firstName,
            email,
            id: new Types.ObjectId().toHexString(),
            username,
            profilePictureUrl: profileUrl || null,
            answers: [],
            auth,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // if the firebase succeeded but the mongo failed,
        // we should delete the firebase so the user can retry
        if (response.isFailure()) {
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

        const answers: Answer[] = args.data.answers.map(
            (a) =>
                ({
                    question: a.question,
                    questionId: a.questionId,
                    type: a.type,
                    option: a.option
                        ? {
                              optionId: a.option.id,
                              label: a.option.label,
                              value: a.option.value,
                          }
                        : null,
                    answer: a.answer || null,
                } as Answer)
        );

        const response = await userRepo.answerQuestions(ctx.user.id, answers);

        if (response.isFailure()) {
            throw new ApolloError(
                response.error.message,
                HttpStatus.INTERNAL_SERVER_ERROR.toString()
            );
        }

        return {
            answers: response.value.map(AnswerGQLRootMapper.toGQLRoot),
            user: UserGQLRootMapper.toGQLRoot(ctx.user),
        };
    };

export const userMutationResolver = (
    userRepo: UserRepository
): Resolvers["Mutation"] => ({
    updateMe: _updateUserResolver(userRepo),
    createUser: _createUserResolver(userRepo),
    answerQuestions: _answerQuestionsResolver(userRepo),
});
