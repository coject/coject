import React from "react";
// Material UI
import { Box, Typography } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Page = ({ title, children }) => {
    const { classes } = useStyles();
    document.title = localStorage.language === 'en' ? localStorage.projectNameTwo : localStorage.projectNameOne + ` | ${title}`;
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { id: 'coject_page', className: classes.root },
            title &&
                React.createElement(Box, { className: classes.header },
                    React.createElement(Typography, { variant: "h2" }, title)),
            children)));
};
//# sourceMappingURL=index.js.map