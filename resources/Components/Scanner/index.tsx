import React, { FC, useCallback, useState, useEffect } from "react";

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

// Scanner Interface
interface iScanner {
    name?: string;
    value?: string[];
    onChange?: (file: File | null) => void;
    disabled?: boolean;
    multiple?: boolean;
    placeholder?: string;
    validateText?: string;
    required?: boolean | string;
    localeText?: {
        scanButton?: string;
        savePdfButton?: string;
        uploadButton?: string;
        scanTitle?: string;
        noImagesText?: string;
        scanningText?: string;
        downloadButton?: string;
        openPdfButton?: string;
        downloadApp?: string;
    };
    pdfHeight?: string | number;
    pdfWidth?: string | number;
    variant?: "contained" | "outlined" | "text";
    error?: any;
}

declare global {
    interface Window {
        scanner: any;
    }
}

export const Scanner: FC<iScanner> = ({ name, value, onChange, disabled, multiple, placeholder, validateText, required, localeText, pdfHeight, pdfWidth, variant, error }) => {
    const { classes } = useStyles();
    const formContext = useFormContext();
    const [isScanning, setIsScanning] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [scannedImages, setScannedImages] = useState<string[]>(value || []);
    const { setValue, setError, clearErrors, formState } = formContext || {};
    const [isScannerInstalled, setIsScannerInstalled] = useState<boolean>(false);
    const errors = formState?.errors || {};

    // Check Scanner App Exist
    useEffect(() => {
        if (window.scanner) setIsScannerInstalled(true);
    }, []);

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

    // Update Images From Props
    useEffect(() => {
        if (value) setScannedImages(value);
    }, [value]);

    // Required Field Validation
    useEffect(() => {
        if (required && setError && clearErrors) {
            if (scannedImages.length > 0) {
                clearErrors(name || "default");
            } else {
                const message = typeof required === "string" ? required : validateText || "This field is required";
                setError(name || "default", {
                    type: "required",
                    message,
                });
            }
        }
    }, [required, scannedImages, name, clearErrors, setError, validateText]);

    // Generate PDF + Return File To Parent
    useEffect(() => {
        if (scannedImages.length === 0) {
            setPdfUrl(null);
            onChange?.(null);
            return;
        }
        const pdf = new jsPDF();
        scannedImages.forEach((img, i) => {
            if (i > 0) pdf.addPage();
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
            show_scanner_ui: false,
            twain_cap_setting: { ICAP_PIXELTYPE: "TWPT_RGB" },
            output_settings: [{ type: "return-base64", format: "jpg" }],
        };
        scanner.scan(displayImagesOnPage, scanRequest);
    }, [isScriptLoaded]);

    // Process Scanned Images
    const displayImagesOnPage = useCallback(
        (successful: boolean, mesg: string, response: any) => {
            setIsScanning(false);
            const { scanner } = window;
            if (!successful) return console.error("Scan failed:", mesg);
            if (mesg && mesg.toLowerCase().includes("user cancel")) return;

            const scanned = scanner.getScannedImages(response, true, false);
            if (Array.isArray(scanned)) {
                const newImages = scanned.map((img: any) => img.src);
                const updatedImages = multiple ? [...scannedImages, ...newImages] : newImages;
                setScannedImages(updatedImages);
                setValue?.(name || "default", updatedImages);
            }
        },
        [scannedImages, multiple, name, setValue]
    );

    // Download PDF
    const handleDownloadPDF = () => {
        if (!pdfUrl) return;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "scanned-document.pdf";
        link.target = "_blank";
        link.click();
    };

    // Open PDF In New Tab
    const handleOpenPDF = () => {
        if (!pdfUrl) return;
        window.open(pdfUrl, "_blank");
    };

    // Download Installer
    const downloadInstaller = () => {
        const link = document.createElement("a");
        link.href = "/scanner/scan-setup.exe";
        link.download = "scan-setup.exe";
        link.click();
        setIsScannerInstalled(true);
    };

    // Error Handler
    const hasError = Boolean(
        (errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"])
    );

    return (
        <React.Fragment>
            <Box className={classes.root}>
                <Box className={classes.header}>
                    <Typography className={classes.title}>
                        {localeText?.scanTitle || "Document Scanner"}
                    </Typography>
                    <Box className={classes.actions}>
                        <Button variant={variant} onClick={handleScan} disabled={!isScriptLoaded || disabled || isScanning} startIcon={<MuiIcons.Scanner />}>
                            {isScanning ? localeText?.scanningText || "Scanning..." : localeText?.scanButton || "Scan Document"}
                        </Button>
                        {!isScannerInstalled && (
                            <Button variant={variant} startIcon={<MuiIcons.Download />} onClick={downloadInstaller}>
                                {localeText?.downloadApp || "Install Scanner App"}
                            </Button>
                        )}
                        {pdfUrl && (
                            <>
                                <Button variant={variant} startIcon={<MuiIcons.Download />} onClick={handleDownloadPDF}>
                                    {localeText?.downloadButton || "Download PDF"}
                                </Button>
                                <Button variant={variant} startIcon={<MuiIcons.OpenInNew />} onClick={handleOpenPDF}>
                                    {localeText?.openPdfButton || "Open PDF"}
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
                {pdfUrl ? (
                    <Box className={classes.previewBox} style={{ width: pdfWidth, height: pdfHeight }}>
                        <iframe src={pdfUrl} className={classes.iframe} title="PDF Preview" />
                    </Box>
                ) : (
                    <Box className={classes.placeholder}>
                        <MuiIcons.Scanner fontSize="large" className={classes.placeholderIcon} />
                        <Typography className={classes.placeholderText}>
                            {placeholder || "No Scanned Documents Yet. Click Scan To Begin"}
                        </Typography>
                    </Box>
                )}
                {hasError && (
                    <FormHelperText className={classes.errorText}>
                        {String(errors?.[name || "default"]?.message || "")}
                    </FormHelperText>
                )}
            </Box>
        </React.Fragment>
    );
};