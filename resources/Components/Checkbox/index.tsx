import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iCheckbox extends CheckboxProps {
    name?: string;
    label?: string;
    trueValue?: string;
    falseValue?: string;
}

export const Checkbox: FC<iCheckbox> = ({ name, label, trueValue, falseValue, ...props }) => {
    const { classes } = useStyles();
    const { register, setValue, control } = useFormContext() || {};
    const checkedValue = props?.value ? (`${props?.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props?.value}` === trueValue) : true) : false : false;

    // Value
    useEffect(() => {
        if (props?.value) control && setValue(name || "default", (trueValue ? (props?.value === trueValue) ? trueValue : (falseValue ? falseValue : false) : props?.value));
        else control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, props?.value, falseValue, trueValue]);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <FormControlLabel control={<MuiCheckbox {...(control && register(name || "default"))} defaultChecked={checkedValue} {...props} />} label={label ? label : name} />
            </Box>
        </React.Fragment>
    );
};
