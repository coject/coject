import { FC } from "react";
interface DskHeaderInterface {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    setSidebar?: any;
    search?: boolean;
    sidebar?: boolean;
    languages?: ("ar" | "en" | string)[];
}
export declare const DskHeader: FC<DskHeaderInterface>;
export {};
