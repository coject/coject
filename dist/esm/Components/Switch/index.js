import React, { useEffect, useState } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, FormControlLabel, Switch as MuiSwitch, FormHelperText } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Switch = ({ name, trueValue, falseValue, label, helperText, error, ...props }) => {
    const { classes } = useStyles();
    const [checkedValue, setCheckedValue] = useState(false);
    const { register, setValue, control } = useFormContext() || {};
    // Value
    useEffect(() => {
        if (props?.value) {
            control && setValue(name || "default", (trueValue ? (props?.value === trueValue) ? trueValue : (falseValue ? falseValue : false) : props?.value));
            setCheckedValue(props?.value ? (`${props?.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props?.value}` === trueValue) : true) : false : false);
        }
        else
            control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, props?.value, falseValue, trueValue]);
    // Change Value
    const changeValue = (event) => {
        if (event.target.checked) {
            setCheckedValue(true);
            control && setValue(name || "default", (trueValue ? trueValue : true));
        }
        else {
            setCheckedValue(false);
            control && setValue(name || "default", (falseValue ? falseValue : false));
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} ${error ? classes.rootError : ""}` },
            React.createElement(FormControlLabel, { control: React.createElement(MuiSwitch, { ...(control && register(name || "default")), value: checkedValue, checked: checkedValue, onChange: changeValue, ...props }), label: label ? label : (name || "default") }),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map