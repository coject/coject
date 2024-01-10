import { FC } from "react";
import { SwitchProps } from "@mui/material";
interface iSwitch extends Omit<SwitchProps, "onChange" | "defaultChecked"> {
    value?: any;
    name?: string;
    label?: string;
    onChange?: any;
    error?: boolean;
    trueValue?: string;
    falseValue?: string;
    helperText?: string;
}
export declare const Switch: FC<iSwitch>;
export {};
