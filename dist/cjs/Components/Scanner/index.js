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
    const errors = formState?.errors || {};
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
    // Update images from props
    (0, react_1.useEffect)(() => {
        if (value) {
            setScannedImages(value);
        }
    }, [value]);
    // Required field validation
    (0, react_1.useEffect)(() => {
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
        // Return a File object instead of URL
        const file = new File([blob], "scanned_document.pdf", { type: "application/pdf" });
        onChange?.(file);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [scannedImages]);
    // Scan handler
    const handleScan = (0, react_1.useCallback)(() => {
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: `${classes.root} coject_scanner` },
            react_1.default.createElement(material_1.Box, { className: classes.header },
                react_1.default.createElement(material_1.Typography, { variant: "h6" }, localeText?.scanTitle || "Document Scanner"),
                react_1.default.createElement(material_1.Box, { className: classes.actions, sx: { display: "flex", gap: 1 } },
                    react_1.default.createElement(material_1.Button, { variant: variant, onClick: handleScan, disabled: !isScriptLoaded || disabled || isScanning, startIcon: react_1.default.createElement(MuiIcons.Scanner, null) }, isScanning
                        ? localeText?.scanningText || "Scanning..."
                        : localeText?.scanButton || "Scan"),
                    pdfUrl && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(material_1.Button, { variant: variant, startIcon: react_1.default.createElement(MuiIcons.Download, null), onClick: handleDownloadPDF }, localeText?.downloadButton || "Download PDF"),
                        react_1.default.createElement(material_1.Button, { variant: variant, startIcon: react_1.default.createElement(MuiIcons.OpenInNew, null), onClick: handleOpenInNewTab }, localeText?.openPdfButton || "Open PDF"))))),
            pdfUrl ? (react_1.default.createElement(material_1.Box, { sx: { border: "1px solid #ccc", borderRadius: 2, overflow: "hidden", width: pdfWidth, height: pdfHeight, mt: 1 } },
                react_1.default.createElement("iframe", { src: pdfUrl, style: { width: "100%", height: "100%", border: "none" }, title: "Scanned PDF Preview" }))) : (react_1.default.createElement(material_1.Box, { className: classes.placeholder },
                react_1.default.createElement(MuiIcons.Scanner, { fontSize: "large" }),
                react_1.default.createElement(material_1.Typography, { variant: "body2" }, placeholder || "No scanned documents. Click 'Scan' to get started"))),
            hasError && (react_1.default.createElement(material_1.FormHelperText, { className: classes.error }, validateText || "This field is required")))));
};
exports.Scanner = Scanner;
//# sourceMappingURL=index.js.map