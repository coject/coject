import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iInput = Omit<TextFieldProps, "helperText" | "required"> & {
    name?: string;
    onChange?: any;
    validation?: {
        number?: boolean | string;
        arabic?: boolean | string;
        english?: boolean | string;
        required?: boolean | string;
        min?: number | {
            value: number;
            message: string;
        };
        max?: number | {
            value: number;
            message: string;
        };
        minLength?: number | {
            value: number;
            message: string;
        };
        maxLength?: number | {
            value: number;
            message: string;
        };
    };
    helperText?: string;
    value?: string | number;
    required?: boolean | string;
};
export declare const Input: FC<iInput>;
export {};
