import { FC } from 'react';
import { DataGridProps, GridColDef, GridLocaleText } from "@mui/x-data-grid";
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
};
type iLocaleText = GridLocaleText & {
    toolbarNew?: string;
    modalAddTitle?: string;
    modalAddButton?: string;
    modalEditTitle?: string;
    modalEditButton?: string;
    paginationLabel?: string;
    modalDeleteTitle?: string;
    gridHeaderAction?: string;
    paginationLabelOf?: string;
    modalDeleteButton?: string;
    modalDeleteMessage?: string;
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
interface iGrid extends DataGridProps {
    dispatch?: any;
    callback?: any;
    staticData?: any;
    onAddSubmit?: any;
    customKey?: string;
    onEditSubmit?: any;
    noRequest?: boolean;
    customToolbar?: any;
    onAddCallback?: any;
    onDeleteSubmit?: any;
    onEditCallback?: any;
    schema?: iSchema | any;
    noAddRequest?: boolean;
    onDeleteCallback?: any;
    invisibility?: string[];
    noEditRequest?: boolean;
    dataSource?: iDataSource;
    noDeleteRequest?: boolean;
    formInvisibility?: string[];
    localeText?: iLocaleText | any;
    actions?: boolean | ("add" | "edit" | "delete")[];
    toolbar?: boolean | ("visibility" | "filter" | "export")[];
    customActions?: {
        icon: string;
        label: string;
        onClick: any;
    }[];
}
export declare const Grid: FC<Omit<iGrid, "rows" | "columns">>;
export {};
