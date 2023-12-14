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
exports.Checkbox = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Material UI
const material_1 = require("@mui/material");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Checkbox = (_a) => {
    var { name, label, trueValue, falseValue } = _a, props = __rest(_a, ["name", "label", "trueValue", "falseValue"]);
    const { classes } = (0, theme_1.default)();
    const [checkedValue, setCheckedValue] = (0, react_1.useState)(false);
    const { register, setValue, control } = (0, react_hook_form_1.useFormContext)() || {};
    // Value
    (0, react_1.useEffect)(() => {
        if (props === null || props === void 0 ? void 0 : props.value) {
            control && setValue(name || "default", (trueValue ? ((props === null || props === void 0 ? void 0 : props.value) === trueValue) ? trueValue : (falseValue ? falseValue : false) : props === null || props === void 0 ? void 0 : props.value));
            setCheckedValue((props === null || props === void 0 ? void 0 : props.value) ? (`${props === null || props === void 0 ? void 0 : props.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props === null || props === void 0 ? void 0 : props.value}` === trueValue) : true) : false : false);
        }
        else
            control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, props === null || props === void 0 ? void 0 : props.value, falseValue, trueValue]);
    // Change Value
    const changeValue = (event) => {
        if (event.target.checked) {
            setCheckedValue(true);
            setValue(name || "default", (trueValue ? trueValue : true));
        }
        else {
            setCheckedValue(false);
            setValue(name || "default", (falseValue ? falseValue : false));
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(material_1.FormControlLabel, { control: react_1.default.createElement(material_1.Checkbox, Object.assign({}, (control && register(name || "default")), { value: checkedValue, checked: checkedValue, onChange: changeValue }, props)), label: label ? label : name }))));
};
exports.Checkbox = Checkbox;
//# sourceMappingURL=index.js.map