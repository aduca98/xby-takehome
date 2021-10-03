import React from "react";
import { useQuery, gql } from "@apollo/client";

function Profile() {
    const username = "andrew-duca";

    const { loading, error, data } = useQuery(GET_PROFILE, {
        variables: { username },
    });

    return (
        <div>
            <h2>Profile...</h2>
        </div>
    );
}

const GET_PROFILE = gql`
    query Profile($username: String!) {
        name
        username
        questions {
            id
            question
            answer
        }
    }
`;

export default Profile;
