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
exports.Upload = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Material UI
const material_1 = require("@mui/material");
// Coject
const index_1 = require("../index");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Upload = ({ value, name, setFile, multiple, onChange, onRemove, required, label, imageWidth, disabled, imageHeight, imagePath, placeholder, validateText, error }) => {
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const [files, setFiles] = (0, react_1.useState)([]);
    const [viewer, setViewer] = (0, react_1.useState)(false);
    const [, forceUpdate] = (0, react_1.useReducer)(x => x + 1, 0);
    const [viewerType, setViewerType] = (0, react_1.useState)(false);
    const [initValue, setInitValue] = (0, react_1.useState)([]);
    const element = document.getElementsByName(name || "default")[0];
    const { setValue, setError, clearErrors, formState: { errors } } = (0, react_hook_form_1.useFormContext)() || {};
    // Reset Files
    (0, react_1.useEffect)(() => {
        setFile && setFiles(setFile);
        setFile && setValue(name || "default", setFile);
    }, [setFile]);
    // Clear Files History
    const clearHistory = () => {
        try {
            element && (element.value = null);
        }
        catch (ex) { }
        if (element?.value) {
            element.parentNode.replaceChild(element.cloneNode(true), element);
        }
    };
    // Initial Value
    (0, react_1.useEffect)(() => {
        if (value) {
            if (multiple && value instanceof Array) {
                const images = [];
                for (let index = 0; index < value.length; index++) {
                    images.push(value[index]);
                }
                setInitValue(images);
            }
            else
                setInitValue([value]);
        }
    }, [value]);
    // File Change
    const fileChange = (event) => {
        const newFiles = [];
        for (let index = 0; index < Object.keys(event.target.files).length; index++) {
            newFiles.push(event.target.files[index]);
        }
        if (event.target.files.length > 0) {
            for (let index = 0; index < event.target.files.length; index++) {
                const Reader = new FileReader();
                Reader.readAsDataURL(event.target.files[index]);
                Reader.onload = () => setFiles((prev) => ([...(multiple ? prev : []), { file: event.target.files[index], image: Reader.result }]));
            }
        }
        if (!multiple)
            setInitValue([]);
        onChange && onChange((multiple ? [...(files?.map((file) => file.file)), ...newFiles] : event.target.files[0]), Methods);
        setValue(name || "default", (multiple ? [...(files?.map((file) => file.file)), ...newFiles] : event.target.files[0]));
    };
    // File Remove
    const removeFile = (index) => {
        const allFiles = files;
        allFiles.splice(index, 1);
        setFiles(!!allFiles?.length ? allFiles : []);
        onChange && onChange(!!allFiles?.length ? (multiple ? (allFiles.map((file) => file.file)) : allFiles[0].file) : undefined);
        setValue(name || "default", !!allFiles?.length ? (multiple ? (allFiles.map((file) => file.file)) : allFiles[0].file) : undefined);
        clearHistory();
        forceUpdate();
    };
    // Initial File Remove
    const removeInitFile = (index) => {
        onRemove && onRemove(initValue[index]);
        const allFiles = initValue;
        allFiles.splice(index, 1);
        setInitValue(!!allFiles?.length ? allFiles : []);
        forceUpdate();
    };
    // Error Handling
    (0, react_1.useEffect)(() => {
        if (required)
            (!!initValue?.length || !!files?.length) ? clearErrors(name || "default") : setError(name || "default", { type: "required", message: "This Field Is Required" });
    }, [required, files, initValue]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: `${classes.root} coject_upload` },
            label && react_1.default.createElement("label", null, label),
            react_1.default.createElement(material_1.Box, { className: `${classes.container} ${((errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"])) ? classes.error : ""}` },
                react_1.default.createElement(material_1.Grid, { spacing: 1, container: true },
                    !!files?.length && files.map((file, index) => (react_1.default.createElement(material_1.Grid, { key: index, xs: (imageWidth?.xs ? imageWidth.xs : 12), sm: (imageWidth?.sm ? imageWidth.sm : 12), md: (imageWidth?.md ? imageWidth.md : 12), lg: (imageWidth?.lg ? imageWidth.lg : 12), item: true },
                        react_1.default.createElement(material_1.Box, { className: classes.file, style: { height: imageHeight ? `${imageHeight}px` : "80px" } },
                            file?.file?.type === "application/pdf" ? react_1.default.createElement(index_1.Icons.PictureAsPdfOutlined, null)
                                : file?.file?.type === "image/png" ? react_1.default.createElement("img", { src: file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" })
                                    : file?.file?.type === "image/jpg" ? react_1.default.createElement("img", { src: file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" })
                                        : file?.file?.type === "image/jpeg" ? react_1.default.createElement("img", { src: file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" })
                                            : react_1.default.createElement(index_1.Icons.ArticleOutlined, null),
                            react_1.default.createElement(material_1.Box, { className: classes.remove },
                                react_1.default.createElement(material_1.Box, { onClick: () => {
                                        setViewer(file.image);
                                        setViewerType(file.file.type);
                                    }, className: classes.viewer }),
                                react_1.default.createElement(material_1.IconButton, { onClick: () => removeFile(index) },
                                    react_1.default.createElement(index_1.Icons.Close, null))))))),
                    !!initValue?.length && initValue.map((file, index) => (react_1.default.createElement(material_1.Grid, { key: index, xs: (imageWidth?.xs ? imageWidth.xs : 12), sm: (imageWidth?.sm ? imageWidth.sm : 12), md: (imageWidth?.md ? imageWidth.md : 12), lg: (imageWidth?.lg ? imageWidth.lg : 12), item: true },
                        react_1.default.createElement(material_1.Box, { className: classes.file, style: { height: imageHeight ? `${imageHeight}px` : "80px" } },
                            react_1.default.createElement("img", { src: imagePath ? file[`${imagePath}`] : file || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" }),
                            react_1.default.createElement(material_1.Box, { className: classes.remove },
                                react_1.default.createElement(material_1.Box, { onClick: () => setViewer(imagePath ? file[`${imagePath}`] : file), className: classes.viewer }),
                                react_1.default.createElement(material_1.IconButton, { onClick: () => removeInitFile(index) },
                                    react_1.default.createElement(index_1.Icons.Close, null))))))),
                    ((!multiple && !(files?.length) && !(initValue?.length)) || multiple) &&
                        react_1.default.createElement(material_1.Grid, { xs: true, sm: true, md: true, lg: true, item: true },
                            react_1.default.createElement(material_1.Box, { className: classes.inputContainer, style: { height: imageHeight ? `${imageHeight}px` : "80px" } },
                                react_1.default.createElement(index_1.Icons.BackupOutlined, null),
                                react_1.default.createElement(material_1.Typography, null, placeholder ? placeholder : "Upload Your Files"),
                                react_1.default.createElement(material_1.TextField, { autoComplete: "off", name: name || "default", type: "file", onChange: fileChange, ...(disabled ? { disabled } : {}), inputProps: { multiple: multiple } }))))),
            viewer &&
                react_1.default.createElement(index_1.Modal, { open: !!viewer, setOpen: setViewer, title: "File Preview" },
                    react_1.default.createElement(material_1.Box, { className: classes.file },
                        viewerType === "application/pdf" ? react_1.default.createElement(index_1.Icons.PictureAsPdfOutlined, null)
                            : viewerType === "image/png" ? react_1.default.createElement("img", { className: classes.imageViewer, src: viewer, alt: "File", style: { display: "block" } })
                                : viewerType === "image/jpg" ? react_1.default.createElement("img", { className: classes.imageViewer, src: viewer, alt: "File", style: { display: "block" } })
                                    : viewerType === "image/jpeg" ? react_1.default.createElement("img", { className: classes.imageViewer, src: viewer, alt: "File", style: { display: "block" } })
                                        : react_1.default.createElement(index_1.Icons.ArticleOutlined, null),
                        react_1.default.createElement(material_1.Box, { className: classes.download },
                            react_1.default.createElement(material_1.IconButton, { href: viewer, download: "file" },
                                react_1.default.createElement(index_1.Icons.SaveOutlined, null))))),
            (errors && errors[name || "default"]) ? react_1.default.createElement(material_1.FormHelperText, null, validateText ? validateText : "This Field Is Required") : ((error?.errors && error?.errors[name || "default"]) ? react_1.default.createElement(material_1.FormHelperText, null, error.errors[name || "default"][0]) : ""))));
};
exports.Upload = Upload;
//# sourceMappingURL=index.js.map