import { FC } from "react";
interface iForm {
    schema?: any;
    mode?: string;
    name?: string;
    getForm?: any;
    onSubmit?: any;
    children?: any;
    dispatch?: any;
    setModal?: any;
    dataSource?: any;
    onSubmitClear?: boolean;
}
export declare const Form: FC<iForm>;
export {};
