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
exports.Dashboard = void 0;
const react_1 = __importStar(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Components
const Builder_1 = require("../../Builder");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Dashboard = ({ menus, logo, icon, customMobList, customSideList, search, localeText, languages, defaultLanguage, mobMenus, copyRight, versionName, children }) => {
    const { classes } = (0, theme_1.default)();
    const [menusList, setMenusList] = (0, react_1.useState)({});
    const [sidebar, setSidebar] = (0, react_1.useState)(true);
    // Menus
    (0, react_1.useEffect)(() => {
        setMenusList(menus);
    }, [menus]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(Builder_1.Header, { sidebar: sidebar, setSidebar: setSidebar, customList: customMobList, menus: menusList, setMenus: setMenusList, logo: logo, icon: icon, search: search, languages: languages, defaultLanguage: defaultLanguage, mobMenus: mobMenus, localeText: localeText }),
            react_1.default.createElement(Builder_1.Sidebar, { sidebar: sidebar, menus: menusList, setMenus: setMenusList, customList: customSideList }),
            react_1.default.createElement(material_1.Box, { className: `${classes.pages} ${!sidebar ? classes.closeSidebar : ""}` },
                children,
                react_1.default.createElement(Builder_1.Footer, { menus: menusList, setMenus: setMenusList, copyRight: copyRight, versionName: versionName })))));
};
exports.Dashboard = Dashboard;
//# sourceMappingURL=index.js.map