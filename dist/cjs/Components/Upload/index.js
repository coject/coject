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
const Upload = ({ value, name, helperText, multiple, onChange, onRemove, required, validation, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const [files, setFiles] = (0, react_1.useState)();
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const [, forceUpdate] = (0, react_1.useReducer)(x => x + 1, 0);
    const { setValue, control, getValues, watch, setError, clearErrors, formState: { errors } } = (0, react_hook_form_1.useFormContext)() || {};
    // Methods Watching
    (0, react_1.useEffect)(() => {
        if (control) {
            !getValues(name || "default") && setFiles(undefined);
            // if (getValues(name || "default")) {
            //     if (getValues(name || "default") instanceof Array) {
            //         for (let index = 0; index < getValues(name || "default").length; index++) {
            //             const Reader = new FileReader();
            //             Reader.readAsDataURL(getValues(name || "default")[index]);
            //             Reader.onload = () => setFiles((prev: any) => [...(prev ? prev : []), {file: getValues(name || "default")[index], image: Reader.result}]);
            //         }
            //     } else {
            //         const Reader = new FileReader();
            //         Reader.readAsDataURL(getValues(name || "default"));
            //         Reader.onload = () => setFiles({file: getValues(name || "default"), image: Reader.result});
            //     }
            // } else setFiles(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);
    // Set Value
    (0, react_1.useEffect)(() => {
        if (value) {
            if (multiple && value instanceof Array) {
                for (let index = 0; index < value.length; index++) {
                    setFiles((prev) => [...(prev ? prev : []), { image: value[index]?.image, file: { name: value[index]?.name } }]);
                }
            }
            else {
                setFiles({ image: value?.image, file: { name: value?.name } });
            }
        }
    }, [value, multiple]);
    // Change Value
    const changeValue = (event) => {
        const multiFiles = [];
        for (let index = 0; index < Object.keys(event.target.files).length; index++) {
            multiFiles.push(event.target.files[index]);
        }
        if (event.target.files.length > 0) {
            for (let Index = 0; Index < event.target.files.length; Index++) {
                const Reader = new FileReader();
                Reader.readAsDataURL(event.target.files[Index]);
                Reader.onload = () => setFiles((prev) => multiple ? [...(prev ? prev : []), { file: event.target.files[Index], image: Reader.result }] : { file: event.target.files[Index], image: Reader.result });
            }
        }
        onChange && onChange((multiple ? ([...(files ? files.map((file) => file.file) : []), ...multiFiles].filter((file) => file?.type)) : event.target.files[0]), Methods);
        control && setValue(name || "default", multiple ? ([...(files ? files.map((file) => file.file) : []), ...multiFiles].filter((file) => file?.type)) : event.target.files[0]);
    };
    // Remove File
    const removeFile = (index) => {
        const filesValue = files;
        const file = multiple && filesValue[index];
        onRemove && onRemove(multiple ? file : filesValue);
        file && filesValue?.splice(file, 1);
        setFiles(multiple ? (filesValue?.length ? filesValue : undefined) : undefined);
        onChange && onChange(multiple ? filesValue?.map((fileValue) => !Object.keys(fileValue.file)?.length && fileValue.file).filter(Boolean) : {}, Methods);
        control && setValue(name || "default", multiple ? filesValue?.map((fileValue) => !Object.keys(fileValue.file)?.length && fileValue.file).filter(Boolean) : {});
        const element = document.getElementsByName(name || "default")[0];
        try {
            element && (element.value = null);
        }
        catch (ex) { }
        if (element?.value) {
            element.parentNode.replaceChild(element.cloneNode(true), element);
        }
        forceUpdate();
    };
    // Error Handling
    (0, react_1.useEffect)(() => {
        const Required = (!!required || !!validation?.required) && !(files instanceof Array ? files?.length : (files instanceof Object && Object.keys(files).length));
        // Clear Errors
        if (!Required)
            clearErrors(name || "default");
        // Set Errors
        else {
            // Required
            if (Required)
                setError(name || "default", { type: "required", message: ((required?.toString() === "true") || (validation?.required?.toString() === "true")) ? "This Field Is Required" : `${required ? required : ""}${validation?.required ? validation?.required : ""}` });
        }
    }, [files, required, name, setError, clearErrors, validation]);
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
        (helperText || (errors && errors[name || "default"])) && react_1.default.createElement(material_1.FormHelperText, { className: classes.error },
            errors && errors[name || "default"]?.message,
            helperText && !(errors && errors[name || "default"]) && helperText)));
};
exports.Upload = Upload;
//# sourceMappingURL=index.js.map