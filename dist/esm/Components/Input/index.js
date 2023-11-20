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
import React, { useEffect } from 'react';
// React Hook Form
import { useFormContext } from 'react-hook-form';
// Material UI
import { TextField } from '@mui/material';
export const Input = (_a) => {
    var { name, value } = _a, props = __rest(_a, ["name", "value"]);
    const { register, setValue, control } = useFormContext() || {};
    // Value
    useEffect(() => {
        if (value)
            control && setValue(name, value);
    }, [value]);
    return (React.createElement(React.Fragment, null,
        React.createElement(TextField, Object.assign({}, (control && register(name)), { defaultValue: value }, props))));
};
//# sourceMappingURL=index.js.map