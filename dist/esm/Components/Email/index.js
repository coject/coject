import React, { useMemo } from "react";
// Coject
import { Input } from "../Input";
export const Email = ({ name, label, helperText, value, validation, ...props }) => {
    const validate = useMemo(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
            },
            required: validation?.required ?? "Email is required"
        };
    }, [validation]);
    return (React.createElement(Input, { name: name, label: label || "Email", type: "email", helperText: helperText, validation: validate, value: value, ...props }));
};
//# sourceMappingURL=index.js.map