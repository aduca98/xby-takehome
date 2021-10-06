import { noop } from "lodash";
import { useCallback } from "react";
import { Colors } from "../../components";
import { GoogleButton } from "../../components/Authentication";
import Form from "./Form";
import { Link, useHistory } from "react-router-dom";
import { UserCredential } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { fetchMe } from "src/redux/user";

function Login() {
    const history = useHistory();

    const onSuccess = useCallback(() => {
        history.push(`/questions`);
    }, []);

    return (
        <div
            style={{
                background: `linear-gradient(-90deg, ${Colors.blueberry80}, ${Colors.candy80})`,
                textAlign: "left",
                padding: "100px 10px",
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
                    backgroundColor: Colors.gray100,
                }}
            >
                <h1 className="font-bold text-2xl">Login to XBY!</h1>

                <p style={{ marginTop: 15 }}>
                    If you need an account,{" "}
                    <Link
                        style={{ color: Colors.candy50 }}
                        className="font-bold"
                        to="/sign-up"
                    >
                        sign up
                    </Link>
                    .
                </p>

                <br />

                <div
                    style={{
                        width: "100%",
                        margin: "auto",
                        textAlign: "left",
                    }}
                >
                    <Form onSuccess={onSuccess} />
                </div>

                <div className="mt-8 pt-8 border-t-2 border-gray-200">
                    <GoogleSignin onSuccess={onSuccess} />
                </div>
            </div>
        </div>
    );
}

const GoogleSignin = ({ onSuccess }) => {
    const dispatch = useDispatch();

    const onAuthSuccess = useCallback(
        async ({ user }: UserCredential): Promise<void> => {
            try {
                await dispatch(fetchMe());

                onSuccess();
            } catch (err) {
                alert((err as any).message);
            }
        },
        []
    );

    return (
        <GoogleButton
            label="Sign in"
            onSuccess={onAuthSuccess}
            onError={noop}
        />
    );
};

export default Login;
