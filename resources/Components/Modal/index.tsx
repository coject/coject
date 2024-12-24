import React, { FC, ReactNode } from "react";

// Material UI
import { Box, Typography, IconButton, Modal as MuiModal, ModalProps } from "@mui/material";

// Material Icon
import * as MuiIcons from "@mui/icons-material";

// Styles
import useStyles from "./theme";

// Interface
interface iModal extends Omit<ModalProps, 'title'> {
    setOpen?: any;
    title?: string | ReactNode;
}

export const Modal: FC<iModal> = ({ open, setOpen, title, ...props }) => {
    const Icons: any = MuiIcons;
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <MuiModal open={open} {...props}>
                <Box className={`${classes.root} coject_modal`}>
                    <Box className={classes.header}>
                        <Typography variant={"h5"}>{title ? title : "Modal Title"}</Typography>
                        <IconButton onClick={() => setOpen(false)}><Icons.Close /></IconButton>
                    </Box>
                    <Box className={classes.body}>
                        <React.Fragment>{props?.children}</React.Fragment>
                    </Box>
                </Box>
            </MuiModal>
        </React.Fragment>
    );
}