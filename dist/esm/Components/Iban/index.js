import React from "react";
// Coject
import { Input } from "../Input";
export const Iban = ({ name, label, helperText, required = true, errorMessages, onChange: externalOnChange, value, ...props }) => {
    const ibanRegex = /^[A-Za-z]{2}[0-9]{20}$/;
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { name: name, label: label || "IBAN", helperText: helperText, required: errorMessages?.required ?? required, inputProps: { maxLength: 22 }, value: value, validation: {
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
                form?.setValue(name, val);
                if (externalOnChange) {
                    externalOnChange({ target: { name, value: val } });
                }
            }, ...props })));
};
//# sourceMappingURL=index.js.map