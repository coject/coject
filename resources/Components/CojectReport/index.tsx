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
    data: any;
    jsonData: any;
    label: string;
    parameter?: any;
    reportCode?: string;
    reportName?: string;
    fullWidth?: boolean;
    variant?: "contained" | "outlined" | "text";
}

export const CojectReport: FC<CojectReportProps> = ({ data, jsonData, reportCode, reportName, parameter, label, fullWidth, variant, ...buttonProps }) => {

    // Handle Print
    const handlePrint = async () => {
        if (!jsonData) return;
        const blob = await pdf(<PdfContainer data={data} jsonData={jsonData} parameter={parameter} reportName={reportName} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    return (
        <React.Fragment>
            <Button type='button' fullWidth={fullWidth} variant={variant || "contained"} onClick={handlePrint} startIcon={buttonProps.startIcon}>
                {label || buttonProps.children}
            </Button>
        </React.Fragment>
    );
};