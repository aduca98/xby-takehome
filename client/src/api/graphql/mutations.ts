import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($data: CreateUserInput!) {
        createUser(data: $data) {
            name
            firstName
            lastName
            profilePictureUrl
            username
            email
        }
    }
`;

export const ANSWER_QUESTIONS = gql`
    mutation AnswerQuestions($data: AnswerQuestionInput!) {
        answerQuestions(data: $data) {
            answers {
                questionId
                type
                question
                answer
                option {
                    label
                    value
                }
            }
            user {
                username
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
        updateMe(data: $data) {
            name
            firstName
            lastName
            profilePictureUrl
            username
            email
        }
    }
`;
