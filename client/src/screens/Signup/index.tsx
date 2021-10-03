import { useMutation, gql } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { Colors, Button } from "../../components";
import { GoogleButton } from "../../components/Authentication";
import Form from "./Form";

function Signup() {
    const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);

    const onSubmit = async () => {
        // TODO:
    };

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
                <h1 style={styles.header}>Create your account</h1>
                <p
                    style={{
                        fontSize: 16,
                        color: Colors.toastedSesame,
                        textAlign: "left",
                        margin: "15px 0",
                    }}
                >
                    or if you already have an account,{" "}
                    <Link to={`/login${window.location.search}`}>
                        <span
                            style={{
                                cursor: "pointer",
                                color: Colors.black,
                                fontWeight: "bold",
                            }}
                        >
                            sign in
                        </span>
                    </Link>
                </p>

                <div
                    style={{
                        width: "100%",
                        margin: "auto",
                        textAlign: "left",
                    }}
                >
                    <Form onSubmit={onSubmit} />
                </div>

                <GoogleButton label="Sign up" onError={(err) => {}} />
            </div>
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

const styles: any = {
    input: {
        width: 300,
        marginBottom: 15,
        backgroundColor: Colors.gray100,
        border: "none",
        color: Colors.toastedSesame,
        display: "block",
    },
    inputLabel: {
        display: "block",
        textAlign: "left",
        marginTop: 0,
        marginBottom: 10,
        color: Colors.toastedSesame,
    },
    button: {
        border: "none",
        width: "100%",
        margin: "10px auto 0 auto",
        backgroundColor: Colors.ube50,
        color: Colors.white,
        fontSize: 16,
    },
    logo: {
        width: 100,
        margin: 50,
    },
    header: {
        fontWeight: 900,
        fontFamily: "Mulish",
        textAlign: "left",
        color: Colors.black,
        fontSize: 25,
        marginBottom: 0,
    },
    container: {
        width: "100%",
        margin: "auto",
        borderRadius: 10,
        padding: "25px 5px",
        textAlign: "center",
    },
};

export default Signup;
