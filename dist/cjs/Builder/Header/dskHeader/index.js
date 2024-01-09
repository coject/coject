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
exports.DskHeader = void 0;
const react_1 = __importStar(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Coject
const Components_1 = require("../../../Components");
// Styles
const theme_1 = __importDefault(require("../theme"));
const DskHeader = ({ logo, icon, search, languages, defaultLanguage, menus, setMenus, sidebar, setSidebar }) => {
    const { classes } = (0, theme_1.default)();
    const [menuList, setMenuList] = (0, react_1.useState)({});
    const [languageLogo, setLanguageLogo] = (0, react_1.useState)(process.env.PUBLIC_URL + '/images/lang/en.jpg');
    // Default Language Logo
    (0, react_1.useEffect)(() => {
        if (defaultLanguage) {
            if (defaultLanguage === 'ar' || defaultLanguage === 'en') {
                setLanguageLogo(process.env.PUBLIC_URL + `${defaultLanguage === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
            }
            else if (languages?.length) {
                setLanguageLogo(languages.filter((language) => language.name === defaultLanguage)[0].logo || "");
            }
        }
    }, [defaultLanguage]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.dskHeader },
            react_1.default.createElement(material_1.Box, { className: `${classes.dskLogo} ${!sidebar ? classes.closedDskLogo : ""}` }, sidebar
                ? react_1.default.createElement("img", { onClick: () => window.location.href = "/", src: logo, alt: "Logo" })
                : react_1.default.createElement("img", { onClick: () => window.location.href = "/", src: icon, alt: "Logo" })),
            react_1.default.createElement(material_1.Box, { className: `${classes.dskMenu} ${!sidebar ? classes.closedDskMenu : ""}` },
                react_1.default.createElement(material_1.List, { className: classes.menuList },
                    react_1.default.createElement(material_1.ListItem, null,
                        react_1.default.createElement(material_1.Button, { onClick: () => setSidebar(!sidebar) },
                            react_1.default.createElement(Components_1.Icons.Menu, null))),
                    search &&
                        react_1.default.createElement(material_1.ListItem, null,
                            react_1.default.createElement(material_1.Box, { className: classes.dskSearch },
                                react_1.default.createElement(material_1.IconButton, null,
                                    react_1.default.createElement(Components_1.Icons.Search, null)),
                                react_1.default.createElement(material_1.TextField, { placeholder: "Search" }))),
                    menus && !!Object.keys(menus).length && menus.menu && !!menus.menu.length && menus.menu.map((listItem, index) => {
                        const ItemIcon = listItem.icon && Components_1.Icons[listItem.icon];
                        if (listItem.children && !!listItem.children.length) {
                            return (react_1.default.createElement(material_1.ListItem, { key: index },
                                react_1.default.createElement(material_1.Button, { onClick: (e) => setMenuList({ [((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget }) },
                                    listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                                    !listItem.noLabel && listItem.label,
                                    !listItem.noArrow && react_1.default.createElement(Components_1.Icons.ExpandMore, null)),
                                menuList && !!Object.keys(menuList).length &&
                                    react_1.default.createElement(material_1.Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")], open: Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'left', vertical: 'top' }, anchorOrigin: { horizontal: 'left', vertical: 'bottom' } },
                                        react_1.default.createElement(material_1.Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                            react_1.default.createElement(material_1.Box, { className: classes.subMenuContent }, listItem.children.map((childListItem, childIndex) => {
                                                const ChildItemIcon = childListItem.icon && Components_1.Icons[childListItem.icon];
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
                react_1.default.createElement(material_1.List, { className: classes.menuList, style: { justifyContent: "flex-end" } },
                    languages && !!languages.length &&
                        react_1.default.createElement(material_1.MenuItem, null,
                            react_1.default.createElement(material_1.Button, { onClick: (e) => setMenuList({ languages: e.currentTarget }) },
                                react_1.default.createElement("img", { src: languageLogo, alt: "Language" })),
                            react_1.default.createElement(material_1.Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList?.languages, open: Boolean(menuList?.languages), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } },
                                react_1.default.createElement(material_1.Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                    react_1.default.createElement(material_1.Box, { className: classes.subMenuContent }, languages.map((language, index) => {
                                        if (language.name === "ar" || language.name === "en") {
                                            return (react_1.default.createElement(material_1.MenuItem, { key: index, component: material_1.Button, onClick: (event) => {
                                                    setMenuList({});
                                                    language.onClick && language.onClick(event);
                                                    setLanguageLogo(process.env.PUBLIC_URL + `${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
                                                } },
                                                react_1.default.createElement("img", { src: process.env.PUBLIC_URL + `${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`, alt: language.name === "ar" ? "Arabic" : "English" }),
                                                language.name === "ar" ? "Arabic" : "English"));
                                        }
                                        else {
                                            return (react_1.default.createElement(material_1.MenuItem, { key: index, component: material_1.Button, onClick: (event) => {
                                                    setMenuList({});
                                                    setLanguageLogo(language.logo || "");
                                                    language.onClick && language.onClick(event);
                                                } },
                                                react_1.default.createElement("img", { src: language.logo, alt: language.name }),
                                                language.name));
                                        }
                                    }))))),
                    menus && !!Object.keys(menus).length && menus.subMenu && !!menus.subMenu.length && menus.subMenu.map((listItem, index) => {
                        const ItemIcon = listItem.icon && Components_1.Icons[listItem.icon];
                        if (listItem.children && !!listItem.children.length) {
                            return (react_1.default.createElement(material_1.ListItem, { key: index },
                                react_1.default.createElement(material_1.Button, { onClick: (e) => setMenuList({ [((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget }) },
                                    listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                                    ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                                    !listItem.noLabel && listItem.label,
                                    !listItem.noArrow && react_1.default.createElement(Components_1.Icons.ExpandMore, null)),
                                menuList && !!Object.keys(menuList).length &&
                                    react_1.default.createElement(material_1.Menu, { className: classes.subMenuList, anchorEl: menuList && Object.keys(menuList).length && menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")], open: Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]), onClose: () => setMenuList({}), transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } },
                                        react_1.default.createElement(material_1.Box, { className: classes.subListMenu, onMouseLeave: () => setMenuList({}) },
                                            react_1.default.createElement(material_1.Box, { className: classes.subMenuContent }, listItem.children.map((childListItem, childIndex) => {
                                                const ChildItemIcon = childListItem.icon && Components_1.Icons[childListItem.icon];
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
                    }))))));
};
exports.DskHeader = DskHeader;
//# sourceMappingURL=index.js.map