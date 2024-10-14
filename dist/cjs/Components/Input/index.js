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
const Input = ({ name, value, helperText, validation, required, onChange, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const [inputValue, setInputValue] = (0, react_1.useState)("");
    const { setValue, control, getValues, watch, setError, clearErrors, formState: { errors } } = (0, react_hook_form_1.useFormContext)() || {};
    // Methods Watching
    (0, react_1.useEffect)(() => {
        control && setInputValue(getValues(name || "default") ? getValues(name || "default") : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);
    // Value
    (0, react_1.useEffect)(() => {
        if (value) {
            setInputValue(value);
            control && setValue(name || "default", value);
        }
        else
            control && setValue(name || "default", "");
    }, [control, name, setValue, value]);
    // Change Value
    const changeValue = (event) => {
        onChange && onChange(event, event.target.value, Methods);
        setInputValue(event.target.value);
        control && setValue(name || "default", event.target.value);
    };
    // Error Handling
    (0, react_1.useEffect)(() => {
        const Required = (!!required || !!validation?.required) && !inputValue;
        const Numbers = !!validation?.number && !!inputValue && !(/^[0-9,.]+$/i.test(`${inputValue}`));
        const Arabic = !!validation?.arabic && !!inputValue && !(/^[ ءأ-ي0-9',._/-]+$/i.test(`${inputValue}`));
        const English = !!validation?.english && !!inputValue && !(/^[-/_.,'0-9A-Za-z ]+$/i.test(`${inputValue}`));
        const MinNumber = !!validation?.min && !!inputValue && Number(inputValue) < Number((validation.min instanceof Object) ? validation.min.value : validation.min);
        const MaxNumber = !!validation?.max && !!inputValue && Number(inputValue) > Number((validation.max instanceof Object) ? validation.max.value : validation.max);
        const MinLength = !!validation?.minLength && !!inputValue && (`${inputValue}`).length < Number((validation.minLength instanceof Object) ? validation.minLength.value : validation.minLength);
        const MaxLength = !!validation?.maxLength && !!inputValue && (`${inputValue}`).length > Number((validation.maxLength instanceof Object) ? validation.maxLength.value : validation.maxLength);
        const Pattern = !!validation?.pattern && !!inputValue && ((validation.pattern instanceof Object) ? !((validation?.pattern?.value).test(`${inputValue}`)) : !((validation?.pattern).test(`${inputValue}`)));
        // Clear Errors
        if (!Required && !Numbers && !Arabic && !English && !MinNumber && !MaxNumber && !MinLength && !MaxLength && !Pattern)
            clearErrors(name || "default");
        // Set Errors
        else {
            // Required
            if (Required)
                setError(name || "default", { type: "required", message: ((required?.toString() === "true") || (validation?.required?.toString() === "true")) ? "This Field Is Required" : `${required ? required : ""}${validation?.required ? validation?.required : ""}` });
            // Numbers
            if (Numbers)
                setError(name || "default", { type: "pattern", message: (validation?.number?.toString() === "true") ? "This Field Just Numbers" : `${validation?.number}` });
            // Arabic
            if (Arabic)
                setError(name || "default", { type: "pattern", message: (validation?.arabic?.toString() === "true") ? "This Field Just Arabic" : `${validation?.arabic}` });
            // English
            if (English)
                setError(name || "default", { type: "pattern", message: (validation?.english?.toString() === "true") ? "This Field Just English" : `${validation?.english}` });
            // MinNumber
            if (MinNumber)
                setError(name || "default", { type: "min", message: (validation?.min instanceof Object) ? `${validation.min.message}` : "Less Than The Minimum" });
            // MaxNumber
            if (MaxNumber)
                setError(name || "default", { type: "max", message: (validation?.max instanceof Object) ? `${validation.max.message}` : "Greater Than The Maximum" });
            // MinLength
            if (MinLength)
                setError(name || "default", { type: "minLength", message: (validation?.minLength instanceof Object) ? `${validation.minLength.message}` : "Less Than The Minimum Length" });
            // MaxLength
            if (MaxLength)
                setError(name || "default", { type: "maxLength", message: (validation?.maxLength instanceof Object) ? `${validation.maxLength.message}` : "Greater Than The Maximum Length" });
            // Pattern
            if (Pattern)
                setError(name || "default", { type: "pattern", message: (validation?.pattern instanceof Object) ? `${validation.pattern.message}` : "This Field Required" });
        }
    }, [inputValue, required, name, setError, clearErrors, validation]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: `${classes.root} coject_input` },
            react_1.default.createElement(material_1.TextField, { name: name || "default", value: inputValue, onChange: changeValue, label: props?.label ? props?.label : (name || "default"), ...props }, props?.children),
            (helperText || (control && errors && errors[name || "default"])) && react_1.default.createElement(material_1.FormHelperText, { className: classes.error },
                control && errors && errors[name || "default"]?.message,
                helperText && !(control && errors && errors[name || "default"]) && helperText))));
};
exports.Input = Input;
//# sourceMappingURL=index.js.map