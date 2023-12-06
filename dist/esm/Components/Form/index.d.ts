import { FC } from "react";
import { GridColDef } from "@mui/x-data-grid";
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
};
interface iForm {
    mode?: string;
    name?: string;
    getForm?: any;
    onSubmit?: any;
    children?: any;
    dispatch?: any;
    setModal?: any;
    dataSource?: any;
    schema?: iSchema | any;
    onSubmitClear?: boolean;
}
export declare const Form: FC<iForm>;
export {};
