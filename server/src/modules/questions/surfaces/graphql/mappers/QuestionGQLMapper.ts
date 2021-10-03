import { GQLRootMapper } from "src/core/surfaces/graphql/GQLRootMapper";
import * as GQL from "src/core/surfaces/graphql/generated/types";
import * as Domain from "src/modules/questions/domain";

export const toGQLRoot = (q: Domain.Question): GQL.Question => ({
    ...q,
    type: GQL.QuestionType.MultipleChoice,
});

export const QuestionGQLRootMapper: GQLRootMapper<
    Domain.Question,
    GQL.Question
> = {
    toGQLRoot,
};
