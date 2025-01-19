import React, { FC } from "react";

// Material UI
import { Box, Button as MuiButton, ButtonProps } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface CustomButtonProps extends ButtonProps {
    download?: string;
}

export const Button: FC<CustomButtonProps> = ({ download, ...props }) => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Box className={`${classes.root} coject_button`}>
                <MuiButton {...props}>{props?.children}</MuiButton>
            </Box>
        </React.Fragment>
    );
};
