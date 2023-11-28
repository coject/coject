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
import { TextField, Autocomplete } from "@mui/material";
export const Select = (_a) => {
    var { name, dataSource, placeholder, value, customKey, customName, variant, onChange, multiple, required, dispatch } = _a, props = __rest(_a, ["name", "dataSource", "placeholder", "value", "customKey", "customName", "variant", "onChange", "multiple", "required", "dispatch"]);
    const Methods = useFormContext() || {};
    const [selectedValue, setSelectedValue] = useState();
    const [selectData, setSelectData] = useState([]);
    const { setValue, control } = useFormContext() || {};
    const DropdownID = (dataSource === null || dataSource === void 0 ? void 0 : dataSource.uniqueName) ? dataSource.uniqueName : (dataSource === null || dataSource === void 0 ? void 0 : dataSource.name) ? dataSource.name : name;
    // Value
    useEffect(() => {
        if (value) {
            setSelectedValue(value);
            control && setValue(name, value);
        }
    }, [control, name, setValue, value]);
    // Static Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            dataSource.staticData.map((Data) => {
                return setSelectData((Prev) => [...Prev, { id: Data[customKey ? customKey : "id"], label: Data[customName ? customName : "label"] }]);
            });
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            Request({
                dataSource: Object.assign({}, dataSource), dispatch,
                callBack: (ResponseData) => {
                    ResponseData.map((Data) => {
                        return setSelectData((Prev) => [...Prev, { id: Data[customKey ? customKey : "id"], label: Data[customName ? customName : "label"] }]);
                    });
                }
            }).then();
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl]);
    // Master Component
    const MuiAutocomplete = () => {
        return (React.createElement(Autocomplete, Object.assign({ id: DropdownID, options: selectData, multiple: multiple }, props, { value: !!selectData.length && selectedValue
                ? multiple && !!selectedValue.length
                    ? selectedValue.map((SValue) => selectData.find((option) => option.id === SValue))
                    : multiple ? [] : selectData.find((option) => option.id === selectedValue)
                : multiple ? [] : null, onChange: (e, newValue) => {
                onChange && onChange(e, newValue, Methods);
                setSelectedValue(multiple ? newValue === null || newValue === void 0 ? void 0 : newValue.map((NValue) => NValue.id) : newValue === null || newValue === void 0 ? void 0 : newValue.id);
                control && setValue(name, multiple ? newValue === null || newValue === void 0 ? void 0 : newValue.map((NValue) => NValue.id) : newValue === null || newValue === void 0 ? void 0 : newValue.id);
            }, renderInput: (params) => React.createElement(TextField, Object.assign({}, params, { label: placeholder ? placeholder : "Select", variant: variant })) })));
    };
    return (React.createElement(React.Fragment, null, control
        ? React.createElement(Controller, { name: name, control: control, rules: { required: required }, render: () => React.createElement(MuiAutocomplete, null) })
        : React.createElement(MuiAutocomplete, null)));
};
//# sourceMappingURL=index.js.map