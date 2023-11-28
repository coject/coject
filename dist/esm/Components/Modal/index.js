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
import { Box, Typography, IconButton, Modal as MuiModal } from "@mui/material";
// Material Icon
import * as MuiIcons from "@mui/icons-material";
// Styles
import useStyles from "./theme";
export const Modal = (_a) => {
    var { open, setOpen, title, children } = _a, props = __rest(_a, ["open", "setOpen", "title", "children"]);
    const Icons = MuiIcons;
    const { classes } = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(MuiModal, Object.assign({ open: open }, props),
            React.createElement(Box, { className: classes.root },
                React.createElement(Box, { className: classes.header },
                    React.createElement(Typography, { variant: "h5" }, title ? title : "Modal Title"),
                    React.createElement(IconButton, { onClick: () => setOpen(false) },
                        React.createElement(Icons.Close, null))),
                React.createElement(Box, { className: classes.body },
                    React.createElement(React.Fragment, null, children))))));
};
//# sourceMappingURL=index.js.map