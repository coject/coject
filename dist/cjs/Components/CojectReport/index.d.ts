import { FC } from "react";
import { ButtonProps } from "@mui/material";
interface CojectReportProps extends Omit<ButtonProps, 'onClick'> {
    label: string;
    reportData: any;
    reportTemplate: any;
    reportParameter?: any;
    reportCode?: string;
    reportName?: string;
    fullWidth?: boolean;
    variant?: "contained" | "outlined" | "text";
}
interface CojectReportType extends FC<CojectReportProps> {
    print: (params: {
        reportData: any;
        reportTemplate: any;
        reportParameter?: any;
        reportName?: string;
    }) => Promise<void>;
}
export declare const CojectReport: CojectReportType;
export {};
