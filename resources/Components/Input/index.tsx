import React, { FC, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { TextField } from "@mui/material";

// Interface
interface iInput {
    name: string;
    value?: string;
}

export const Input: FC<iInput> = ({ name, value, ...props }) => {
    const { register, setValue, control } = useFormContext() || {};

    // Value
    useEffect(() => {
        if (value) control && setValue(name, value);
    }, [value]);

    return (
        <React.Fragment>
            <TextField {... control && register(name)} defaultValue={value} {...props} />
        </React.Fragment>
    );
};