import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iIban = Omit<TextFieldProps, "name" | "helperText" | "required"> & {
    name: string;
    label?: string;
    helperText?: string;
    required?: boolean | string;
    errorMessages?: {
        required?: string;
        pattern?: string;
    };
};
export declare const Iban: FC<iIban>;
export {};
