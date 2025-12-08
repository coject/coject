"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const react_1 = __importDefault(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Request
const Services_1 = require("../../Services");
// Material UI
const material_1 = require("@mui/material");
// Coject
const index_1 = require("../index");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Form = ({ mode, id, getForm, schema, dataSource, localeText, className, staticData, customKey, onSubmit, onSubmitClear, setModal, dispatch, callback, noRequest, invisibility, children, ...props }) => {
    const Data = { ...(staticData ? staticData : {}) };
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useForm)();
    // Use Form
    getForm && getForm(Methods);
    // On Form Submit
    const onFormSubmit = (submitData) => {
        onSubmit && onSubmit({ ...((mode === "update") ? Data : {}), ...submitData });
        if (dataSource && !noRequest) {
            (0, Services_1.Request)({
                dataSource, mode,
                apiUrlId: customKey ? Data[customKey] : Data.id,
                data: { ...(dataSource?.requestData ? dataSource.requestData(submitData) : submitData) },
                callback: (data) => {
                    callback && callback(data);
                    setModal && setModal(false);
                    onSubmitClear && Methods.reset();
                }, dispatch
            }).then();
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_hook_form_1.FormProvider, { ...Methods },
            react_1.default.createElement("form", { id: id, className: `${classes.root} ${className} coject_form`, autoComplete: "off", onSubmit: Methods.handleSubmit(onFormSubmit), ...props },
                schema &&
                    react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                        schema && !!schema?.length && schema.map((field, index) => {
                            if (!(invisibility?.includes(field.field)))
                                switch (field.component?.toLowerCase()) {
                                    case "date":
                                        return field.actionTemplate
                                            ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (react_1.default.createElement(material_1.Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                react_1.default.createElement(index_1.DatePicker, { fullWidth: true, name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "input":
                                        return field.actionTemplate
                                            ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (react_1.default.createElement(material_1.Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                react_1.default.createElement(index_1.Input, { fullWidth: true, name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "switch":
                                        return field.actionTemplate
                                            ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (react_1.default.createElement(material_1.Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                react_1.default.createElement(index_1.Switch, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "checkbox":
                                        return field.actionTemplate
                                            ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (react_1.default.createElement(material_1.Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                react_1.default.createElement(index_1.Checkbox, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "select":
                                        return field.actionTemplate
                                            ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (react_1.default.createElement(material_1.Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                react_1.default.createElement(index_1.Select, { fullWidth: true, name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "upload":
                                        return field.actionTemplate
                                            ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (react_1.default.createElement(material_1.Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                react_1.default.createElement(index_1.Upload, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    case "scanner":
                                        return field.actionTemplate
                                            ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                            : (react_1.default.createElement(material_1.Grid, { item: true, key: index, ...(field.componentMedia ? field.componentMedia : { xs: 12, sm: 12, md: 12, lg: 12 }) },
                                                react_1.default.createElement(index_1.Scanner, { name: field.field, ...field.componentProps, value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : field?.componentProps?.value) })));
                                    default:
                                        return null;
                                }
                        }),
                        children,
                        !(children) &&
                            react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 12, md: 12, lg: 12 },
                                react_1.default.createElement(material_1.Button, { fullWidth: true, type: "submit", variant: "outlined" }, localeText?.submitButton || "Submit"))),
                (children && !schema) && children))));
};
exports.Form = Form;
//# sourceMappingURL=index.js.map