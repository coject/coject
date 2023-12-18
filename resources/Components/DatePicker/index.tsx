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
    views?: string;
    onChange?: any;
    error?: boolean;
    hijri?: boolean;
    format?: string;
    minDate?: string;
    maxDate?: string;
    inFormat?: string;
    outFormat?: string;
    withTime?: boolean;
    textView?: boolean;
    fullWidth?: boolean;
    helperText?: string;
}

export const DatePicker: FC<iDatePicker> = ({ name, value, hijri, format, inFormat, outFormat, minDate, maxDate, views, error, helperText, style, withTime, textView, fullWidth, onChange, ...props }) => {
    const { classes } = useStyles();
    const DateComponent: any = withTime ? DateTimePicker : MuiDatePicker;
    const Views = views ? { views: [`${views}`] } : {};
    const { setValue, control } = useFormContext() || {};
    const [ selectedDate, setSelectedDate ] = useState<any>(hijri ? MomentHijri(new Date()) : Moment(new Date()));

    // Calendar
    const Calendar = hijri
        ? { minDate: MomentHijri(minDate ? minDate : "14-03-1937", inFormat ? inFormat : "DD-MM-YYYY"), maxDate: MomentHijri(maxDate ? maxDate : "26-10-2076", inFormat ? inFormat : "DD-MM-YYYY") }
        : { minDate: Moment(minDate ? minDate : "01-01-1900", inFormat ? inFormat : "DD-MM-YYYY"), maxDate: Moment(minDate ? minDate : "01-12-2099", inFormat ? inFormat : "DD-MM-YYYY") };

    // Default Value
    useEffect(() => {
        control && setValue(name || "default", selectedDate.format(outFormat ? outFormat : "DD-MM-YYYY"));
    }, [control, setValue, name, selectedDate, outFormat]);

    // Normal Value
    useEffect(() => {
        if (value) {
            const ValueFormat = hijri ? MomentHijri(value, inFormat ? inFormat : "DD-MM-YYYY") : Moment(value, inFormat ? inFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
            control && setValue(name || "default", ValueFormat.format(outFormat ? outFormat : "DD-MM-YYYY"));
        }
    }, [value, setValue, control, name, hijri, inFormat, outFormat]);

    return (
        <React.Fragment>
            <Box className={`${classes.root} ${error ? classes.errorRoot : ""}`}>
                <LocalizationProvider dateAdapter={hijri ? AdapterMomentHijri : AdapterMoment}>
                    { textView
                        ? <Typography {...style} {...props}>{selectedDate.format(format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY")}</Typography>
                        : <DateComponent className={`${fullWidth ? "MuiFormControl-fullWidth" : ""}`} label={props.label ? props.label : name} value={selectedDate} {...style} {...Calendar} {...Views} {...props}
                            format={format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"}
                            onChange={(newValue: any) => {
                                setSelectedDate(newValue);
                                onChange && onChange(newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                                control && setValue(name || "default", newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                            }
                        } />
                    }
                </LocalizationProvider>
                { helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText> }
            </Box>
        </React.Fragment>
    );
};
