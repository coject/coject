import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, TextField } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iInput {
    name: string;
    value?: string;
    label?: string;
}

export const Input: FC<iInput> = ({ name, value, label, ...props }) => {
    const { classes } = useStyles();
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (value) control && setValue(name, value);
    }, [control, name, setValue, value]);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <TextField {...(control && register(name))} defaultValue={value} label={label ? label : name} {...props} />
            </Box>
        </React.Fragment>
    );
};
