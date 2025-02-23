import React, { FC, useState, useEffect } from "react";

// React Hook Form
import { useFormContext, Controller } from "react-hook-form";

// Request
import { Request } from "../../Services";

// Material UI
import { Box, TextField, Autocomplete, AutocompleteProps, Chip, Checkbox, FormHelperText } from '@mui/material';

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
    required?: boolean;
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
    fixedOption?: (string | number)[];
    disabledOption?: (string | number)[];
}

export const Select: FC<Omit<iSelect, "options" | "renderInput">> = ({ name, value, label, noOptionsText, callback, staticData, disabled, helperText, dataSource, dependancies, multiple, separate, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, inputProps, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [selectedValue, setSelectedValue] = useState<any>();
    const [selectData, setSelectData] = useState<any>([]);
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
    }, [callback, staticData, ...[dependancies]]);

    return (
        <React.Fragment>
            <Box className={`${classes.root} coject_select`}>
                {control ?
                    <Controller name={name || "default"} control={control} render={() => {
                        return (
                            <Autocomplete noOptionsText={noOptionsText} options={selectData} multiple={multiple} disabled={disabled} readOnly={disabled} {...props}
                                value={!!selectData?.length && selectedValue
                                    ? multiple
                                        ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                        : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                                    : multiple ? [] : null
                                }
                                defaultValue={!!selectData?.length && selectedValue
                                    ? multiple
                                        ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                        : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                                    : multiple ? [] : null
                                }
                                onChange={(event, newValue) => {
                                    onChange && onChange(event, newValue, Methods);
                                    setSelectedValue(multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue: any) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                                    control && setValue(name || "default", multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue: any) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                                }}
                                renderTags={(tagValue, getTagProps) => tagValue.map((row, index) => (
                                    <Chip {...getTagProps({ index })} key={index} label={customName ? row[`${customName}`] : row.label} disabled={(fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false} />
                                ))}
                                {...(customName ? { getOptionLabel: (option: any) => option[`${customName}`] } : {})}
                                {...((renderOption || checkboxes) ? {
                                    renderOption: (props, row: any, { selected }) => <Box component={"li"} {...props}>
                                        {checkboxes
                                            ? <React.Fragment>
                                                <Checkbox icon={<Icons.CheckBoxOutlineBlank fontSize="small" />} checkedIcon={<Icons.CheckBox fontSize="small" />} style={{ marginRight: 5 }} checked={selected} />
                                                {customName ? row[`${customName}`] : row.label}
                                            </React.Fragment>
                                            : renderOption(row)
                                        }
                                    </Box>
                                } : {})}
                                getOptionDisabled={(row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false)}
                                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, ...inputProps }} fullWidth={!!inputProps?.fullWidth} error={error} label={label ? label : (name || "default")} required={required} />}
                            />
                        )
                    }} />
                    : <Autocomplete noOptionsText={noOptionsText} options={selectData} multiple={multiple} disabled={disabled} readOnly={disabled} {...props}
                        value={!!selectData?.length && selectedValue
                            ? multiple
                                ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                            : multiple ? [] : null
                        }
                        defaultValue={!!selectData?.length && selectedValue
                            ? multiple
                                ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                                : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                            : multiple ? [] : null
                        }
                        onChange={(event, newValue) => {
                            onChange && onChange(event, newValue, Methods);
                            setSelectedValue(multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue: any) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                        }}
                        renderTags={(tagValue, getTagProps) => tagValue.map((row, index) => (
                            <Chip {...getTagProps({ index })} key={index} label={customName ? row[`${customName}`] : row.label} disabled={(fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false} />
                        ))}
                        {...(customName ? { getOptionLabel: (option: any) => option[`${customName}`] } : {})}
                        {...((renderOption || checkboxes) ? {
                            renderOption: (props, row: any, { selected }) => <Box component={"li"} {...props}>
                                {checkboxes
                                    ? <React.Fragment>
                                        <Checkbox icon={<Icons.CheckBoxOutlineBlank fontSize="small" />} checkedIcon={<Icons.CheckBox fontSize="small" />} style={{ marginRight: 5 }} checked={selected} />
                                        {customName ? row[`${customName}`] : row.label}
                                    </React.Fragment>
                                    : renderOption(row)
                                }
                            </Box>
                        } : {})}
                        getOptionDisabled={(row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false)}
                        renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, ...inputProps }} fullWidth={!!inputProps?.fullWidth} error={error} label={label ? label : (name || "default")} required={required} />}
                    />
                }
                {helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText>}
            </Box>
        </React.Fragment>
    )
};