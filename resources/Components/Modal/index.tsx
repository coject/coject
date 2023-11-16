import React, { FC, useState, useEffect, ReactNode } from "react";

// Material UI
import { Modal as MuiModal } from "@mui/material";

// Interface
interface iModal {
    children?: ReactNode;
    modalState?: boolean;
}

export const Modal: FC<iModal> = ({ modalState, children, ...props }) => {
    const [ openState, setOpenState ] = useState(false);

    // Open Control
    useEffect(() => {
        if (modalState) setOpenState(modalState);
    }, [modalState]);

    return (
        <React.Fragment>
            <MuiModal open={openState} onClose={() => setOpenState(false)}>
                <React.Fragment>
                    {children}
                </React.Fragment>
            </MuiModal>
        </React.Fragment>
    );
};