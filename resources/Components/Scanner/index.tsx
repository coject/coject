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
        scanTitle?: string;
        scanningText?: string;
        downloadButton?: string;
        openPdfButton?: string;
        clearButton?: string;
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
    const [scannedImages, setScannedImages] = useState<string[]>(value || []);
    const { setValue, setError, clearErrors, formState } = formContext || {};
    const errors = formState?.errors || {};

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

    // Generate PDF and Return File To Parent
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

    // Scan Handler
    const handleScan = useCallback(async () => {
        if (isScanning) return;

        const loadScannerScript = () => {
            return new Promise((resolve, reject) => {
                if (window.scanner) {
                    resolve(window.scanner);
                    return;
                }

                const script = document.createElement('script');
                script.src = '//cdn.asprise.com/scannerjs/scanner.js';
                script.type = 'text/javascript';
                script.async = true;

                script.onload = () => {
                    const checkScanner = setInterval(() => {
                        if (window.scanner) {
                            clearInterval(checkScanner);
                            resolve(window.scanner);
                        }
                    }, 100);
                    // Timeout after 5 seconds
                    setTimeout(() => {
                        clearInterval(checkScanner);
                        if (!window.scanner) reject(new Error("ScannerJS loaded but window.scanner is not defined"));
                    }, 5000);
                };

                script.onerror = () => {
                    reject(new Error('Failed to load ScannerJS script'));
                };

                document.head.appendChild(script);
            });
        };

        setIsScanning(true);

        try {
            let scanner = window.scanner;
            if (!scanner) {
                scanner = await loadScannerScript();
            }

            if (scanner && typeof scanner.initialize === 'function') {
                scanner.initialize();
            }

            const scanRequest = {
                use_asprise_dialog: true,
                show_scanner_ui: true,
                twain_cap_setting: { ICAP_PIXELTYPE: "TWPT_RGB" },
                output_settings: [{ type: "return-base64", format: "jpg" }],
            };
            scanner.scan(displayImagesOnPage, scanRequest);
        } catch (error) {
            console.error(error);
            alert("Scanner Not Available or Failed to load!");
            setIsScanning(false);
        }
    }, [isScanning, displayImagesOnPage]);

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

    // Error Handler
    const hasError = Boolean(
        (errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"])
    );

    // handle Clear
    const handleClear = () => {
        setScannedImages([]);
        setPdfUrl(null);
        setValue?.(name || "default", []);
        onChange?.(null);
        clearErrors?.(name || "default");
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Typography className={classes.title}>
                    {localeText?.scanTitle || "Document Scanner"}
                </Typography>
                <Box className={classes.actions}>
                    <Button variant={variant} onClick={handleScan} disabled={disabled || isScanning} startIcon={<MuiIcons.Scanner />}>
                        {isScanning ? localeText?.scanningText || "Scanning..." : localeText?.scanButton || "Scan Document"}
                    </Button>
                    {pdfUrl && (
                        <>
                            <Button variant={variant} startIcon={<MuiIcons.Download />} onClick={handleDownloadPDF}>
                                {localeText?.downloadButton || "Download PDF"}
                            </Button>
                            <Button variant={variant} startIcon={<MuiIcons.OpenInNew />} onClick={handleOpenPDF}>
                                {localeText?.openPdfButton || "Open PDF"}
                            </Button>
                            <Button variant={variant} startIcon={<MuiIcons.Delete />} onClick={handleClear}>
                                {localeText?.clearButton || "Clear"}
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
    );
};