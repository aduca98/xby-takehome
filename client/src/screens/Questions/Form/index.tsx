import { useMutation } from "@apollo/client";
import React, { useCallback } from "react";
import { Button, Colors } from "src/components";
import { AnswerInput, Question } from "src/api/graphql/generated/types";
import QuestionComponent from "./Question";
import { ANSWER_QUESTIONS } from "../gql";
import { FieldArray, Formik, FormikHelpers } from "formik";
import { useForm, FormValues } from "./form";
import { isEmpty } from "lodash";
import { useHistory } from "react-router";
import { propOr } from "lodash/fp";

function Form({ questions }: { questions: Question[] }) {
    const [answer] = useMutation(ANSWER_QUESTIONS);
    const history = useHistory();

    const { validationSchema, initialValues } = useForm(questions);

    const onSubmit = useCallback(
        async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
            helpers.setSubmitting(true);

            // FIXME: prob don't wanna trust the client for these questions
            // should move the de-normalization to the server instead
            try {
                const answers: AnswerInput[] = values.answers.map((a) => ({
                    question: a.question.title,
                    type: a.question.type,
                    questionId: a.question.id,
                    answer: a.answer,
                    option: a.option,
                }));

                const response = await answer({
                    variables: { data: { answers } },
                });

                const username = response.data.answerQuestions.user?.username;

                console.log(username, response);

                history.push(`/u/${username}`);
            } catch (err) {
                console.log(err);
                alert((err as any)?.message);
            } finally {
                helpers.setSubmitting(false);
            }
        },
        []
    );

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
            enableReinitialize={true}
        >
            {(props) => {
                return (
                    <div
                        style={{
                            width: "100%",
                            margin: "auto",
                            textAlign: "left",
                        }}
                    >
                        {props.submitCount > 0 && !isEmpty(props.errors) && (
                            <div
                                style={{ color: Colors.melon50 }}
                                className="font-semibold mb-4"
                            >
                                Please answer all questions!
                            </div>
                        )}

                        <FieldArray
                            name="answers"
                            render={() => (
                                <div>
                                    {props.values.answers.map(
                                        (answer, index) => (
                                            <QuestionComponent
                                                formProps={props}
                                                answer={answer}
                                                key={index}
                                                index={index}
                                            />
                                        )
                                    )}
                                </div>
                            )}
                        />

                        <div
                            className="pt-4"
                            style={{
                                margin: "10px 0 20px 0",
                            }}
                        >
                            <Button
                                loading={props.isSubmitting}
                                onClick={props.handleSubmit}
                                label="Continue"
                            />
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
}

export default React.memo(Form);
