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
    // Load ScannerJs File
    useEffect(() => {
        if (document.querySelector('script[src*="asprise.com/scannerjs"]')) {
            setIsScriptLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.src = '//cdn.asprise.com/scannerjs/scanner.js';
        script.type = 'text/javascript';
        script.async = true;
        script.onload = () => {
            setIsScriptLoaded(true);
        };
        script.onerror = () => {
            console.error('Failed to load ScannerJS script');
        };
        document.head.appendChild(script);
        // Cleanup function
        return () => { };
    }, []);
    // Load Scanner File
    useEffect(() => {
        const timer = setInterval(() => {
            if (window.scanner) {
                setIsScriptLoaded(true);
                clearInterval(timer);
            }
        }, 300);
        return () => clearInterval(timer);
    }, []);
    // Update Images From Props
    useEffect(() => {
        if (value)
            setScannedImages(value);
    }, [value]);
    // Required Field Validation
    useEffect(() => {
        if (required && setError && clearErrors) {
            if (scannedImages.length > 0) {
                clearErrors(name || "default");
            }
            else {
                const message = typeof required === "string" ? required : validateText || "This field is required";
                setError(name || "default", {
                    type: "required",
                    message,
                });
            }
        }
    }, [required, scannedImages, name, clearErrors, setError, validateText]);
    // Generate PDF and Return File To Parent
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
        const file = new File([blob], "scanned_document.pdf", { type: "application/pdf" });
        onChange?.(file);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [scannedImages]);
    // Scan Handler
    const handleScan = useCallback(() => {
        const { scanner } = window;
        if (!scanner || !isScriptLoaded) {
            alert("Scanner Not Available!");
            return;
        }
        setIsScanning(true);
        const scanRequest = {
            use_asprise_dialog: true,
            show_scanner_ui: true,
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
        link.target = "_blank";
        link.click();
    };
    // Open PDF In New Tab
    const handleOpenPDF = () => {
        if (!pdfUrl)
            return;
        window.open(pdfUrl, "_blank");
    };
    // Error Handler
    const hasError = Boolean((errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"]));
    // handle Clear
    const handleClear = () => {
        setScannedImages([]);
        setPdfUrl(null);
        setValue?.(name || "default", []);
        onChange?.(null);
        clearErrors?.(name || "default");
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            React.createElement(Box, { className: classes.header },
                React.createElement(Typography, { className: classes.title }, localeText?.scanTitle || "Document Scanner"),
                React.createElement(Box, { className: classes.actions },
                    React.createElement(Button, { variant: variant, onClick: handleScan, disabled: !isScriptLoaded || disabled || isScanning, startIcon: React.createElement(MuiIcons.Scanner, null) }, isScanning ? localeText?.scanningText || "Scanning..." : localeText?.scanButton || "Scan Document"),
                    pdfUrl && (React.createElement(React.Fragment, null,
                        React.createElement(Button, { variant: variant, startIcon: React.createElement(MuiIcons.Download, null), onClick: handleDownloadPDF }, localeText?.downloadButton || "Download PDF"),
                        React.createElement(Button, { variant: variant, startIcon: React.createElement(MuiIcons.OpenInNew, null), onClick: handleOpenPDF }, localeText?.openPdfButton || "Open PDF"),
                        React.createElement(Button, { variant: variant, startIcon: React.createElement(MuiIcons.Delete, null), onClick: handleClear }, localeText?.clearButton || "Clear"))))),
            pdfUrl ? (React.createElement(Box, { className: classes.previewBox, style: { width: pdfWidth, height: pdfHeight } },
                React.createElement("iframe", { src: pdfUrl, className: classes.iframe, title: "PDF Preview" }))) : (React.createElement(Box, { className: classes.placeholder },
                React.createElement(MuiIcons.Scanner, { fontSize: "large", className: classes.placeholderIcon }),
                React.createElement(Typography, { className: classes.placeholderText }, placeholder || "No Scanned Documents Yet. Click Scan To Begin"))),
            hasError && (React.createElement(FormHelperText, { className: classes.errorText }, String(errors?.[name || "default"]?.message || ""))))));
};
//# sourceMappingURL=index.js.map