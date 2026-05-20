import { FC } from "react";
import { TextFieldProps } from "@mui/material";
type iUpload = Omit<TextFieldProps, "onChange"> & {
    error?: any;
    name?: string;
    setFile?: any;
    label?: string;
    beforeUpload?: (file: File, allFiles: File[], currentFiles: File[]) => boolean | string | Promise<boolean | string>;
    onChange?: (value: any, error?: string) => void;
    onRemove?: any;
    disabled?: boolean;
    multiple?: boolean;
    imagePath?: string;
    value?: any | any[];
    imageHeight?: number;
    placeholder?: string;
    validateText?: string;
    required?: boolean | string;
    imageWidth?: {
        lg?: number;
        md?: number;
        sm?: number;
        xs?: number;
    };
};
export declare const Upload: FC<iUpload>;
export {};
