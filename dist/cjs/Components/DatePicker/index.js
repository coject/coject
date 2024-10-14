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
exports.DatePicker = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Moment
const moment_1 = __importDefault(require("moment"));
// Coject Hijri
const coject_hijri_1 = __importDefault(require("coject-hijri"));
const adapter_1 = require("coject-hijri/adapter");
// Material UI
const material_1 = require("@mui/material");
const AdapterMoment_1 = require("@mui/x-date-pickers/AdapterMoment");
const LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
const DateTimePicker_1 = require("@mui/x-date-pickers/DateTimePicker");
const DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
// Styles
const theme_1 = __importDefault(require("./theme"));
const DatePicker = ({ name, value, hijri, viewFormat, actionFormat, minDate, maxDate, error, helperText, style, withTime, textView, fullWidth, onChange, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const DateComponent = withTime ? DateTimePicker_1.DateTimePicker : DatePicker_1.DatePicker;
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(hijri ? (0, coject_hijri_1.default)(new Date()) : (0, moment_1.default)(new Date()));
    const { setValue, control, getValues, watch } = (0, react_hook_form_1.useFormContext)() || {};
    // Calendar
    const Calendar = hijri
        ? { minDate: (0, coject_hijri_1.default)(minDate ? minDate : "14-03-1937", (actionFormat && minDate) ? actionFormat : "DD-MM-YYYY"), maxDate: (0, coject_hijri_1.default)(maxDate ? maxDate : "26-10-2076", (actionFormat && maxDate) ? actionFormat : "DD-MM-YYYY") }
        : { minDate: (0, moment_1.default)(minDate ? minDate : "01-01-1900", (actionFormat && minDate) ? actionFormat : "DD-MM-YYYY"), maxDate: (0, moment_1.default)(maxDate ? maxDate : "01-12-2099", (actionFormat && maxDate) ? actionFormat : "DD-MM-YYYY") };
    // Methods Watching
    (0, react_1.useEffect)(() => {
        if (getValues && getValues(name || "default")) {
            const ValueFormat = hijri ? (0, coject_hijri_1.default)(getValues(name || "default"), actionFormat ? actionFormat : "DD-MM-YYYY") : (0, moment_1.default)(getValues(name || "default"), actionFormat ? actionFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
        }
        else
            setSelectedDate(hijri ? (0, coject_hijri_1.default)(new Date()) : (0, moment_1.default)(new Date()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues, name, watch && watch(name || "default")]);
    // Default Value
    (0, react_1.useEffect)(() => {
        control && setValue(name || "default", selectedDate.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
    }, [control, setValue, name, selectedDate, actionFormat]);
    // Normal Value
    (0, react_1.useEffect)(() => {
        if (value) {
            const ValueFormat = hijri ? (0, coject_hijri_1.default)(value, actionFormat ? actionFormat : "DD-MM-YYYY") : (0, moment_1.default)(value, actionFormat ? actionFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
            control && setValue(name || "default", ValueFormat.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
        }
    }, [value, setValue, control, name, hijri, actionFormat]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: `${classes.root} ${error ? classes.rootError : ""} coject_date` },
            react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: (hijri ? adapter_1.Adapter : AdapterMoment_1.AdapterMoment) }, textView
                ? react_1.default.createElement(material_1.Typography, { ...style, ...props }, selectedDate.format(viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"))
                : react_1.default.createElement(DateComponent, { className: `${fullWidth ? "MuiFormControl-fullWidth" : ""}`, label: props.label ? props.label : name, value: selectedDate, ...style, ...Calendar, ...props, format: viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY", onChange: (newValue) => {
                        setSelectedDate(newValue);
                        onChange && onChange(newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY"), Methods);
                        control && setValue(name || "default", newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
                    } })),
            helperText && react_1.default.createElement(material_1.FormHelperText, { className: classes.error }, helperText))));
};
exports.DatePicker = DatePicker;
//# sourceMappingURL=index.js.map