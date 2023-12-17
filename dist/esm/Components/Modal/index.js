import React from "react";
// Material UI
import { Box, Typography, IconButton, Modal as MuiModal } from "@mui/material";
// Material Icon
import * as MuiIcons from "@mui/icons-material";
// Styles
import useStyles from "./theme";
export const Modal = ({ open, setOpen, title, ...props }) => {
    const Icons = MuiIcons;
    const { classes } = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(MuiModal, { open: open, ...props },
            React.createElement(Box, { className: classes.root },
                React.createElement(Box, { className: classes.header },
                    React.createElement(Typography, { variant: "h5" }, title ? title : "Modal Title"),
                    React.createElement(IconButton, { onClick: () => setOpen(false) },
                        React.createElement(Icons.Close, null))),
                React.createElement(Box, { className: classes.body },
                    React.createElement(React.Fragment, null, props?.children))))));
};
//# sourceMappingURL=index.js.map