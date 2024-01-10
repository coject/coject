import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iInput = Omit<TextFieldProps, "helperText"> & {
    name?: string;
    helperText?: string;
    value?: string | number;
};
export declare const Input: FC<iInput>;
export {};
