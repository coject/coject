"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Button = ({ ...props }) => {
    const { classes } = (0, theme_1.default)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(material_1.Button, { ...props }, props?.children))));
};
exports.Button = Button;
//# sourceMappingURL=index.js.map