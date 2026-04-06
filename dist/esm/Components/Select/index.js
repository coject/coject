import React, { useState, useEffect } from "react";
// React Hook Form
import { useFormContext, Controller } from "react-hook-form";
// Request
import { Request } from "../../Services";
// Material UI
import { Box, TextField, Autocomplete, Chip, Checkbox, FormHelperText, Tooltip } from '@mui/material';
// Coject
import { Icons } from "../index";
// Styles
import useStyles from "./theme";
export const Select = ({ name, value, label, noOptionsText, callback, staticData, disabled, helperText, dataSource, dependancies, multiple, separate, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, inputProps, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [selectedValue, setSelectedValue] = useState(multiple ? [] : null);
    const [selectData, setSelectData] = useState([]);
    const { setValue, control, watch, getValues } = useFormContext() || {};
    // Methods Watching
    useEffect(() => {
        control && setSelectedValue(getValues(name || "default") !== undefined ? getValues(name || "default") : multiple ? [] : null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);
    // Value
    useEffect(() => {
        if ((value !== undefined || (fixedOption && multiple))) {
            if (fixedOption && multiple) {
                setSelectedValue([...fixedOption, ...(value ? (multiple ? (separate ? value.split(separate).map((t) => Number(t)) : value) : [value]) : [])]);
                control && setValue(name || "default", [...fixedOption, ...(value ? (multiple ? (separate ? value.split(separate).map((t) => Number(t)) : value) : [value]) : [])]);
            }
            else {
                setSelectedValue(separate ? value.split(separate).map((t) => Number(t)) : value);
                control && setValue(name || "default", (separate ? value.split(separate).map((t) => Number(t)) : value));
            }
        }
    }, [control, name, setValue, value, fixedOption, multiple]);
    // Static Data
    useEffect(() => {
        if (staticData)
            setSelectData(staticData);
    }, [staticData]);
    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !staticData) {
            Request({
                dataSource: { ...dataSource },
                callback: (data) => {
                    setSelectData(data);
                    callback && callback(data);
                }
            }).then();
        }
        // eslint-disable-next-line
    }, [callback, staticData, ...(dependancies || [])]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} coject_select` },
            control ?
                React.createElement(Controller, { name: name || "default", control: control, rules: required ? { validate: (value) => multiple ? (Array.isArray(value) && value.length > 0) || (typeof required === "string" ? required : "This Field is Required") : !!value || (typeof required === "string" ? required : "This Field is Required") } : undefined, render: ({ fieldState }) => {
                        return (React.createElement(Autocomplete, { noOptionsText: noOptionsText, options: selectData, multiple: multiple, disabled: disabled, readOnly: disabled, ...props, value: !!selectData?.length && selectedValue !== undefined && selectedValue !== null
                                ? multiple
                                    ? selectedValue?.map((SValue) => selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                    : multiple ? [] : selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                                : multiple ? [] : null, defaultValue: !!selectData?.length && selectedValue !== undefined && selectedValue !== null
                                ? multiple
                                    ? selectedValue?.map((SValue) => selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                    : multiple ? [] : selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                                : multiple ? [] : null, onChange: (event, newValue) => {
                                onChange && onChange(event, newValue, Methods);
                                setSelectedValue(multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                                control && setValue(name || "default", multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id), { shouldValidate: true, shouldDirty: true });
                            }, renderTags: (tagValue, getTagProps) => tagValue.map((row, index) => (React.createElement(Chip, { ...getTagProps({ index }), key: index, label: customName ? row[`${customName}`] : row.label, disabled: (fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false }))), ...(customName ? { getOptionLabel: (option) => option[`${customName}`] } : {}), ...((renderOption || checkboxes) ? {
                                renderOption: (props, row, { selected }) => React.createElement(Box, { component: "li", ...props }, checkboxes
                                    ? React.createElement(React.Fragment, null,
                                        React.createElement(Checkbox, { icon: React.createElement(Icons.CheckBoxOutlineBlank, { fontSize: "small" }), checkedIcon: React.createElement(Icons.CheckBox, { fontSize: "small" }), style: { marginRight: 5 }, checked: selected }),
                                        customName ? row[`${customName}`] : row.label)
                                    : renderOption(row))
                            } : {}), getOptionDisabled: (row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false), renderInput: (params) => React.createElement(Tooltip, { title: fieldState?.error?.message || "", open: !!fieldState?.error?.message, arrow: true, disableHoverListener: true, placement: localStorage?.language === 'ar' ? "left" : "right" },
                                React.createElement(TextField, { ...params, InputProps: { ...params.InputProps, ...inputProps }, fullWidth: !!inputProps?.fullWidth, error: !!fieldState?.error, label: label ? label : (name || "default"), helperText: null })) }));
                    } })
                : React.createElement(Autocomplete, { noOptionsText: noOptionsText, options: selectData, multiple: multiple, disabled: disabled, readOnly: disabled, ...props, value: !!selectData?.length && selectedValue !== undefined && selectedValue !== null
                        ? multiple
                            ? selectedValue?.map((SValue) => selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                            : multiple ? [] : selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                        : multiple ? [] : null, defaultValue: !!selectData?.length && selectedValue !== undefined && selectedValue !== null
                        ? multiple
                            ? selectedValue?.map((SValue) => selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                            : multiple ? [] : selectData.find((option) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                        : multiple ? [] : null, onChange: (event, newValue) => {
                        onChange && onChange(event, newValue, Methods);
                        setSelectedValue(multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                    }, renderTags: (tagValue, getTagProps) => tagValue.map((row, index) => (React.createElement(Chip, { ...getTagProps({ index }), key: index, label: customName ? row[`${customName}`] : row.label, disabled: (fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false }))), ...(customName ? { getOptionLabel: (option) => option[`${customName}`] } : {}), ...((renderOption || checkboxes) ? {
                        renderOption: (props, row, { selected }) => React.createElement(Box, { component: "li", ...props }, checkboxes
                            ? React.createElement(React.Fragment, null,
                                React.createElement(Checkbox, { icon: React.createElement(Icons.CheckBoxOutlineBlank, { fontSize: "small" }), checkedIcon: React.createElement(Icons.CheckBox, { fontSize: "small" }), style: { marginRight: 5 }, checked: selected }),
                                customName ? row[`${customName}`] : row.label)
                            : renderOption(row))
                    } : {}), getOptionDisabled: (row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false), renderInput: (params) => React.createElement(TextField, { ...params, InputProps: { ...params.InputProps, ...inputProps }, fullWidth: !!inputProps?.fullWidth, error: error, label: label ? label : (name || "default"), required: !!required }) }),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map