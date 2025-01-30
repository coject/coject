import React, { useState, useEffect, useReducer } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, Grid, FormHelperText, TextField, Typography, IconButton } from "@mui/material";
// Coject
import { Icons, Modal } from "../index";
// Styles
import useStyles from "./theme";
export const Upload = ({ value, name, setFile, multiple, onChange, onRemove, required, label, imageWidth, disabled, imageHeight, imagePath, placeholder, validateText, error }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [files, setFiles] = useState([]);
    const [viewer, setViewer] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [viewerType, setViewerType] = useState(false);
    const [initValue, setInitValue] = useState([]);
    const element = document.getElementsByName(name || "default")[0];
    const { setValue, setError, clearErrors, formState: { errors } } = useFormContext() || {};
    // Reset Files
    useEffect(() => {
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
    useEffect(() => {
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
    useEffect(() => {
        if (required)
            (!!initValue?.length || !!files?.length) ? clearErrors(name || "default") : setError(name || "default", { type: "required", message: "This Field Is Required" });
    }, [required, files, initValue]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} coject_upload` },
            label && React.createElement("label", null, label),
            React.createElement(Box, { className: `${classes.container} ${((errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"])) ? classes.error : ""}` },
                React.createElement(Grid, { spacing: 1, container: true },
                    !!files?.length && files.map((file, index) => (React.createElement(Grid, { key: index, xs: (imageWidth?.xs ? imageWidth.xs : 12), sm: (imageWidth?.sm ? imageWidth.sm : 12), md: (imageWidth?.md ? imageWidth.md : 12), lg: (imageWidth?.lg ? imageWidth.lg : 12), item: true },
                        React.createElement(Box, { className: classes.file, style: { height: imageHeight ? `${imageHeight}px` : "80px" } },
                            file?.file?.type === "application/pdf" ? React.createElement(Icons.PictureAsPdfOutlined, null)
                                : file?.file?.type === "image/png" ? React.createElement("img", { src: file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" })
                                    : file?.file?.type === "image/jpg" ? React.createElement("img", { src: file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" })
                                        : file?.file?.type === "image/jpeg" ? React.createElement("img", { src: file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" })
                                            : React.createElement(Icons.ArticleOutlined, null),
                            React.createElement(Box, { className: classes.remove },
                                React.createElement(Box, { onClick: () => {
                                        setViewer(file.image);
                                        setViewerType(file.file.type);
                                    }, className: classes.viewer }),
                                React.createElement(IconButton, { onClick: () => removeFile(index) },
                                    React.createElement(Icons.Close, null))))))),
                    !!initValue?.length && initValue.map((file, index) => (React.createElement(Grid, { key: index, xs: (imageWidth?.xs ? imageWidth.xs : 12), sm: (imageWidth?.sm ? imageWidth.sm : 12), md: (imageWidth?.md ? imageWidth.md : 12), lg: (imageWidth?.lg ? imageWidth.lg : 12), item: true },
                        React.createElement(Box, { className: classes.file, style: { height: imageHeight ? `${imageHeight}px` : "80px" } },
                            React.createElement("img", { src: imagePath ? file[`${imagePath}`] : file || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg", alt: "File" }),
                            React.createElement(Box, { className: classes.remove },
                                React.createElement(Box, { onClick: () => setViewer(imagePath ? file[`${imagePath}`] : file), className: classes.viewer }),
                                React.createElement(IconButton, { onClick: () => removeInitFile(index) },
                                    React.createElement(Icons.Close, null))))))),
                    ((!multiple && !(files?.length) && !(initValue?.length)) || multiple) &&
                        React.createElement(Grid, { xs: true, sm: true, md: true, lg: true, item: true },
                            React.createElement(Box, { className: classes.inputContainer, style: { height: imageHeight ? `${imageHeight}px` : "80px" } },
                                React.createElement(Icons.BackupOutlined, null),
                                React.createElement(Typography, null, placeholder ? placeholder : "Upload Your Files"),
                                React.createElement(TextField, { autoComplete: "off", name: name || "default", type: "file", onChange: fileChange, ...(disabled ? { disabled } : {}), inputProps: { multiple: multiple } }))))),
            viewer &&
                React.createElement(Modal, { open: !!viewer, setOpen: setViewer, title: "File Preview" },
                    React.createElement(Box, { className: classes.file },
                        viewerType === "application/pdf" ? React.createElement(Icons.PictureAsPdfOutlined, null)
                            : viewerType === "image/png" ? React.createElement("img", { className: classes.imageViewer, src: viewer, alt: "File", style: { display: "block" } })
                                : viewerType === "image/jpg" ? React.createElement("img", { className: classes.imageViewer, src: viewer, alt: "File", style: { display: "block" } })
                                    : viewerType === "image/jpeg" ? React.createElement("img", { className: classes.imageViewer, src: viewer, alt: "File", style: { display: "block" } })
                                        : React.createElement(Icons.ArticleOutlined, null),
                        React.createElement(Box, { className: classes.download },
                            React.createElement(IconButton, { href: viewer, download: "file" },
                                React.createElement(Icons.SaveOutlined, null))))),
            (errors && errors[name || "default"]) ? React.createElement(FormHelperText, null, validateText ? validateText : "This Field Is Required") : ((error?.errors && error?.errors[name || "default"]) ? React.createElement(FormHelperText, null, error.errors[name || "default"][0]) : ""))));
};
//# sourceMappingURL=index.js.map