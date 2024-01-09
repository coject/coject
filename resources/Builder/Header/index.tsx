import React, { FC } from "react";

// Material UI
import { Box } from "@mui/material";

// Components
import { DskHeader } from "./dskHeader";
import { MobHeader } from "./mobHeader";

// Interface
interface HeaderInterface {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    setSidebar?: any;
    search?: boolean;
    sidebar?: boolean;
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
    languages?: {name: "ar" | "en" | string, logo?: string, onClick?: any}[];
}

export const Header: FC<HeaderInterface> = ({ logo, icon, search, languages, mobMenus, menus, sidebar, setSidebar, setMenus }) => {
    return (
        <React.Fragment>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <DskHeader sidebar={sidebar} setSidebar={setSidebar} menus={menus} logo={logo} icon={icon} search={search} languages={languages} setMenus={setMenus} />
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <MobHeader logo={logo} icon={icon} search={search} languages={languages} mobMenus={mobMenus} setMenus={setMenus} menus={menus} />
            </Box>
        </React.Fragment>
    );
};