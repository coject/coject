"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CojectReport = void 0;
const react_1 = __importDefault(require("react"));
// React Pdf
const renderer_1 = require("@react-pdf/renderer");
// Pdf Container
const PdfContainer_1 = __importDefault(require("./PdfContainer"));
// Coject Components
const Button_1 = require("../Button");
const CojectReport = ({ reportData, reportTemplate, reportCode, reportName, reportParameter, label, fullWidth, variant, ...buttonProps }) => {
    // Handle Print
    const handlePrint = async () => {
        await exports.CojectReport.print({ reportData, reportTemplate, reportParameter, reportName });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.Button, { type: 'button', fullWidth: fullWidth, variant: variant || "contained", onClick: handlePrint, startIcon: buttonProps.startIcon }, label || buttonProps.children)));
};
exports.CojectReport = CojectReport;
exports.CojectReport.print = async ({ reportData, reportTemplate, reportParameter, reportName }) => {
    if (!reportTemplate)
        return;
    const blob = await (0, renderer_1.pdf)(react_1.default.createElement(PdfContainer_1.default, { data: reportData, jsonData: reportTemplate, parameter: reportParameter, reportName: reportName })).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
};
//# sourceMappingURL=index.js.map