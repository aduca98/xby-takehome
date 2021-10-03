import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Colors } from "src/components";
import { GET_USER_PROFILE } from "./gql";
import { useRouteMatch } from "react-router";

function Profile() {
    const { params } = useRouteMatch<{ username: string }>();
    const username = params.username;

    const { loading, error, data } = useQuery(GET_USER_PROFILE, {
        variables: { username },
    });

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
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={""}
                        alt="Profile"
                        style={{
                            backgroundColor: "blue",
                            width: 100,
                            height: 100,
                        }}
                    />

                    <div style={{ marginLeft: 15 }}>
                        <h1 style={styles.header}>Andrew Duca</h1>
                        <span>Joined on July 14th</span>
                    </div>
                </div>

                <div
                    style={{
                        width: "100%",
                        margin: "auto",
                        marginTop: 30,
                        textAlign: "left",
                    }}
                >
                    {[{}, {}, {}].map((answer) => {
                        return (
                            <div style={{ marginBottom: 15 }}>
                                <h3 style={{ margin: 0 }}>Some Question</h3>
                                <p>Some answer</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

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

export default Profile;
