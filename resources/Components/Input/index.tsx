import React, { FC, useEffect, useState } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, TextField, TextFieldProps, FormHelperText } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interfaces
type iInput = Omit<TextFieldProps, "helperText" | "required"> & {
    name?: string;
    onChange?: any;
    validation?: {
        number?: boolean | string;
        arabic?: boolean | string;
        english?: boolean | string;
        required?: boolean | string;
        pattern?: any | { value: any, message: string };
        min?: number | { value: number, message: string };
        max?: number | { value: number, message: string };
        minLingth?: number | { value: number, message: string };
        maxLingth?: number | { value: number, message: string };
    };
    helperText?: string;
    value?: string | number;
    required?: boolean | string;
}

export const Input: FC<iInput> = ({ name, value, helperText, validation, required, onChange, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ selectedValue, setSelectedValue ] = useState<string | number>("");
    const { setValue, control, getValues, watch, register, formState: { errors} } = useFormContext() || {};

    // Methods Watching
    useEffect(() => {
        control && setSelectedValue(getValues(name || "default") ? getValues(name || "default") : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);

    // Value
    useEffect(() => {
        if (value) {
            setSelectedValue(value);
            control && setValue(name || "default", value);
        } else control && setValue(name || "default", "");
    }, [control, name, setValue, value]);

    // Change Value
    const changeValue = (event: any) => {
        onChange && onChange(event, event.target.value, Methods);
        setSelectedValue(event.target.value);
        control && setValue(name || "default", event.target.value);
    }

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <TextField {...(control ? register(name || "default", { ...(validation ?
                    {
                        ...(validation?.required ? { required: validation.required.toString() === "true" ? "This Field Is Required" : validation.required } : {}),
                        ...(validation?.arabic ? { pattern: { value: /^[أ-ي]+$/i, message: validation.arabic.toString() === "true" ? "Enter Just Arabic" : validation.arabic } } : {}),
                        ...(validation?.number ? { pattern: { value: /^[0-9]+$/i, message: validation.number.toString() === "true" ? "Enter Just Numbers" : validation.number } } : {}),
                        ...(validation?.english ? { pattern: { value: /^[A-Za-z]+$/i, message: validation.english.toString() === "true" ? "Enter Just English" : validation.english } } : {}),
                        ...validation
                    }
                    : (required ? { required: required.toString() === "true" ? "This Field Is Required" : required } : {}))
                }) : {name: name || "default"})} value={selectedValue} onChange={changeValue} label={props?.label ? props?.label : (name || "default")} {...props}>
                    {props?.children}
                </TextField>
                { (helperText || (errors && errors[name || "default"])) && <FormHelperText className={classes.error}>{errors && errors[name || "default"]?.message as string}{helperText && helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    )
};