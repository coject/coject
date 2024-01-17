import React, { useState, useEffect } from "react";
// Material UI
import { Box } from "@mui/material";
// Components
import { Header, Sidebar, Footer } from "../../Builder";
// Styles
import useStyles from "./theme";
export const Dashboard = ({ menus, logo, icon, search, localeText, languages, defaultLanguage, mobMenus, copyRight, children }) => {
    const { classes } = useStyles();
    const [menusList, setMenusList] = useState({});
    const [sidebar, setSidebar] = useState(true);
    // Menus
    useEffect(() => {
        setMenusList(menus);
    }, [menus]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            React.createElement(Header, { sidebar: sidebar, setSidebar: setSidebar, menus: menusList, setMenus: setMenusList, logo: logo, icon: icon, search: search, languages: languages, defaultLanguage: defaultLanguage, mobMenus: mobMenus, localeText: localeText }),
            React.createElement(Sidebar, { sidebar: sidebar, menus: menusList, setMenus: setMenusList }),
            React.createElement(Box, { className: `${classes.pages} ${!sidebar ? classes.closeSidebar : ""}` },
                children,
                React.createElement(Footer, { menus: menusList, setMenus: setMenusList, copyRight: copyRight })))));
};
//# sourceMappingURL=index.js.map