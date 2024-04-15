import React from "react";
// Material UI
import { Box } from "@mui/material";
// Components
import { MaxSidebar } from "./MaxSidebar";
import { MinSidebar } from "./MinSidebar";
// Styles
import useStyles from "./theme";
export const Sidebar = ({ menus, setMenus, sidebar }) => {
    const { classes } = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { sx: { display: { xs: "none", md: "flex" } } },
            React.createElement(Box, { className: `${classes.root} ${!sidebar ? classes.closedSidebar : ""}` }, sidebar
                ? React.createElement(MaxSidebar, { menus: menus, setMenus: setMenus })
                : React.createElement(MinSidebar, { menus: menus, setMenus: setMenus })))));
};
//# sourceMappingURL=index.js.map