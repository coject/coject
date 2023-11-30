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
import { DatePicker } from "../DatePicker";
// Styles
import useStyles from "./theme";
export const Form = (_a) => {
    var { name, mode, getForm, schema, dataSource, onSubmit, onSubmitClear, setModal, dispatch, children } = _a, props = __rest(_a, ["name", "mode", "getForm", "schema", "dataSource", "onSubmit", "onSubmitClear", "setModal", "dispatch", "children"]);
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
                callBack: () => {
                    onSubmitClear && Methods.reset();
                    setModal && setModal(false);
                }, dispatch }).then();
        }
    };
    // Schema Fields
    const Fields = schema && !!schema.length && (schema === null || schema === void 0 ? void 0 : schema.map((Field) => Field.type));
    return (React.createElement(React.Fragment, null,
        React.createElement(FormProvider, Object.assign({}, Methods),
            React.createElement("form", Object.assign({ className: classes.root, onSubmit: Methods.handleSubmit(onFormSubmit) }, props),
                React.createElement(Grid, { container: true, spacing: 2 },
                    schema && !!(schema === null || schema === void 0 ? void 0 : schema.length) && schema.map((field, index) => {
                        var _a, _b, _c, _d, _e, _f, _g;
                        if ((_b = (_a = field === null || field === void 0 ? void 0 : field.props) === null || _a === void 0 ? void 0 : _a.cascade) === null || _b === void 0 ? void 0 : _b.parent) {
                            if (mode === "update")
                                field.props.cascade.parentValue = Data[field.props.cascade.parent];
                            if (mode === "create")
                                delete field.props.cascade.parentValue;
                        }
                        switch ((_c = field.component) === null || _c === void 0 ? void 0 : _c.toLowerCase()) {
                            case "input":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        React.createElement(Input, Object.assign({ fullWidth: true, name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_d = field === null || field === void 0 ? void 0 : field.props) === null || _d === void 0 ? void 0 : _d.value) }))));
                            case "switch":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        React.createElement(Switch, Object.assign({ name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_e = field === null || field === void 0 ? void 0 : field.props) === null || _e === void 0 ? void 0 : _e.value) }))));
                            case "select":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        React.createElement(Select, Object.assign({ name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_f = field === null || field === void 0 ? void 0 : field.props) === null || _f === void 0 ? void 0 : _f.value) }))));
                            case "datePicker":
                                return field.actionTemplate
                                    ? (React.createElement(React.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (React.createElement(Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        React.createElement(DatePicker, Object.assign({ name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_g = field === null || field === void 0 ? void 0 : field.props) === null || _g === void 0 ? void 0 : _g.value) }))));
                            default:
                                return null;
                        }
                    }),
                    children,
                    (schema && !!(schema === null || schema === void 0 ? void 0 : schema.length) && Fields.includes("button"))
                        ? schema.map((field, index) => {
                            if (field.type === "button") {
                                if (field.template) {
                                    return React.createElement(React.Fragment, { key: index }, field.template(Methods.getValues()));
                                }
                                else {
                                    return React.createElement(Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        React.createElement(Button, Object.assign({}, field.props), field.field));
                                }
                            }
                            else
                                return null;
                        })
                        : React.createElement(Grid, { item: true, md: 12, lg: 12 },
                            React.createElement(Button, { fullWidth: true, type: "submit", variant: "contained" }, "Save")))))));
};
//# sourceMappingURL=index.js.map