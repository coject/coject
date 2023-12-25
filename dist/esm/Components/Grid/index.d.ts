import { FC } from "react";
import { DataGridProps, GridColDef } from "@mui/x-data-grid";
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
};
interface iGrid extends DataGridProps {
    dispatch?: any;
    noRequest?: any;
    dataSource?: any;
    toolbar?: boolean;
    actions?: boolean;
    onAddSubmit?: any;
    customKey?: string;
    onEditSubmit?: any;
    onDeleteSubmit?: any;
    schema?: iSchema | any;
    noAddRequest?: boolean;
    noEditRequest?: boolean;
    noDeleteRequest?: boolean;
}
export declare const Grid: FC<Omit<iGrid, "rows" | "columns">>;
export {};
