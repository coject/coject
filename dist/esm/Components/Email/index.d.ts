import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iEmail = Omit<TextFieldProps, "type" | "validation" | "required"> & {
    name: string;
    label?: string;
    helperText?: string;
    value?: string | number;
    validation?: {
        pattern?: {
            value: RegExp;
            message: string;
        };
        required?: string | boolean;
    };
    errorMessages?: {
        required?: string;
        pattern?: string;
    };
};
export declare const Email: FC<iEmail>;
export {};
