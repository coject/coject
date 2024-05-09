import { FC } from "react";
interface DskHeaderInterface {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    customList?: any;
    setSidebar?: any;
    search?: boolean;
    sidebar?: boolean;
    localeText?: {
        headerSearch?: string;
    };
    defaultLanguage?: "ar" | "en" | string;
    languages?: {
        name: "ar" | "en" | string;
        logo?: string;
        onClick?: any;
    }[];
}
export declare const DskHeader: FC<DskHeaderInterface>;
export {};
