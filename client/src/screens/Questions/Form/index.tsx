import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { Button, Colors } from "src/components";
import { Question, QuestionType } from "src/api/graphql/generated/types";
import QuestionComponent from "./Question";
import { GET_QUESTIONS, ANSWER_QUESTIONS } from "../gql";
import { Formik } from "formik";
import * as yup from "yup";
import { useValidator, INITIAL_VALUES, FormValues } from "./form";

function Form({ questions }: { questions: Question[] }) {
    const [answer] = useMutation(ANSWER_QUESTIONS);

    const validationSchema = useValidator(questions);

    console.log("QUESTIONS: ", questions);

    const onSubmit = useCallback(() => {
        answer({
            // TODO:
        });
    }, []);

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{ ...INITIAL_VALUES }}
            onSubmit={onSubmit}
        >
            {(props) => {
                console.log(props.values);

                return (
                    <div
                        style={{
                            width: "100%",
                            margin: "auto",
                            textAlign: "left",
                        }}
                    >
                        {questions.map((question) => (
                            <QuestionComponent
                                question={question}
                                key={question.id}
                            />
                        ))}

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
