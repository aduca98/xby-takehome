import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { Colors } from "src/components";
import { Question, QuestionType } from "src/api/graphql/generated/types";
import QuestionComponent from "./Form/Question";
import { GET_QUESTIONS, ANSWER_QUESTIONS } from "./gql";
import Form from "./Form";

import * as yup from "yup";

function Questions() {
    const {
        data: dataQuestions,
        loading: loadingQuestions,
        error: errorQuestions,
    } = useQuery(GET_QUESTIONS);

    const [answer] = useMutation(ANSWER_QUESTIONS);

    const questions: Question[] = dataQuestions?.activeQuestions || [];

    console.log("QUESTIONS: ", questions);

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

                <Form questions={questions} />
            </div>
        </div>
    );
}

export default Questions;
