import { FC } from "react";
import { DataGridProps, GridColDef } from "@mui/x-data-grid";
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
};
interface iGrid extends DataGridProps {
    dispatch?: any;
    dataSource?: any;
    toolbar?: boolean;
    actions?: boolean;
    onAddSubmit?: any;
    customId?: string;
    onEditSubmit?: any;
    schema?: iSchema | any;
}
export declare const Grid: FC<Omit<iGrid, "rows" | "columns">>;
export {};
