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
import React from "react";
// Material UI
import { Box, Button as MuiButton } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Button = (_a) => {
    var props = __rest(_a, []);
    const { classes } = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            React.createElement(MuiButton, Object.assign({}, props), props === null || props === void 0 ? void 0 : props.children))));
};
//# sourceMappingURL=index.js.map