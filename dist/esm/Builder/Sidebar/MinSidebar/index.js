import React, { useState } from "react";
// Material UI
import { Box, Button, List, ListItem, Menu, MenuItem, Tooltip } from "@mui/material";
// Coject
import { Icons } from "../../../Components";
// Styles
import useStyles from "../theme";
export const MinSidebar = ({ menus, setMenus, customList }) => {
    const { classes } = useStyles();
    const [menuList, setMenuList] = useState({});
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.sidebarList },
            React.createElement(List, { className: classes.list },
                customList,
                menus && !!Object.keys(menus).length && menus.sidebar && !!menus.sidebar.length && menus.sidebar.map((listItem, index) => {
                    const ItemIcon = listItem.icon && Icons[listItem.icon];
                    if (listItem.children && !!listItem.children.length) {
                        return (React.createElement(ListItem, { key: index, className: classes.listItem },
                            React.createElement(Tooltip, { title: listItem.label, placement: "right" },
                                React.createElement(Button, { onClick: (e) => setMenuList({ [((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget }) },
                                    listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? React.createElement(ItemIcon, null) : "")),
                            menuList && !!Object.keys(menuList).length &&
                                React.createElement(Menu, { className: `${classes.menuList} minMenuList`, anchorEl: menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")], open: Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]), onClose: () => setMenuList({}), transformOrigin: { horizontal: "right", vertical: "top" }, anchorOrigin: { horizontal: "right", vertical: "top" } }, listItem.children.map((childListItem, childIndex) => {
                                    const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                    return (React.createElement(MenuItem, { key: childIndex, onClick: () => setMenuList({}) },
                                        React.createElement(Button, { ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => childListItem.onClick && childListItem.onClick(setMenus) },
                                            childListItem.image && React.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                            ChildItemIcon ? React.createElement(ChildItemIcon, null) : "",
                                            !childListItem.noLabel && childListItem.label)));
                                }))));
                    }
                    else {
                        return (React.createElement(ListItem, { key: index, className: classes.listItem },
                            React.createElement(Tooltip, { title: listItem.label, placement: "right" },
                                React.createElement(Button, { fullWidth: true, className: classes.button, ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                                    listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? React.createElement(ItemIcon, null) : ""))));
                    }
                })))));
};
//# sourceMappingURL=index.js.map