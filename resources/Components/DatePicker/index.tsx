import React, { FC, useState, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Moment
import Moment from "moment";
import MomentHijri from "moment-hijri";

// Material UI
import { Box, Typography, FormHelperText } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterMomentHijri } from "@mui/x-date-pickers/AdapterMomentHijri";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker as MuiDatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";

// Styles
import useStyles from "./theme";

// Interface
type iDatePicker = DateTimePickerProps<any> & DatePickerProps<any> & {
    style?: any;
    name?: string;
    value?: string;
    onChange?: any;
    error?: boolean;
    hijri?: boolean;
    minDate?: string;
    maxDate?: string;
    withTime?: boolean;
    textView?: boolean;
    fullWidth?: boolean;
    helperText?: string;
    viewFormat?: string;
    actionFormat?: string;
}

export const DatePicker: FC<iDatePicker> = ({ name, value, hijri, viewFormat, actionFormat, minDate, maxDate, error, helperText, style, withTime, textView, fullWidth, onChange, ...props }) => {
    const { classes } = useStyles();
    const DateComponent: any = withTime ? DateTimePicker : MuiDatePicker;
    const [ selectedDate, setSelectedDate ] = useState<any>(hijri ? MomentHijri(new Date()) : Moment(new Date()));
    const { setValue, control, getValues, watch } = useFormContext() || {};

    // Calendar
    const Calendar = hijri
        ? { minDate: MomentHijri(minDate ? minDate : "14-03-1937", (actionFormat && minDate) ? actionFormat : "DD-MM-YYYY"), maxDate: MomentHijri(maxDate ? maxDate : "26-10-2076", (actionFormat && maxDate) ? actionFormat : "DD-MM-YYYY") }
        : { minDate: Moment(minDate ? minDate : "01-01-1900", (actionFormat && minDate) ? actionFormat : "DD-MM-YYYY"), maxDate: Moment(maxDate ? maxDate : "01-12-2099", (actionFormat && maxDate) ? actionFormat : "DD-MM-YYYY") };

    // Methods Watching
    useEffect(() => {
        if (getValues && getValues(name || "default")) {
            const ValueFormat = hijri ? MomentHijri(getValues(name || "default"), actionFormat ? actionFormat : "DD-MM-YYYY") : Moment(getValues(name || "default"), actionFormat ? actionFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
        } else setSelectedDate(hijri ? MomentHijri(new Date()) : Moment(new Date()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues, name, watch && watch(name || "default")]);

    // Default Value
    useEffect(() => {
        control && setValue(name || "default", selectedDate.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
    }, [control, setValue, name, selectedDate, actionFormat]);

    // Normal Value
    useEffect(() => {
        if (value) {
            const ValueFormat = hijri ? MomentHijri(value, actionFormat ? actionFormat : "DD-MM-YYYY") : Moment(value, actionFormat ? actionFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
            control && setValue(name || "default", ValueFormat.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
        }
    }, [value, setValue, control, name, hijri, actionFormat]);

    return (
        <React.Fragment>
            <Box className={`${classes.root} ${error ? classes.rootError : ""}`}>
                <LocalizationProvider dateAdapter={hijri ? AdapterMomentHijri : AdapterMoment}>
                    { textView
                        ? <Typography {...style} {...props}>{selectedDate.format(viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY")}</Typography>
                        : <DateComponent className={`${fullWidth ? "MuiFormControl-fullWidth" : ""}`} label={props.label ? props.label : name} value={selectedDate} {...style} {...Calendar} {...props}
                            format={viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"}
                            onChange={(newValue: any) => {
                                setSelectedDate(newValue);
                                onChange && onChange(newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
                                control && setValue(name || "default", newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
                            }
                        } />
                    }
                </LocalizationProvider>
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};
