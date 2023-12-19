import React, { FC, useEffect, useState } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps, FormHelperText } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iCheckbox extends Omit<CheckboxProps, "onChange" | "defaultChecked"> {
    name?: string;
    label?: string;
    onChange?: any;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}

export const Checkbox: FC<iCheckbox> = ({ name, label, onChange, trueValue, falseValue, helperText, error, ...props }) => {
    const { classes } = useStyles();
    const [ checkedValue, setCheckedValue ] = useState<boolean>(false);
    const [ innerValue, setInnerValue ] = useState<string | boolean>(false);
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (props?.value) {
            control && setValue(name || "default", (trueValue ? (props?.value === trueValue) ? trueValue : (falseValue ? falseValue : false) : props?.value));
            setInnerValue(props?.value ? (`${props?.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props?.value}` === trueValue) : true) : false : false);
            setCheckedValue(props?.value ? (`${props?.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props?.value}` === trueValue) : true) : false : false);
        } else control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, props?.value, falseValue, trueValue]);

    // Change Value
    const changeValue = (event: any) => {
        onChange && onChange(event);
        if (event.target.checked) {
            setCheckedValue(true);
            setInnerValue(trueValue ? trueValue : true);
            control && setValue(name || "default", (trueValue ? trueValue : true));
        } else {
            setCheckedValue(false);
            setInnerValue(falseValue ? falseValue : false);
            control && setValue(name || "default", (falseValue ? falseValue : false));
        }
    }

    return (
        <React.Fragment>
            <Box className={`${classes.root} ${error ? classes.rootError : ""}`}>
                <FormControlLabel control={<MuiCheckbox {...(control && register(name || "default"))} value={innerValue} checked={checkedValue} onChange={changeValue} {...props} />} label={label ? label : (name || "default")} />
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};