import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iUpload = Omit<TextFieldProps, "onChange" | "helperText"> & {
    value?: any;
    name?: string;
    onChange?: any;
    onRemove?: any;
    validation?: {
        required?: boolean | string;
    };
    multiple?: boolean;
    helperText?: string;
    required?: boolean | string;
};
export declare const Upload: FC<iUpload>;
export {};
