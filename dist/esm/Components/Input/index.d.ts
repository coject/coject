import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iInput = Omit<TextFieldProps, "helperText"> & {
    name?: string;
    onChange?: any;
    helperText?: string;
    value?: string | number;
};
export declare const Input: FC<iInput>;
export {};
