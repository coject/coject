import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Switch as MuiSwitch } from "@mui/material";

// Interface
interface iSwitch {
    name: string;
    value?: string;
}

export const Switch: FC<iSwitch> = ({ name, value, ...props }) => {
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (value) control && setValue(name, value);
    }, [value]);

    return (
        <React.Fragment>
            <MuiSwitch {... control && register(name)} {...props} />
        </React.Fragment>
    );
};