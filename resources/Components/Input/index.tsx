import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, TextField, TextFieldProps, FormHelperText } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interfaces
type iInput = Omit<TextFieldProps, "helperText"> & {
    helperText?: string
}

export const Input: FC<iInput> = ({ value, helperText, ...props }) => {
    const { classes } = useStyles();
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (value) control && setValue(props?.name || "default", value);
    }, [control, props?.name, setValue, value]);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <TextField {...(control && register(props?.name || "default"))} defaultValue={value} label={props?.label ? props?.label : (props?.name || "default")} {...props}>
                    {props?.children}
                </TextField>
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};