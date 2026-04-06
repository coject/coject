import React, { FC, useMemo, ChangeEvent } from "react";

// Material UI
import { TextFieldProps, InputAdornment } from "@mui/material";

// Coject
import { Input } from "../Input";

type iPhone = Omit<TextFieldProps, "type" | "validation" | "required" | "onChange"> & {
    name: string;
    label?: string;
    helperText?: string;
    value?: string | number;
    validation?: {
        pattern?: { value: RegExp; message: string };
        required?: string | boolean;
    };
    errorMessages?: {
        required?: string;
        pattern?: string;
    };
    onChange?: (value: string) => void;
};

export const Phone: FC<iPhone> = ({ name, label, helperText, value, validation, onChange, errorMessages, ...props }) => {
    const validate = useMemo(() => {
        return {
            pattern:
                validation?.pattern ?? {
                    value: /^\d{9}$/,
                    message: errorMessages?.pattern ?? "Please enter a valid Saudi phone number (9 digits only)",
                },
            required: errorMessages?.required ?? "Phone number is required",
        };
    }, [validation]);

    // Handle KeyDown
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    // Handle Change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 9);
        onChange?.(`966${numericValue}`);
    };

    // Handle Input Adorment
    const displayValue = typeof value === "string" && value.startsWith("966") ? value.slice(3) : value || "";

    return (
        <Input name={name} label={label || "Phone"} helperText={helperText} validation={validate} value={displayValue} onChange={handleChange} onKeyDown={handleKeyDown}
            inputProps={{ maxLength: 9, inputMode: "numeric", pattern: "[0-9]*", dir: "ltr" }}
            InputProps={{
                ...props.InputProps,
                endAdornment: (
                    <InputAdornment position="end">966+</InputAdornment>
                )
            }}
            {...props}
        />
    );
};