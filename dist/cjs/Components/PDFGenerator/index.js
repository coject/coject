"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDFGenerator = void 0;
const react_1 = __importStar(require("react"));
// JSPDF
const jspdf_1 = __importDefault(require("jspdf"));
const html2canvas_1 = __importDefault(require("html2canvas"));
// Coject
const index_1 = require("../index");
// Material UI
const material_1 = require("@mui/material");
// Styles
const theme_1 = __importDefault(require("./theme"));
const PDFGenerator = ({ button, landscape, fileName, title, children }) => {
    const { classes } = (0, theme_1.default)();
    const [modal, setModal] = (0, react_1.useState)(false);
    const [pdfPreview, setPdfPreview] = (0, react_1.useState)(null);
    // Clear PDF Preview
    (0, react_1.useEffect)(() => {
        if (!modal) {
            setPdfPreview(null);
        }
    }, [modal]);
    // Generate PDF
    const generatePDF = () => {
        const element = document.getElementById("content");
        (0, html2canvas_1.default)(element).then((canvas) => {
            let position = 0;
            let pageCount = 0;
            const imgWidth = landscape ? 297 : 210;
            const pageHeight = landscape ? 210 : 297;
            const pdf = new jspdf_1.default(`${landscape ? 'landscape' : 'p'}`, "mm", "a4");
            const imgData = canvas.toDataURL("image/png");
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            // Create Pages
            while (heightLeft > 0) {
                pageCount++;
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                pdf.text(`${pageCount}`, 105, 290, { align: "center" });
                heightLeft -= pageHeight;
                if (heightLeft > 0) {
                    position -= pageHeight;
                    pdf.addPage();
                }
            }
            // Generate a Blob URL for preview
            const pdfBlob = pdf.output("blob");
            const pdfURL = URL.createObjectURL(pdfBlob);
            setPdfPreview(pdfURL);
        });
    };
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: `${classes.root} coject_pdf` },
            react_1.default.createElement(index_1.Button, { variant: 'contained', onClick: () => setModal(true) }, button ?? 'PDF Report'),
            react_1.default.createElement(index_1.Modal, { open: modal, setOpen: setModal, title: title ?? 'PDF Report', className: classes.modal }, pdfPreview ?
                react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement("iframe", { src: pdfPreview, className: classes.preview }),
                    react_1.default.createElement(index_1.Button, { className: classes.button, variant: 'contained', component: 'a', href: pdfPreview, download: `${fileName ? (fileName + ".pdf") : "example.pdf"}` }, "Download PDF")) :
                react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(material_1.Box, { className: classes.children },
                        react_1.default.createElement(material_1.Box, { id: "content" }, children)),
                    react_1.default.createElement(index_1.Button, { className: classes.button, variant: 'contained', component: 'a', onClick: generatePDF }, "Preview PDF"))))));
};
exports.PDFGenerator = PDFGenerator;
//# sourceMappingURL=index.js.map