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
