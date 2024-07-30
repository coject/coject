import React from "react";
// Material UI
import { Box, List, ListItem, Button } from "@mui/material";
// Coject
import { Icons } from "../../Components";
// Styles
import useStyles from "./theme";
export const Footer = ({ menus, setMenus, copyRight, versionName }) => {
    const { classes } = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            copyRight &&
                React.createElement(Box, { className: classes.copyRight }, copyRight),
            versionName &&
                React.createElement(Box, { className: classes.copyRight }, versionName),
            menus && !!Object.keys(menus).length && menus.footer && !!menus.footer.length &&
                React.createElement(List, { className: classes.menuList, sx: { display: { xs: "none", md: "flex" } } }, menus.footer.map((listItem, index) => {
                    const ItemIcon = listItem.icon && Icons[listItem.icon];
                    return (React.createElement(ListItem, { key: index },
                        React.createElement(Button, { ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                            listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                            ItemIcon ? React.createElement(ItemIcon, null) : "",
                            !listItem.noLabel && listItem.label)));
                })))));
};
//# sourceMappingURL=index.js.map