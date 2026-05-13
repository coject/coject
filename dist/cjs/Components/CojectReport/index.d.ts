import { FC } from "react";
import { ButtonProps } from "@mui/material";
interface CojectReportProps extends Omit<ButtonProps, 'onClick'> {
    data: any;
    jsonData: any;
    label: string;
    parameter?: any;
    reportCode?: string;
    reportName?: string;
    fullWidth?: boolean;
    variant?: "contained" | "outlined" | "text";
}
export declare const CojectReport: FC<CojectReportProps>;
export {};
