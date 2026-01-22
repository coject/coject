import React, { useMemo } from "react";
// Coject
import { Input } from "../Input";
export const NationalId = ({ name, label, helperText, value, validation, errorMessages, ...props }) => {
    const validate = useMemo(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^\d{10}$/,
                message: errorMessages?.pattern ?? "National ID Must be Exactly 10 Digits"
            },
            required: errorMessages?.required ?? "National ID is Required"
        };
    }, [validation]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Input, { name: name, label: label || "National ID", type: "text", helperText: helperText, validation: validate, value: value, inputProps: { inputMode: "numeric", maxLength: 10, pattern: "[0-9]*" }, ...props })));
};
//# sourceMappingURL=index.js.map