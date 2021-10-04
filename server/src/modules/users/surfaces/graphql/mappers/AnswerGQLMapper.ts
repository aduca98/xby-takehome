import { GQLRootMapper } from "src/core/surfaces/graphql/GQLRootMapper";
import * as GQL from "src/core/surfaces/graphql/generated/types";
import * as Domain from "src/modules/users/domain";

const fromGQLRoot = (a: GQL.Answer): Domain.Answer => ({
    ...a,
    answer: a.answer || null,
    option: a.option || null,
});

const toGQLRoot = (a: Domain.Answer): GQL.Answer => ({
    ...a,
    answer: a.answer || null,
    option: a.option || null,
});

export const AnswerGQLRootMapper: GQLRootMapper<Domain.Answer, GQL.Answer> = {
    toGQLRoot,
    fromGQLRoot,
};
