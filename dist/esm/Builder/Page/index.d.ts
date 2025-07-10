import { FC, ReactNode } from "react";
interface iPage {
    tabTitle?: string;
    children?: ReactNode;
    title?: string | ReactNode;
}
export declare const Page: FC<iPage>;
export {};
