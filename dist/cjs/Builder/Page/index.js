"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const react_1 = __importDefault(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Page = ({ title, tabTitle, children }) => {
    const { classes } = (0, theme_1.default)();
    document.title = localStorage.language === 'en' ? localStorage.projectNameTwo + ` | ${tabTitle ?? title}` : localStorage.projectNameOne + ` | ${tabTitle ?? title}`;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { id: 'coject_page', className: classes.root },
            title &&
                react_1.default.createElement(material_1.Box, { className: classes.header },
                    react_1.default.createElement(material_1.Typography, { variant: "h2" }, title)),
            children)));
};
exports.Page = Page;
//# sourceMappingURL=index.js.map