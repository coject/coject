import React, { useEffect, useState } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, FormControlLabel, Checkbox as MuiCheckbox, FormHelperText } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Checkbox = ({ name, value, label, onChange, trueValue, falseValue, helperText, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [checkedValue, setCheckedValue] = useState(false);
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
        }
        else
            control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, value, falseValue, trueValue]);
    // Change Value
    const changeValue = (event) => {
        onChange && onChange(event, ((event.target.checked) ? (trueValue ? trueValue : true) : (falseValue ? falseValue : false)), Methods);
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
            React.createElement(FormControlLabel, { control: React.createElement(MuiCheckbox, { name: name || "default", value: checkedValue, checked: checkedValue, onChange: changeValue, ...props }), label: label ? label : (name || "default") }),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map