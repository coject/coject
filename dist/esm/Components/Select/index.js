import React, { useState, useEffect } from "react";
// React Hook Form
import { useFormContext, Controller } from "react-hook-form";
// Request
import { Request } from "../../Services";
// Material UI
import { Box, TextField, Autocomplete, Chip, Checkbox, FormHelperText } from '@mui/material';
// Components
import { Icons } from "../../Components";
// Styles
import useStyles from "./theme";
export const Select = ({ name, label, helperText, dataSource, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, dispatch, inputProps, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [selectedValue, setSelectedValue] = useState();
    const [selectData, setSelectData] = useState([]);
    const { setValue, control } = useFormContext() || {};
    const DropdownID = dataSource?.uniqueName ? dataSource.uniqueName : dataSource?.name ? dataSource.name : name;
    // Value
    useEffect(() => {
        if (props?.value || (fixedOption && props?.multiple)) {
            if (fixedOption && props?.multiple) {
                setSelectedValue([...fixedOption, ...(props?.value ? (props?.multiple ? props?.value : [props?.value]) : [])]);
                control && setValue(name || "default", [...fixedOption, ...(props?.value ? (props?.multiple ? props?.value : [props?.value]) : [])]);
            }
            else {
                setSelectedValue(props.value);
                control && setValue(name || "default", props.value);
            }
        }
    }, [control, name, setValue, props.value, fixedOption, props?.multiple]);
    // Static Data
    useEffect(() => {
        if (dataSource?.staticData && !!dataSource.staticData.length && !dataSource?.apiUrl) {
            setSelectData(dataSource.staticData);
        }
    }, [dataSource?.apiUrl, dataSource?.staticData]);
    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !dataSource.staticData) {
            Request({
                dataSource: { ...dataSource }, dispatch,
                callBack: (ResponseData) => setSelectData(ResponseData)
            }).then();
        }
    }, [dataSource, dataSource?.apiUrl, dispatch]);
    // Master Component
    const MuiAutocomplete = () => {
        return (React.createElement(Autocomplete, { id: DropdownID, options: selectData, multiple: props?.multiple, ...props, value: !!selectData?.length && selectedValue
                ? props?.multiple
                    ? selectedValue?.map((SValue) => selectData.find((option) => option.id === SValue))
                    : props?.multiple ? [] : selectData.find((option) => option.id === selectedValue)
                : props?.multiple ? [] : null, defaultValue: !!selectData?.length && selectedValue
                ? props?.multiple
                    ? selectedValue?.map((SValue) => selectData.find((option) => option.id === SValue))
                    : props?.multiple ? [] : selectData.find((option) => option.id === selectedValue)
                : props?.multiple ? [] : null, onChange: (event, newValue) => {
                onChange && onChange(event, newValue, Methods);
                setSelectedValue(props?.multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue) => NValue.id))])] : newValue?.id);
                control && setValue(name || "default", props?.multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue) => NValue.id))])] : newValue?.id);
            }, renderTags: (tagValue, getTagProps) => tagValue.map((row, index) => (React.createElement(Chip, { ...getTagProps({ index }), label: customName ? row[`${customName}`] : row.label, disabled: (fixedOption && props?.multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false }))), ...(customKey ? { getOptionKey: (option) => option[`${customKey}`] } : {}), ...(customName ? { getOptionLabel: (option) => option[`${customName}`] } : {}), ...((renderOption || checkboxes) ? { renderOption: (props, row, { selected }) => React.createElement(Box, { component: "li", ...props }, checkboxes
                    ? React.createElement(React.Fragment, null,
                        React.createElement(Checkbox, { icon: React.createElement(Icons.CheckBoxOutlineBlank, { fontSize: "small" }), checkedIcon: React.createElement(Icons.CheckBox, { fontSize: "small" }), style: { marginRight: 5 }, checked: selected }),
                        customName ? row[`${customName}`] : row.label)
                    : renderOption(row)) } : {}), getOptionDisabled: (row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && props?.multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false), renderInput: (params) => React.createElement(TextField, { ...params, InputProps: { ...params.InputProps, ...inputProps, type: "search" }, error: error, label: label ? label : (name || "default"), required: required }) }));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.root },
            control
                ? React.createElement(Controller, { name: name || "default", control: control, rules: { required: required }, render: () => React.createElement(MuiAutocomplete, null) })
                : React.createElement(MuiAutocomplete, null),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map