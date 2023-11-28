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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const react_1 = __importDefault(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Material Icon
const MuiIcons = __importStar(require("@mui/icons-material"));
// Styles
const theme_1 = __importDefault(require("./theme"));
const Modal = (_a) => {
    var { open, setOpen, title, children } = _a, props = __rest(_a, ["open", "setOpen", "title", "children"]);
    const Icons = MuiIcons;
    const { classes } = (0, theme_1.default)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Modal, Object.assign({ open: open }, props),
            react_1.default.createElement(material_1.Box, { className: classes.root },
                react_1.default.createElement(material_1.Box, { className: classes.header },
                    react_1.default.createElement(material_1.Typography, { variant: "h5" }, title ? title : "Modal Title"),
                    react_1.default.createElement(material_1.IconButton, { onClick: () => setOpen(false) },
                        react_1.default.createElement(Icons.Close, null))),
                react_1.default.createElement(material_1.Box, { className: classes.body },
                    react_1.default.createElement(react_1.default.Fragment, null, children))))));
};
exports.Modal = Modal;
//# sourceMappingURL=index.js.map