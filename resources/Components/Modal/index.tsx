import React, { FC, ReactNode } from "react";

// Material UI
import { Box, Typography, IconButton, Modal as MuiModal } from "@mui/material";

// Material Icon
import * as MuiIcons from "@mui/icons-material";

// Styles
import useStyles from "./theme";

// Interface
interface iModal {
    open: boolean;
    setOpen?: any;
    title?: string;
    children?: ReactNode;
}

export const Modal: FC<iModal> = ({ open, setOpen, title, children, ...props }) => {
    const Icons: any = MuiIcons;
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <MuiModal open={open} {...props}>
                <Box className={classes.root}>
                    <Box className={classes.header}>
                        <Typography variant={"h5"}>{title ? title : "Modal Title"}</Typography>
                        <IconButton onClick={() => setOpen(false)}><Icons.Close /></IconButton>
                    </Box>
                    <Box className={classes.body}>
                        <React.Fragment>{children}</React.Fragment>
                    </Box>
                </Box>
            </MuiModal>
        </React.Fragment>
    );
}