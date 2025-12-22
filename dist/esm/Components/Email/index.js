import React, { useMemo } from "react";
// Coject
import { Input } from "../Input";
export const Email = ({ name, label, helperText, value, validation, errorMessages, ...props }) => {
    const validate = useMemo(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: errorMessages?.pattern ?? "Please enter a valid email address"
            },
            required: errorMessages?.required ?? "Email is required"
        };
    }, [validation]);
    return (React.createElement(Input, { name: name, label: label || "Email", type: "email", helperText: helperText, validation: validate, value: value, ...props }));
};
//# sourceMappingURL=index.js.map