import React, { FC, useState, useReducer, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, TextField, TextFieldProps, FormHelperText, Typography, IconButton } from "@mui/material";

// Coject
import { Icons } from "../../index";

// Styles
import useStyles from "./theme";

// Interfaces
type iUpload = Omit<TextFieldProps, "onChange" | "helperText"> & {
    name?: string;
    onChange?: any;
    onRemove?: any;
    multiple?: boolean;
    helperText?: string;
    value?: string | string[];
}

export const Upload: FC<iUpload> = ({ value, name, helperText, multiple, onChange, onRemove, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ files, setFiles ] = useState<any>(multiple ? [] : {});
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const { setValue, control } = useFormContext() || {};

    // Set Value
    useEffect(() => {
        if (value) {
            if (multiple && value instanceof Array) {
                for (let index = 0; index < value.length; index++) {
                    const fileName: string[] = value[index]?.split("/");
                    setFiles((prev: any) => [...prev, {image: value[index], file: {name: fileName[fileName?.length - 1]}}]);
                }
            } else {
                const fileName: string[] = !(value instanceof Array) ? value?.split("/") : [];
                setFiles({image: value, file: {name: fileName[fileName?.length - 1]}});
            }
        }
    }, [value]);

    // Change Value
    const changeValue = (event: any) => {
        const multiFiles: any[] = [];
        for (let index = 0; index < Object.keys(event.target.files).length; index++) {
            multiFiles.push(event.target.files[index])
        }
        onChange && onChange((multiple ? ([...(files?.map((file: any) => !(file instanceof Object) && file.file)), ...multiFiles].filter(Boolean)) : event.target.files[0]), Methods);
        control && setValue(name || "default", multiple ? ([...(files?.map((file: any) => !(file instanceof Object) && file.file)), ...multiFiles].filter(Boolean)) : event.target.files[0]);
        if ( event.target.files.length > 0 ) {
            for ( let Index = 0; Index < event.target.files.length; Index++ ) {
                const Reader = new FileReader();
                Reader.readAsDataURL(event.target.files[Index]);
                Reader.onload = () => setFiles((prev: any) => multiple ? [...prev, {file: event.target.files[Index], image: Reader.result}] : {file: event.target.files[Index], image: Reader.result});
            }
        }
    }

    // Remove File
    const removeFile = (index: any) => {
        const filesValue = files;
        const file = multiple && filesValue[index];
        onRemove && onRemove(multiple ? file : filesValue);
        file && filesValue?.splice(file, 1);
        setFiles(multiple ? filesValue : {});
        onChange && onChange(multiple ? filesValue?.map((fileValue: any) => !Object.keys(fileValue.file)?.length && fileValue.file).filter(Boolean) : {}, Methods);
        control && setValue(name || "default", multiple ? filesValue?.map((fileValue: any) => !Object.keys(fileValue.file)?.length && fileValue.file).filter(Boolean) : {});
        forceUpdate();
    }

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
            { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
        </React.Fragment>
    );
};