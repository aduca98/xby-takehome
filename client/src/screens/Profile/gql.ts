import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
    query UserProfile($username: String!) {
        getByUsername(username: $username) {
            name
            # createdAt TODO: add this
            answers {
                question
                answer
            }
        }
    }
`;
