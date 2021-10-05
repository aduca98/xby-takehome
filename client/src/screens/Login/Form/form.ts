import _ from "lodash";
import * as yup from "yup";

export type FormValues = {
    email: string;
    password: string;
};

export const INITIAL_VALUES: FormValues = {
    email: "",
    password: "",
};

export const Validator = yup.object().shape({
    email: yup
        .string()
        .email()
        .required("Email is required")
        .nullable()
        .label("Email"),
    password: yup
        .string()
        .min(6)
        .nullable()
        .required("Password is required")
        .label("Password"),
});
