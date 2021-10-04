import { useMemo } from "react";
import { Question, QuestionType } from "src/api/graphql/generated/types";
import * as yup from "yup";

export type FormAnswerValue = {
    question: Question;
    answer: string | null;
    option: {
        id: string;
        label: string;
        value: string;
    } | null;
};

export type FormValues = {
    answers: FormAnswerValue[];
};

const useForm = (questions: Question[]) => {
    const validationSchema = useMemo(() => {
        return yup.object().shape({
            answers: yup
                .array()
                .of(ANSWER_VALIDATION)
                .length(questions.length)
                .required(),
        });
    }, [questions]);

    const initialValues: FormValues = useMemo(
        () => ({
            answers: questions.map((q) => ({
                question: q,
                answer: null,
                option: null,
            })),
        }),
        [questions]
    );

    return {
        validationSchema,
        initialValues,
    };
};

const OPTION_VALIDATION = yup.object().shape({
    id: yup.string().required(),
    label: yup.string().required(),
    value: yup.string().required(),
});

const ANSWER_VALIDATION = yup.object().shape({
    question: yup.mixed(),
    option: OPTION_VALIDATION.when("type", (type, schema) =>
        type === QuestionType.MultipleChoice
            ? schema.required()
            : schema.nullable()
    ),
    answer: yup
        .string()
        .when("type", (type, schema) =>
            type === QuestionType.ShortAnswer
                ? schema.required()
                : schema.nullable()
        ),
});

export { useForm };
