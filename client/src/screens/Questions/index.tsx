import { useMutation, gql } from "@apollo/client";
import React from "react";

function Questions() {
    const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

    return (
        <div>
            <h2>Questions...</h2>
        </div>
    );
}

const ADD_TODO = gql`
    mutation AddTodo($text: String!) {
        addTodo(text: $text) {
            id
            text
        }
    }
`;

export default Questions;
