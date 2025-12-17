import { FC, ReactNode } from 'react';
import { DataGridProps, GridColDef, GridLocaleText } from "@mui/x-data-grid";
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
};
type iLocaleText = GridLocaleText & {
    saveAllBtn?: string;
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
    resizable?: boolean;
    dependancies?: any[];
    noRequest?: boolean;
    customToolbar?: any;
    onAddCallback?: any;
    onDeleteSubmit?: any;
    onEditCallback?: any;
    actionsControl?: any;
    schema?: iSchema | any;
    noAddRequest?: boolean;
    onDeleteCallback?: any;
    enableSaveAll?: boolean;
    editFormChildren?: any;
    invisibility?: string[];
    noEditRequest?: boolean;
    dataSource?: iDataSource;
    noRenderRequest?: boolean;
    noDeleteRequest?: boolean;
    addFormChildren?: ReactNode;
    formInvisibility?: string[];
    localeText?: iLocaleText | any;
    actions?: boolean | ("add" | "edit" | "delete")[];
    toolbar?: boolean | ("visibility" | "filter" | "export" | "print")[];
    customActions?: {
        icon: string;
        label: string;
        onClick: any;
    }[];
    onCellValidationError?: (message: string, info: {
        field: string;
        value: any;
        id: any;
    }) => void;
}
export declare const Grid: FC<Omit<iGrid, "rows" | "columns">>;
export {};
