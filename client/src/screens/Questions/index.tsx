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
                background: `linear-gradient(-90deg, ${Colors.parsley80}, ${Colors.matcha80})`,
                textAlign: "left",
                padding: "50px 10px",
                minHeight: "100vh",
            }}
        >
            <div
                className="shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: 550,
                    borderRadius: 20,
                    margin: "auto",
                    padding: "50px 25px",
                    backgroundColor: Colors.gray100,
                }}
            >
                <h1 className="font-bold text-2xl">
                    We want to get to know you and your love of programming a
                    lil' more!
                </h1>

                <br />

                <Form questions={questions} />
            </div>
        </div>
    );
}

export default Questions;
