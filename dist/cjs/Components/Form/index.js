"use strict";
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
// Components
const Input_1 = require("../Input");
const Switch_1 = require("../Switch");
const Select_1 = require("../Select");
const DatePicker_1 = require("../DatePicker");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Form = (_a) => {
    var { name, mode, getForm, schema, dataSource, onSubmit, onSubmitClear, setModal, dispatch, children } = _a, props = __rest(_a, ["name", "mode", "getForm", "schema", "dataSource", "onSubmit", "onSubmitClear", "setModal", "dispatch", "children"]);
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useForm)();
    const Data = (dataSource && dataSource.staticData) ? Object.assign({}, dataSource.staticData) : {};
    // Use Form
    getForm && getForm(Methods);
    // On Form Submit
    const onFormSubmit = (submitData) => {
        onSubmit && onSubmit(submitData);
        if (dataSource) {
            (0, Services_1.Request)({ dataSource, mode,
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_hook_form_1.FormProvider, Object.assign({}, Methods),
            react_1.default.createElement("form", Object.assign({ className: classes.root, onSubmit: Methods.handleSubmit(onFormSubmit) }, props),
                react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
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
                                    ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (react_1.default.createElement(material_1.Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        react_1.default.createElement(Input_1.Input, Object.assign({ fullWidth: true, name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_d = field === null || field === void 0 ? void 0 : field.props) === null || _d === void 0 ? void 0 : _d.value) }))));
                            case "switch":
                                return field.actionTemplate
                                    ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (react_1.default.createElement(material_1.Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        react_1.default.createElement(Switch_1.Switch, Object.assign({ name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_e = field === null || field === void 0 ? void 0 : field.props) === null || _e === void 0 ? void 0 : _e.value) }))));
                            case "select":
                                return field.actionTemplate
                                    ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (react_1.default.createElement(material_1.Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        react_1.default.createElement(Select_1.Select, Object.assign({ name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_f = field === null || field === void 0 ? void 0 : field.props) === null || _f === void 0 ? void 0 : _f.value) }))));
                            case "datePicker":
                                return field.actionTemplate
                                    ? (react_1.default.createElement(react_1.default.Fragment, { key: index }, field.actionTemplate(field)))
                                    : (react_1.default.createElement(material_1.Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        react_1.default.createElement(DatePicker_1.DatePicker, Object.assign({ name: field.field }, field.props, { value: Data[field.field] ? Data[field.field] : (Data[field.field] === false ? "false" : (_g = field === null || field === void 0 ? void 0 : field.props) === null || _g === void 0 ? void 0 : _g.value) }))));
                            default:
                                return null;
                        }
                    }),
                    children,
                    (schema && !!(schema === null || schema === void 0 ? void 0 : schema.length) && Fields.includes("button"))
                        ? schema.map((field, index) => {
                            if (field.type === "button") {
                                if (field.template) {
                                    return react_1.default.createElement(react_1.default.Fragment, { key: index }, field.template(Methods.getValues()));
                                }
                                else {
                                    return react_1.default.createElement(material_1.Grid, Object.assign({ item: true, key: index }, (field.media ? field.media : { md: 12, lg: 12 })),
                                        react_1.default.createElement(material_1.Button, Object.assign({}, field.props), field.field));
                                }
                            }
                            else
                                return null;
                        })
                        : react_1.default.createElement(material_1.Grid, { item: true, md: 12, lg: 12 },
                            react_1.default.createElement(material_1.Button, { fullWidth: true, type: "submit", variant: "contained" }, "Save")))))));
};
exports.Form = Form;
//# sourceMappingURL=index.js.map