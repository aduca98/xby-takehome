import { signInWithEmailAndPassword } from "@firebase/auth";
import { Field, Formik, FormikHelpers, FormikProps } from "formik";
import { useCallback } from "react";
import { Button, Colors, Input } from "src/components";
import { auth } from "src/utils";

import { INITIAL_VALUES, FormValues, Validator } from "./form";

type Props = {
    onSuccess: () => void;
};

const Form = ({ onSuccess }: Props) => {
    const onSubmit = useCallback(
        async (values: FormValues, helpers: FormikHelpers<FormValues>) => {
            try {
                helpers.setSubmitting(true);

                await signInWithEmailAndPassword(
                    auth,
                    values.email.trim().toLowerCase(),
                    values.password
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

    return (
        <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={Validator}
            enableReinitialize={true}
            isInitialValid={false}
            onSubmit={onSubmit}
        >
            {(formProps: FormikProps<FormValues>) => {
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
                                label="Login"
                            />
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default Form;
