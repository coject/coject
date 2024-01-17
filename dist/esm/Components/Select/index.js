import React, { useState, useEffect } from "react";
// React Hook Form
import { useFormContext, Controller } from "react-hook-form";
// Request
import { Request } from "../../Services";
// Material UI
import { Box, TextField, Autocomplete, Chip, Checkbox, FormHelperText } from '@mui/material';
// Coject
import { Icons } from "../index";
// Styles
import useStyles from "./theme";
export const Select = ({ name, value, label, callback, staticData, helperText, dataSource, multiple, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, dispatch, inputProps, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [selectedValue, setSelectedValue] = useState();
    const [selectData, setSelectData] = useState([]);
    const { setValue, control, watch, getValues } = useFormContext() || {};
    // Methods Watching
    useEffect(() => {
        control && setSelectedValue(getValues(name || "default") ? getValues(name || "default") : "");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);
    // Value
    useEffect(() => {
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
    useEffect(() => {
        if (staticData) {
            setSelectData((prev) => ([...prev, ...staticData]));
        }
    }, [dataSource?.apiUrl, staticData]);
    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl) {
            Request({
                dataSource: { ...dataSource }, dispatch,
                callback: (data) => {
                    callback && callback(data);
                    setSelectData((prev) => ([...prev, ...data]));
                }
            }).then();
        }
    }, [dataSource, dataSource?.apiUrl, dispatch, staticData, callback]);
    // Master Component
    const MuiAutocomplete = () => {
        return (React.createElement(Autocomplete, { options: selectData, multiple: multiple, ...props, value: !!selectData?.length && selectedValue
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
            }, renderTags: (tagValue, getTagProps) => tagValue.map((row, index) => (React.createElement(Chip, { ...getTagProps({ index }), label: customName ? row[`${customName}`] : row.label, disabled: (fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false }))), ...(customName ? { getOptionLabel: (option) => option[`${customName}`] } : {}), ...((renderOption || checkboxes) ? { renderOption: (props, row, { selected }) => React.createElement(Box, { component: "li", ...props }, checkboxes
                    ? React.createElement(React.Fragment, null,
                        React.createElement(Checkbox, { icon: React.createElement(Icons.CheckBoxOutlineBlank, { fontSize: "small" }), checkedIcon: React.createElement(Icons.CheckBox, { fontSize: "small" }), style: { marginRight: 5 }, checked: selected }),
                        customName ? row[`${customName}`] : row.label)
                    : renderOption(row)) } : {}), getOptionDisabled: (row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false), renderInput: (params) => React.createElement(TextField, { ...params, InputProps: { ...params.InputProps, ...inputProps, type: "search" }, fullWidth: !!inputProps?.fullWidth, error: error, label: label ? label : (name || "default"), required: required }) }));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            control
                ? React.createElement(Controller, { name: name || "default", control: control, render: () => React.createElement(MuiAutocomplete, null) })
                : React.createElement(MuiAutocomplete, null),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map