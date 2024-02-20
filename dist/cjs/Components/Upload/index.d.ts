import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iUpload = Omit<TextFieldProps, "onChange" | "helperText"> & {
    name?: string;
    onChange?: any;
    multiple?: boolean;
    helperText?: string;
};
export declare const Upload: FC<iUpload>;
export {};
