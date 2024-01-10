import { FC } from "react";
import { CheckboxProps } from "@mui/material";
interface iCheckbox extends Omit<CheckboxProps, "onChange" | "defaultChecked"> {
    value?: any;
    name?: string;
    label?: string;
    onChange?: any;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}
export declare const Checkbox: FC<iCheckbox>;
export {};
