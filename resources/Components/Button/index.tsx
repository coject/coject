import React, { FC } from "react";

// Material UI
import { Box, Button as MuiButton, ButtonProps } from "@mui/material";

// Styles
import useStyles from "./theme";

export const Button: FC<ButtonProps> = ({ ...props }) => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <MuiButton {...props}>{props?.children}</MuiButton>
            </Box>
        </React.Fragment>
    );
};
