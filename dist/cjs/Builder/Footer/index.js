"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Footer = void 0;
const react_1 = __importDefault(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Coject
const Components_1 = require("../../Components");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Footer = ({ menus, setMenus, copyRight, versionName }) => {
    const { classes } = (0, theme_1.default)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root },
            copyRight &&
                react_1.default.createElement(material_1.Box, { className: classes.copyRight }, copyRight),
            versionName &&
                react_1.default.createElement(material_1.Box, { className: classes.copyRight }, versionName),
            menus && !!Object.keys(menus).length && menus.footer && !!menus.footer.length &&
                react_1.default.createElement(material_1.List, { className: classes.menuList, sx: { display: { xs: "none", md: "flex" } } }, menus.footer.map((listItem, index) => {
                    const ItemIcon = listItem.icon && Components_1.Icons[listItem.icon];
                    return (react_1.default.createElement(material_1.ListItem, { key: index },
                        react_1.default.createElement(material_1.Button, { ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                            listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                            ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                            !listItem.noLabel && listItem.label)));
                })))));
};
exports.Footer = Footer;
//# sourceMappingURL=index.js.map