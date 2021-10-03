import React, { useEffect, useState } from "react";
import GoogleLogo from "src/assets/images/google.png";
import { Button, Colors } from "../../components";

import Authentication from "../../utils/Authentication";

type Props = {
    label: "Sign in" | "Sign up";
    onSuccess?: () => void;
    onError: ({ error, message }: any) => void;
};

export function GoogleButton({ label, onSuccess, onError }: Props) {
    const [isLoading, setLoading] = useState(false);

    const handle = async () => {
        setLoading(true);
        try {
            await Authentication.google();

            onSuccess && onSuccess();
        } catch (err) {
            onError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            loading={isLoading}
            onClick={handle}
            style={{
                width: "100%",
                position: "relative",
                marginBottom: 10,
                padding: 15,
                boxShadow: "none",
                border: "2px solid #efefef",
                background: Colors.white,
            }}
            label={
                <div
                    style={{
                        color: Colors.toastedSesame,
                        fontSize: 18,
                        width: "100%",
                        fontWeight: "bold",
                    }}
                >
                    <img
                        alt="Google"
                        style={{
                            position: "absolute",
                            left: 20,
                            top: 15,
                            height: 20,
                            width: "auto",
                        }}
                        src={GoogleLogo}
                    />
                    <div style={{ textAlign: "center" }}>
                        {label} with Google
                    </div>
                </div>
            }
        />
    );
}
