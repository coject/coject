import { FC } from "react";
interface Props {
    name: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    required?: boolean | string;
    onChange?: (fullNumber: string) => void;
}
export declare const InternationalPhone: FC<Props>;
export {};
