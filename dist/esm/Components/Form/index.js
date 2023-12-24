import React from "react";
// React Hook Form
import { useForm, FormProvider } from "react-hook-form";
// Request
import { Request } from "../../Services";
// Material UI
import { Grid, Button } from "@mui/material";
// Coject
import { Input, Switch, Select, Checkbox, DatePicker } from "../index";
// Styles
import useStyles from "./theme";
export const Form = ({ name, mode, getForm, schema, dataSource, onSubmit, onSubmitClear, setModal, dispatch, onSuccess, noRequest, style, children, ...props }) => {
    const { classes } = useStyles();
    const Methods = useForm();
    const Data = (dataSource && dataSource.staticData) ? { ...dataSource.staticData } : {};
    // Use Form
    getForm && getForm(Methods);
    // On Form Submit
    const onFormSubmit = (submitData) => {
        onSubmit && onSubmit(submitData);
        if (dataSource && !noRequest) {
            Request({ dataSource, mode,
                data: name ? { [name]: submitData } : submitData,
                apiUrlId: dataSource.primaryKey ? Data[dataSource.primaryKey] : Data.id,
                callBack: (data) => {
                    setModal && setModal(false);
                    onSuccess && onSuccess(data);
                    onSubmitClear && Methods.reset();
                }, dispatch }).then();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(FormProvider, { ...Methods },
            React.createElement("form", { className: classes.root, onSubmit: Methods.handleSubmit(onFormSubmit), style: style, ...props },
                schema &&
                    React.createElement(Grid, { container: true, spacing: 2 },
                        schema && !!schema?.length && schema.map((field, index) => {
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
                                default:
                                    return null;
                            }
                        }),
                        !(children) &&
                            React.createElement(Grid, { item: true, xs: 12, sm: 12, md: 12, lg: 12 },
                                React.createElement(Button, { fullWidth: true, type: "submit", variant: "outlined" }, "Submit"))),
                children))));
};
//# sourceMappingURL=index.js.map