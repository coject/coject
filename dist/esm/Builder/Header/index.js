import React from "react";
// Material UI
import { Box } from "@mui/material";
// Components
import { DskHeader } from "./dskHeader";
import { MobHeader } from "./mobHeader";
export const Header = ({ logo, icon, search, languages, mobMenus, menus, sidebar, setSidebar, setMenus }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { sx: { display: { xs: "none", md: "flex" } } },
            React.createElement(DskHeader, { sidebar: sidebar, setSidebar: setSidebar, menus: menus, logo: logo, icon: icon, search: search, languages: languages, setMenus: setMenus })),
        React.createElement(Box, { sx: { display: { xs: "flex", md: "none" } } },
            React.createElement(MobHeader, { logo: logo, icon: icon, search: search, languages: languages, mobMenus: mobMenus, setMenus: setMenus, menus: menus }))));
};
//# sourceMappingURL=index.js.map