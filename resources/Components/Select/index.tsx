import React, { FC, useState, useEffect } from "react";

// React Hook Form
import { useFormContext, Controller } from "react-hook-form";

// Request
import { Request } from "../../Services";

// Material UI
import { Box, TextField, Autocomplete, AutocompleteProps, TextFieldProps } from "@mui/material";

// Styles
import useStyles from "./theme";

// Interface
interface iSelect extends AutocompleteProps<any, any, any, any> {
    name?: string;
    label?: string;
    onChange?: any;
    dispatch?: any;
    dataSource?: any;
    required?: boolean;
    customKey?: string;
    customName?: string;
    inputProps?: TextFieldProps;
}

export const Select: FC<Omit<iSelect, "options" | "renderInput">> = ({ name, label, dataSource, customKey, customName, onChange, required, dispatch, inputProps, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const [ selectedValue, setSelectedValue ] = useState<any>();
    const [ selectData, setSelectData ] = useState<any>([]);
    const { setValue, control } = useFormContext() || {};
    const DropdownID = dataSource?.uniqueName ? dataSource.uniqueName : dataSource?.name ? dataSource.name : name;

    // Value
    useEffect(() => {
        if (props?.value) {
            setSelectedValue(props.value);
            control && setValue(name || "default", props.value);
        }
    }, [control, name, setValue, props?.value]);

    // Static Data
    useEffect(() => {
        if (dataSource?.staticData && !!dataSource.staticData.length && !dataSource?.apiUrl) {
            dataSource.staticData.map((Data: any) => {
                return setSelectData((Prev: any) => [ ...Prev, { id: Data[customKey ? customKey : "id"], label: Data[customName ? customName : "label"] } ]);
            });
        }
    }, [customKey, customName, dataSource?.apiUrl, dataSource?.staticData]);

    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !dataSource.staticData) {
            Request({
                dataSource: { ...dataSource }, dispatch,
                callBack: (ResponseData: any) => {
                    ResponseData.map((Data: any) => {
                        return setSelectData((Prev: any) => [ ...Prev, { id: Data[customKey ? customKey : "id"], label: Data[customName ? customName : "label"] } ]);
                    });
                }
            }).then();
        }
    }, [customKey, customName, dataSource, dataSource?.apiUrl, dispatch]);

    // Master Component
    const MuiAutocomplete = () => {
        return (
            <Autocomplete id={DropdownID} options={selectData} multiple={props?.multiple} {...props}
                value={
                    !!selectData.length && selectedValue
                        ? props?.multiple && !!selectedValue.length
                            ? selectedValue.map((SValue: string) => selectData.find((option: any) => option.id === SValue))
                            : props?.multiple ? [] : selectData.find((option: any) => option.id === selectedValue)
                        : props?.multiple ? [] : null
                }
                onChange={(e, newValue) => {
                    onChange && onChange(e, newValue, Methods);
                    setSelectedValue(props?.multiple ? newValue?.map((NValue: any) => NValue.id) : newValue?.id);
                    control && setValue(name || "default", props?.multiple ? newValue?.map((NValue: any) => NValue.id) : newValue?.id);
                }}
                renderInput={(params) => <TextField {...params} {...inputProps} label={label ? label : (name || "default")} required={required} />}
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
            </Box>
        </React.Fragment>
    )
};