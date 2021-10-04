import { noop } from "lodash";
import { useCallback } from "react";
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
                <h1 className="font-bold text-2xl">Welcome to XBY!</h1>

                <p>
                    Create your account now, it should only take your 60 seconds
                    (we promise 😊).
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
        fontWeight: "bold",
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
