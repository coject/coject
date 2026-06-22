import React, { FC } from "react";

// Material UI
import { ButtonProps } from "@mui/material";

// React Pdf
import { pdf } from '@react-pdf/renderer';

// Pdf Container
import PdfContainer from './PdfContainer';

// Coject Components
import { Button } from '../Button';

// Interface
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

// Interface for add in CustomActions in Grid
interface CojectReportType extends FC<CojectReportProps> {
    print: (params: { reportData: any, reportTemplate: any, reportParameter?: any, reportName?: string }) => Promise<void>;
}

export const CojectReport: CojectReportType = ({ reportData, reportTemplate, reportCode, reportName, reportParameter, label, fullWidth, variant, ...buttonProps }) => {

    // Handle Print
    const handlePrint = async () => {
        await CojectReport.print({ reportData, reportTemplate, reportParameter, reportName });
    };

    return (
        <React.Fragment>
            <Button type='button' fullWidth={fullWidth} variant={variant || "contained"} onClick={handlePrint} startIcon={buttonProps.startIcon}>
                {label || buttonProps.children}
            </Button>
        </React.Fragment>
    );
};

CojectReport.print = async ({ reportData, reportTemplate, reportParameter, reportName }: { reportData: any, reportTemplate: any, reportParameter?: any, reportName?: string }) => {
    if (!reportTemplate) return;
    const blob = await pdf(<PdfContainer data={reportData} jsonData={reportTemplate} parameter={reportParameter} reportName={reportName} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
};