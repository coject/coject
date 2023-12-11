import { FC } from "react";
import { GridColDef } from "@mui/x-data-grid";
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
};
interface iForm {
    style?: any;
    mode?: string;
    name?: string;
    getForm?: any;
    onSubmit?: any;
    children?: any;
    dispatch?: any;
    setModal?: any;
    onSuccess?: any;
    dataSource?: any;
    schema?: iSchema | any;
    onSubmitClear?: boolean;
}
export declare const Form: FC<iForm>;
export {};
