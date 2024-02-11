import React, { FC, useEffect, useState } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, TextField, TextFieldProps, FormHelperText } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interfaces
type iInput = Omit<TextFieldProps, "helperText"> & {
    name?: string;
    onChange?: any;
    helperText?: string;
    value?: string | number;
}

export const Input: FC<iInput> = ({ name, value, helperText, onChange, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ selectedValue, setSelectedValue ] = useState<string | number>("");
    const { setValue, control, getValues, watch } = useFormContext() || {};

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
                <TextField name={name || "default"} value={selectedValue} onChange={changeValue} label={props?.label ? props?.label : (name || "default")} {...props}>
                    {props?.children}
                </TextField>
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};