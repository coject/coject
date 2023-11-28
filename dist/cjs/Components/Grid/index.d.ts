import { FC } from "react";
interface iGrid {
    schema?: any;
    dispatch?: any;
    dataSource?: any;
    actions?: boolean;
    toolbar?: boolean;
    initialState?: any;
    pageSizeOptions?: number[];
}
export declare const Grid: FC<iGrid>;
export {};
