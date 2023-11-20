import { FC } from 'react';
interface iForm {
    name?: string;
    dataSource?: any;
    offline?: boolean;
    mode?: string;
    getForm?: any;
    storeData?: any;
    customData?: any;
    rowIndex?: any;
    schema?: any;
    onSubmit?: any;
    onSubmitData?: any;
    onSubmitClear?: boolean;
    gridMode?: any;
    children?: any;
    dispatch?: any;
    storeSchema?: any;
}
export declare const Form: FC<iForm>;
export {};
