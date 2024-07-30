import React, { FC, ReactNode } from "react";

// Material UI
import { Box, List, ListItem, Button } from "@mui/material";

// Coject
import { Icons } from "../../Components";

// Styles
import useStyles from "./theme";

// Interfaces
interface iFooter {
    menus?: any;
    setMenus?: any;
    copyRight?: ReactNode;
    versionName?: ReactNode;
}

export const Footer: FC<iFooter> = ({ menus, setMenus, copyRight, versionName }) => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.root}>
                { copyRight &&
                    <Box className={classes.copyRight}>{copyRight}</Box>
                }
                { versionName &&
                    <Box className={classes.copyRight}>{versionName}</Box>
                }
                { menus && !!Object.keys(menus).length && menus.footer && !!menus.footer.length &&
                    <List className={classes.menuList} sx={{ display: { xs: "none", md: "flex" } }}>
                        { menus.footer.map((listItem: any, index: number) => {
                            const ItemIcon = listItem.icon && Icons[listItem.icon];
                            return (
                                <ListItem key={index}>
                                    <Button {...(listItem.link ? {href: listItem.link} : {})} onClick={() => listItem.onClick && listItem.onClick(setMenus)}>
                                        {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                        {ItemIcon ? <ItemIcon /> : ""}
                                        {!listItem.noLabel && listItem.label}
                                    </Button>
                                </ListItem>
                            )
                        }) }
                    </List>
                }
            </Box>
        </React.Fragment>
    );
}