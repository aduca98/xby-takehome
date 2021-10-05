import { useQuery } from "@apollo/client";
import { Colors } from "src/components";
import { GET_USER_PROFILE } from "./gql";
import { useRouteMatch } from "react-router";
import moment from "moment";

function Profile() {
    const { params } = useRouteMatch<{ username: string }>();
    const username = params.username;

    const { data } = useQuery(GET_USER_PROFILE, {
        variables: { username },
    });

    const user = data?.getByUsername;

    return (
        <div
            style={{
                background: `linear-gradient(-90deg, ${Colors.ube80}, ${Colors.candy80})`,
                textAlign: "left",
                padding: "50px 10px",
                minHeight: "100vh",
            }}
        >
            <div
                className="shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: 500,
                    borderRadius: 20,
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
                    {user?.profileUrl ? (
                        <img
                            src={user?.profileUrl}
                            alt="Profile"
                            style={{
                                backgroundColor: Colors.gray90,
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                            }}
                        />
                    ) : (
                        <div
                            style={{
                                backgroundColor: Colors.gray90,
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                                textAlign: "center",
                                paddingTop: 30,
                            }}
                        >
                            <h3
                                style={{
                                    margin: 0,
                                    fontSize: 30,
                                    fontWeight: "bold",
                                }}
                            >
                                AD
                            </h3>
                        </div>
                    )}

                    <div style={{ marginLeft: 15 }}>
                        <h1 style={styles.header} className="font-bold">
                            {user?.name}
                        </h1>
                        <span>
                            Joined on {moment(user?.createdAt).format("MMM Do")}
                        </span>
                    </div>
                </div>

                <div
                    style={{
                        width: "100%",
                        margin: "auto",
                        marginTop: 10,
                        textAlign: "left",
                    }}
                >
                    {(user?.answers || []).map((answer) => {
                        return (
                            <div className="bg-white py-6 border-b-2">
                                <h3 style={{ margin: 0 }}>{answer.question}</h3>

                                <p
                                    style={{
                                        marginTop: 10,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {answer.answer || answer.option?.label}
                                </p>
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
