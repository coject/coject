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
    const generatePDF = () => {
        const element = document.getElementById("content");
        html2canvas(element).then((canvas) => {
            let position = 0;
            let pageCount = 0;
            const imgWidth = landscape ? 297 : 210;
            const pageHeight = landscape ? 210 : 297;
            const pdf = new jsPDF(`${landscape ? 'landscape' : 'p'}`, "mm", "a4");
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
    return (React.createElement(Fragment, null,
        React.createElement(Box, { className: `${classes.root} coject_pdf` },
            React.createElement(Button, { variant: 'contained', onClick: () => setModal(true) }, button ?? 'PDF Report'),
            React.createElement(Modal, { open: modal, setOpen: setModal, title: title ?? 'PDF Report', className: classes.modal }, pdfPreview ?
                React.createElement(Fragment, null,
                    React.createElement("iframe", { src: pdfPreview, className: classes.preview }),
                    React.createElement(Button, { className: classes.button, variant: 'contained', component: 'a', href: pdfPreview, download: `${fileName ? (fileName + ".pdf") : "example.pdf"}` }, "Download PDF")) :
                React.createElement(Fragment, null,
                    React.createElement(Box, { className: classes.children },
                        React.createElement(Box, { id: "content" }, children)),
                    React.createElement(Button, { className: classes.button, variant: 'contained', component: 'a', onClick: generatePDF }, "Preview PDF"))))));
};
//# sourceMappingURL=index.js.map