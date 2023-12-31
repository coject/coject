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
exports.Switch = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Material UI
const material_1 = require("@mui/material");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Switch = ({ name, value, onChange, trueValue, falseValue, label, helperText, error, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const [checkedValue, setCheckedValue] = (0, react_1.useState)(false);
    const { setValue, control, getValues, watch } = (0, react_hook_form_1.useFormContext)() || {};
    // Methods Watching
    (0, react_1.useEffect)(() => {
        control && setCheckedValue(!!getValues(name || "default") ? trueValue ? trueValue === getValues(name || "default") : !!getValues(name || "default") : false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch(name || "default")]);
    // Value
    (0, react_1.useEffect)(() => {
        if (value) {
            control && setValue(name || "default", (trueValue ? (value === trueValue) ? trueValue : (falseValue ? falseValue : false) : value));
            setCheckedValue(value ? (`${value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${value}` === trueValue) : true) : false : false);
        }
        else
            control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, value, falseValue, trueValue]);
    // Change Value
    const changeValue = (event) => {
        onChange && onChange(event, ((event.target.checked) ? (trueValue ? trueValue : true) : (falseValue ? falseValue : false)));
        if (event.target.checked) {
            setCheckedValue(true);
            control && setValue(name || "default", (trueValue ? trueValue : true));
        }
        else {
            setCheckedValue(false);
            control && setValue(name || "default", (falseValue ? falseValue : false));
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: `${classes.root} ${error ? classes.rootError : ""}` },
            react_1.default.createElement(material_1.FormControlLabel, { control: react_1.default.createElement(material_1.Switch, { name: name || "default", value: checkedValue, checked: checkedValue, onChange: changeValue, ...props }), label: label ? label : (name || "default") }),
            helperText && react_1.default.createElement(material_1.FormHelperText, { className: classes.error }, helperText))));
};
exports.Switch = Switch;
//# sourceMappingURL=index.js.map