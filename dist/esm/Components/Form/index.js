var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
// React Hook Form
import { useForm, FormProvider } from "react-hook-form";
// Request
import { Request } from "../../Services";
// Material UI
import { Grid, Button } from "@mui/material";
// Components
import { Input } from "../Input";
import { Switch } from "../Switch";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { DatePicker } from "../DatePicker";
// Styles
import useStyles from "./theme";
export const Form = (_a) => {
    var { name, mode, getForm, schema, dataSource, onSubmit, onSubmitClear, setModal, dispatch, onSuccess, style, children } = _a, props = __rest(_a, ["name", "mode", "getForm", "schema", "dataSource", "onSubmit", "onSubmitClear", "setModal", "dispatch", "onSuccess", "style", "children"]);
    const { classes } = useStyles();
    const Methods = useForm();
    const Data = (dataSource && dataSource.staticData) ? Object.assign({}, dataSource.staticData) : {};
    // Use Form
    getForm && getForm(Methods);
    // On Form Submit
    const onFormSubmit = (submitData) => {
        onSubmit && onSubmit(submitData);
        if (dataSource) {
            Request({ dataSource, mode,
                data: name ? { [name]: submitData } : submitData,
                apiUrlId: dataSource.primaryKey ? Data[dataSource.primaryKey] : Data.id,
                callBack: (data) => {
                    onSubmitClear && Methods.reset();
                    onSuccess && onSuccess(data);
                    setModal && setModal(false);
                }, dispatch }).then();
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(FormProvider, Object.assign({}, Methods),
            React.createElement("form", Object.assign({ className: classes.root, onSubmit: Methods.handleSubmit(onFormSubmit), style: style }, props),
                React.createElement(Grid, { container: true, spacing: 2 },
                    schema && !!(schema === null || schema === void 0 ? void 0 : schema.length) && schema.map((field, index) => {
                        var _a, _b, _c, _d, _e, _f;
                        switch ((_a = field.component) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
                            case "date":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })),
                                        React.createElement(DatePicker, Object.assign({ fullWidth: true, name: field.field }, field.componentProps, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_b = field === null || field === void 0 ? void 0 : field.componentProps) === null || _b === void 0 ? void 0 : _b.value) }))));
                            case "input":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })),
                                        React.createElement(Input, Object.assign({ fullWidth: true, name: field.field }, field.componentProps, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_c = field === null || field === void 0 ? void 0 : field.componentProps) === null || _c === void 0 ? void 0 : _c.value) }))));
                            case "switch":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })),
                                        React.createElement(Switch, Object.assign({ name: field.field }, field.componentProps, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_d = field === null || field === void 0 ? void 0 : field.componentProps) === null || _d === void 0 ? void 0 : _d.value) }))));
                            case "checkbox":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })),
                                        React.createElement(Checkbox, Object.assign({ name: field.field }, field.componentProps, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_e = field === null || field === void 0 ? void 0 : field.componentProps) === null || _e === void 0 ? void 0 : _e.value) }))));
                            case "select":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.componentMedia ? field.componentMedia : { md: 12, lg: 12 })),
                                        React.createElement(Select, Object.assign({ name: field.field }, field.componentProps, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_f = field === null || field === void 0 ? void 0 : field.componentProps) === null || _f === void 0 ? void 0 : _f.value) }))));
                            default:
                                return null;
                        }
                    }),
                    children,
                    !(children) &&
                        React.createElement(Grid, { item: true, md: 12, lg: 12 },
                            React.createElement(Button, { fullWidth: true, type: 'submit', variant: 'outlined' }, "Submit")))))));
};
//# sourceMappingURL=index.js.map