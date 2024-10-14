import React, { FC, useEffect, useState } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps, FormHelperText } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iCheckbox extends Omit<CheckboxProps, "onChange" | "defaultChecked"> {
    value?: any;
    name?: string;
    label?: string;
    onChange?: any;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}

export const Checkbox: FC<iCheckbox> = ({ name, value, label, onChange, trueValue, falseValue, helperText, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ checkedValue, setCheckedValue ] = useState<boolean>(false);
    const { setValue, control, getValues, watch } = useFormContext() || {};

    // Methods Watching
    useEffect(() => {
        control && setCheckedValue(!!getValues(name || "default") ? trueValue ? trueValue === getValues(name || "default") : !!getValues(name || "default") : false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);

    // Value
    useEffect(() => {
        if (value) {
            control && setValue(name || "default", (trueValue ? (value === trueValue) ? trueValue : (falseValue ? falseValue : false) : value));
            setCheckedValue(value ? (`${value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${value}` === trueValue) : true) : false : false);
        } else control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, value, falseValue, trueValue]);

    // Change Value
    const changeValue = (event: any) => {
        onChange && onChange(event, ((event.target.checked) ? (trueValue ? trueValue : true) : (falseValue ? falseValue : false)), Methods);
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
            <Box className={`${classes.root} ${error ? classes.rootError : ""} coject_checkbox`}>
                <FormControlLabel control={<MuiCheckbox name={name || "default"} value={checkedValue} checked={checkedValue} onChange={changeValue} {...props} />} label={label ? label : (name || "default")} />
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};