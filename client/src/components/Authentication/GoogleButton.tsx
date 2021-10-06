import { useLazyQuery, useMutation } from "@apollo/client";
import { UserCredential } from "@firebase/auth";
import React, { CSSProperties, useCallback, useState } from "react";
import slugify from "slugify";
import { CREATE_USER, FETCH_ME } from "src/api/graphql";
import { CreateUserInput } from "src/api/graphql/generated/types";
import GoogleLogo from "src/assets/images/google.png";
import { Button, Colors } from "../../components";
import shortid from "shortid";

import Authentication from "../../utils/Authentication";

type Props = {
    label: "Sign in" | "Sign up";
    onSuccess: () => void;
    onError: ({ error, message }: any) => void;
};

export function GoogleButton({ label, onSuccess, onError }: Props) {
    const [isLoading, setLoading] = useState(false);
    const [createUser, { loading: loadingCreate }] = useMutation(CREATE_USER);
    const loading = isLoading || loadingCreate;

    const onAuthSuccess = useCallback(
        async ({ user }: UserCredential): Promise<void> => {
            console.log(user);
            try {
                const nameParts = user.displayName!.split(" ");
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(" ");

                const data: CreateUserInput = {
                    email: user.email!.toLowerCase().trim(),
                    name: nameParts.join(" "),
                    firstName,
                    lastName,
                    password: null,
                    username: `${slugify(
                        nameParts.join(" ")
                    ).toLowerCase()}-${shortid.generate()}`,
                };

                const response = await createUser({
                    variables: { data },
                });

                console.log(response);

                onSuccess();
            } catch (err) {
                alert((err as any).message);
            }
        },
        []
    );

    const handle = useCallback(async () => {
        setLoading(true);

        try {
            await Authentication.google(onAuthSuccess);
        } catch (err) {
            onError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <Button
            loading={loading}
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
