import { FC } from "react";
import { SwitchProps } from "@mui/material";
interface iSwitch extends SwitchProps {
    name?: string;
    label?: string;
    trueValue?: string;
    falseValue?: string;
}
export declare const Switch: FC<iSwitch>;
export {};
