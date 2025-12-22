import React, { FC, useMemo } from "react";

// Material UI
import { TextFieldProps } from "@mui/material";

// Coject
import { Input } from "../Input";

type iEmail = Omit<TextFieldProps, "type" | "validation" | "required"> & {
    name: string;
    label?: string;
    helperText?: string;
    value?: string | number;
    validation?: {
        pattern?: { value: RegExp; message: string };
        required?: string | boolean;
    };
};

export const Email: FC<iEmail> = ({ name, label, helperText, value, validation, ...props }) => {
    const validate = useMemo(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address"
            },
            required: validation?.required ?? "Email is required"
        };
    }, [validation]);

    return (
        <Input name={name} label={label || "Email"} type="email" helperText={helperText} validation={validate} value={value} {...props} />
    );
};