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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternationalPhone = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Material UI
const material_1 = require("@mui/material");
// Countries
const countries = [
    { code: "+966", label: "Saudi Arabia" },
    { code: "+20", label: "Egypt" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+971", label: "UAE" },
    { code: "+965", label: "Kuwait" },
    { code: "+974", label: "Qatar" },
    { code: "+973", label: "Bahrain" },
    { code: "+968", label: "Oman" },
    { code: "+962", label: "Jordan" },
    { code: "+961", label: "Lebanon" },
    { code: "+964", label: "Iraq" },
    { code: "+90", label: "Turkey" }
];
const InternationalPhone = ({ name, label, value, required, fullWidth, onChange }) => {
    const { setValue } = (0, react_hook_form_1.useFormContext)();
    const [phone, setPhone] = (0, react_1.useState)("");
    const [touched, setTouched] = (0, react_1.useState)(false);
    const [country, setCountry] = (0, react_1.useState)(countries[0]);
    // Handle Country Code
    (0, react_1.useEffect)(() => {
        if (!value)
            return;
        const matched = countries.find((c) => value.startsWith(c.code));
        if (matched) {
            setCountry(matched);
            setPhone(value.replace(matched.code, ""));
        }
    }, [value]);
    // Handle Value
    (0, react_1.useEffect)(() => {
        const fullNumber = `${country.code}${phone}`;
        setValue(name, fullNumber, { shouldValidate: true });
        if (onChange)
            onChange(fullNumber);
    }, [country, phone, name, setValue, onChange]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.TextField, { fullWidth: fullWidth, label: label || "Phone Number", value: phone, required: !!required, dir: "ltr", helperText: touched && !!required && !phone ? (typeof required === "string" ? required : "This Field Is Required") : "", onBlur: () => setTouched(true), onChange: (e) => setPhone(e.target.value.replace(/\D/g, "")), inputProps: { inputMode: "numeric", dir: "ltr" }, InputProps: {
                startAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "start" },
                    react_1.default.createElement(material_1.Autocomplete, { disableClearable: true, options: countries, value: country, onChange: (_, v) => v && setCountry(v), getOptionLabel: (o) => o.code, sx: {
                            width: 90,
                            "& .MuiInputBase-root": {
                                paddingRight: "18px",
                                paddingLeft: "4px"
                            },
                            "& .MuiAutocomplete-popupIndicator": {
                                marginRight: "-2px"
                            },
                            "& .MuiAutocomplete-input": {
                                padding: "4px 0 !important",
                                textAlign: "center"
                            }
                        }, renderInput: (params) => (react_1.default.createElement(material_1.TextField, { ...params, variant: "standard", InputProps: {
                                ...params.InputProps,
                                disableUnderline: true
                            } })) }))),
            } })));
};
exports.InternationalPhone = InternationalPhone;
//# sourceMappingURL=index.js.map