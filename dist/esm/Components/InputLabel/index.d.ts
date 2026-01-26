import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iInputLabel = Omit<TextFieldProps, "helperText" | "required" | "label"> & {
    name?: string;
    label?: string;
    onChange?: any;
    multiline?: any;
    validation?: {
        email?: boolean | string;
        phone?: boolean | string;
        number?: boolean | string;
        arabic?: boolean | string;
        english?: boolean | string;
        required?: boolean | string;
        pattern?: any | {
            value: any;
            message: string;
        };
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
export declare const InputLabel: FC<iInputLabel>;
export {};
