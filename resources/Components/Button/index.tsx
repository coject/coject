import React, { FC, ReactNode } from "react";

// Material UI
import { Button as MuiButton } from "@mui/material";

// Interface
interface iButton {
    children?: ReactNode;
}

export const Button: FC<iButton> = ({ children, ...props }) => {
    return (
        <React.Fragment>
            <MuiButton {...props}>{children}</MuiButton>
        </React.Fragment>
    );
};
