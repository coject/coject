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
    const generatePDF = async () => {
        const element = document.getElementById("content");
        (0, html2canvas_1.default)(element).then((canvas) => {
            const positionX = 0;
            const headerHeight = 10;
            const footerHeight = 10;
            const pageWidth = landscape ? 297 : 210;
            const pageHeight = landscape ? 210 : 297;
            // Calculate The Content Height
            const canvasWidth = canvas.width;
            const contentHeight = pageHeight - (headerHeight + footerHeight);
            const canvasHeight = contentHeight * (canvasWidth / pageWidth);
            const pdf = new jspdf_1.default(`${landscape ? 'landscape' : 'p'}`, "mm", "a4");
            const totalContent = (canvas.height + (((headerHeight + footerHeight) * (canvasWidth / pageWidth)) * Math.ceil(canvas.height / ((pageHeight - (headerHeight + footerHeight)) * (canvasWidth / pageWidth))))) / (canvasWidth / pageWidth);
            // Dependencies
            let pageCount = 0;
            let positionY = headerHeight;
            // Split ImgData Into Sections
            const splitData = [];
            const totalPages = Math.ceil(canvas.height / canvasHeight);
            // Left Height
            let leftHeight = totalContent;
            // Create Images
            for (let i = 0; i < totalPages; i++) {
                // Create A New Canvas For Each Section
                const croppedContent = document.createElement("canvas");
                const ctx = croppedContent.getContext("2d");
                croppedContent.width = canvasWidth;
                croppedContent.height = canvasHeight;
                // Draw The Section On The New Canvas (Vertical Split)
                ctx.drawImage(canvas, 0, i * canvasHeight, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
                // Save The Cropped Canvas As An Image
                splitData.push(croppedContent.toDataURL("image/png"));
            }
            // Add Each Section To The PDF
            while (leftHeight > 0) {
                // Header
                pdf.setFontSize(12);
                pdf.text(title || "PDF Report", pageWidth / 2, 7, { align: "center" });
                // Content (Adding Each Split Image On The Page)
                pdf.addImage(splitData[pageCount], "PNG", positionX, positionY, pageWidth, contentHeight);
                // Footer
                pdf.setFontSize(10);
                pdf.text(`${pageCount + 1} / ${totalPages}`, pageWidth / 2, pageHeight - 4, { align: "center" });
                // Add New Page
                pageCount++;
                // Adjust Remaining Content Height
                leftHeight -= pageHeight;
                if (leftHeight > 0) {
                    pdf.addPage();
                }
            }
            // Generate Preview
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
                    react_1.default.createElement(index_1.Button, { className: classes.button, variant: 'contained', href: pdfPreview, download: `${fileName ? (fileName + ".pdf") : "example.pdf"}` }, "Download PDF")) :
                react_1.default.createElement(react_1.Fragment, null,
                    react_1.default.createElement(material_1.Box, { className: classes.children },
                        react_1.default.createElement(material_1.Box, { id: "content" }, children)),
                    react_1.default.createElement(index_1.Button, { className: classes.button, variant: 'contained', component: 'a', onClick: generatePDF }, "Preview PDF"))))));
};
exports.PDFGenerator = PDFGenerator;
//# sourceMappingURL=index.js.map