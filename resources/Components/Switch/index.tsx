import React, {FC, useEffect, useState} from "react";

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
            setValue(name || "default", (trueValue ? trueValue : true));
        } else {
            setCheckedValue(false);
            setValue(name || "default", (falseValue ? falseValue : false));
        }
    }

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <FormControlLabel control={<MuiSwitch {...(control && register(name || "default"))} value={checkedValue} checked={checkedValue} onChange={changeValue} {...props} />} label={label ? label : name} />
            </Box>
        </React.Fragment>
    );
};