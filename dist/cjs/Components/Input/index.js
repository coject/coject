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
exports.Input = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Material UI
const material_1 = require("@mui/material");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Input = ({ value, helperText, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const { register, setValue, control } = (0, react_hook_form_1.useFormContext)() || {};
    // Value
    (0, react_1.useEffect)(() => {
        if (value)
            control && setValue(props?.name || "default", value);
    }, [control, props?.name, setValue, value]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(material_1.TextField, { ...(control && register(props?.name || "default")), defaultValue: value, label: props?.label ? props?.label : (props?.name || "default"), ...props }, props?.children),
            helperText && react_1.default.createElement(material_1.FormHelperText, { className: classes.error }, helperText))));
};
exports.Input = Input;
//# sourceMappingURL=index.js.map