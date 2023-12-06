import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, FormControlLabel, Switch as MuiSwitch, SwitchProps } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iSwitch extends SwitchProps {
    name?: string;
    label?: string;
    trueValue?: string;
    falseValue?: string;
}

export const Switch: FC<iSwitch> = ({ name, trueValue, falseValue, label, ...props }) => {
    const { classes } = useStyles();
    const { register, setValue, control } = useFormContext() || {};
    const CheckedValue = props?.value ? (`${props?.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props?.value}` === trueValue) : true) : false : false;

    // Value
    useEffect(() => {
        if (props?.value) control && setValue(name || "default", props?.value);
    }, [control, name, setValue, props?.value]);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <FormControlLabel control={<MuiSwitch {...(control && register(name || "default"))} defaultChecked={CheckedValue} {...props} />} label={label ? label : name} />
            </Box>
        </React.Fragment>
    );
};