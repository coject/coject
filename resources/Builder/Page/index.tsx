import React, { FC, ReactNode } from "react";

// Material UI
import { Box, Typography } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interfaces
interface iPage {
    title?: string;
    children?: ReactNode;
}

export const Page: FC<iPage> = ({ title, children }) => {
    const { classes } = useStyles();

    return (
        <React.Fragment>
            <Box id='coject_page' className={classes.root}>
                { title &&
                    <Box className={classes.header}>
                        <Typography variant={"h2"}>{title}</Typography>
                    </Box>
                }
                {children}
            </Box>
        </React.Fragment>
    );
}