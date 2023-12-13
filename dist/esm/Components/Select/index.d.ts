import { FC } from "react";
import { AutocompleteProps, InputProps } from "@mui/material";
interface iSelect extends AutocompleteProps<any, any, any, any> {
    name?: string;
    label?: string;
    onChange?: any;
    dispatch?: any;
    dataSource?: any;
    required?: boolean;
    renderOption?: any;
    customKey?: string;
    customName?: string;
    inputProps?: InputProps;
}
export declare const Select: FC<Omit<iSelect, "options" | "renderInput">>;
export {};
