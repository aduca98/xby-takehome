import { gql } from "@apollo/client";

export const FETCH_ME = gql`
    query GetMyProfile {
        me {
            name
            firstName
            lastName
            profilePictureUrl
            username
            email
        }
    }
`;

export const GET_USER_PROFILE = gql`
    query UserProfile($username: String!) {
        getByUsername(username: $username) {
            name
            profileUrl
            createdAt
            answers {
                question
                type
                answer
                option {
                    label
                }
            }
        }
    }
`;

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
