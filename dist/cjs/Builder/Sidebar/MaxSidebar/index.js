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
exports.MaxSidebar = void 0;
const react_1 = __importStar(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Coject
const Components_1 = require("../../../Components");
// Styles
const theme_1 = __importDefault(require("../theme"));
const MaxSidebar = ({ menus, setMenus, customList }) => {
    const { classes } = (0, theme_1.default)();
    const [accordionState, setAccordionState] = (0, react_1.useState)();
    // Accordion
    const accordionHandler = (Panel) => (_, isExpanded) => {
        setAccordionState(isExpanded ? Panel : false);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.sidebarList },
            customList,
            menus && !!Object.keys(menus).length && menus.sidebar && !!menus.sidebar.length && menus.sidebar.map((listItem, index) => {
                const ItemIcon = listItem.icon && Components_1.Icons[listItem.icon];
                if (listItem.children && !!listItem.children.length) {
                    return (react_1.default.createElement(material_1.Accordion, { key: index, className: classes.accordion, expanded: accordionState === ((listItem.label).toLowerCase()).replaceAll(" ", "_"), onChange: accordionHandler(((listItem.label).toLowerCase()).replaceAll(" ", "_")) },
                        react_1.default.createElement(material_1.Tooltip, { title: listItem.label, placement: "right" },
                            react_1.default.createElement(material_1.AccordionSummary, { className: classes.accordionTitle, ...(!listItem.noArrow ? { expandIcon: react_1.default.createElement(Components_1.Icons.ExpandMore, null) } : {}) },
                                listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                                ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                                !listItem.noLabel && listItem.label)),
                        react_1.default.createElement(material_1.AccordionDetails, null,
                            react_1.default.createElement(material_1.List, { className: `${classes.accordionList} maxMenuList` }, listItem.children.map((childListItem, childIndex) => {
                                const ChildItemIcon = childListItem.icon && Components_1.Icons[childListItem.icon];
                                return (react_1.default.createElement(material_1.Tooltip, { key: childIndex, title: childListItem.label, placement: "right" },
                                    react_1.default.createElement(material_1.ListItem, null,
                                        react_1.default.createElement(material_1.Button, { ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => childListItem.onClick && childListItem.onClick(setMenus) },
                                            childListItem.image && react_1.default.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                            ChildItemIcon ? react_1.default.createElement(ChildItemIcon, null) : "",
                                            !childListItem.noLabel && childListItem.label))));
                            })))));
                }
                else {
                    return (react_1.default.createElement(material_1.Tooltip, { key: index, title: listItem.label, placement: "right" },
                        react_1.default.createElement(material_1.Button, { fullWidth: true, className: classes.button, ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                            listItem.image && react_1.default.createElement("img", { src: listItem.image, alt: listItem.label }),
                            ItemIcon ? react_1.default.createElement(ItemIcon, null) : "",
                            !listItem.noLabel && listItem.label)));
                }
            }))));
};
exports.MaxSidebar = MaxSidebar;
//# sourceMappingURL=index.js.map