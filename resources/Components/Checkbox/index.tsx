import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Checkbox as MuiCheckbox } from "@mui/material";

// Interface
interface iCheckbox {
    name: string;
    value?: string;
}

export const Checkbox: FC<iCheckbox> = ({ name, value, ...props }) => {
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (value) control && setValue(name, value);
    }, [control, name, setValue, value]);

    return (
        <React.Fragment>
            <MuiCheckbox {...(control && register(name))} {...props} />
        </React.Fragment>
    );
};
