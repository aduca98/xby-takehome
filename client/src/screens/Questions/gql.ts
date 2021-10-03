import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
    query GetQuestions {
        activeQuestions {
            id
            title
            type
            required
            options {
                id
                label
                value
            }
        }
    }
`;

export const ANSWER_QUESTIONS = gql`
    mutation AnswerQuestions($data: AnswerQuestionInput) {
        answerQuestions(data: $data)
    }
`;
