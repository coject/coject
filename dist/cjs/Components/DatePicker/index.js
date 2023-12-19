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
const moment_hijri_1 = __importDefault(require("moment-hijri"));
// Material UI
const material_1 = require("@mui/material");
const AdapterMoment_1 = require("@mui/x-date-pickers/AdapterMoment");
const AdapterMomentHijri_1 = require("@mui/x-date-pickers/AdapterMomentHijri");
const LocalizationProvider_1 = require("@mui/x-date-pickers/LocalizationProvider");
const DateTimePicker_1 = require("@mui/x-date-pickers/DateTimePicker");
const DatePicker_1 = require("@mui/x-date-pickers/DatePicker");
// Styles
const theme_1 = __importDefault(require("./theme"));
const DatePicker = ({ name, value, hijri, format, inFormat, outFormat, minDate, maxDate, error, helperText, style, withTime, textView, fullWidth, onChange, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const DateComponent = withTime ? DateTimePicker_1.DateTimePicker : DatePicker_1.DatePicker;
    const { setValue, control } = (0, react_hook_form_1.useFormContext)() || {};
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(hijri ? (0, moment_hijri_1.default)(new Date()) : (0, moment_1.default)(new Date()));
    // Calendar
    const Calendar = hijri
        ? { minDate: (0, moment_hijri_1.default)(minDate ? minDate : "14-03-1937", inFormat ? inFormat : "DD-MM-YYYY"), maxDate: (0, moment_hijri_1.default)(maxDate ? maxDate : "26-10-2076", inFormat ? inFormat : "DD-MM-YYYY") }
        : { minDate: (0, moment_1.default)(minDate ? minDate : "01-01-1900", inFormat ? inFormat : "DD-MM-YYYY"), maxDate: (0, moment_1.default)(minDate ? minDate : "01-12-2099", inFormat ? inFormat : "DD-MM-YYYY") };
    // Default Value
    (0, react_1.useEffect)(() => {
        control && setValue(name || "default", selectedDate.format(outFormat ? outFormat : "DD-MM-YYYY"));
    }, [control, setValue, name, selectedDate, outFormat]);
    // Normal Value
    (0, react_1.useEffect)(() => {
        if (value) {
            const ValueFormat = hijri ? (0, moment_hijri_1.default)(value, inFormat ? inFormat : "DD-MM-YYYY") : (0, moment_1.default)(value, inFormat ? inFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
            control && setValue(name || "default", ValueFormat.format(outFormat ? outFormat : "DD-MM-YYYY"));
        }
    }, [value, setValue, control, name, hijri, inFormat, outFormat]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: `${classes.root} ${error ? classes.rootError : ""}` },
            react_1.default.createElement(LocalizationProvider_1.LocalizationProvider, { dateAdapter: hijri ? AdapterMomentHijri_1.AdapterMomentHijri : AdapterMoment_1.AdapterMoment }, textView
                ? react_1.default.createElement(material_1.Typography, { ...style, ...props }, selectedDate.format(format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"))
                : react_1.default.createElement(DateComponent, { className: `${fullWidth ? "MuiFormControl-fullWidth" : ""}`, label: props.label ? props.label : name, value: selectedDate, ...style, ...Calendar, ...props, format: format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY", onChange: (newValue) => {
                        setSelectedDate(newValue);
                        onChange && onChange(newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                        control && setValue(name || "default", newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                    } })),
            helperText && react_1.default.createElement(material_1.FormHelperText, { className: classes.error }, helperText))));
};
exports.DatePicker = DatePicker;
//# sourceMappingURL=index.js.map