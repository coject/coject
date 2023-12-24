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
const Form = ({ name, mode, getForm, schema, dataSource, onSubmit, onSubmitClear, setModal, dispatch, onSuccess, noRequest, style, children, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useForm)();
    const Data = (dataSource && dataSource.staticData) ? { ...dataSource.staticData } : {};
    // Use Form
    getForm && getForm(Methods);
    // On Form Submit
    const onFormSubmit = (submitData) => {
        onSubmit && onSubmit(submitData);
        if (dataSource && !noRequest) {
            (0, Services_1.Request)({ dataSource, mode,
                data: name ? { [name]: submitData } : submitData,
                apiUrlId: dataSource.primaryKey ? Data[dataSource.primaryKey] : Data.id,
                callBack: (data) => {
                    setModal && setModal(false);
                    onSuccess && onSuccess(data);
                    onSubmitClear && Methods.reset();
                }, dispatch }).then();
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_hook_form_1.FormProvider, { ...Methods },
            react_1.default.createElement("form", { className: classes.root, onSubmit: Methods.handleSubmit(onFormSubmit), style: style, ...props },
                schema &&
                    react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                        schema && !!schema?.length && schema.map((field, index) => {
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
                                default:
                                    return null;
                            }
                        }),
                        !(children) &&
                            react_1.default.createElement(material_1.Grid, { item: true, xs: 12, sm: 12, md: 12, lg: 12 },
                                react_1.default.createElement(material_1.Button, { fullWidth: true, type: "submit", variant: "outlined" }, "Submit"))),
                children))));
};
exports.Form = Form;
//# sourceMappingURL=index.js.map