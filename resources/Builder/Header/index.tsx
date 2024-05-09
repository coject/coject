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
    customList?: any;
    setSidebar?: any;
    search?: boolean;
    sidebar?: boolean;
    localeText?: {
        headerSearch?: string
    };
    defaultLanguage?: "ar" | "en" | string;
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
    languages?: {name: "ar" | "en" | string, logo?: string, onClick?: any}[];
}

export const Header: FC<HeaderInterface> = ({ logo, icon, search, localeText, customList, languages, defaultLanguage, mobMenus, menus, sidebar, setSidebar, setMenus }) => {
    return (
        <React.Fragment>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <DskHeader sidebar={sidebar} setSidebar={setSidebar} customList={customList} menus={menus} logo={logo} icon={icon} search={search} languages={languages} defaultLanguage={defaultLanguage} setMenus={setMenus} localeText={localeText} />
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <MobHeader logo={logo} icon={icon} search={search} customList={customList} languages={languages} defaultLanguage={defaultLanguage} mobMenus={mobMenus} setMenus={setMenus} menus={menus} localeText={localeText} />
            </Box>
        </React.Fragment>
    );
};