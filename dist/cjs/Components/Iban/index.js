"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iban = void 0;
const react_1 = __importDefault(require("react"));
// Coject
const Input_1 = require("../Input");
const Iban = ({ name, label, helperText, required = true, errorMessages, ...props }) => {
    const ibanRegex = /^[A-Za-z]{2}[0-9]{20}$/;
    const { value, onChange, ...restProps } = props;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Input_1.Input, { name: name, label: label || "IBAN", helperText: helperText, required: errorMessages?.required ?? required, inputProps: { maxLength: 22 }, validation: {
                pattern: {
                    value: ibanRegex,
                    message: errorMessages?.pattern ?? "IBAN Must Start With 2 Letters Followed by 20 Digits"
                },
                minLength: { value: 22, message: "IBAN Must be Exactly 22 Characters" },
                maxLength: { value: 22, message: "IBAN Must be Exactly 22 Characters" }
            }, onChange: (_, v, form) => {
                let val = v.toUpperCase();
                val = val.replace(/[^A-Za-z0-9]/g, "");
                if (val.length <= 2)
                    val = val.replace(/[^A-Za-z]/g, "");
                if (val.length > 2) {
                    const letters = val.substring(0, 2).replace(/[^A-Za-z]/g, "");
                    const numbers = val.substring(2).replace(/[^0-9]/g, "");
                    val = letters + numbers;
                }
                form.setValue(name, val);
            }, ...restProps })));
};
exports.Iban = Iban;
//# sourceMappingURL=index.js.map