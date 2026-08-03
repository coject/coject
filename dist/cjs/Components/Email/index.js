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
exports.Email = void 0;
const react_1 = __importStar(require("react"));
// Coject
const Input_1 = require("../Input");
const Email = ({ name, label, helperText, value, validation, errorMessages, ...props }) => {
    const validate = (0, react_1.useMemo)(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: errorMessages?.pattern ?? "Please enter a valid email address"
            },
            required: errorMessages?.required ?? "Email is required"
        };
    }, [validation]);
    return (react_1.default.createElement(Input_1.Input, { name: name, label: label || "", type: "email", helperText: helperText, validation: validate, value: value, ...props }));
};
exports.Email = Email;
//# sourceMappingURL=index.js.map