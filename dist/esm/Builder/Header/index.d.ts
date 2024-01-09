import { FC } from "react";
interface HeaderInterface {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    setSidebar?: any;
    search?: boolean;
    sidebar?: boolean;
    defaultLanguage?: "ar" | "en" | string;
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
    languages?: {
        name: "ar" | "en" | string;
        logo?: string;
        onClick?: any;
    }[];
}
export declare const Header: FC<HeaderInterface>;
export {};
