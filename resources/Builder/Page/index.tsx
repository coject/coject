import React, { FC, ReactNode } from "react";

// Material UI
import { Box, Typography } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interfaces
interface iPage {
    tabTitle?: string;
    children?: ReactNode;
    title?: string | ReactNode;
}

export const Page: FC<iPage> = ({ title, tabTitle, children }) => {
    const { classes } = useStyles();
    document.title = localStorage.language === 'en' ? localStorage.projectNameTwo + ` | ${tabTitle ?? title}` : localStorage.projectNameOne + ` | ${tabTitle ?? title}`;
    
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