import { FC, ReactNode } from "react";
interface iModal {
    open: boolean;
    setOpen?: any;
    title?: string;
    children?: ReactNode;
}
export declare const Modal: FC<iModal>;
export {};
