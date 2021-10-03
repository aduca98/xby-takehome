import { Formik, FormikHelpers, FormikProps } from "formik";
import React, { Component } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "semantic-ui-react";
import { Button, Colors } from "../../../components";

import { INITIAL_USER, UserFormValues, UserValidator } from "./form";

type Props = {
    onSubmit: (
        values: UserFormValues,
        formikActions: FormikHelpers<UserFormValues>
    ) => void;
};

const Form = ({ onSubmit }: Props) => {
    return (
        <Formik
            initialValues={{ ...INITIAL_USER }}
            validationSchema={UserValidator}
            enableReinitialize={true}
            isInitialValid={false}
            onSubmit={onSubmit}
        >
            {(formProps: FormikProps<UserFormValues>) => {
                const { handleChange, errors, submitCount, status } = formProps;

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
                                style={{
                                    width: "100%",
                                }}
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
