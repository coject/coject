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
        minLength?: number | { value: number, message: string };
        maxLength?: number | { value: number, message: string };
    };
    helperText?: string;
    value?: string | number;
    required?: boolean | string;
}

export const Input: FC<iInput> = ({ name, value, helperText, validation, required, onChange, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ inputValue, setInputValue ] = useState<string | number>("");
    const { setValue, control, getValues, watch, setError, clearErrors, formState: { errors } } = useFormContext() || {};

    // Methods Watching
    useEffect(() => {
        control && setInputValue(getValues(name || "default") ? getValues(name || "default") : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);

    // Value
    useEffect(() => {
        if (value) {
            setInputValue(value);
            control && setValue(name || "default", value);
        } else control && setValue(name || "default", "");
    }, [control, name, setValue, value]);

    // Change Value
    const changeValue = (event: any) => {
        onChange && onChange(event, event.target.value, Methods);
        setInputValue(event.target.value);
        control && setValue(name || "default", event.target.value);
    }

    // Error Handling
    useEffect(() => {
        const Required: boolean = (!!required || !!validation?.required) && !inputValue;
        const Numbers: boolean = !!validation?.number && !!inputValue && !(/^[0-9,.]+$/i.test(`${inputValue}`));
        const Arabic: boolean = !!validation?.arabic && !!inputValue && !(/^[ ءأ-ي0-9',._/-]+$/i.test(`${inputValue}`));
        const English: boolean = !!validation?.english && !!inputValue && !(/^[-/_.,'0-9A-Za-z ]+$/i.test(`${inputValue}`));
        const MinNumber: boolean = !!validation?.min && !!inputValue && Number(inputValue) < Number((validation.min instanceof Object) ? validation.min.value : validation.min);
        const MaxNumber: boolean = !!validation?.max && !!inputValue && Number(inputValue) > Number((validation.max instanceof Object) ? validation.max.value : validation.max);
        const MinLength: boolean = !!validation?.minLength && !!inputValue && (`${inputValue}`).length < Number((validation.minLength instanceof Object) ? validation.minLength.value : validation.minLength);
        const MaxLength: boolean = !!validation?.maxLength && !!inputValue && (`${inputValue}`).length > Number((validation.maxLength instanceof Object) ? validation.maxLength.value : validation.maxLength);
        const Pattern: boolean = !!validation?.pattern && !!inputValue && ((validation.pattern instanceof Object) ? !((validation?.pattern?.value).test(`${inputValue}`)) : !((validation?.pattern).test(`${inputValue}`)));

        // Clear Errors
        if ( !Required && !Numbers && !Arabic && !English && !MinNumber && !MaxNumber && !MinLength && !MaxLength && !Pattern ) clearErrors(name || "default");

        // Set Errors
        else {
            // Required
            if (Required) setError(name || "default", { type: "required", message: ((required?.toString() === "true") || (validation?.required?.toString() === "true")) ? "This Field Is Required" : `${required ? required : ""}${validation?.required ? validation?.required : ""}` });

            // Numbers
            if (Numbers) setError(name || "default", { type: "pattern", message: (validation?.number?.toString() === "true") ? "This Field Just Numbers" : `${validation?.number}` });

            // Arabic
            if (Arabic) setError(name || "default", { type: "pattern", message: (validation?.arabic?.toString() === "true") ? "This Field Just Arabic" : `${validation?.arabic}` });

            // English
            if (English) setError(name || "default", { type: "pattern", message: (validation?.english?.toString() === "true") ? "This Field Just English" : `${validation?.english}` });

            // MinNumber
            if (MinNumber) setError(name || "default", { type: "min", message: (validation?.min instanceof Object) ? `${validation.min.message}` : "Less Than The Minimum" });

            // MaxNumber
            if (MaxNumber) setError(name || "default", { type: "max", message: (validation?.max instanceof Object) ? `${validation.max.message}` : "Greater Than The Maximum" });

            // MinLength
            if (MinLength) setError(name || "default", { type: "minLength", message: (validation?.minLength instanceof Object) ? `${validation.minLength.message}` : "Less Than The Minimum Length" });

            // MaxLength
            if (MaxLength) setError(name || "default", { type: "maxLength", message: (validation?.maxLength instanceof Object) ? `${validation.maxLength.message}` : "Greater Than The Maximum Length" });
        
            // Pattern
            if (Pattern) setError(name || "default", { type: "pattern", message: (validation?.pattern instanceof Object) ? `${validation.pattern.message}` : "This Field Required" });
        }
    }, [inputValue, required, name, setError, clearErrors, validation]);

    return (
        <React.Fragment>
            <Box className={`${classes.root} coject_input`}>
                <TextField name={name || "default"} autoComplete="off" value={inputValue} onChange={changeValue} label={props?.label ? props?.label : (name || "default")} {...props}>
                    {props?.children}
                </TextField>
                { (helperText || (control && errors && errors[name || "default"])) && <FormHelperText className={classes.error}>{control && errors && errors[name || "default"]?.message as string}{helperText && !(control && errors && errors[name || "default"]) && helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    )
};