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
import React, { useEffect, useState } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, FormControlLabel, Switch as MuiSwitch } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Switch = (_a) => {
    var { name, trueValue, falseValue, label } = _a, props = __rest(_a, ["name", "trueValue", "falseValue", "label"]);
    const { classes } = useStyles();
    const [checkedValue, setCheckedValue] = useState(false);
    const { register, setValue, control } = useFormContext() || {};
    // Value
    useEffect(() => {
        if (props === null || props === void 0 ? void 0 : props.value) {
            control && setValue(name || "default", (trueValue ? ((props === null || props === void 0 ? void 0 : props.value) === trueValue) ? trueValue : (falseValue ? falseValue : false) : props === null || props === void 0 ? void 0 : props.value));
            setCheckedValue((props === null || props === void 0 ? void 0 : props.value) ? (`${props === null || props === void 0 ? void 0 : props.value}` !== (falseValue ? falseValue : "false")) ? (trueValue ? (`${props === null || props === void 0 ? void 0 : props.value}` === trueValue) : true) : false : false);
        }
        else
            control && setValue(name || "default", falseValue ? falseValue : false);
    }, [control, name, setValue, props === null || props === void 0 ? void 0 : props.value, falseValue, trueValue]);
    // Change Value
    const changeValue = (event) => {
        if (event.target.checked) {
            setCheckedValue(true);
            setValue(name || "default", (trueValue ? trueValue : true));
        }
        else {
            setCheckedValue(false);
            setValue(name || "default", (falseValue ? falseValue : false));
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            React.createElement(FormControlLabel, { control: React.createElement(MuiSwitch, Object.assign({}, (control && register(name || "default")), { value: checkedValue, checked: checkedValue, onChange: changeValue }, props)), label: label ? label : name }))));
};
//# sourceMappingURL=index.js.map