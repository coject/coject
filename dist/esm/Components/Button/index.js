import React from "react";
// Material UI
import { Box, Button as MuiButton } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Button = ({ download, ...props }) => {
    const { classes } = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} coject_button` },
            React.createElement(MuiButton, { ...props },
                props?.children,
                " download=",
                'mohamed.pdf'))));
};
//# sourceMappingURL=index.js.map