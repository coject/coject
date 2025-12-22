import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iPhone = Omit<TextFieldProps, "type" | "validation" | "required" | "onChange"> & {
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
    onChange?: (value: string) => void;
};
export declare const Phone: FC<iPhone>;
export {};
