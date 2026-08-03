import React, { FC, useMemo } from "react";

// Material UI
import { TextFieldProps } from "@mui/material";

// Coject
import { Input } from "../Input";

type iNationalId = Omit<TextFieldProps, "type" | "validation" | "required"> & {
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
};

export const NationalId: FC<iNationalId> = ({ name, label, helperText, value, validation, errorMessages, ...props }) => {
    const validate = useMemo(() => {
        return {
            pattern: validation?.pattern ?? {
                value: /^\d{10}$/,
                message: errorMessages?.pattern ?? "National ID Must be Exactly 10 Digits"
            },
            required: errorMessages?.required ?? "National ID is Required"
        };
    }, [validation]);

    return (
        <React.Fragment>
            <Input name={name} label={label || ""} type="text" helperText={helperText}
                validation={validate} value={value} inputProps={{ inputMode: "numeric", maxLength: 10, pattern: "[0-9]*" }}
                {...props}
            />
        </React.Fragment>
    );
}