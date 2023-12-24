import { FC } from "react";
interface HeaderInterface {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    setSidebar?: any;
    search?: boolean;
    sidebar?: boolean;
    languages?: ("ar" | "en" | string)[];
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
}
export declare const Header: FC<HeaderInterface>;
export {};
