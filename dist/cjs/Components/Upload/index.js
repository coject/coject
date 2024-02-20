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
const index_1 = require("../../index");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Upload = ({ name, helperText, multiple, onChange, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const [files, setFiles] = (0, react_1.useState)(multiple ? [] : {});
    const [, forceUpdate] = (0, react_1.useReducer)(x => x + 1, 0);
    const { setValue, control } = (0, react_hook_form_1.useFormContext)() || {};
    // Change Value
    const changeValue = (event) => {
        const multiFiles = [];
        for (let index = 0; index < Object.keys(event.target.files).length; index++) {
            multiFiles.push(event.target.files[index]);
        }
        onChange && onChange((multiple ? [...(files?.map((file) => file.file)), ...multiFiles] : event.target.files[0]), Methods);
        control && setValue(name || "default", multiple ? [...(files?.map((file) => file.file)), ...multiFiles] : event.target.files[0]);
        if (event.target.files.length > 0) {
            for (let Index = 0; Index < event.target.files.length; Index++) {
                const Reader = new FileReader();
                Reader.readAsDataURL(event.target.files[Index]);
                Reader.onload = () => setFiles((prev) => multiple ? [...prev, { file: event.target.files[Index], image: Reader.result }] : { file: event.target.files[Index], image: Reader.result });
            }
        }
    };
    // Remove File
    const removeFile = (index) => {
        const filesValue = files;
        const file = multiple && filesValue[index];
        file && filesValue.splice(file, 1);
        setFiles(multiple ? filesValue : {});
        onChange && onChange(multiple ? filesValue?.map((fileValue) => fileValue.file) : {}, Methods);
        control && setValue(name || "default", multiple ? filesValue?.map((fileValue) => fileValue.file) : {});
        forceUpdate();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root }, multiple ?
            react_1.default.createElement(react_1.default.Fragment, null,
                !!files?.length && files.map((file, index) => {
                    return (react_1.default.createElement(material_1.Box, { key: index, className: `${classes.imageBox} ${classes.multiImageBox} ${files?.length > 1 ? classes.moreMultiImageBox : ""}` },
                        react_1.default.createElement("img", { src: file?.image, alt: file?.file?.name }),
                        react_1.default.createElement(material_1.Typography, null, file?.file?.name),
                        react_1.default.createElement(material_1.IconButton, { type: "button", onClick: () => removeFile(index) },
                            react_1.default.createElement(index_1.Icons.Close, null))));
                })[0],
                !!files?.length && files?.length > 1 && react_1.default.createElement(material_1.Typography, null,
                    "+",
                    files?.length - 1),
                react_1.default.createElement(material_1.Box, { className: classes.emptyValue, style: !!files?.length ? { width: "auto" } : {} },
                    react_1.default.createElement(index_1.Icons.CloudUploadOutlined, null),
                    !files?.length && react_1.default.createElement(material_1.Typography, null, props.placeholder || name || "default"),
                    react_1.default.createElement(material_1.TextField, { name: name || "default", type: "file", onChange: changeValue, label: props?.label ? props?.label : (name || "default"), inputProps: { ...props.inputProps, multiple: multiple }, ...props }))) :
            react_1.default.createElement(react_1.default.Fragment, null, files && !!Object.keys(files)?.length ?
                react_1.default.createElement(material_1.Box, { className: classes.imageBox },
                    react_1.default.createElement("img", { src: files?.image, alt: files?.file?.name }),
                    react_1.default.createElement(material_1.Typography, null, files?.file?.name),
                    react_1.default.createElement(material_1.IconButton, { type: "button", onClick: removeFile },
                        react_1.default.createElement(index_1.Icons.Close, null))) :
                react_1.default.createElement(material_1.Box, { className: classes.emptyValue },
                    react_1.default.createElement(index_1.Icons.CloudUploadOutlined, null),
                    react_1.default.createElement(material_1.Typography, null, props.placeholder || name || "default"),
                    react_1.default.createElement(material_1.TextField, { name: name || "default", type: "file", onChange: changeValue, label: props?.label ? props?.label : (name || "default"), inputProps: { ...props.inputProps, multiple: multiple }, ...props })))),
        helperText && react_1.default.createElement(material_1.FormHelperText, { className: classes.error }, helperText)));
};
exports.Upload = Upload;
//# sourceMappingURL=index.js.map