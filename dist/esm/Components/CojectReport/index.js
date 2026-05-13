import React from "react";
// React Pdf
import { pdf } from '@react-pdf/renderer';
// Pdf Container
import PdfContainer from './PdfContainer';
// Coject Components
import { Button } from '../Button';
export const CojectReport = ({ data, jsonData, reportCode, reportName, parameter, label, fullWidth, variant, ...buttonProps }) => {
    // Handle Print
    const handlePrint = async () => {
        if (!jsonData)
            return;
        const blob = await pdf(React.createElement(PdfContainer, { data: data, jsonData: jsonData, parameter: parameter, reportName: reportName })).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { type: 'button', fullWidth: fullWidth, variant: variant || "contained", onClick: handlePrint, startIcon: buttonProps.startIcon }, label || buttonProps.children)));
};
//# sourceMappingURL=index.js.map