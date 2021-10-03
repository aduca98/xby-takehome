import { useMutation } from "@apollo/client";
import { Formik, FormikHelpers, FormikProps } from "formik";
import React, { Component, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { Button, Colors } from "src/components";
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

                return (
                    <div>
                        <Input
                            required
                            value={formProps.values.email}
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder=""
                            onChange={handleChange}
                            containerStyle={{ marginBottom: 15 }}
                        />

                        <Input
                            required
                            value={formProps.values.name}
                            label="Full name"
                            name="name"
                            autoComplete="name"
                            placeholder=""
                            onChange={handleChange}
                            containerStyle={{ marginBottom: 15 }}
                        />

                        <Input
                            required
                            value={formProps.values.password}
                            label="Password"
                            name="password"
                            type="password"
                            placeholder=""
                            onChange={handleChange}
                            containerStyle={{ marginBottom: 15 }}
                        />

                        <div
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
