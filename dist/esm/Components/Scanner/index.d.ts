import { FC } from "react";
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
export declare const Scanner: FC<iScanner>;
export {};
