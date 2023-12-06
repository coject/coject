import { FC } from "react";
import { CheckboxProps } from "@mui/material";
interface iCheckbox extends CheckboxProps {
    name?: string;
    label?: string;
    trueValue?: string;
    falseValue?: string;
}
export declare const Checkbox: FC<iCheckbox>;
export {};
