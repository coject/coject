import { FC, ReactNode } from "react";
interface iDashboard {
    logo?: any;
    icon?: any;
    menus?: any;
    search?: boolean;
    children?: ReactNode;
    copyRight?: ReactNode;
    languages?: ("ar" | "en" | string)[];
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
}
export declare const Dashboard: FC<iDashboard>;
export {};
