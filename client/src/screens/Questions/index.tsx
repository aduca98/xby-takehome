import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { Colors } from "src/components";
import { Question } from "src/api/graphql/generated/types";
import QuestionComponent from "./Question";
import { GET_QUESTIONS, ANSWER_QUESTIONS } from "./gql";
import { Formik } from "formik";
import yup from "yup";

function Questions() {
    const {
        data: dataQuestions,
        loading: loadingQuestions,
        error: errorQuestions,
    } = useQuery(GET_QUESTIONS);

    const [answer, { data, loading, error }] = useMutation(ANSWER_QUESTIONS);

    const questions: Question[] = data?.activeQuestions || [];

    const buildValidator = useCallback(() => {
        // TODO: take the questions and generate a mapping for validation
        return yup.object().shape({
            // TODO:
        });
    }, [questions]);

    const onSubmit = useCallback(() => {
        answer({
            // TODO:
        });
    }, []);

    return (
        <div
            style={{
                backgroundColor: Colors.white,
                textAlign: "left",
                padding: "50px 10px",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 20,
                    border: "2px solid " + Colors.gray90,
                    margin: "auto",
                    padding: "50px 25px",
                    backgroundColor: Colors.white,
                }}
            >
                <h1>Tell us more about you!</h1>

                <Formik
                    validationSchema={buildValidator}
                    initialValues={{}}
                    onSubmit={onSubmit}
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
                                {questions.map((question) => (
                                    <QuestionComponent
                                        question={question}
                                        key={question.id}
                                    />
                                ))}
                            </div>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default Questions;
