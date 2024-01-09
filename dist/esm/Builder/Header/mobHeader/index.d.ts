import { FC } from "react";
interface iMobHeader {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    search?: boolean;
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
    languages?: {
        name: "ar" | "en" | string;
        logo?: string;
        onClick?: any;
    }[];
}
export declare const MobHeader: FC<iMobHeader>;
export {};
