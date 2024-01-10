"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_1 = __importDefault(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Components
const MaxSidebar_1 = require("./MaxSidebar");
const MinSidebar_1 = require("./MinSidebar");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Sidebar = ({ menus, setMenus, sidebar }) => {
    const { classes } = (0, theme_1.default)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { sx: { display: { xs: "none", md: "flex" } } },
            react_1.default.createElement(material_1.Box, { className: `${classes.root} ${!sidebar ? classes.closedSidebar : ""}` }, sidebar
                ? react_1.default.createElement(MaxSidebar_1.MaxSidebar, { menus: menus, setMenus: setMenus })
                : react_1.default.createElement(MinSidebar_1.MinSidebar, { menus: menus, setMenus: setMenus })))));
};
exports.Sidebar = Sidebar;
//# sourceMappingURL=index.js.map