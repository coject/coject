import { FC } from "react";
interface iSelect {
    name: string;
    variant?: any;
    value?: string;
    onChange?: any;
    dispatch?: any;
    dataSource?: any;
    multiple?: boolean;
    required?: boolean;
    customKey?: string;
    customName?: string;
    placeholder?: string;
}
export declare const Select: FC<iSelect>;
export {};
