import React, { useState, useReducer, useEffect } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, TextField, FormHelperText, Typography, IconButton } from "@mui/material";
// Coject
import { Icons } from "../index";
// Styles
import useStyles from "./theme";
export const Upload = ({ value, name, helperText, multiple, onChange, onRemove, required, validation, ...props }) => {
    const { classes } = useStyles();
    const [files, setFiles] = useState();
    const Methods = useFormContext() || {};
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const { setValue, control, getValues, watch, setError, clearErrors, formState: { errors } } = useFormContext() || {};
    // Methods Watching
    useEffect(() => {
        control && setFiles(getValues(name || "default") ? getValues(name || "default") : undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);
    // Set Value
    useEffect(() => {
        if (value) {
            if (multiple && value instanceof Array) {
                for (let index = 0; index < value.length; index++) {
                    setFiles((prev) => [...prev, { image: value[index]?.image, file: { name: value[index]?.name } }]);
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
        onChange && onChange((multiple ? ([...(files ? files.map((file) => !(file instanceof Object) && file.file) : []), ...multiFiles].filter(Boolean)) : event.target.files[0]), Methods);
        control && setValue(name || "default", multiple ? ([...(files ? files.map((file) => !(file instanceof Object) && file.file) : []), ...multiFiles].filter(Boolean)) : event.target.files[0]);
        if (event.target.files.length > 0) {
            for (let Index = 0; Index < event.target.files.length; Index++) {
                const Reader = new FileReader();
                Reader.readAsDataURL(event.target.files[Index]);
                Reader.onload = () => setFiles((prev) => multiple ? [...(prev ? prev : []), { file: event.target.files[Index], image: Reader.result }] : { file: event.target.files[Index], image: Reader.result });
            }
        }
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
    useEffect(() => {
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
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root }, multiple ?
            React.createElement(React.Fragment, null,
                !!files?.length && files.map((file, index) => {
                    return (React.createElement(Box, { key: index, className: `${classes.imageBox} ${classes.multiImageBox} ${files?.length > 1 ? classes.moreMultiImageBox : ""}` },
                        React.createElement("img", { src: file?.image, alt: file?.file?.name }),
                        React.createElement(Typography, null, file?.file?.name),
                        React.createElement(IconButton, { type: "button", onClick: () => removeFile(index) },
                            React.createElement(Icons.Close, null))));
                })[0],
                !!files?.length && files?.length > 1 && React.createElement(Typography, null,
                    "+",
                    files?.length - 1),
                React.createElement(Box, { className: classes.emptyValue, style: !!files?.length ? { width: "auto" } : {} },
                    React.createElement(Icons.CloudUploadOutlined, null),
                    !files?.length && React.createElement(Typography, null, props.placeholder || name || "default"),
                    React.createElement(TextField, { name: name || "default", type: "file", onChange: changeValue, label: props?.label ? props?.label : (name || "default"), inputProps: { ...props.inputProps, multiple: multiple }, ...props }))) :
            React.createElement(React.Fragment, null, files && !!Object.keys(files)?.length ?
                React.createElement(Box, { className: classes.imageBox },
                    React.createElement("img", { src: files?.image, alt: files?.file?.name }),
                    React.createElement(Typography, null, files?.file?.name),
                    React.createElement(IconButton, { type: "button", onClick: removeFile },
                        React.createElement(Icons.Close, null))) :
                React.createElement(Box, { className: classes.emptyValue },
                    React.createElement(Icons.CloudUploadOutlined, null),
                    React.createElement(Typography, null, props.placeholder || name || "default"),
                    React.createElement(TextField, { name: name || "default", type: "file", onChange: changeValue, label: props?.label ? props?.label : (name || "default"), inputProps: { ...props.inputProps, multiple: multiple }, ...props })))),
        (helperText || (errors && errors[name || "default"])) && React.createElement(FormHelperText, { className: classes.error },
            errors && errors[name || "default"]?.message,
            helperText && !(errors && errors[name || "default"]) && helperText)));
};
//# sourceMappingURL=index.js.map