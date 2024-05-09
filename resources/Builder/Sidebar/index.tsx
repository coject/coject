import React, { FC } from "react";

// Material UI
import { Box } from "@mui/material";

// Components
import { MaxSidebar } from "./MaxSidebar";
import { MinSidebar } from "./MinSidebar";

// Styles
import useStyles from "./theme";

// Interface
interface SidebarInterface {
    menus?: any;
    setMenus?: any;
    customList?: any;
    sidebar?: boolean;
}

export const Sidebar: FC<SidebarInterface> = ({ menus, setMenus, customList, sidebar }) => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Box className={`${classes.root} ${!sidebar ? classes.closedSidebar : ""}`}>
                    { sidebar
                        ? <MaxSidebar menus={menus} customList={customList} setMenus={setMenus} />
                        : <MinSidebar menus={menus} customList={customList} setMenus={setMenus} />
                    }
                </Box>
            </Box>
        </React.Fragment>
    );
};