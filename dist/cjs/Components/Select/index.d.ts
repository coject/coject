import { FC } from "react";
import { AutocompleteProps } from "@mui/material";
interface iSelect extends AutocompleteProps<any, any, any, any> {
    name?: string;
    label?: string;
    onChange?: any;
    dispatch?: any;
    dataSource?: any;
    inputProps?: any;
    required?: boolean;
    renderOption?: any;
    customKey?: string;
    customName?: string;
    fixedOption?: (string | number)[];
    disabledOption?: (string | number)[];
}
export declare const Select: FC<Omit<iSelect, "options" | "renderInput">>;
export {};
