import React, { FC, ReactNode } from 'react';

// React Hook Form
import { useForm, FormProvider } from "react-hook-form";

// Request
import { Request } from "../../Services";

// Material UI
import { Grid, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

// Coject
import { Input, Switch, Select, Checkbox, DatePicker, Upload } from "../index";

// Styles
import useStyles from "./theme";

// Interface
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
}

interface iDataSource {
    name?: string;
    headers?: any;
    apiUrl?: string;
    baseUrl?: string;
    requestData?: any;
    dataPath?: string;
    method?: "get" | "post" | "put" | "delete";
    create?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    update?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    delete?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
}

interface iForm {
    id?: string;
    getForm?: any;
    onSubmit?: any;
    dispatch?: any;
    setModal?: any;
    callback?: any;
    className?: any;
    staticData?: any;
    customKey?: string;
    noRequest?: boolean;
    children?: ReactNode;
    schema?: iSchema | any;
    invisibility?: string[];
    onSubmitClear?: boolean;
    dataSource?: iDataSource;
    localeText?: {
        submitButton?: string
    };
    mode?: "render" | "create" | "update" | "delete";
}

export const Form: FC<iForm> = ({ mode, id, getForm, schema, dataSource, localeText, className, staticData, customKey, onSubmit, onSubmitClear, setModal, dispatch, callback, noRequest, invisibility, children, ...props }) => {
    const Data = { ...(staticData ? staticData : {}) };
    const { classes } = useStyles();
    const Methods = useForm();

    // Use Form
    getForm && getForm(Methods);

    // On Form Submit
    const onFormSubmit = (submitData: any) => {
        onSubmit && onSubmit({...((mode === "update") ? Data : {}), ...submitData});

        if (dataSource && !noRequest) {
            Request({
                dataSource, mode,
                apiUrlId: customKey ? Data[customKey] : Data.id,
                data: { ...(dataSource?.requestData ? dataSource.requestData(submitData) : submitData) },
                callback: (data: any) => {
                    callback && callback(data);
                    setModal && setModal(false);
                    onSubmitClear && Methods.reset();
                }, dispatch
            }).then();
        }
    };

    return (
        <React.Fragment>
            <FormProvider {...Methods}>
                <form id={id} className={`${classes.root} ${className}`} onSubmit={Methods.handleSubmit(onFormSubmit)} {...props}>
                    { schema &&
                        <Grid container spacing={2}>
                            { schema && !!schema?.length && schema.map((field: any, index: number) => {
                                if (!(invisibility?.includes(field.field))) switch (field.component?.toLowerCase()) {
                                    case "date":
                                        return field.actionTemplate
                                            ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                            : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 })}><DatePicker fullWidth name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                    case "input":
                                        return field.actionTemplate
                                            ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                            : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 })}><Input fullWidth name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                    case "switch":
                                        return field.actionTemplate
                                            ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                            : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 })}><Switch name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                    case "checkbox":
                                        return field.actionTemplate
                                            ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                            : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 })}><Checkbox name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                    case "select":
                                        return field.actionTemplate
                                            ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                            : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 })}><Select fullWidth name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                    case "upload":
                                        return field.actionTemplate
                                            ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                            : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 })}><Upload name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                    default:
                                        return null;
                                }
                            })}
                            { children }
                            { !(children) &&
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button fullWidth type="submit" variant="outlined">{localeText?.submitButton || "Submit"}</Button>
                                </Grid>
                            }
                        </Grid>
                    }
                    { (children && !schema) && children }
                </form>
            </FormProvider>
        </React.Fragment>
    );
};