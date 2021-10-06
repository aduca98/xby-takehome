import { noop } from "lodash";
import { CSSProperties, useCallback } from "react";
import { Link } from "react-router-dom";
import { Colors } from "../../components";
import { GoogleButton } from "../../components/Authentication";
import Form from "./Form";
import { useHistory } from "react-router-dom";

function Signup() {
    const history = useHistory();

    const onSuccess = useCallback(() => {
        history.push(`/questions`);
    }, []);

    return (
        <div style={styles.container}>
            <div className="shadow-lg" style={styles.formContainer}>
                <h1 className="font-bold text-2xl">Welcome to XBY!</h1>

                <p style={{ marginTop: 15 }}>
                    Create your account now, it should only take your 60 seconds
                    (we promise 😊).
                    <br />
                    <br />
                    If you already have an account,{" "}
                    <Link
                        style={{ color: Colors.candy50 }}
                        className="font-bold"
                        to="/login"
                    >
                        login
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
                    <GoogleButton
                        label="Sign up"
                        onSuccess={onSuccess}
                        onError={noop}
                    />
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, CSSProperties> = {
    container: {
        background: `linear-gradient(-90deg, ${Colors.blueberry80}, ${Colors.candy80})`,
        textAlign: "left",
        padding: "100px 10px",
        minHeight: "100vh",
    },
    formContainer: {
        width: "100%",
        maxWidth: 500,
        borderRadius: 20,
        margin: "auto",
        padding: "50px 25px",
        backgroundColor: Colors.gray100,
    },
};

export default Signup;
