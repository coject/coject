import { FC, ReactNode } from "react";
import { GridColDef } from "@mui/x-data-grid";
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
};
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
interface iForm {
    id?: string;
    getForm?: any;
    onSubmit?: any;
    dispatch?: any;
    setModal?: any;
    callback?: any;
    className?: any;
    staticData?: any;
    customKey?: string;
    noRequest?: boolean;
    children?: ReactNode;
    schema?: iSchema | any;
    invisibility?: string[];
    onSubmitClear?: boolean;
    dataSource?: iDataSource;
    onError?: (error: any) => void;
    localeText?: {
        submitButton?: string;
    };
    mode?: "render" | "create" | "update" | "delete";
}
export declare const Form: FC<iForm>;
export {};
