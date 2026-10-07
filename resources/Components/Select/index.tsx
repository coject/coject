import React, { FC, useState, useEffect } from "react";

// React Hook Form
import { useFormContext, Controller } from "react-hook-form";

// Request
import { Request } from "../../Services";

// Material UI
import { Box, TextField, Autocomplete, AutocompleteProps, Chip, Checkbox, FormHelperText, Tooltip } from '@mui/material';

// Coject
import { Icons } from "../index";

// Styles
import useStyles from "./theme";

// Interface
interface iDataSource {
    name?: string;
    headers?: any;
    apiUrl?: string;
    baseUrl?: string;
    requestData?: any;
    dataPath?: string;
    method?: "get" | "post" | "put" | "delete";
    create?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    update?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    delete?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
}

interface iSelect extends AutocompleteProps<any, any, any, any> {
    value?: any;
    name?: string;
    label?: string;
    onChange?: any;
    callback?: any;
    error?: boolean;
    inputProps?: any;
    staticData?: any;
    separate?: string;
    disabled?: boolean;
    renderOption?: any;
    customKey?: string;
    multiple?: boolean;
    customName?: string;
    helperText?: string;
    dependancies?: any[];
    checkboxes?: boolean;
    noOptionsText?: string;
    dataSource?: iDataSource;
    required?: boolean | string;
    fixedOption?: (string | number)[];
    disabledOption?: (string | number)[];
    getOptionKey?: (option: any) => string | number;
}

export const Select: FC<Omit<iSelect, "options" | "renderInput">> = ({ getOptionKey = (option) => customKey ? option[`${customKey}`] : option.id, name, value, label, noOptionsText, callback, staticData, disabled, helperText, dataSource, dependancies, multiple, separate, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, inputProps, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [selectData, setSelectData] = useState<any>([]);
    const { setValue, control, watch, getValues } = useFormContext() || {};
    const [selectedValue, setSelectedValue] = useState<any>(multiple ? [] : null);
    const allSelected = multiple && !!selectData?.length && selectData.every((item: any) => selectedValue?.includes(customKey ? item[customKey] : item.id));

    // Methods Watching
    useEffect(() => {
        control && setSelectedValue(getValues(name || "default") !== undefined ? getValues(name || "default") : multiple ? [] : null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [control, getValues, name, watch && watch(name || "default")]);

    // Value
    useEffect(() => {
        if ((value !== undefined || (fixedOption && multiple))) {
            if (fixedOption && multiple) {
                setSelectedValue([...fixedOption, ...(value ? (multiple ? (separate ? value.split(separate).map((t: any) => Number(t)) : value) : [value]) : [])]);
                control && setValue(name || "default", [...fixedOption, ...(value ? (multiple ? (separate ? value.split(separate).map((t: any) => Number(t)) : value) : [value]) : [])]);
            } else {
                setSelectedValue(separate ? value.split(separate).map((t: any) => Number(t)) : value);
                control && setValue(name || "default", (separate ? value.split(separate).map((t: any) => Number(t)) : value));
            }
        }
    }, [control, name, setValue, value, fixedOption, multiple]);

    // Static Data
    useEffect(() => {
        if (staticData) setSelectData(staticData);
    }, [staticData]);

    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !staticData) {
            Request({
                dataSource: { ...dataSource },
                callback: (data: any) => {
                    setSelectData(data);
                    callback && callback(data);
                }
            }).then();
        }
        // eslint-disable-next-line
    }, [callback, staticData, ...(dependancies || [])]);

    return (
        <React.Fragment>
            <Box className={`${classes.root} coject_select`}>
                {control ?
                    <Controller name={name || "default"} control={control} 
                        rules={ required ? { validate: (value) => multiple ? (Array.isArray(value) && value.length > 0) || (typeof required === "string" ? required : "This Field is Required") : !!value || (typeof required === "string" ? required : "This Field is Required") } : undefined }
                         render={({ fieldState }) => {
                            return (
                                <Autocomplete 
                                    getOptionKey={(option: any) => option.isSelectAll ? 'select-all' : getOptionKey(option)} 
                                    noOptionsText={noOptionsText} 
                                    options={multiple && selectData?.length > 0 ? [{ isSelectAll: true }, ...selectData] : selectData} 
                                    multiple={multiple} 
                                    disabled={disabled} 
                                    readOnly={disabled} 
                                    {...props}
                                    value={!!selectData?.length && selectedValue !== undefined && selectedValue !== null
                                        ? multiple
                                            ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                            : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                                        : multiple ? [] : null
                                    }
                                    defaultValue={!!selectData?.length && selectedValue !== undefined && selectedValue !== null
                                        ? multiple
                                            ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                            : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                                        : multiple ? [] : null
                                    }
                                    onChange={(event, newValue: any) => {
                                        let finalValue = newValue;
                                        if (multiple && newValue?.some((v: any) => v.isSelectAll)) {
                                            if (allSelected) {
                                                finalValue = selectData.filter((item: any) => fixedOption?.includes(customKey ? item[customKey] : item.id));
                                            } else {
                                                finalValue = selectData;
                                            }
                                        }

                                        const valueToSet = multiple 
                                            ? [...new Set([...(fixedOption || []), ...(finalValue?.map((v: any) => (customKey ? v[customKey] : v.id)) || [])])]
                                            : (customKey ? (finalValue && finalValue[customKey]) : finalValue?.id);

                                        onChange && onChange(event, finalValue, Methods);
                                        setSelectedValue(valueToSet);
                                        control && setValue(name || "default", valueToSet, { shouldValidate: true, shouldDirty: true });
                                    }}
                                    renderTags={(tagValue, getTagProps) => tagValue.map((row, index) => (
                                        <Chip {...getTagProps({ index })} key={getOptionKey(row)} label={customName ? row[`${customName}`] : row.label} disabled={(fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false} />
                                    ))}
                                    getOptionLabel={(option: any) => {
                                        if (option.isSelectAll) return localStorage?.language === 'ar' ? "تحديد الكل" : "Select All";
                                        return customName ? (option[customName] || "") : (option.label || "");
                                    }}
                                    {...((renderOption || checkboxes || multiple) ? {
                                        renderOption: (props, row: any, { selected }) => {
                                            const isSelectAll = row.isSelectAll;
                                            const isChecked = isSelectAll ? allSelected : selected;
                                            return (
                                                <Box component={"li"} {...props} key={isSelectAll ? 'select-all' : getOptionKey(row)}>
                                                    {(checkboxes || multiple)
                                                        ? <React.Fragment>
                                                            <Checkbox 
                                                                icon={<Icons.CheckBoxOutlineBlank fontSize="small" />} 
                                                                checkedIcon={<Icons.CheckBox fontSize="small" />} 
                                                                style={{ marginRight: 5 }} 
                                                                checked={isChecked} 
                                                                indeterminate={isSelectAll && !allSelected && selectedValue?.length > 0}
                                                            />
                                                            {isSelectAll ? (localStorage?.language === 'ar' ? "تحديد الكل" : "Select All") : (customName ? row[`${customName}`] : row.label)}
                                                        </React.Fragment>
                                                        : renderOption ? renderOption(row) : (customName ? row[customName] : row.label)
                                                    }
                                                </Box>
                                            )
                                        }
                                    } : {})}
                                    getOptionDisabled={(row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false)}
                                    renderInput={(params) => <Tooltip title={fieldState?.error?.message || ""} open={!!fieldState?.error?.message} arrow disableHoverListener placement={localStorage?.language === 'ar' ? "left" : "right"}><TextField {...params} InputProps={{ ...params.InputProps, ...inputProps }} fullWidth={!!inputProps?.fullWidth} error={!!fieldState?.error} label={label ? label : (name || "default")} helperText={null} /></Tooltip>}
                                />
                            )
                        }} />
                    : <Autocomplete 
                        getOptionKey={(option: any) => option.isSelectAll ? 'select-all' : getOptionKey(option)} 
                        noOptionsText={noOptionsText} 
                        options={multiple && selectData?.length > 0 ? [{ isSelectAll: true }, ...selectData] : selectData} 
                        multiple={multiple} 
                        disabled={disabled} 
                        readOnly={disabled} 
                        {...props}
                        value={!!selectData?.length && selectedValue !== undefined && selectedValue !== null
                            ? multiple
                                ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                            : multiple ? [] : null
                        }
                        defaultValue={!!selectData?.length && selectedValue !== undefined && selectedValue !== null
                            ? multiple
                                ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                            : multiple ? [] : null
                        }
                        onChange={(event, newValue: any) => {
                            let finalValue = newValue;
                            if (multiple && newValue?.some((v: any) => v.isSelectAll)) {
                                if (allSelected) {
                                    finalValue = selectData.filter((item: any) => fixedOption?.includes(customKey ? item[customKey] : item.id));
                                } else {
                                    finalValue = selectData;
                                }
                            }
                            const valueToSet = multiple 
                                ? [...new Set([...(fixedOption || []), ...(finalValue?.map((v: any) => (customKey ? v[customKey] : v.id)) || [])])]
                                : (customKey ? (finalValue && finalValue[customKey]) : finalValue?.id);

                            onChange && onChange(event, finalValue, Methods);
                            setSelectedValue(valueToSet);
                        }}
                        renderTags={(tagValue, getTagProps) => tagValue.map((row, index) => (
                            <Chip {...getTagProps({ index })} key={getOptionKey(row)} label={customName ? row[`${customName}`] : row.label} disabled={(fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false} />
                        ))}
                        getOptionLabel={(option: any) => {
                            if (option.isSelectAll) return localStorage?.language === 'ar' ? "تحديد الكل" : "Select All";
                            return customName ? (option[customName] || "") : (option.label || "");
                        }}
                        {...((renderOption || checkboxes || multiple) ? {
                            renderOption: (props, row: any, { selected }) => {
                                const isSelectAll = row.isSelectAll;
                                const isChecked = isSelectAll ? allSelected : selected;
                                return (
                                    <Box component={"li"} {...props} key={isSelectAll ? 'select-all' : getOptionKey(row)}>
                                        {(checkboxes || multiple)
                                            ? <React.Fragment>
                                                <Checkbox 
                                                    icon={<Icons.CheckBoxOutlineBlank fontSize="small" />} 
                                                    checkedIcon={<Icons.CheckBox fontSize="small" />} 
                                                    style={{ marginRight: 5 }} 
                                                    checked={isChecked} 
                                                    indeterminate={isSelectAll && !allSelected && selectedValue?.length > 0}
                                                />
                                                {isSelectAll ? (localStorage?.language === 'ar' ? "تحديد الكل" : "Select All") : (customName ? row[`${customName}`] : row.label)}
                                            </React.Fragment>
                                            : renderOption ? renderOption(row) : (customName ? row[customName] : row.label)
                                        }
                                    </Box>
                                )
                            }
                        } : {})}
                        getOptionDisabled={(row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false)}
                        renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, ...inputProps }} fullWidth={!!inputProps?.fullWidth} error={error} label={label ? label : (name || "default")} required={!!required} />}
                    />
                }
                {helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText>}
            </Box>
        </React.Fragment>
    )
};