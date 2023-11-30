import React, { FC, useState, useEffect } from "react";

// React Hook Form
import { useFormContext, Controller } from "react-hook-form";

// Request
import { Request } from "../../Services";

// Material UI
import { TextField, Autocomplete } from "@mui/material";

// Interface
interface iSelect {
    name: string;
    variant?: any;
    value?: string;
    onChange?: any;
    dispatch?: any;
    dataSource?: any;
    multiple?: boolean;
    required?: boolean;
    customKey?: string;
    customName?: string;
    placeholder?: string;
}

export const Select: FC<iSelect> = ({ name, dataSource, placeholder, value, customKey, customName, variant, onChange, multiple, required, dispatch, ...props }) => {
    const Methods = useFormContext() || {};
    const [ selectedValue, setSelectedValue ] = useState<any>();
    const [ selectData, setSelectData ] = useState<any>([]);
    const { setValue, control } = useFormContext() || {};
    const DropdownID = dataSource?.uniqueName ? dataSource.uniqueName : dataSource?.name ? dataSource.name : name;

    // Value
    useEffect(() => {
        if (value) {
            setSelectedValue(value);
            control && setValue(name, value);
        }
    }, [control, name, setValue, value]);

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
            <Autocomplete id={DropdownID} options={selectData} multiple={multiple} {...props}
                value={
                    !!selectData.length && selectedValue
                        ? multiple && !!selectedValue.length
                            ? selectedValue.map((SValue: string) => selectData.find((option: any) => option.id === SValue))
                            : multiple ? [] : selectData.find((option: any) => option.id === selectedValue)
                        : multiple ? [] : null
                }
                onChange={(e, newValue) => {
                    onChange && onChange(e, newValue, Methods);
                    setSelectedValue(multiple ? newValue?.map((NValue: any) => NValue.id) : newValue?.id);
                    control && setValue(name, multiple ? newValue?.map((NValue: any) => NValue.id) : newValue?.id);
                }}
                renderInput={(params) => <TextField {...params} label={placeholder ? placeholder : "Select"} variant={variant} />}
            />
        );
    };

    return (
        <React.Fragment>
            { control
                ? <Controller name={name} control={control} rules={{ required: required }} render={() => <MuiAutocomplete />} />
                : <MuiAutocomplete />
            }
        </React.Fragment>
    )
};
