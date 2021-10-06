import { CSSProperties, useCallback, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Colors } from "src/components";
import { useRouteMatch } from "react-router";
import moment from "moment";
import { GET_USER_PROFILE, UPDATE_USER } from "src/api/graphql";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, getUser, setUser } from "src/redux/user";
import { useDropzone } from "react-dropzone";
import { upload } from "src/utils";
import { noop } from "lodash/fp";
import { UpdateUserInput } from "src/api/graphql/generated/types";

function Profile() {
    const dispatch = useDispatch();
    const { params } = useRouteMatch<{ username: string }>();
    const username = params.username;

    const { data, refetch } = useQuery(GET_USER_PROFILE, {
        variables: { username },
    });

    const user = data?.getByUsername;

    useEffect(() => {
        dispatch(fetchMe());
    }, []);

    return (
        <div style={styles.container}>
            <div className="shadow-lg" style={styles.profileContainer}>
                <UserInfo refetch={refetch} user={user} />
                <Answers user={user} />
            </div>
        </div>
    );
}

const UserInfo = ({ user, refetch }) => {
    const dispatch = useDispatch();
    const me = useSelector(getUser);
    const [updateMe] = useMutation(UPDATE_USER);

    const isMe = me && me.id === user?.id;

    const onDrop = useCallback(async (files) => {
        try {
            const file = files[0];
            const profileUrl = await upload("/profiles", file);

            const data: UpdateUserInput = {
                profileUrl,
            };

            const response = await updateMe({
                variables: { data },
            });

            // set the user and then refetch the current profile
            dispatch(setUser(response.data));
            refetch();
        } catch (err) {
            alert("Sorry, an error occurred!");
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <ProfileIcon user={user} />

            <div
                style={{
                    marginLeft: 15,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1 style={styles.header} className="font-bold">
                    {user?.name}
                </h1>
                <span>
                    Joined on {moment(user?.createdAt).format("MMM Do")}
                </span>

                {/* show edit only if this is the persons profile */}
                {isMe && (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button
                            style={{
                                marginTop: 10,
                                width: 150,
                                padding: "5px 10px",
                                fontSize: 14,
                                color: Colors.black,
                                backgroundColor: Colors.gray90,
                            }}
                            onClick={noop}
                            label="Change Image"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const Answers = ({ user }) => {
    return (
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
    );
};

const ProfileIcon = ({ user }) => {
    const initials = (user?.name?.split(" ") || [])
        .map((a: string) => a.charAt(0))
        .join("");

    if (user?.profileUrl) {
        return (
            <div style={{ display: "flex", flexDirection: "column" }}>
                <img
                    src={user?.profileUrl}
                    alt="Profile"
                    style={styles.profileImage}
                />
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div
                style={{
                    ...styles.profileImage,
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
                    {initials}
                </h3>
            </div>
        </div>
    );
};

const styles: Record<string, CSSProperties> = {
    profileImage: {
        backgroundColor: Colors.gray90,
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    profileContainer: {
        width: "100%",
        maxWidth: 500,
        borderRadius: 20,
        margin: "auto",
        padding: "50px 25px",
        backgroundColor: Colors.white,
    },
    container: {
        background: `linear-gradient(-90deg, ${Colors.ube80}, ${Colors.candy80})`,
        textAlign: "left",
        padding: "50px 10px",
        minHeight: "100vh",
    },
};

export default Profile;
