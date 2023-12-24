import React, { FC, useState, ReactNode } from "react";

// Material UI
import { Box } from "@mui/material";

// Components
import { Header, Sidebar, Footer } from "../../Builder";

// Styles
import useStyles from "./theme";

// Interfaces
interface iDashboard {
    logo?: any;
    icon?: any;
    menus?: any;
    search?: boolean;
    children?: ReactNode;
    copyRight?: ReactNode;
    languages?: ("ar" | "en" | string)[];
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
}

export const Dashboard: FC<iDashboard> = ({ menus, logo, icon, search, languages, mobMenus, copyRight, children }) => {
    const { classes } = useStyles();
    const [ menusList, setMenusList ] = useState(menus);
    const [ sidebar, setSidebar ] = useState(true);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Header sidebar={sidebar} setSidebar={setSidebar} menus={menusList} setMenus={setMenusList} logo={logo} icon={icon} search={search} languages={languages} mobMenus={mobMenus} />
                <Sidebar sidebar={sidebar} menus={menusList} setMenus={setMenusList} />
                <Box className={`${classes.pages} ${!sidebar ? classes.closeSidebar : ""}`}>
                    {children}
                    <Footer menus={menusList} setMenus={setMenusList} copyRight={copyRight} />
                </Box>
            </Box>
        </React.Fragment>
    );
}