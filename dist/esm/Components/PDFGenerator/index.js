import React, { Fragment, useEffect, useState } from "react";
// JSPDF
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// Coject
import { Button, Modal } from "../index";
// Material UI
import { Box } from "@mui/material";
// Styles
import useStyles from "./theme";
export const PDFGenerator = ({ button, landscape, fileName, title, children }) => {
    const { classes } = useStyles();
    const [modal, setModal] = useState(false);
    const [pdfPreview, setPdfPreview] = useState(null);
    // Clear PDF Preview
    useEffect(() => {
        if (!modal) {
            setPdfPreview(null);
        }
    }, [modal]);
    // Generate PDF
    const generatePDF = async () => {
        const element = document.getElementById("content");
        html2canvas(element).then((canvas) => {
            const positionX = 0;
            const headerHeight = 10;
            const footerHeight = 10;
            const pageWidth = landscape ? 297 : 210;
            const pageHeight = landscape ? 210 : 297;
            // Calculate The Content Height
            const canvasWidth = canvas.width;
            const contentHeight = pageHeight - (headerHeight + footerHeight);
            const canvasHeight = contentHeight * (canvasWidth / pageWidth);
            const pdf = new jsPDF(`${landscape ? 'landscape' : 'p'}`, "mm", "a4");
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
    return (React.createElement(Fragment, null,
        React.createElement(Box, { className: `${classes.root} coject_pdf` },
            React.createElement(Button, { variant: 'contained', onClick: () => setModal(true) }, button ?? 'PDF Report'),
            React.createElement(Modal, { open: modal, setOpen: setModal, title: title ?? 'PDF Report', className: classes.modal }, pdfPreview ?
                React.createElement(Fragment, null,
                    React.createElement("iframe", { src: pdfPreview, className: classes.preview }),
                    React.createElement(Button, { className: classes.button, variant: 'contained', href: pdfPreview, download: `${fileName ? (fileName + ".pdf") : "example.pdf"}` }, "Download PDF")) :
                React.createElement(Fragment, null,
                    React.createElement(Box, { className: classes.children },
                        React.createElement(Box, { id: "content" }, children)),
                    React.createElement(Button, { className: classes.button, variant: 'contained', component: 'a', onClick: generatePDF }, "Preview PDF"))))));
};
//# sourceMappingURL=index.js.map