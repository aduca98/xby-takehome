import { GQLRootMapper } from "src/core/surfaces/graphql/GQLRootMapper";
import * as GQL from "src/core/surfaces/graphql/generated/types";
import * as Domain from "src/modules/users/domain";

export const toGQLRoot = (q: Domain.User): GQL.User => ({
    ...q,
});

export const QuestionGQLRootMapper: GQLRootMapper<Domain.User, GQL.User> = {
    toGQLRoot,
};
