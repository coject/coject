import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iUpload = Omit<TextFieldProps, "onChange" | "helperText"> & {
    name?: string;
    onChange?: any;
    onRemove?: any;
    multiple?: boolean;
    helperText?: string;
    value?: string | string[];
};
export declare const Upload: FC<iUpload>;
export {};
