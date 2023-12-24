import { FC } from "react";
interface iMobHeader {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    search?: boolean;
    languages?: ("ar" | "en" | string)[];
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
}
export declare const MobHeader: FC<iMobHeader>;
export {};
