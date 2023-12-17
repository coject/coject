import React, { useEffect } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, TextField } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Input = ({ value, ...props }) => {
    const { classes } = useStyles();
    const { register, setValue, control } = useFormContext() || {};
    // Value
    useEffect(() => {
        if (value)
            control && setValue(props?.name || "default", value);
    }, [control, props?.name, setValue, value]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            React.createElement(TextField, { ...(control && register(props?.name || "default")), defaultValue: value, label: props?.label ? props?.label : props?.name, ...props }, props?.children))));
};
//# sourceMappingURL=index.js.map