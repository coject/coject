import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iInput = Omit<TextFieldProps, "helperText"> & {
    helperText?: string;
};
export declare const Input: FC<iInput>;
export {};
