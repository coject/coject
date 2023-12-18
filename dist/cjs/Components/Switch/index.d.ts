import { FC } from "react";
import { SwitchProps } from "@mui/material";
interface iSwitch extends SwitchProps {
    name?: string;
    label?: string;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}
export declare const Switch: FC<iSwitch>;
export {};
