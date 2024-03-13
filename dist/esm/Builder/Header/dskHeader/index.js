import React, { useState, useEffect } from "react";
// Material UI
import { Box, IconButton, List, ListItem, TextField, Button, Menu, MenuItem, Typography } from "@mui/material";
// Coject
import { Icons } from "../../../Components";
// Styles
import useStyles from "../theme";
export const DskHeader = ({ logo, icon, search, localeText, languages, defaultLanguage, menus, setMenus, sidebar, setSidebar }) => {
    const { classes } = useStyles();
    const [menuList, setMenuList] = useState({});
    const [languageLogo, setLanguageLogo] = useState(process.env.PUBLIC_URL + '/images/lang/en.jpg');
    // Default Language Logo
    useEffect(() => {
        if (defaultLanguage) {
            if (defaultLanguage === 'ar' || defaultLanguage === 'en') {
                setLanguageLogo(process.env.PUBLIC_URL + `${defaultLanguage === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
            }
            else if (languages?.length) {
                setLanguageLogo(languages.filter((language) => language.name === defaultLanguage)[0]?.logo || "");
            }
        }
    }, [defaultLanguage, languages]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.dskHeader },
            React.createElement(Box, { className: `${classes.dskLogo} ${!sidebar ? classes.closedDskLogo : ""}` }, sidebar
                ? React.createElement("img", { onClick: () => window.location.href = "/", src: logo, alt: "Logo" })
                : React.createElement("img", { onClick: () => window.location.href = "/", src: icon, alt: "Logo" })),
            React.createElement(Box, { className: `${classes.dskMenu} ${!sidebar ? classes.closedDskMenu : ""}` },
                React.createElement(List, { className: classes.menuList },
                    React.createElement(ListItem, null,
                        React.createElement(Button, { onClick: () => setSidebar(!sidebar) },
                            React.createElement(Icons.Menu, null))),
                    search &&
                        React.createElement(ListItem, null,
                            React.createElement(Box, { className: classes.dskSearch },
                                React.createElement(IconButton, null,
                                    React.createElement(Icons.Search, null)),
                                React.createElement(TextField, { placeholder: localeText?.headerSearch || "Search" }))),
                    menus && !!Object.keys(menus).length && menus.menu && !!menus.menu.length && menus.menu.map((listItem, index) => {
                        const ItemIcon = listItem.icon && Icons[listItem.icon];
                        if (listItem.children && !!listItem.children.length) {
                            return (React.createElement(ListItem, { key: index },
                                React.createElement(Button, { onClick: (e) => setMenuList({ [((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget }) },
                                    listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? React.createElement(ItemIcon, null) : "",
                                    React.createElement(Typography, null, !listItem.noLabel && listItem.label),
                                    !listItem.noArrow && React.createElement(Icons.ExpandMore, null)),
                                menuList && !!Object.keys(menuList).length &&
                                    React.createElement(Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")], open: Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'left', vertical: 'top' }, anchorOrigin: { horizontal: 'left', vertical: 'bottom' } },
                                        React.createElement(Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                            React.createElement(Box, { className: classes.subMenuContent }, listItem.children.map((childListItem, childIndex) => {
                                                const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                return (React.createElement(MenuItem, { key: childIndex, component: Button, ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => { setMenuList({}); childListItem.onClick && childListItem.onClick(setMenus); } },
                                                    childListItem.image && React.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                                    ChildItemIcon ? React.createElement(ChildItemIcon, null) : "",
                                                    React.createElement(Typography, null, !childListItem.noLabel && childListItem.label)));
                                            }))))));
                        }
                        else {
                            return (React.createElement(ListItem, { key: index },
                                React.createElement(Button, { ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                                    listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? React.createElement(ItemIcon, null) : "",
                                    React.createElement(Typography, null, !listItem.noLabel && listItem.label))));
                        }
                    })),
                React.createElement(List, { className: classes.menuList, style: { justifyContent: "flex-end" } },
                    languages && !!languages.length &&
                        React.createElement(MenuItem, null,
                            React.createElement(Button, { onClick: (e) => setMenuList({ languages: e.currentTarget }) },
                                React.createElement("img", { src: languageLogo, alt: "Language" })),
                            React.createElement(Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList?.languages, open: Boolean(menuList?.languages), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } },
                                React.createElement(Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                    React.createElement(Box, { className: classes.subMenuContent }, languages.map((language, index) => {
                                        if (language.name === "ar" || language.name === "en") {
                                            return (React.createElement(MenuItem, { key: index, component: Button, onClick: (event) => {
                                                    setMenuList({});
                                                    language.onClick && language.onClick(event);
                                                    setLanguageLogo(process.env.PUBLIC_URL + `${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
                                                } },
                                                React.createElement("img", { src: process.env.PUBLIC_URL + `${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`, alt: language.name === "ar" ? "العربية" : "English" }),
                                                language.name === "ar" ? "العربية" : "English"));
                                        }
                                        else {
                                            return (React.createElement(MenuItem, { key: index, component: Button, onClick: (event) => {
                                                    setMenuList({});
                                                    setLanguageLogo(language?.logo || "");
                                                    language.onClick && language.onClick(event);
                                                } },
                                                React.createElement("img", { src: language?.logo, alt: language.name }),
                                                language.name));
                                        }
                                    }))))),
                    menus && !!Object.keys(menus).length && menus.subMenu && !!menus.subMenu.length && menus.subMenu.map((listItem, index) => {
                        const ItemIcon = listItem.icon && Icons[listItem.icon];
                        if (listItem.children && !!listItem.children.length) {
                            return (React.createElement(ListItem, { key: index },
                                React.createElement(Button, { onClick: (e) => setMenuList({ [((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget }) },
                                    listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? React.createElement(ItemIcon, null) : "",
                                    React.createElement(Typography, null, !listItem.noLabel && listItem.label),
                                    !listItem.noArrow && React.createElement(Icons.ExpandMore, null)),
                                menuList && !!Object.keys(menuList).length &&
                                    React.createElement(Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")], open: Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } },
                                        React.createElement(Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                            React.createElement(Box, { className: classes.subMenuContent }, listItem.children.map((childListItem, childIndex) => {
                                                const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                return (React.createElement(MenuItem, { key: childIndex, component: Button, ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => { setMenuList({}); childListItem.onClick && childListItem.onClick(setMenus); } },
                                                    childListItem.image && React.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                                    ChildItemIcon ? React.createElement(ChildItemIcon, null) : "",
                                                    React.createElement(Typography, null, !childListItem.noLabel && childListItem.label)));
                                            }))))));
                        }
                        else {
                            return (React.createElement(ListItem, { key: index },
                                React.createElement(Button, { ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                                    listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? React.createElement(ItemIcon, null) : "",
                                    React.createElement(Typography, null, !listItem.noLabel && listItem.label))));
                        }
                    }))))));
};
//# sourceMappingURL=index.js.map