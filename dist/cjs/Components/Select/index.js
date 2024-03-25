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
// Coject
const index_1 = require("../index");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Select = ({ name, value, label, callback, staticData, helperText, dataSource, multiple, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, inputProps, error, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const Methods = (0, react_hook_form_1.useFormContext)() || {};
    const [selectedValue, setSelectedValue] = (0, react_1.useState)();
    const [selectData, setSelectData] = (0, react_1.useState)([]);
    const { setValue, control, watch, getValues } = (0, react_hook_form_1.useFormContext)() || {};
    // Methods Watching
    (0, react_1.useEffect)(() => {
        control && setSelectedValue(getValues(name || "default") ? getValues(name || "default") : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);
    // Value
    (0, react_1.useEffect)(() => {
        if ((value || (fixedOption && multiple))) {
            if (fixedOption && multiple) {
                setSelectedValue([...fixedOption, ...(value ? (multiple ? value : [value]) : [])]);
                control && setValue(name || "default", [...fixedOption, ...(value ? (multiple ? value : [value]) : [])]);
            }
            else {
                setSelectedValue(value);
                control && setValue(name || "default", value);
            }
        }
    }, [control, name, setValue, value, fixedOption, multiple]);
    // Static Data
    (0, react_1.useEffect)(() => {
        if (staticData)
            setSelectData(staticData);
    }, [staticData]);
    // Dynamic Data
    (0, react_1.useEffect)(() => {
        if (dataSource?.apiUrl && !staticData) {
            (0, Services_1.Request)({
                dataSource: { ...dataSource },
                callback: (data) => {
                    setSelectData(data);
                    callback && callback(data);
                }
            }).then();
        }
        // eslint-disable-next-line
    }, [callback, staticData]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(react_hook_form_1.Controller, { name: name || "default", control: control, render: () => {
                    return (react_1.default.createElement(material_1.Autocomplete, { options: selectData, multiple: multiple, ...props, value: !!selectData?.length && selectedValue
                            ? multiple
                                ? selectedValue?.map((SValue) => selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                : multiple ? [] : selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                            : multiple ? [] : null, defaultValue: !!selectData?.length && selectedValue
                            ? multiple
                                ? selectedValue?.map((SValue) => selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                : multiple ? [] : selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                            : multiple ? [] : null, onChange: (event, newValue) => {
                            onChange && onChange(event, newValue, Methods);
                            setSelectedValue(multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                            control && setValue(name || "default", multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                        }, renderTags: (tagValue, getTagProps) => tagValue.map((row, index) => (react_1.default.createElement(material_1.Chip, { ...getTagProps({ index }), label: customName ? row[`${customName}`] : row.label, disabled: (fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false }))), ...(customName ? { getOptionLabel: (option) => option[`${customName}`] } : {}), ...((renderOption || checkboxes) ? {
                            renderOption: (props, row, { selected }) => react_1.default.createElement(material_1.Box, { component: "li", ...props }, checkboxes
                                ? react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(material_1.Checkbox, { icon: react_1.default.createElement(index_1.Icons.CheckBoxOutlineBlank, { fontSize: "small" }), checkedIcon: react_1.default.createElement(index_1.Icons.CheckBox, { fontSize: "small" }), style: { marginRight: 5 }, checked: selected }),
                                    customName ? row[`${customName}`] : row.label)
                                : renderOption(row))
                        } : {}), getOptionDisabled: (row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false), renderInput: (params) => react_1.default.createElement(material_1.TextField, { ...params, InputProps: { ...params.InputProps, ...inputProps, type: "search" }, fullWidth: !!inputProps?.fullWidth, error: error, label: label ? label : (name || "default"), required: required }) }));
                } }),
            helperText && react_1.default.createElement(material_1.FormHelperText, { className: classes.error }, helperText))));
};
exports.Select = Select;
//# sourceMappingURL=index.js.map