import React, { useState, useReducer } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Material UI
import { Box, TextField, FormHelperText, Typography, IconButton } from "@mui/material";
// Coject
import { Icons } from "../index";
// Styles
import useStyles from "./theme";
export const Upload = ({ name, helperText, multiple, onChange, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [files, setFiles] = useState(multiple ? [] : {});
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const { setValue, control } = useFormContext() || {};
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
        helperText && React.createElement(FormHelperText, { className: classes.error }, helperText)));
};
//# sourceMappingURL=index.js.map