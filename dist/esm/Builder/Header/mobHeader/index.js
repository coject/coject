import React, { useState, useEffect } from "react";
// Material UI
import { Box, IconButton, Menu, Typography, Button, MenuItem, TextField, Accordion, AccordionSummary, AccordionDetails, Divider, List, ListItem } from "@mui/material";
// Material Icon
import * as MuiIcons from "@mui/icons-material";
// Styles
import useStyles from "../theme";
export const MobHeader = ({ logo, icon, menus, setMenus, localeText, languages, customList, defaultLanguage, search, mobMenus }) => {
    const Icons = MuiIcons;
    const { classes } = useStyles();
    const [menuList, setMenuList] = useState({});
    const [searchView, setSearchView] = useState(false);
    const [accordionState, setAccordionState] = useState("components");
    const [languageLogo, setLanguageLogo] = useState("/images/lang/en.jpg");
    // Accordion
    const accordionHandler = (Panel) => (_, isExpanded) => {
        setAccordionState(isExpanded ? Panel : false);
    };
    // Default Language Logo
    useEffect(() => {
        if (defaultLanguage && languages?.length) {
            if (defaultLanguage === 'ar' || defaultLanguage === 'en') {
                setLanguageLogo(`${defaultLanguage === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
            }
            else
                setLanguageLogo(languages.filter((language) => language.name === defaultLanguage)[0]?.logo || "");
        }
    }, [defaultLanguage, languages]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.mobHeader },
            React.createElement(Box, { className: classes.mobLogo },
                React.createElement("img", { onClick: () => window.location.href = '/', src: icon, alt: "Logo" })),
            React.createElement(Box, { className: classes.mobMenu },
                React.createElement(List, { className: classes.menuList }, !!mobMenus?.length &&
                    React.createElement(ListItem, null,
                        React.createElement(Button, { onClick: (e) => setMenuList({ mainMenu: e.currentTarget }) },
                            React.createElement(Icons.Menu, null)))),
                React.createElement(List, { className: classes.menuList, style: { justifyContent: "flex-end" } },
                    search &&
                        React.createElement(MenuItem, null,
                            React.createElement(Button, { onClick: () => setSearchView(!searchView) },
                                React.createElement(Icons.SearchOutlined, null)),
                            searchView &&
                                React.createElement(Box, { className: classes.mobSearch },
                                    React.createElement(IconButton, { className: "mobSearchBtn" },
                                        React.createElement(Icons.Search, null)),
                                    React.createElement(TextField, { fullWidth: true, placeholder: localeText?.headerSearch || "Search" }))),
                    languages && !!languages.length &&
                        React.createElement(MenuItem, null,
                            React.createElement(Button, { onClick: (e) => setMenuList({ languages: e.currentTarget }) },
                                React.createElement("img", { src: languageLogo, alt: 'Language' })),
                            React.createElement(Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList?.languages, open: Boolean(menuList?.languages), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } },
                                React.createElement(Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                    React.createElement(Box, { className: classes.subMenuContent }, languages.map((language, index) => {
                                        if (language.name === "ar" || language.name === "en") {
                                            return (React.createElement(MenuItem, { key: index, component: Button, onClick: (event) => {
                                                    setMenuList({});
                                                    language.onClick && language.onClick(event);
                                                    setLanguageLogo(`${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
                                                } },
                                                React.createElement("img", { src: `${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`, alt: language.name === "ar" ? "العربية" : "English" }),
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
                    !(!!mobMenus?.length && mobMenus.includes("subMenu")) && menus && !!Object.keys(menus).length && menus.subMenu && !!menus.subMenu.length && menus.subMenu.map((listItem, index) => {
                        const ItemIcon = listItem.icon && Icons[listItem.icon];
                        if (listItem.children && !!listItem.children.length) {
                            return (React.createElement(ListItem, { key: index },
                                React.createElement(Button, { className: classes.mobProfile, onClick: (e) => setMenuList({ [((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget }) },
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
                    })),
                menuList && !!Object.keys(menuList).length && !!mobMenus?.length &&
                    React.createElement(Menu, { className: `${classes.mobMenuList} mobMenuList`, anchorEl: menuList && Object.keys(menuList).length && menuList?.mainMenu, open: Boolean(menuList?.mainMenu), onClose: () => setMenuList({}) },
                        React.createElement(Button, { className: `${classes.mobMenuClose} mobMenuClose`, onClick: () => setMenuList({}) },
                            React.createElement(Icons.Close, null)),
                        React.createElement(Box, { className: classes.mobMenuContent },
                            React.createElement(MenuItem, { className: classes.mobMenuImage },
                                React.createElement(Button, { href: "/" },
                                    React.createElement("img", { src: logo, alt: "Logo" }))),
                            customList,
                            mobMenus.map((menu, index) => {
                                return (React.createElement(React.Fragment, { key: index },
                                    index !== 0 && React.createElement(Divider, null),
                                    menus && !!Object.keys(menus).length && menus[menu] && !!menus[menu].length && menus[menu].map((listItem, index) => {
                                        const ItemIcon = listItem.icon && Icons[listItem.icon];
                                        if (listItem.children && !!listItem.children.length) {
                                            return (React.createElement(Accordion, { key: index, className: classes.mobAccordion, expanded: accordionState === ((listItem.label).toLowerCase()).replaceAll(" ", "_"), onChange: accordionHandler(((listItem.label).toLowerCase()).replaceAll(" ", "_")) },
                                                React.createElement(AccordionSummary, { className: classes.mobMenuTitle, ...(!listItem.noArrow ? { expandIcon: React.createElement(Icons.Add, null) } : {}) },
                                                    React.createElement(Typography, { variant: "h6" },
                                                        listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                                        ItemIcon ? React.createElement(ItemIcon, null) : "",
                                                        React.createElement(Typography, null, !listItem.noLabel && listItem.label))),
                                                React.createElement(AccordionDetails, { className: classes.mobMenuBody }, listItem.children.map((childListItem, childIndex) => {
                                                    const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                    return (React.createElement(MenuItem, { key: childIndex, title: childListItem.label, onClick: () => setMenuList({}) },
                                                        React.createElement(Button, { ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => childListItem.onClick && childListItem.onClick(setMenus) },
                                                            childListItem.image && React.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                                            ChildItemIcon ? React.createElement(ChildItemIcon, null) : "",
                                                            React.createElement(Typography, null, !childListItem.noLabel && childListItem.label))));
                                                }))));
                                        }
                                        else {
                                            return (React.createElement(MenuItem, { key: index, title: listItem.label, onClick: () => { setMenuList({}); listItem.onClick && listItem.onClick(setMenus); } },
                                                React.createElement(Button, { fullWidth: true, type: "button", ...(listItem.link ? { href: listItem.link } : {}) },
                                                    listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                                                    ItemIcon ? React.createElement(ItemIcon, null) : "",
                                                    !listItem.noLabel && React.createElement(Typography, null, listItem.label))));
                                        }
                                    })));
                            })))))));
};
//# sourceMappingURL=index.js.map