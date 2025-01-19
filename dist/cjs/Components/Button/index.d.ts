import { FC } from "react";
import { ButtonProps } from "@mui/material";
interface CustomButtonProps extends ButtonProps {
    download?: string;
}
export declare const Button: FC<CustomButtonProps>;
export {};
