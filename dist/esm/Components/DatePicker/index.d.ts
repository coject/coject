import { FC } from 'react';
interface iDatePicker {
    name: string;
    value?: string;
    hijri?: boolean;
    format?: string;
    inFormat?: string;
    outFormat?: string;
    minDate?: string;
    maxDate?: string;
    views?: string;
    withTime?: boolean;
    justText?: boolean;
    placeholder?: string;
    onChange?: any;
}
export declare const DatePicker: FC<iDatePicker>;
export {};
