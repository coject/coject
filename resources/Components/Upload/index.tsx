import React, { FC, useState, useReducer, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, TextField, TextFieldProps, FormHelperText, Typography, IconButton } from "@mui/material";

// Coject
import { Icons } from "../index";

// Styles
import useStyles from "./theme";

// Interfaces
type iUpload = Omit<TextFieldProps, "onChange" | "helperText"> & {
    value?: any;
    name?: string;
    onChange?: any;
    onRemove?: any;
    validation?: {
        required?: boolean | string;
    };
    multiple?: boolean;
    helperText?: string;
    required?: boolean | string;
}

export const Upload: FC<iUpload> = ({ value, name, helperText, multiple, onChange, onRemove, required, validation, ...props }) => {
    const { classes } = useStyles();
    const [ files, setFiles ] = useState<any>();
    const Methods = useFormContext() || {};
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const { setValue, control, getValues, watch, setError, clearErrors, formState: { errors } } = useFormContext() || {};

    // Methods Watching
    useEffect(() => {
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
    useEffect(() => {
        if (value) {
            if (multiple && value instanceof Array) {
                for (let index = 0; index < value.length; index++) {
                    setFiles((prev: any) => [...(prev ? prev : []), {image: value[index]?.image, file: {name: value[index]?.name}}]);
                }
            } else {
                setFiles({image: value?.image, file: {name: value?.name}});
            }
        }
    }, [value, multiple]);

    // Change Value
    const changeValue = (event: any) => {
        const multiFiles: any[] = [];
        for (let index = 0; index < Object.keys(event.target.files).length; index++) {
            multiFiles.push(event.target.files[index])
        }
        if ( event.target.files.length > 0 ) {
            for ( let Index = 0; Index < event.target.files.length; Index++ ) {
                const Reader = new FileReader();
                Reader.readAsDataURL(event.target.files[Index]);
                Reader.onload = () => setFiles((prev: any) => multiple ? [...(prev ? prev : []), {file: event.target.files[Index], image: Reader.result}] : {file: event.target.files[Index], image: Reader.result});
            }
        }
        onChange && onChange((multiple ? ([...(files ? files.map((file: any) => file.file) : []), ...multiFiles].filter((file: any) => file?.type)) : event.target.files[0]), Methods);
        control && setValue(name || "default", multiple ? ([...(files ? files.map((file: any) => file.file) : []), ...multiFiles].filter((file: any) => file?.type)) : event.target.files[0]);
    }

    // Remove File
    const removeFile = (index: any) => {
        const filesValue = files;
        const file = multiple && filesValue[index];
        onRemove && onRemove(multiple ? file : filesValue);
        file && filesValue?.splice(file, 1);
        setFiles(multiple ? (filesValue?.length ? filesValue : undefined) : undefined);
        onChange && onChange(multiple ? filesValue?.map((fileValue: any) => !Object.keys(fileValue.file)?.length && fileValue.file).filter(Boolean) : {}, Methods);
        control && setValue(name || "default", multiple ? filesValue?.map((fileValue: any) => !Object.keys(fileValue.file)?.length && fileValue.file).filter(Boolean) : {});
        const element: any = document.getElementsByName(name || "default")[0];
        try { element && (element.value = null) } catch(ex) { }
        if (element?.value) { element.parentNode.replaceChild(element.cloneNode(true), element) }
        forceUpdate();
    }

    // Error Handling
    useEffect(() => {
        const Required: boolean = (!!required || !!validation?.required) && !(files instanceof Array ? files?.length : (files instanceof Object && Object.keys(files).length));

        // Clear Errors
        if ( !Required ) clearErrors(name || "default");

        // Set Errors
        else {
            // Required
            if (Required) setError(name || "default", {type: "required", message: ((required?.toString() === "true") || (validation?.required?.toString() === "true")) ? "This Field Is Required" : `${required ? required : ""}${validation?.required ? validation?.required : ""}`});
        }
    }, [files, required, name, setError, clearErrors, validation])

    return (
        <React.Fragment>
            <Box className={classes.root}>
                { multiple ?
                    <React.Fragment>
                        { !!files?.length && files.map((file: any, index: number) => {
                            return (
                                <Box key={index} className={`${classes.imageBox} ${classes.multiImageBox} ${files?.length > 1 ? classes.moreMultiImageBox : ""}`}>
                                    <img src={file?.image} alt={file?.file?.name} />
                                    <Typography>{file?.file?.name}</Typography>
                                    <IconButton type={"button"} onClick={() => removeFile(index)}><Icons.Close /></IconButton>
                                </Box>
                            )
                        })[0] }
                        { !!files?.length && files?.length > 1 && <Typography>+{files?.length - 1}</Typography> }
                        <Box className={classes.emptyValue} style={!!files?.length ? {width: "auto"} : {}}>
                            <Icons.CloudUploadOutlined />
                            { !files?.length && <Typography>{props.placeholder || name || "default"}</Typography> }
                            <TextField name={name || "default"} type={"file"} onChange={changeValue} label={props?.label ? props?.label : (name || "default")} inputProps={{...props.inputProps, multiple: multiple}} {...props} />
                        </Box>
                    </React.Fragment> :
                    <React.Fragment>
                        { files && !!Object.keys(files)?.length ?
                            <Box className={classes.imageBox}>
                                <img src={files?.image} alt={files?.file?.name} />
                                <Typography>{files?.file?.name}</Typography>
                                <IconButton type={"button"} onClick={removeFile}><Icons.Close /></IconButton>
                            </Box> :
                            <Box className={classes.emptyValue}>
                                <Icons.CloudUploadOutlined />
                                <Typography>{props.placeholder || name || "default"}</Typography>
                                <TextField name={name || "default"} type={"file"} onChange={changeValue} label={props?.label ? props?.label : (name || "default")} inputProps={{...props.inputProps, multiple: multiple}} {...props} />
                            </Box>
                        }
                    </React.Fragment>
                }
            </Box>
            { (helperText || (control && errors && errors[name || "default"])) && <FormHelperText className={classes.error}>{control && errors && errors[name || "default"]?.message as string}{helperText && !(control && errors && errors[name || "default"]) && helperText}</FormHelperText> }
        </React.Fragment>
    );
};