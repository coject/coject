"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobHeader = void 0;
const react_1 = __importStar(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Material Icon
const MuiIcons = __importStar(require("@mui/icons-material"));
// Styles
const theme_1 = __importDefault(require("../theme"));
const MobHeader = ({ logo, icon, menus, setMenus, languages, search, mobMenus }) => {
    const Icons = MuiIcons;
    const { classes } = (0, theme_1.default)();
    const [menuList, setMenuList] = (0, react_1.useState)({});
    const [searchView, setSearchView] = (0, react_1.useState)(false);
    const [languageValue, setLanguageValue] = (0, react_1.useState)("en");
    const [accordionState, setAccordionState] = (0, react_1.useState)("components");
    // Accordion
    const accordionHandler = (Panel) => (_, isExpanded) => {
        setAccordionState(isExpanded ? Panel : false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.mobHeader },
            react_1.default.createElement(material_1.Box, { className: classes.mobLogo },
                react_1.default.createElement("img", { onClick: () => window.location.href = '/', src: icon, alt: "Logo" })),
            react_1.default.createElement(material_1.Box, { className: classes.mobMenu },
                react_1.default.createElement(material_1.List, { className: classes.menuList }, !!mobMenus?.length &&
                    react_1.default.createElement(material_1.ListItem, null,
                        react_1.default.createElement(material_1.Button, { onClick: (e) => setMenuList({ mainMenu: e.currentTarget }) },
                            react_1.default.createElement(Icons.Menu, null)))),
                react_1.default.createElement(material_1.List, { className: classes.menuList, style: { justifyContent: "flex-end" } },
                    search &&
                        react_1.default.createElement(material_1.MenuItem, null,
                            react_1.default.createElement(material_1.Button, { onClick: () => setSearchView(!searchView) },
                                react_1.default.createElement(Icons.SearchOutlined, null)),
                            searchView &&
                                react_1.default.createElement(material_1.Box, { className: classes.mobSearch },
                                    react_1.default.createElement(material_1.IconButton, null,
                                        react_1.default.createElement(Icons.Search, null)),
                                    react_1.default.createElement(material_1.TextField, { fullWidth: true, placeholder: "Search" }))),
                    languages && !!languages.length &&
                        react_1.default.createElement(material_1.MenuItem, null,
                            react_1.default.createElement(material_1.Button, { onClick: (e) => setMenuList({ languages: e.currentTarget }) },
                                react_1.default.createElement("img", { src: process.env.PUBLIC_URL + `${'/images/lang/' + languageValue + '.jpg'}`, alt: languageValue })),
                            react_1.default.createElement(material_1.Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList?.languages, open: Boolean(menuList?.languages), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } },
                                react_1.default.createElement(material_1.Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                    react_1.default.createElement(material_1.Box, { className: classes.subMenuContent }, languages.map((language, index) => {
                                        return (react_1.default.createElement(material_1.MenuItem, { key: index, component: material_1.Button, onClick: () => { setMenuList({}); setLanguageValue(language); } },
                                            react_1.default.createElement("img", { src: process.env.PUBLIC_URL + `${'/images/lang/' + language + '.jpg'}`, alt: language }),
                                            language === "ar" ? "Arabic" : "",
                                            language === "en" ? "English" : ""));
                                    }))))),
                    !(!!mobMenus?.length && mobMenus.includes("subMenu")) && menus && !!Object.keys(menus).length && menus.subMenu && !!menus.subMenu.length && menus.subMenu.map((listItem, index) => {
                        const ItemIcon = listItem.icon && Icons[listItem.icon];
                        if (listItem.children && !!listItem.children.length) {
                            return (react_1.default.createElement(material_1.ListItem, { key: index },
                                react_1.default.createElement(material_1.Button, { onClick: (e) => setMenuList({ [((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget }) },
                                    listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                                    !listItem.noLabel && listItem.label,
                                    !listItem.noArrow && react_1.default.createElement(Icons.ExpandMore, null)),
                                menuList && !!Object.keys(menuList).length &&
                                    react_1.default.createElement(material_1.Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")], open: Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } },
                                        react_1.default.createElement(material_1.Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                            react_1.default.createElement(material_1.Box, { className: classes.subMenuContent }, listItem.children.map((childListItem, childIndex) => {
                                                const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                return (react_1.default.createElement(material_1.MenuItem, { key: childIndex, component: material_1.Button, ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => { setMenuList({}); childListItem.onClick && childListItem.onClick(setMenus); } },
                                                    childListItem.image && react_1.default.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                                    ChildItemIcon ? react_1.default.createElement(ChildItemIcon, null) : "",
                                                    !childListItem.noLabel && childListItem.label));
                                            }))))));
                        }
                        else {
                            return (react_1.default.createElement(material_1.ListItem, { key: index },
                                react_1.default.createElement(material_1.Button, { ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                                    listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                                    !listItem.noLabel && listItem.label)));
                        }
                    })),
                menuList && !!Object.keys(menuList).length && !!mobMenus?.length &&
                    react_1.default.createElement(material_1.Menu, { className: classes.mobMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList?.mainMenu, open: Boolean(menuList?.mainMenu), onClose: () => setMenuList({}) },
                        react_1.default.createElement(material_1.Button, { className: classes.mobMenuClose, onClick: () => setMenuList({}) },
                            react_1.default.createElement(Icons.Close, null)),
                        react_1.default.createElement(material_1.Box, { className: classes.mobMenuContent },
                            react_1.default.createElement(material_1.MenuItem, { className: classes.mobMenuImage },
                                react_1.default.createElement(material_1.Button, { href: "/" },
                                    react_1.default.createElement("img", { src: logo, alt: "Logo" }))),
                            mobMenus.map((menu, index) => {
                                return (react_1.default.createElement(react_1.default.Fragment, { key: index },
                                    index !== 0 && react_1.default.createElement(material_1.Divider, null),
                                    menus && !!Object.keys(menus).length && menus[menu] && !!menus[menu].length && menus[menu].map((listItem, index) => {
                                        const ItemIcon = listItem.icon && Icons[listItem.icon];
                                        if (listItem.children && !!listItem.children.length) {
                                            return (react_1.default.createElement(material_1.Accordion, { key: index, className: classes.mobAccordion, expanded: accordionState === ((listItem.label).toLowerCase()).replaceAll(" ", "_"), onChange: accordionHandler(((listItem.label).toLowerCase()).replaceAll(" ", "_")) },
                                                react_1.default.createElement(material_1.AccordionSummary, { className: classes.mobMenuTitle, ...(!listItem.noArrow ? { expandIcon: react_1.default.createElement(Icons.Add, null) } : {}) },
                                                    react_1.default.createElement(material_1.Typography, { variant: "h6" },
                                                        listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                                                        ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                                                        !listItem.noLabel && listItem.label)),
                                                react_1.default.createElement(material_1.AccordionDetails, { className: classes.mobMenuBody }, listItem.children.map((childListItem, childIndex) => {
                                                    const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                    return (react_1.default.createElement(material_1.MenuItem, { key: childIndex, title: childListItem.label, onClick: () => setMenuList({}) },
                                                        react_1.default.createElement(material_1.Button, { ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => childListItem.onClick && childListItem.onClick(setMenus) },
                                                            childListItem.image && react_1.default.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                                            ChildItemIcon ? react_1.default.createElement(ChildItemIcon, null) : "",
                                                            !childListItem.noLabel && childListItem.label)));
                                                }))));
                                        }
                                        else {
                                            return (react_1.default.createElement(material_1.MenuItem, { key: index, title: listItem.label, onClick: () => { setMenuList({}); listItem.onClick && listItem.onClick(setMenus); } },
                                                react_1.default.createElement(material_1.Button, { fullWidth: true, type: "button", ...(listItem.link ? { href: listItem.link } : {}) },
                                                    listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                                                    ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                                                    !listItem.noLabel && react_1.default.createElement(material_1.Typography, null, listItem.label))));
                                        }
                                    })));
                            })))))));
};
exports.MobHeader = MobHeader;
//# sourceMappingURL=index.js.map