import { FC } from "react";
import { AutocompleteProps } from '@mui/material';
interface iDataSource {
    name?: string;
    headers?: any;
    apiUrl?: string;
    baseUrl?: string;
    requestData?: any;
    dataPath?: string;
    method?: "get" | "post" | "put" | "delete";
    create?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    update?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    delete?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
}
interface iSelect extends AutocompleteProps<any, any, any, any> {
    value?: any;
    name?: string;
    label?: string;
    onChange?: any;
    callback?: any;
    error?: boolean;
    inputProps?: any;
    staticData?: any;
    separate?: string;
    required?: boolean;
    disabled?: boolean;
    renderOption?: any;
    customKey?: string;
    multiple?: boolean;
    customName?: string;
    helperText?: string;
    dependancies?: any[];
    checkboxes?: boolean;
    noOptionsText?: string;
    dataSource?: iDataSource;
    fixedOption?: (string | number)[];
    disabledOption?: (string | number)[];
}
export declare const Select: FC<Omit<iSelect, "options" | "renderInput">>;
export {};
