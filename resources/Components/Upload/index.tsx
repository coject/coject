import React, { FC, useState, useEffect, useReducer } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { Box, Grid, FormHelperText, TextField, Typography, IconButton, TextFieldProps } from "@mui/material";

// Coject
import { Icons, Modal } from "../index";

// Styles
import useStyles from "./theme";

// Interfaces
type iUpload = Omit<TextFieldProps, "onChange"> & {
    error?: any;
    name?: string;
    setFile?: any;
    label?: string;
    onChange?: any;
    onRemove?: any;
    disabled?: boolean;
    multiple?: boolean;
    imagePath?: string;
    value?: any | any[];
    imageHeight?: number;
    placeholder?: string;
    validateText?: string;
    required?: boolean | string;
    imageWidth?: { lg?: number, md?: number, sm?: number, xs?: number };
}

export const Upload: FC<iUpload> = ({ value, name, setFile, multiple, onChange, onRemove, required, label, imageWidth, disabled, imageHeight, imagePath, placeholder, validateText, error }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ files, setFiles ] = useState<any>([]);
    const [ viewer, setViewer ] = useState<any>(false);
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const [ viewerType, setViewerType ] = useState<any>(false);
    const [ initValue, setInitValue ] = useState<string[]>([]);
    const element: any = document.getElementsByName(name || "default")[0];
    const { setValue, setError, clearErrors, formState: { errors } } = useFormContext() || {};

    // Reset Files
    useEffect(() => {
        setFile && setFiles(setFile);
        setFile && setValue(name || "default", setFile);
    }, [setFile]);

    // Clear Files History
    const clearHistory = () => {
        try {element && (element.value = null)} catch(ex) { }
        if (element?.value) {element.parentNode.replaceChild(element.cloneNode(true), element)}
    }

    // Initial Value
    useEffect(() => {
        if (value) {
            if (multiple && value instanceof Array) {
                const images: any[] = [];
                for (let index = 0; index < value.length; index++) {
                    images.push(value[index]);
                }
                setInitValue(images);
            } else setInitValue([value]);
        }
    }, [value]);

    // File Change
    const fileChange = (event: any) => {
        const newFiles: any[] = [];
        for (let index = 0; index < Object.keys(event.target.files).length; index++) {
            newFiles.push(event.target.files[index])
        }
        if ( event.target.files.length > 0 ) {
            for ( let index = 0; index < event.target.files.length; index++ ) {
                const Reader = new FileReader();
                Reader.readAsDataURL(event.target.files[index]);
                Reader.onload = () => setFiles((prev: any) => ([...(multiple ? prev : []), {file: event.target.files[index], image: Reader.result}]));
            }
        }
        if (!multiple) setInitValue([]);
        onChange && onChange((multiple ? [...(files?.map((file: any) => file.file)), ...newFiles] : event.target.files[0]), Methods);
        setValue(name || "default", (multiple ? [...(files?.map((file: any) => file.file)), ...newFiles] : event.target.files[0]));
    };

    // File Remove
    const removeFile = (index: number) => {
        const allFiles = files;
        allFiles.splice(index, 1);
        setFiles(!!allFiles?.length ? allFiles : []);
        onChange && onChange(!!allFiles?.length ? (multiple ? (allFiles.map((file: any) => file.file)) : allFiles[0].file) : undefined);
        setValue(name || "default", !!allFiles?.length ? (multiple ? (allFiles.map((file: any) => file.file)) : allFiles[0].file) : undefined);
        clearHistory();
        forceUpdate();
    }

    // Initial File Remove
    const removeInitFile = (index: number) => {
        onRemove && onRemove(initValue[index]);
        const allFiles = initValue;
        allFiles.splice(index, 1);
        setInitValue(!!allFiles?.length ? allFiles : []);
        forceUpdate();
    }

    // Error Handling
    useEffect(() => {
        if (required) (!!initValue?.length || !!files?.length) ? clearErrors(name || "default") : setError(name || "default", {type: "required", message: "This Field Is Required"});
    }, [required, files, initValue]);

    return (
        <React.Fragment>
            <Box className={`${classes.root} coject_upload`}>
                {label && <label>{label}</label>}
                <Box className={`${classes.container} ${((errors && errors[name || "default"]) || (error?.errors && error?.errors[name || "default"])) ? classes.error : ""}`}>
                    <Grid spacing={1} container>
                        { !!files?.length && files.map((file: any, index: number) => (
                            <Grid key={index} xs={(imageWidth?.xs ? imageWidth.xs : 12)} sm={(imageWidth?.sm ? imageWidth.sm : 12)} md={(imageWidth?.md ? imageWidth.md : 12)} lg={(imageWidth?.lg ? imageWidth.lg : 12)} item>
                                <Box className={classes.file} style={{ height: imageHeight ? `${imageHeight}px` : "80px" }}>
                                    { file?.file?.type === "application/pdf" ? <Icons.PictureAsPdfOutlined />
                                        : file?.file?.type === "image/png" ? <img src={file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"} alt={"File"}/>
                                        : file?.file?.type === "image/jpg" ? <img src={file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"} alt={"File"}/>
                                        : file?.file?.type === "image/jpeg" ? <img src={file?.image || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"} alt={"File"}/>
                                        : <Icons.ArticleOutlined />
                                    }
                                    <Box className={classes.remove}>
                                        <Box onClick={() => {
                                            setViewer(file.image);
                                            setViewerType(file.file.type);
                                        }} className={classes.viewer} />
                                        <IconButton onClick={() => removeFile(index)}><Icons.Close /></IconButton>
                                    </Box>
                                </Box>
                            </Grid>
                        )) }
                        { !!initValue?.length && initValue.map((file: any, index: number) => (
                            <Grid key={index} xs={(imageWidth?.xs ? imageWidth.xs : 12)} sm={(imageWidth?.sm ? imageWidth.sm : 12)} md={(imageWidth?.md ? imageWidth.md : 12)} lg={(imageWidth?.lg ? imageWidth.lg : 12)} item>
                                <Box className={classes.file} style={{ height: imageHeight ? `${imageHeight}px` : "80px" }}>
                                    <img src={imagePath ? file[`${imagePath}`] : file || "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg"} alt={"File"}/>
                                    <Box className={classes.remove} style={{display: disabled ? 'none' : ''}}>
                                        <Box onClick={() => setViewer(imagePath ? file[`${imagePath}`] : file)} className={classes.viewer} />
                                        <IconButton onClick={() => removeInitFile(index)}><Icons.Close /></IconButton>
                                    </Box>
                                </Box>
                            </Grid>
                        )) }
                        { ((!multiple && !(files?.length) && !(initValue?.length)) || multiple) &&
                            <Grid xs sm md lg item>
                                <Box className={classes.inputContainer} style={{ height: imageHeight ? `${imageHeight}px` : "80px" }}>
                                    <Icons.BackupOutlined />
                                    <Typography>{placeholder ? placeholder : "Upload Your Files"}</Typography>
                                    <TextField autoComplete="off" name={name || "default"} type={"file"} onChange={fileChange} {...(disabled ? {disabled} : {})} inputProps={{multiple: multiple}} />
                                </Box>
                            </Grid>
                        }
                    </Grid>
                </Box>
                { viewer &&
                    <Modal open={!!viewer} setOpen={setViewer} title={"File Preview"}>
                        <Box className={classes.file}>
                            { viewerType === "application/pdf" ? <Icons.PictureAsPdfOutlined />
                                : viewerType === "image/png" ? <img className={classes.imageViewer} src={viewer} alt={"File"} style={{display: "block"}} />
                                : viewerType === "image/jpg" ? <img className={classes.imageViewer} src={viewer} alt={"File"} style={{display: "block"}} />
                                : viewerType === "image/jpeg" ? <img className={classes.imageViewer} src={viewer} alt={"File"} style={{display: "block"}} />
                                : <Icons.ArticleOutlined />
                            }
                            <Box className={classes.download}>
                                <IconButton href={viewer} download={"file"}><Icons.SaveOutlined /></IconButton>
                            </Box>
                        </Box>
                    </Modal>
                }
                {(errors && errors[name || "default"]) ? <FormHelperText>{validateText ? validateText : "This Field Is Required"}</FormHelperText> : ((error?.errors && error?.errors[name || "default"]) ? <FormHelperText>{error.errors[name || "default"][0]}</FormHelperText> : "")}
            </Box>
        </React.Fragment>
    );
};