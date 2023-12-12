var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, TextField } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Input = (_a) => {
    var { value } = _a, props = __rest(_a, ["value"]);
    const { classes } = useStyles();
    const { register, setValue, control } = useFormContext() || {};
    // Value
    useEffect(() => {
        if (value)
            control && setValue((props === null || props === void 0 ? void 0 : props.name) || "default", value);
    }, [control, props === null || props === void 0 ? void 0 : props.name, setValue, value]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            React.createElement(TextField, Object.assign({}, (control && register((props === null || props === void 0 ? void 0 : props.name) || "default")), { defaultValue: value, label: (props === null || props === void 0 ? void 0 : props.label) ? props === null || props === void 0 ? void 0 : props.label : props === null || props === void 0 ? void 0 : props.name }, props), props === null || props === void 0 ? void 0 : props.children))));
};
//# sourceMappingURL=index.js.map