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

export const Scanner: FC<iScanner> = ({
    name, value, onChange, disabled, multiple, placeholder, validateText, required, localeText, pdfHeight, pdfWidth, variant, error }) => {
    const { classes } = useStyles();
    const formContext = useFormContext();
    const [isScanning, setIsScanning] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [scannedImages, setScannedImages] = useState<string[]>(value || []);
    const { setValue, setError, clearErrors, formState } = formContext || {};
    const errors = formState?.errors || {};

    // Load scanner.js
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./scanner.js";
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
            if (i > 0) pdf.addPage();
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
        link.click();
    };

    // Open PDF in new tab
    const handleOpenInNewTab = () => {
        if (!pdfUrl) return;
        window.open(pdfUrl, "_blank");
    };

    // Handle errors
    const hasError = Boolean(
        (errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"])
    );

    return (
        <React.Fragment>
            <Box className={`${classes.root} coject_scanner`}>
                <Box className={classes.header}>
                    <Typography variant="h6">
                        {localeText?.scanTitle || "Document Scanner"}
                    </Typography>
                    <Box className={classes.actions} sx={{ display: "flex", gap: 1 }}>
                        <Button
                            variant={variant}
                            onClick={handleScan}
                            disabled={!isScriptLoaded || disabled || isScanning}
                            startIcon={<MuiIcons.Scanner />}
                        >
                            {isScanning
                                ? localeText?.scanningText || "Scanning..."
                                : localeText?.scanButton || "Scan"}
                        </Button>
                        {pdfUrl && (
                            <>
                                <Button
                                    variant={variant}
                                    startIcon={<MuiIcons.Download />}
                                    onClick={handleDownloadPDF}
                                >
                                    {localeText?.downloadButton || "Download PDF"}
                                </Button>
                                <Button
                                    variant={variant}
                                    startIcon={<MuiIcons.OpenInNew />}
                                    onClick={handleOpenInNewTab}
                                >
                                    {localeText?.openPdfButton || "Open PDF"}
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>

                {pdfUrl ? (
                    <Box sx={{ border: "1px solid #ccc", borderRadius: 2, overflow: "hidden", width: pdfWidth, height: pdfHeight, mt: 1 }}>
                        <iframe src={pdfUrl} style={{ width: "100%", height: "100%", border: "none" }} title="Scanned PDF Preview" />
                    </Box>
                ) : (
                    <Box className={classes.placeholder}>
                        <MuiIcons.Scanner fontSize="large" />
                        <Typography variant="body2">
                            {placeholder || "No scanned documents. Click 'Scan' to get started"}
                        </Typography>
                    </Box>
                )}

                {hasError && (
                    <FormHelperText className={classes.error}>
                        {validateText || "This field is required"}
                    </FormHelperText>
                )}
            </Box>
        </React.Fragment>
    );
};