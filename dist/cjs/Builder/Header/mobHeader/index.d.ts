import { FC } from "react";
interface iMobHeader {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    customList?: any;
    search?: boolean;
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
export declare const MobHeader: FC<iMobHeader>;
export {};
