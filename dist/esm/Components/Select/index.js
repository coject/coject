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
import React, { useState, useEffect } from "react";
// React Hook Form
import { useFormContext, Controller } from "react-hook-form";
// Request
import { Request } from "../../Services";
// Material UI
import { Box, TextField, Autocomplete } from "@mui/material";
// Styles
import useStyles from "./theme";
export const Select = (_a) => {
    var { name, label, dataSource, customKey, customName, renderOption, onChange, required, dispatch, inputProps } = _a, props = __rest(_a, ["name", "label", "dataSource", "customKey", "customName", "renderOption", "onChange", "required", "dispatch", "inputProps"]);
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [selectedValue, setSelectedValue] = useState();
    const [selectData, setSelectData] = useState([]);
    const { setValue, control } = useFormContext() || {};
    const DropdownID = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName) ? dataSource.uniqueName : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.name) ? dataSource.name : name;
    // Value
    useEffect(() => {
        if (props === null || props === void 0 ? void 0 : props.value) {
            setSelectedValue(props.value);
            control && setValue(name || "default", props.value);
        }
    }, [control, name, setValue, props === null || props === void 0 ? void 0 : props.value]);
    // Static Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            setSelectData(dataSource.staticData);
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            Request({
                dataSource: Object.assign({}, dataSource), dispatch,
                callBack: (ResponseData) => setSelectData(ResponseData)
            }).then();
        }
    }, [dataSource, dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dispatch]);
    // Master Component
    const MuiAutocomplete = () => {
        return (React.createElement(Autocomplete, Object.assign({ id: DropdownID, options: selectData, multiple: props === null || props === void 0 ? void 0 : props.multiple }, props, { value: !!selectData.length && selectedValue
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
            } }, (customKey ? { getOptionKey: (option) => option[`${customKey}`] } : {}), (customName ? { getOptionLabel: (option) => option[`${customName}`] } : {}), (renderOption ? { renderOption: (props, option) => React.createElement(Box, Object.assign({ component: "li" }, props), renderOption(option)) } : {}), { renderInput: (params) => React.createElement(TextField, Object.assign({}, params, { InputProps: Object.assign(Object.assign(Object.assign({}, params.InputProps), inputProps), { type: "search" }), label: label ? label : (name || "default"), required: required })) })));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root }, control
            ? React.createElement(Controller, { name: name || "default", control: control, rules: { required: required }, render: () => React.createElement(MuiAutocomplete, null) })
            : React.createElement(MuiAutocomplete, null))));
};
// { ...(optionRender ? { renderOption: (props, option) => <Box component={"li"} {...props}>{optionRender(option)}</Box> } : {}) }
//# sourceMappingURL=index.js.map