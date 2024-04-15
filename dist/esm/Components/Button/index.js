import React from "react";
// Material UI
import { Box, Button as MuiButton } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Button = ({ ...props }) => {
    const { classes } = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            React.createElement(MuiButton, { ...props }, props?.children))));
};
//# sourceMappingURL=index.js.map