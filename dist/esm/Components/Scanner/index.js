import React, { useCallback, useState, useEffect } from "react";
// JsPDF
import { jsPDF } from "jspdf";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, Button, Typography, FormHelperText } from "@mui/material";
// Material Icon
import * as MuiIcons from "@mui/icons-material";
// Styles
import useStyles from "./theme";
export const Scanner = ({ name, value, onChange, disabled, multiple, placeholder, validateText, required, localeText, pdfHeight, pdfWidth, variant, error }) => {
    const { classes } = useStyles();
    const formContext = useFormContext();
    const [isScanning, setIsScanning] = useState(false);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [scannedImages, setScannedImages] = useState(value || []);
    const { setValue, setError, clearErrors, formState } = formContext || {};
    const errors = formState?.errors || {};
    // Load scanner.js
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/scanner.js";
        script.type = "text/javascript";
        script.async = true;
        script.onload = () => setIsScriptLoaded(true);
        script.onerror = () => setIsScriptLoaded(false);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    // Update images from props
    useEffect(() => {
        if (value) {
            setScannedImages(value);
        }
    }, [value]);
    // Required field validation
    useEffect(() => {
        if (required && setError && clearErrors) {
            scannedImages.length > 0
                ? clearErrors(name || "default")
                : setError(name || "default", {
                    type: "required",
                    message: "This field is required",
                });
        }
    }, [required, scannedImages, name, clearErrors, setError]);
    // Generate PDF + return File to parent
    useEffect(() => {
        if (scannedImages.length === 0) {
            setPdfUrl(null);
            onChange?.(null);
            return;
        }
        const pdf = new jsPDF();
        scannedImages.forEach((img, i) => {
            if (i > 0)
                pdf.addPage();
            pdf.addImage(img, "JPEG", 10, 10, 190, 270);
        });
        const blob = pdf.output("blob");
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        // Return a File object instead of URL
        const file = new File([blob], "scanned_document.pdf", { type: "application/pdf" });
        onChange?.(file);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [scannedImages]);
    // Scan handler
    const handleScan = useCallback(() => {
        const { scanner } = window;
        if (!scanner || !isScriptLoaded) {
            alert("Scanner not available!");
            return;
        }
        setIsScanning(true);
        const scanRequest = {
            use_asprise_dialog: true,
            show_scanner_ui: false,
            twain_cap_setting: { ICAP_PIXELTYPE: "TWPT_RGB" },
            output_settings: [{ type: "return-base64", format: "jpg" }],
        };
        scanner.scan(displayImagesOnPage, scanRequest);
    }, [isScriptLoaded]);
    // Process Scanned Images
    const displayImagesOnPage = useCallback((successful, mesg, response) => {
        setIsScanning(false);
        const { scanner } = window;
        if (!successful)
            return console.error("Scan failed:", mesg);
        if (mesg && mesg.toLowerCase().includes("user cancel"))
            return;
        const scanned = scanner.getScannedImages(response, true, false);
        if (Array.isArray(scanned)) {
            const newImages = scanned.map((img) => img.src);
            const updatedImages = multiple ? [...scannedImages, ...newImages] : newImages;
            setScannedImages(updatedImages);
            setValue?.(name || "default", updatedImages);
        }
    }, [scannedImages, multiple, name, setValue]);
    // Download PDF
    const handleDownloadPDF = () => {
        if (!pdfUrl)
            return;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "scanned-document.pdf";
        link.click();
    };
    // Open PDF in new tab
    const handleOpenInNewTab = () => {
        if (!pdfUrl)
            return;
        window.open(pdfUrl, "_blank");
    };
    // Handle errors
    const hasError = Boolean((errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"]));
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} coject_scanner` },
            React.createElement(Box, { className: classes.header },
                React.createElement(Typography, { variant: "h6" }, localeText?.scanTitle || "Document Scanner"),
                React.createElement(Box, { className: classes.actions, sx: { display: "flex", gap: 1 } },
                    React.createElement(Button, { variant: variant, onClick: handleScan, disabled: !isScriptLoaded || disabled || isScanning, startIcon: React.createElement(MuiIcons.Scanner, null) }, isScanning
                        ? localeText?.scanningText || "Scanning..."
                        : localeText?.scanButton || "Scan"),
                    pdfUrl && (React.createElement(React.Fragment, null,
                        React.createElement(Button, { variant: variant, startIcon: React.createElement(MuiIcons.Download, null), onClick: handleDownloadPDF }, localeText?.downloadButton || "Download PDF"),
                        React.createElement(Button, { variant: variant, startIcon: React.createElement(MuiIcons.OpenInNew, null), onClick: handleOpenInNewTab }, localeText?.openPdfButton || "Open PDF"))))),
            pdfUrl ? (React.createElement(Box, { sx: { border: "1px solid #ccc", borderRadius: 2, overflow: "hidden", width: pdfWidth, height: pdfHeight, mt: 1 } },
                React.createElement("iframe", { src: pdfUrl, style: { width: "100%", height: "100%", border: "none" }, title: "Scanned PDF Preview" }))) : (React.createElement(Box, { className: classes.placeholder },
                React.createElement(MuiIcons.Scanner, { fontSize: "large" }),
                React.createElement(Typography, { variant: "body2" }, placeholder || "No scanned documents. Click 'Scan' to get started"))),
            hasError && (React.createElement(FormHelperText, { className: classes.error }, validateText || "This field is required")))));
};
//# sourceMappingURL=index.js.map