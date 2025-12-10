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
exports.Scanner = void 0;
const react_1 = __importStar(require("react"));
// JsPDF
const jspdf_1 = require("jspdf");
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Material UI
const material_1 = require("@mui/material");
// Material Icon
const MuiIcons = __importStar(require("@mui/icons-material"));
// Styles
const theme_1 = __importDefault(require("./theme"));
const Scanner = ({ name, value, onChange, disabled, multiple, placeholder, validateText, required, localeText, pdfHeight, pdfWidth, variant, error }) => {
    const { classes } = (0, theme_1.default)();
    const formContext = (0, react_hook_form_1.useFormContext)();
    const [isScanning, setIsScanning] = (0, react_1.useState)(false);
    const [pdfUrl, setPdfUrl] = (0, react_1.useState)(null);
    const [isScriptLoaded, setIsScriptLoaded] = (0, react_1.useState)(false);
    const [scannedImages, setScannedImages] = (0, react_1.useState)(value || []);
    const { setValue, setError, clearErrors, formState } = formContext || {};
    const [isScannerInstalled, setIsScannerInstalled] = (0, react_1.useState)(false);
    const errors = formState?.errors || {};
    // Check Scanner App Exist
    (0, react_1.useEffect)(() => {
        if (window.scanner)
            setIsScannerInstalled(true);
    }, []);
    // Load scanner.js
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        if (value)
            setScannedImages(value);
    }, [value]);
    // Required Field Validation
    (0, react_1.useEffect)(() => {
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
    // Generate PDF + Return File To Parent
    (0, react_1.useEffect)(() => {
        if (scannedImages.length === 0) {
            setPdfUrl(null);
            onChange?.(null);
            return;
        }
        const pdf = new jspdf_1.jsPDF();
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
    const handleScan = (0, react_1.useCallback)(() => {
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
    const displayImagesOnPage = (0, react_1.useCallback)((successful, mesg, response) => {
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
    // Download Installer
    const downloadInstaller = () => {
        const link = document.createElement("a");
        link.href = "/scanner/scan-setup.exe";
        link.download = "scan-setup.exe";
        link.click();
        setIsScannerInstalled(true);
    };
    // Error Handler
    const hasError = Boolean((errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"]));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(material_1.Box, { className: classes.header },
                react_1.default.createElement(material_1.Typography, { className: classes.title }, localeText?.scanTitle || "Document Scanner"),
                react_1.default.createElement(material_1.Box, { className: classes.actions },
                    react_1.default.createElement(material_1.Button, { variant: variant, onClick: handleScan, disabled: !isScriptLoaded || disabled || isScanning, startIcon: react_1.default.createElement(MuiIcons.Scanner, null) }, isScanning ? localeText?.scanningText || "Scanning..." : localeText?.scanButton || "Scan Document"),
                    !isScannerInstalled && (react_1.default.createElement(material_1.Button, { variant: variant, startIcon: react_1.default.createElement(MuiIcons.Download, null), onClick: downloadInstaller }, localeText?.downloadApp || "Install Scanner App")),
                    pdfUrl && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(material_1.Button, { variant: variant, startIcon: react_1.default.createElement(MuiIcons.Download, null), onClick: handleDownloadPDF }, localeText?.downloadButton || "Download PDF"),
                        react_1.default.createElement(material_1.Button, { variant: variant, startIcon: react_1.default.createElement(MuiIcons.OpenInNew, null), onClick: handleOpenPDF }, localeText?.openPdfButton || "Open PDF"))))),
            pdfUrl ? (react_1.default.createElement(material_1.Box, { className: classes.previewBox, style: { width: pdfWidth, height: pdfHeight } },
                react_1.default.createElement("iframe", { src: pdfUrl, className: classes.iframe, title: "PDF Preview" }))) : (react_1.default.createElement(material_1.Box, { className: classes.placeholder },
                react_1.default.createElement(MuiIcons.Scanner, { fontSize: "large", className: classes.placeholderIcon }),
                react_1.default.createElement(material_1.Typography, { className: classes.placeholderText }, placeholder || "No Scanned Documents Yet. Click Scan To Begin"))),
            hasError && (react_1.default.createElement(material_1.FormHelperText, { className: classes.errorText }, String(errors?.[name || "default"]?.message || ""))))));
};
exports.Scanner = Scanner;
//# sourceMappingURL=index.js.map