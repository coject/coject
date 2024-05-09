import React, { FC, useState, ReactNode, useEffect } from "react";

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
    customMobList?: any;
    customSideList?: any;
    children?: ReactNode;
    copyRight?: ReactNode;
    localeText?: {
        headerSearch?: string
    };
    defaultLanguage?: "ar" | "en" | string;
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
    languages?: {name: "ar" | "en" | string, logo?: string, onClick?: any}[];
}

export const Dashboard: FC<iDashboard> = ({ menus, logo, icon, customMobList, customSideList, search, localeText, languages, defaultLanguage, mobMenus, copyRight, children }) => {
    const { classes } = useStyles();
    const [ menusList, setMenusList ] = useState({});
    const [ sidebar, setSidebar ] = useState(true);

    // Menus
    useEffect(() => {
        setMenusList(menus);
    }, [menus]);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Header sidebar={sidebar} setSidebar={setSidebar} customList={customMobList} menus={menusList} setMenus={setMenusList} logo={logo} icon={icon} search={search} languages={languages} defaultLanguage={defaultLanguage} mobMenus={mobMenus} localeText={localeText} />
                <Sidebar sidebar={sidebar} menus={menusList} setMenus={setMenusList} customList={customSideList} />
                <Box className={`${classes.pages} ${!sidebar ? classes.closeSidebar : ""}`}>
                    {children}
                    <Footer menus={menusList} setMenus={setMenusList} copyRight={copyRight} />
                </Box>
            </Box>
        </React.Fragment>
    );
}