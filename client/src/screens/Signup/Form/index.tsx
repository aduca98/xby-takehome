import { useMutation } from "@apollo/client";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import { useCallback, useEffect } from "react";
import { CreateUserInput } from "src/api/graphql/generated/types";
import { Button, Colors, Input } from "src/components";
import { CREATE_USER } from "src/api/graphql";
import slugify from "slugify";
import * as shortid from "shortid";

import { INITIAL_USER, UserFormValues, UserValidator } from "./form";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "src/utils";
import { useSelector } from "react-redux";
import { getUserAuthStatus } from "src/redux/user";
import { useHistory } from "react-router";

type Props = {
    onSuccess: () => void;
};

const Form = ({ onSuccess }: Props) => {
    const status = useSelector(getUserAuthStatus);
    const [createUser] = useMutation(CREATE_USER);
    const history = useHistory();

    const onSubmit = useCallback(
        async (
            values: UserFormValues,
            helpers: FormikHelpers<UserFormValues>
        ) => {
            try {
                helpers.setSubmitting(true);

                const nameParts = values.name.split(" ");
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(" ");

                const data: CreateUserInput = {
                    ...values,
                    email: values.email.toLowerCase().trim(),
                    firstName,
                    lastName,
                    username: `${slugify(
                        values.name
                    ).toLowerCase()}-${shortid.generate()}`,
                };

                await createUser({
                    variables: { data },
                });

                await signInWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password!
                );

                onSuccess();
            } catch (err) {
                console.error(err);
                alert(err);
            } finally {
                helpers.setSubmitting(false);
            }
        },
        []
    );

    // if user is already logged in don't let them sign up again, they should
    // logout first
    useEffect(() => {
        if (status === "LOGGED_IN") {
            history.push(`/questions`);
        }
    }, [status]);

    return (
        <Formik
            initialValues={{ ...INITIAL_USER }}
            validationSchema={UserValidator}
            enableReinitialize={true}
            isInitialValid={false}
            onSubmit={onSubmit}
        >
            {(formProps: FormikProps<UserFormValues>) => {
                return (
                    <div>
                        <Field
                            component={Input}
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="email"
                            placeholder="yoda@jedi.com"
                            style={{ marginBottom: 15 }}
                        />

                        <Field
                            component={Input}
                            name="name"
                            type="text"
                            label="Full name"
                            autoComplete="name"
                            placeholder="yoda"
                            style={{ marginBottom: 15 }}
                        />

                        <Field
                            component={Input}
                            required
                            label="Password"
                            name="password"
                            type="password"
                            placeholder=""
                            style={{ marginBottom: 15 }}
                        />

                        {formProps.errors && (
                            <div
                                style={{ color: Colors.melon50 }}
                                className="font-semibold mb-4"
                            >
                                {Object.values(formProps.errors).join(", ")}
                            </div>
                        )}

                        <div
                            className="pt-4"
                            style={{
                                margin: "10px 0 20px 0",
                            }}
                        >
                            <Button
                                loading={formProps.isSubmitting}
                                onClick={formProps.handleSubmit}
                                label="Create Account"
                            />
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default Form;
