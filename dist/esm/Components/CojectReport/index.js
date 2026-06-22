import React from "react";
// React Pdf
import { pdf } from '@react-pdf/renderer';
// Pdf Container
import PdfContainer from './PdfContainer';
// Coject Components
import { Button } from '../Button';
export const CojectReport = ({ reportData, reportTemplate, reportCode, reportName, reportParameter, label, fullWidth, variant, ...buttonProps }) => {
    // Handle Print
    const handlePrint = async () => {
        await CojectReport.print({ reportData, reportTemplate, reportParameter, reportName });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { type: 'button', fullWidth: fullWidth, variant: variant || "contained", onClick: handlePrint, startIcon: buttonProps.startIcon }, label || buttonProps.children)));
};
CojectReport.print = async ({ reportData, reportTemplate, reportParameter, reportName }) => {
    if (!reportTemplate)
        return;
    const blob = await pdf(React.createElement(PdfContainer, { data: reportData, jsonData: reportTemplate, parameter: reportParameter, reportName: reportName })).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
};
//# sourceMappingURL=index.js.map