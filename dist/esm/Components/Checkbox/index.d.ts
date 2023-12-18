import { FC } from "react";
import { CheckboxProps } from "@mui/material";
interface iCheckbox extends CheckboxProps {
    name?: string;
    label?: string;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}
export declare const Checkbox: FC<iCheckbox>;
export {};
