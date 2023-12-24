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
interface iSelect extends AutocompleteProps<any, any, any, any> {
    name?: string;
    label?: string;
    onChange?: any;
    dispatch?: any;
    error?: boolean;
    dataSource?: any;
    inputProps?: any;
    required?: boolean;
    renderOption?: any;
    customKey?: string;
    customName?: string;
    helperText?: string;
    checkboxes?: boolean;
    fixedOption?: (string | number)[];
    disabledOption?: (string | number)[];
}

export const Select: FC<Omit<iSelect, "options" | "renderInput">> = ({ name, label, helperText, dataSource, checkboxes, customKey, customName, renderOption, fixedOption, disabledOption, onChange, required, dispatch, inputProps, error, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ selectedValue, setSelectedValue ] = useState<any>();
    const [ selectData, setSelectData ] = useState<any>([]);
    const { setValue, control } = useFormContext() || {};
    const DropdownID = dataSource?.uniqueName ? dataSource.uniqueName : dataSource?.name ? dataSource.name : name;

    // Value
    useEffect(() => {
        if (props?.value || (fixedOption && props?.multiple)) {
            if (fixedOption && props?.multiple) {
                setSelectedValue([...fixedOption, ...(props?.value ? (props?.multiple ? props?.value : [props?.value]) : [])]);
                control && setValue(name || "default", [...fixedOption, ...(props?.value ? (props?.multiple ? props?.value : [props?.value]) : [])]);
            } else {
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
                callBack: (ResponseData: any) => setSelectData(ResponseData)
            }).then();
        }
    }, [dataSource, dataSource?.apiUrl, dispatch]);

    // Master Component
    const MuiAutocomplete = () => {
        return (
            <Autocomplete id={DropdownID} options={selectData} multiple={props?.multiple} {...props}
                value={ !!selectData?.length && selectedValue
                    ? props?.multiple
                        ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                        : props?.multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                    : props?.multiple ? [] : null
                }
                defaultValue={ !!selectData?.length && selectedValue
                    ? props?.multiple
                        ? selectedValue?.map((SValue: string) => selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === SValue))
                        : props?.multiple ? [] : selectData.find((option: any) => (customKey ? option[`${customKey}`] : option.id) === selectedValue)
                    : props?.multiple ? [] : null
                }
                onChange={(event, newValue) => {
                    onChange && onChange(event, newValue, Methods);
                    setSelectedValue(props?.multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue: any) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                    control && setValue(name || "default", props?.multiple ? [...new Set([...(fixedOption ? fixedOption : []), ...(newValue?.map((NValue: any) => (customKey ? NValue[`${customKey}`] : NValue.id)))])] : (customKey ? (newValue && newValue[`${customKey}`]) : newValue?.id));
                }}
                renderTags={(tagValue, getTagProps) => tagValue.map((row, index) => (
                    <Chip {...getTagProps({ index })} label={customName ? row[`${customName}`] : row.label} disabled={(fixedOption && props?.multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id ) : false} />
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
                getOptionDisabled={(row) => (disabledOption ? disabledOption.includes(customKey ? row[`${customKey}`] : row.id) : false) || ((fixedOption && props?.multiple) ? fixedOption.includes(customKey ? row[`${customKey}`] : row.id) : false)}
                renderInput={(params) => <TextField {...params} InputProps={{ ...params.InputProps, ...inputProps, type: "search" }} error={error} label={label ? label : (name || "default")} required={required} />}
            />
        );
    };

    return (
        <React.Fragment>
            <Box className={classes.root}>
                { control
                    ? <Controller name={name || "default"} control={control} rules={{ required: required }} render={() => <MuiAutocomplete />} />
                    : <MuiAutocomplete />
                }
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    )
};