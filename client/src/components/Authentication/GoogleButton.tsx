import React, { CSSProperties, useCallback, useState } from "react";
import GoogleLogo from "src/assets/images/google.png";
import { Button, Colors } from "../../components";

import Authentication, { OnSuccess } from "../../utils/Authentication";

type Props = {
    label: "Sign in" | "Sign up";
    onSuccess: OnSuccess;
    onError: ({ error, message }: any) => void;
};

export function GoogleButton({ label, onSuccess, onError }: Props) {
    const [isLoading, setLoading] = useState(false);

    const handle = useCallback(async () => {
        setLoading(true);

        try {
            await Authentication.google(onSuccess);
        } catch (err) {
            onError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <Button
            loading={isLoading}
            onClick={handle}
            style={styles.container}
            type="button"
            label={
                <div style={styles.label}>
                    <img alt="Google" style={styles.image} src={GoogleLogo} />
                    <div style={{ textAlign: "center" }}>
                        {label} with Google
                    </div>
                </div>
            }
        />
    );
}

const styles: Record<string, CSSProperties> = {
    image: {
        position: "absolute",
        left: 20,
        top: 15,
        height: 20,
        width: "auto",
    },
    container: {
        width: "100%",
        position: "relative",
        marginBottom: 10,
        padding: 15,
        boxShadow: "none",
        border: "2px solid #efefef",
        background: Colors.white,
    },
    label: {
        color: Colors.toastedSesame,
        fontSize: 18,
        width: "100%",
        fontWeight: "bold",
    },
};
