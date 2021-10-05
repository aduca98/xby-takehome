import { GQLRootMapper } from "src/core/surfaces/graphql/GQLRootMapper";
import * as GQL from "src/core/surfaces/graphql/generated/types";
import * as Domain from "src/modules/questions/domain";
import { keyBy } from "lodash/fp";

const mapping = [
    {
        type: "MultipleChoice",
        DOMAIN: Domain.QuestionType.MultipleChoice,
        GQL: GQL.QuestionType.MultipleChoice,
    },
    {
        type: "ShortAnswer",
        DOMAIN: Domain.QuestionType.ShortAnswer,
        GQL: GQL.QuestionType.ShortAnswer,
    },
];

const MAPPING_DOMAIN_TO_GQL = keyBy("type", mapping);

export const fromGQLRoot = (q: GQL.Question): Domain.Question => ({
    ...q,
    options: (q.options || []).map((o) => ({
        id: o!.id,
        value: o!.value,
        label: o!.label,
    })),
    type: MAPPING_DOMAIN_TO_GQL[q.type].DOMAIN,
});

export const toGQLRoot = (q: Domain.Question): GQL.Question => ({
    ...q,
    options: (q.options || []).map((o) => ({
        id: o!.id,
        value: o!.value,
        label: o!.label,
    })),
    type: MAPPING_DOMAIN_TO_GQL[q.type].GQL,
});

export const QuestionGQLRootMapper: GQLRootMapper<
    Domain.Question,
    GQL.Question
> = {
    toGQLRoot,
    fromGQLRoot,
};
