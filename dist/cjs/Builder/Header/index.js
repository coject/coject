"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Components
const dskHeader_1 = require("./dskHeader");
const mobHeader_1 = require("./mobHeader");
const Header = ({ logo, icon, search, localeText, customList, languages, defaultLanguage, mobMenus, menus, sidebar, setSidebar, setMenus }) => {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { sx: { display: { xs: "none", md: "flex" } } },
            react_1.default.createElement(dskHeader_1.DskHeader, { sidebar: sidebar, setSidebar: setSidebar, customList: customList, menus: menus, logo: logo, icon: icon, search: search, languages: languages, defaultLanguage: defaultLanguage, setMenus: setMenus, localeText: localeText })),
        react_1.default.createElement(material_1.Box, { sx: { display: { xs: "flex", md: "none" } } },
            react_1.default.createElement(mobHeader_1.MobHeader, { logo: logo, icon: icon, search: search, customList: customList, languages: languages, defaultLanguage: defaultLanguage, mobMenus: mobMenus, setMenus: setMenus, menus: menus, localeText: localeText }))));
};
exports.Header = Header;
//# sourceMappingURL=index.js.map