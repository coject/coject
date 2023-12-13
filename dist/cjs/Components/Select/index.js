"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Select = void 0;
const react_1 = __importStar(require("react"));
// React Hook Form
const react_hook_form_1 = require("react-hook-form");
// Request
const Services_1 = require("../../Services");
// Material UI
const material_1 = require("@mui/material");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Select = (_a) => {
    var { name, label, dataSource, customKey, customName, renderOption, onChange, required, dispatch, inputProps } = _a, props = __rest(_a, ["name", "label", "dataSource", "customKey", "customName", "renderOption", "onChange", "required", "dispatch", "inputProps"]);
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const [selectedValue, setSelectedValue] = (0, react_1.useState)();
    const [selectData, setSelectData] = (0, react_1.useState)([]);
    const { setValue, control } = (0, react_hook_form_1.useFormContext)() || {};
    const DropdownID = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName) ? dataSource.uniqueName : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.name) ? dataSource.name : name;
    // Value
    (0, react_1.useEffect)(() => {
        if (props === null || props === void 0 ? void 0 : props.value) {
            setSelectedValue(props.value);
            control && setValue(name || "default", props.value);
        }
    }, [control, name, setValue, props === null || props === void 0 ? void 0 : props.value]);
    // Static Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            setSelectData(dataSource.staticData);
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            (0, Services_1.Request)({
                dataSource: Object.assign({}, dataSource), dispatch,
                callBack: (ResponseData) => setSelectData(ResponseData)
            }).then();
        }
    }, [dataSource, dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dispatch]);
    // Master Component
    const MuiAutocomplete = () => {
        return (react_1.default.createElement(material_1.Autocomplete, Object.assign({ id: DropdownID, options: selectData, multiple: props === null || props === void 0 ? void 0 : props.multiple }, props, { value: !!selectData.length && selectedValue
                ? (props === null || props === void 0 ? void 0 : props.multiple) && !!selectedValue.length
                    ? selectedValue.map((SValue) => selectData.find((option) => option.id === SValue))
                    : (props === null || props === void 0 ? void 0 : props.multiple) ? [] : selectData.find((option) => option.id === selectedValue)
                : (props === null || props === void 0 ? void 0 : props.multiple) ? [] : null, defaultValue: !!selectData.length && selectedValue
                ? (props === null || props === void 0 ? void 0 : props.multiple) && !!selectedValue.length
                    ? selectedValue.map((SValue) => selectData.find((option) => option.id === SValue))
                    : (props === null || props === void 0 ? void 0 : props.multiple) ? [] : selectData.find((option) => option.id === selectedValue)
                : (props === null || props === void 0 ? void 0 : props.multiple) ? [] : null, onChange: (e, newValue) => {
                onChange && onChange(e, newValue, Methods);
                setSelectedValue((props === null || props === void 0 ? void 0 : props.multiple) ? newValue === null || newValue === void 0 ? void 0 : newValue.map((NValue) => NValue.id) : newValue === null || newValue === void 0 ? void 0 : newValue.id);
                control && setValue(name || "default", (props === null || props === void 0 ? void 0 : props.multiple) ? newValue === null || newValue === void 0 ? void 0 : newValue.map((NValue) => NValue.id) : newValue === null || newValue === void 0 ? void 0 : newValue.id);
            } }, (customKey ? { getOptionKey: (option) => option[`${customKey}`] } : {}), (customName ? { getOptionLabel: (option) => option[`${customName}`] } : {}), (renderOption ? { renderOption: (props, option) => react_1.default.createElement(material_1.Box, Object.assign({ component: "li" }, props), renderOption(option)) } : {}), { renderInput: (params) => react_1.default.createElement(material_1.TextField, Object.assign({}, params, { InputProps: Object.assign(Object.assign(Object.assign({}, params.InputProps), inputProps), { type: "search" }), label: label ? label : (name || "default"), required: required })) })));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root }, control
            ? react_1.default.createElement(react_hook_form_1.Controller, { name: name || "default", control: control, rules: { required: required }, render: () => react_1.default.createElement(MuiAutocomplete, null) })
            : react_1.default.createElement(MuiAutocomplete, null))));
};
exports.Select = Select;
// { ...(optionRender ? { renderOption: (props, option) => <Box component={"li"} {...props}>{optionRender(option)}</Box> } : {}) }
//# sourceMappingURL=index.js.map