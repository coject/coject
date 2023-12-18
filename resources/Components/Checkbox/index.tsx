import React, { FC, useEffect, useState } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps, FormHelperText } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iCheckbox extends CheckboxProps {
    name?: string;
    label?: string;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}

export const Checkbox: FC<iCheckbox> = ({ name, label, trueValue, falseValue, helperText, error, ...props }) => {
    const { classes } = useStyles();
    const [ checkedValue, setCheckedValue ] = useState<boolean>(false);
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (props?.value) {
            control && setValue(name || "default", (trueValue ? (props?.value === trueValue) ? trueValue : (falseValue ? falseValue : false) : props?.value));
            setCheckedValue(props?.value ? (`${props?.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props?.value}` === trueValue) : true) : false : false);
        } else control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, props?.value, falseValue, trueValue]);

    // Change Value
    const changeValue = (event: any) => {
        if (event.target.checked) {
            setCheckedValue(true);
            control && setValue(name || "default", (trueValue ? trueValue : true));
        } else {
            setCheckedValue(false);
            control && setValue(name || "default", (falseValue ? falseValue : false));
        }
    }

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <FormControlLabel control={<MuiCheckbox {...(control && register(name || "default"))} value={checkedValue} checked={checkedValue} onChange={changeValue} color={error ? "error" : (props?.color ? props.color : "primary")} {...props} />} label={label ? label : (name || "default")} />
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};