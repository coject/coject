import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, TextField, TextFieldProps } from "@mui/material";

// Styles
import useStyles from "./theme";

export const Input: FC<TextFieldProps> = ({ value, ...props }) => {
    const { classes } = useStyles();
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (value) control && setValue(props?.name || "default", value);
    }, [control, props?.name, setValue, value]);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <TextField {...(control && register(props?.name || "default"))} defaultValue={value} label={props?.label ? props?.label : props?.name} {...props}>
                    {props?.children}
                </TextField>
            </Box>
        </React.Fragment>
    );
};