import { GQLRootMapper } from "src/core/surfaces/graphql/GQLRootMapper";
import * as GQL from "src/core/surfaces/graphql/generated/types";
import * as Domain from "src/modules/users/domain";

const fromGQLRoot = (q: GQL.User): Domain.User => ({
    ...q,
    profilePictureUrl: null,
    id: "",
    username: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    answers: [], // TODO:
    auth: null as any, // TODO:
});

const toGQLRoot = (q: Domain.User): GQL.User => ({
    ...q,
    // TODO:
    answers: [],
});

export const UserGQLRootMapper: GQLRootMapper<Domain.User, GQL.User> = {
    toGQLRoot,
    fromGQLRoot,
};
