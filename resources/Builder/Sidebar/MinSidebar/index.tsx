import React, { FC, useState } from "react";

// Material UI
import { Box, Button, List, ListItem, Menu, MenuItem, Tooltip } from "@mui/material";

// Coject
import { Icons } from "../../../Components";

// Styles
import useStyles from "../theme";

// Interfaces
interface iMinSidebar {
    menus?: any;
    setMenus?: any;
    customList?: any;
}

export const MinSidebar: FC<iMinSidebar> = ({ menus, setMenus, customList }) => {
    const { classes } = useStyles();
    const [ menuList, setMenuList ] = useState<any>({});

    return (
        <React.Fragment>
            <Box className={classes.sidebarList}>
                <List className={classes.list}>
                    {customList}
                    { menus && !!Object.keys(menus).length && menus.sidebar && !!menus.sidebar.length && menus.sidebar.map((listItem: any, index: number) => {
                        const ItemIcon = listItem.icon && Icons[listItem.icon];
                        if (listItem.children && !!listItem.children.length) {
                            return (
                                <ListItem key={index} className={classes.listItem}>
                                    <Tooltip title={listItem.label} placement="right">
                                        <Button onClick={(e) => setMenuList({[((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget})}>
                                            {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                            {ItemIcon ? <ItemIcon/> : ""}
                                        </Button>
                                    </Tooltip>
                                    { menuList && !!Object.keys(menuList).length &&
                                        <Menu className={`${classes.menuList} minMenuList`} anchorEl={menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]} open={Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")])} onClose={() => setMenuList({})} transformOrigin={{ horizontal: "right", vertical: "top" }} anchorOrigin={{ horizontal: "right", vertical: "top" }}>
                                            { listItem.children.map((childListItem: any, childIndex: number) => {
                                                const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                return (
                                                    <MenuItem key={childIndex} onClick={() => setMenuList({})}>
                                                        <Button {...(childListItem.link ? {href: childListItem.link} : {})} onClick={() => childListItem.onClick && childListItem.onClick(setMenus)}>
                                                            {childListItem.image && <img src={childListItem.image} alt={childListItem.label} />}
                                                            {ChildItemIcon ? <ChildItemIcon /> : ""}
                                                            {!childListItem.noLabel && childListItem.label}
                                                        </Button>
                                                    </MenuItem>
                                                )
                                            }) }
                                        </Menu>
                                    }
                                </ListItem>
                            )
                        } else {
                            return (
                                <ListItem key={index} className={classes.listItem}>
                                    <Tooltip title={listItem.label} placement="right">
                                        <Button fullWidth className={classes.button} {...(listItem.link ? {href: listItem.link} : {})} onClick={() => listItem.onClick && listItem.onClick(setMenus)}>
                                            {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                            {ItemIcon ? <ItemIcon/> : ""}
                                        </Button>
                                    </Tooltip>
                                </ListItem>
                            )
                        }
                    }) }
                </List>
            </Box>
        </React.Fragment>
    );
}