import { useMutation } from "@apollo/client";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import React, { Component, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input } from "src/components";
import { CREATE_USER } from "../gql";

import { INITIAL_USER, UserFormValues, UserValidator } from "./form";

type Props = {
    onSuccess: () => void;
};

const Form = ({ onSuccess }: Props) => {
    const [createUser] = useMutation(CREATE_USER);

    const onSubmit = useCallback(
        async (
            values: UserFormValues,
            helpers: FormikHelpers<UserFormValues>
        ) => {
            try {
                helpers.setSubmitting(true);

                await createUser({
                    variables: values,
                });

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

    return (
        <Formik
            initialValues={{ ...INITIAL_USER }}
            validationSchema={UserValidator}
            enableReinitialize={true}
            isInitialValid={false}
            onSubmit={onSubmit}
        >
            {(formProps: FormikProps<UserFormValues>) => {
                const { handleChange } = formProps;

                console.log(formProps.values);

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
