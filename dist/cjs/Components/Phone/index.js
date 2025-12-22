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
exports.Phone = void 0;
const react_1 = __importStar(require("react"));
// Material UI
const material_1 = require("@mui/material");
// Coject
const Input_1 = require("../Input");
const Phone = ({ name, label, helperText, value, validation, onChange, ...props }) => {
    const validate = (0, react_1.useMemo)(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^\d{9}$/,
                message: "Please enter a valid Saudi phone number (9 digits only)",
            },
            required: validation?.required ?? "Phone number is required",
        };
    }, [validation]);
    const handleChange = (e) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        onChange?.(`966${numericValue}`);
    };
    const displayValue = typeof value === "string" && value.startsWith("966") ? value.slice(3) : value || "";
    return (react_1.default.createElement(Input_1.Input, { name: name, label: label || "Phone", helperText: helperText, validation: validate, value: displayValue, onChange: handleChange, InputProps: {
            ...props.InputProps,
            endAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "end" }, "966+")),
        }, ...props }));
};
exports.Phone = Phone;
//# sourceMappingURL=index.js.map