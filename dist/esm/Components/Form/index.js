import React from "react";
// React Hook Form
import { useForm, FormProvider } from "react-hook-form";
// Request
import { Request } from "../../Services";
// Material UI
import { Grid, Button } from "@mui/material";
// Coject
import { Input, Switch, Select, Checkbox, DatePicker, Upload, Scanner } from "../index";
// Styles
import useStyles from "./theme";
export const Form = ({ mode, id, getForm, schema, dataSource, localeText, className, staticData, customKey, onSubmit, onSubmitClear, setModal, dispatch, callback, onError, noRequest, invisibility, children, ...props }) => {
    const Data = { ...(staticData ? staticData : {}) };
    const { classes } = useStyles();
    const Methods = useForm();
    // Use Form
    getForm && getForm(Methods);
    // On Form Submit
    const onFormSubmit = (submitData) => {
        onSubmit && onSubmit({ ...((mode === "update") ? Data : {}), ...submitData });
        if (dataSource && !noRequest) {
            Request({
                dataSource, mode,
                apiUrlId: customKey ? Data[customKey] : Data.id,
                data: { ...(dataSource?.requestData ? dataSource.requestData(submitData) : submitData) },
                callback: (data) => {
                    callback && callback(data);
                    setModal && setModal(false);
                    onSubmitClear && Methods.reset();
                }, dispatch, onError
            }).then();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(FormProvider, { ...Methods },
            React.createElement("form", { id: id, className: `${classes.root} ${className} coject_form`, autoComplete: "off", onSubmit: Methods.handleSubmit(onFormSubmit), ...props },
                schema &&
                    React.createElement(Grid, { container: true, spacing: 2 },
                        schema && !!schema?.length && schema.map((field, index) => {
                            if (!(invisibility?.includes(field.field)))
                                switch (field.component?.toLowerCase()) {
                                    case "date":
                                        return field.actionTemplate
                                            ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (React.createElement(Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                React.createElement(DatePicker, { fullWidth: true, name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "input":
                                        return field.actionTemplate
                                            ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (React.createElement(Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                React.createElement(Input, { fullWidth: true, name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "switch":
                                        return field.actionTemplate
                                            ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (React.createElement(Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                React.createElement(Switch, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "checkbox":
                                        return field.actionTemplate
                                            ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (React.createElement(Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                React.createElement(Checkbox, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "select":
                                        return field.actionTemplate
                                            ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (React.createElement(Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                React.createElement(Select, { fullWidth: true, name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "upload":
                                        return field.actionTemplate
                                            ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (React.createElement(Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                React.createElement(Upload, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "scanner":
                                        return field.actionTemplate
                                            ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (React.createElement(Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                React.createElement(Scanner, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    default:
                                        return null;
                                }
                        }),
                        children,
                        !(children) &&
                            React.createElement(Grid, { item: true, xs: 12, sm: 12, md: 12, lg: 12 },
                                React.createElement(Button, { fullWidth: true, type: "submit", variant: "outlined" }, localeText?.submitButton || "Submit"))),
                (children && !schema) && children))));
};
//# sourceMappingURL=index.js.map