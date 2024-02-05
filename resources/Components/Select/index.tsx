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
    required?: boolean;
    renderOption?: any;
    customKey?: string;
    multiple?: boolean;
    customName?: string;
    helperText?: string;
    checkboxes?: boolean;
    dataSource?: iDataSource;
    fixedOption?: (string | number)[];
    disabledOption?: (string | number)[];
}

export const Select: FC<Omit<iSelect, "options" | "renderInput">> = ({ name, value, label, callback, staticData, helperText, dataSource, multiple, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, inputProps, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ selectedValue, setSelectedValue ] = useState<any>();
    const [ selectData, setSelectData ] = useState<any>([]);
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
            } else {
                setSelectedValue(value);
                control && setValue(name || "default", value);
            }
        }
    }, [control, name, setValue, value, fixedOption, multiple]);

    // Static Data
    useEffect(() => {
        if (staticData && !dataSource?.apiUrl) setSelectData(staticData);
    }, [dataSource?.apiUrl, staticData]);

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
    }, [callback]);

    // Master Component
    const MuiAutocomplete = () => {
        return (
            <Autocomplete options={selectData} multiple={multiple} {...props}
                value={ !!selectData?.length && selectedValue
                    ? multiple
                        ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                        : multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                    : multiple ? [] : null
                }
                defaultValue={ !!selectData?.length && selectedValue
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
                    <Chip {...getTagProps({ index })} label={customName ? row[`${customName}`] : row.label} disabled={(fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id ) : false} />
                )) }
                { ...(customName ? { getOptionLabel: (option: any) => option[`${customName}`] } : {}) }
                { ...((renderOption || checkboxes) ? { renderOption: (props, row: any, { selected }) => <Box component={"li"} {...props}>
                    { checkboxes
                        ? <React.Fragment>
                            <Checkbox icon={<Icons.CheckBoxOutlineBlank fontSize="small" />} checkedIcon={<Icons.CheckBox fontSize="small" />} style={{ marginRight: 5 }} checked={selected} />
                            {customName ? row[`${customName}`] : row.label}
                          </React.Fragment>
                        : renderOption(row)
                    }
                </Box> } : {}) }
                getOptionDisabled={(row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false)}
                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, ...inputProps, type: "search" }} fullWidth={!!inputProps?.fullWidth} error={error} label={label ? label : (name || "default")} required={required} />}
            />
        );
    };

    return (
        <React.Fragment>
            <Box className={classes.root}>
                { control
                    ? <Controller name={name || "default"} control={control} render={() => <MuiAutocomplete />} />
                    : <MuiAutocomplete />
                }
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    )
};