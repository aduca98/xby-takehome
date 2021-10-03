import { useEffect, useCallback, useMemo } from "react";
import { Question, QuestionType } from "src/api/graphql/generated/types";
import * as yup from "yup";

export type FormValues = {
    answers: [];
};

export const INITIAL_VALUES: FormValues = {
    answers: [],
};

const useValidator = (questions: Question[]) => {
    const validationSchema = useMemo(() => {
        const answerValidators: yup.AnySchema[] = questions.map((q) => {
            if (q.type === QuestionType.MultipleChoice) {
                return q.required
                    ? OPTION_VALIDATION
                    : OPTION_VALIDATION.nullable();
            }

            return q.required
                ? yup.string().required()
                : yup.string().nullable();
        });

        return yup.object().shape({
            answers: yup.array(),
        });
    }, [questions]);

    return {
        schema: validationSchema,
    };
};

const OPTION_VALIDATION = yup.object().shape({
    answer: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
    }),
});

export { useValidator };
