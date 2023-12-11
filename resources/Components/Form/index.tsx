import React, { FC } from "react";

// React Hook Form
import { useForm, FormProvider } from "react-hook-form";

// Request
import { Request } from "../../Services";

// Material UI
import { Grid, Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

// Components
import { Input } from "../Input";
import { Switch } from "../Switch";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { DatePicker } from "../DatePicker";

// Styles
import useStyles from "./theme";

// Interface
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
}

interface iForm {
    style?: any;
    mode?: string;
    name?: string;
    getForm?: any;
    onSubmit?: any;
    children?: any;
    dispatch?: any;
    setModal?: any;
    onSuccess?: any;
    dataSource?: any;
    schema?: iSchema | any;
    onSubmitClear?: boolean;
}

export const Form: FC<iForm> = ({ name, mode, getForm, schema, dataSource, onSubmit, onSubmitClear, setModal, dispatch, onSuccess, style, children, ...props }) => {
    const { classes } = useStyles();
    const Methods = useForm();
    const Data = ( dataSource && dataSource.staticData ) ? { ...dataSource.staticData } : {};

    // Use Form
    getForm && getForm(Methods);

    // On Form Submit
    const onFormSubmit = (submitData: any) => {
        onSubmit && onSubmit(submitData);

        if (dataSource) {
            Request({ dataSource, mode,
                data: name ? { [name]: submitData } : submitData,
                apiUrlId: dataSource.primaryKey ? Data[dataSource.primaryKey] : Data.id,
                callBack: (data: any) => {
                    onSubmitClear && Methods.reset();
                    onSuccess && onSuccess(data);
                    setModal && setModal(false);
                }, dispatch }).then();
        }
    };

    return (
        <React.Fragment>
            <FormProvider {...Methods}>
                <form className={classes.root} onSubmit={Methods.handleSubmit(onFormSubmit)} style={style} {...props}>
                    <Grid container spacing={2}>
                        { schema && !!schema?.length && schema.map((field: any, index: number) => {
                            switch (field.component?.toLowerCase()) {
                                case "date":
                                    return field.actionTemplate
                                        ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                        : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })}><DatePicker fullWidth name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                case "input":
                                    return field.actionTemplate
                                        ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                        : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })}><Input fullWidth name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                case "switch":
                                    return field.actionTemplate
                                        ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                        : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })}><Switch name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                case "checkbox":
                                    return field.actionTemplate
                                        ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                        : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })}><Checkbox name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                case "select":
                                    return field.actionTemplate
                                        ? ( <React.Fragment key={index}>{field.actionTemplate(field)}</React.Fragment> )
                                        : ( <Grid item key={index} {...(field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })}><Select name={field.field} {...field.componentProps} value={Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value)} /></Grid> );
                                default:
                                    return null;
                            }
                        })}
                        { children }
                        { !(children) &&
                            <Grid item md={12} lg={12}><Button fullWidth type='submit' variant='outlined'>Submit</Button></Grid>
                        }
                    </Grid>
                </form>
            </FormProvider>
        </React.Fragment>
    );
};