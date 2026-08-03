import React, { useMemo } from "react";
// Material UI
import { InputAdornment } from "@mui/material";
// Coject
import { Input } from "../Input";
export const Phone = ({ name, label, helperText, value, validation, onChange, errorMessages, ...props }) => {
    const validate = useMemo(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^\d{9}$/,
                message: errorMessages?.pattern ?? "Please enter a valid Saudi phone number (9 digits only)",
            },
            required: errorMessages?.required ?? "Phone number is required",
        };
    }, [validation]);
    // Handle KeyDown
    const handleKeyDown = (e) => {
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };
    // Handle Change
    const handleChange = (e) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 9);
        onChange?.(`966${numericValue}`);
    };
    // Handle Input Adorment
    const displayValue = typeof value === "string" && value.startsWith("966") ? value.slice(3) : value || "";
    return (React.createElement(Input, { name: name, label: label || "", helperText: helperText, validation: validate, value: displayValue, onChange: handleChange, onKeyDown: handleKeyDown, inputProps: { maxLength: 9, inputMode: "numeric", pattern: "[0-9]*", dir: "ltr" }, InputProps: {
            ...props.InputProps,
            endAdornment: (React.createElement(InputAdornment, { position: "end" }, "966+"))
        }, ...props }));
};
//# sourceMappingURL=index.js.map