import { FC } from "react";
import { AutocompleteProps, TextFieldProps } from "@mui/material";
interface iSelect extends AutocompleteProps<any, any, any, any> {
    name?: string;
    label?: string;
    onChange?: any;
    dispatch?: any;
    dataSource?: any;
    required?: boolean;
    customKey?: string;
    customName?: string;
    inputProps?: TextFieldProps;
}
export declare const Select: FC<Omit<iSelect, "options" | "renderInput">>;
export {};
