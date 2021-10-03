import { useMutation, gql, useQuery } from "@apollo/client";
import React from "react";

function Questions() {
    const { data, loading, error } = useQuery(GET_QUESTIONS);

    return (
        <div>
            <h2>Questions...</h2>
        </div>
    );
}

const GET_QUESTIONS = gql`
    query Profile($username: String!) {
        questions(username: $username) {
            id
            question
            answer
        }
    }
`;

export default Questions;
