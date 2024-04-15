import { FC, ReactNode } from "react";
interface iDashboard {
    logo?: any;
    icon?: any;
    menus?: any;
    search?: boolean;
    children?: ReactNode;
    copyRight?: ReactNode;
    localeText?: {
        headerSearch?: string;
    };
    defaultLanguage?: "ar" | "en" | string;
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
    languages?: {
        name: "ar" | "en" | string;
        logo?: string;
        onClick?: any;
    }[];
}
export declare const Dashboard: FC<iDashboard>;
export {};
