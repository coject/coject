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
exports.NationalId = void 0;
const react_1 = __importStar(require("react"));
// Coject
const Input_1 = require("../Input");
const NationalId = ({ name, label, helperText, value, validation, errorMessages, ...props }) => {
    const validate = (0, react_1.useMemo)(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^\d{10}$/,
                message: errorMessages?.pattern ?? "National ID Must be Exactly 10 Digits"
            },
            required: errorMessages?.required ?? "National ID is Required"
        };
    }, [validation]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input_1.Input, { name: name, label: label || "National ID", type: "text", helperText: helperText, validation: validate, value: value, inputProps: { inputMode: "numeric", maxLength: 10, pattern: "[0-9]*" }, ...props })));
};
exports.NationalId = NationalId;
//# sourceMappingURL=index.js.map