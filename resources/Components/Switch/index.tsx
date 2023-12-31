import React, { FC, useEffect, useState } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, FormControlLabel, Switch as MuiSwitch, SwitchProps, FormHelperText } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iSwitch extends Omit<SwitchProps, "onChange" | "defaultChecked"> {
    value?: any;
    name?: string;
    label?: string;
    onChange?: any;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}

export const Switch: FC<iSwitch> = ({ name, value, onChange, trueValue, falseValue, label, helperText, error, ...props }) => {
    const { classes } = useStyles();
    const [ checkedValue, setCheckedValue ] = useState<boolean>(false);
    const { setValue, control, getValues, watch } = useFormContext() || {};

    // Methods Watching
    useEffect(() => {
        control && setCheckedValue(!!getValues(name || "default") ? trueValue ? trueValue === getValues(name || "default") : !!getValues(name || "default") : false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch(name || "default")]);

    // Value
    useEffect(() => {
        if (value) {
            control && setValue(name || "default", (trueValue ? (value === trueValue) ? trueValue : (falseValue ? falseValue : false) : value));
            setCheckedValue(value ? (`${value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${value}` === trueValue) : true) : false : false);
        } else control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, value, falseValue, trueValue]);

    // Change Value
    const changeValue = (event: any) => {
        onChange && onChange(event, ((event.target.checked) ? (trueValue ? trueValue : true) : (falseValue ? falseValue : false)));
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
            <Box className={`${classes.root} ${error ? classes.rootError : ""}`}>
                <FormControlLabel control={<MuiSwitch name={name || "default"} value={checkedValue} checked={checkedValue} onChange={changeValue} {...props} />} label={label ? label : (name || "default")} />
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};