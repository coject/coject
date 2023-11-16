import React, { FC, useState, useEffect } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Moment
import Moment from "moment";
import MomentHijri from "moment-hijri";

// Material UI
import { Typography } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMomentHijri } from "@mui/x-date-pickers/AdapterMomentHijri";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// Interface
interface iDatePicker {
    name: string;
    value?: string;
    hijri?: boolean;
    format?: string;
    inFormat?: string;
    outFormat?: string;
    minDate?: string;
    maxDate?: string;
    views?: string;
    withTime?: boolean;
    justText?: boolean;
    placeholder?: string;
    onChange?: any;
}

export const DatePicker: FC<iDatePicker> = ({ name, value, hijri, format, inFormat, outFormat, minDate, maxDate, views, withTime, justText, placeholder, onChange, ...props }) => {
    const DateComponent: any = withTime ? DateTimePicker : MuiDatePicker;
    const Views = views ? { views: [`${views}`] } : {};
    const { register, setValue } = useFormContext() || {};
    const [ selectedDate, setSelectedDate ] = useState<any>(hijri ? MomentHijri(new Date()) : Moment(new Date()));

    // Calendar
    const Calendar = hijri
        ? { minDate: MomentHijri(minDate ? minDate : "14-03-1937", inFormat ? inFormat : "DD-MM-YYYY"), maxDate: MomentHijri(maxDate ? maxDate : "26-10-2076", inFormat ? inFormat : "DD-MM-YYYY") }
        : { minDate: Moment(minDate ? minDate : "01-01-1900", inFormat ? inFormat : "DD-MM-YYYY"), maxDate: Moment(minDate ? minDate : "01-12-2099", inFormat ? inFormat : "DD-MM-YYYY") };

    // Default Value
    useEffect(() => {
        register && !!Object.keys(register).length && setValue(name, selectedDate.format(outFormat ? outFormat : "DD-MM-YYYY"));
    }, [register, setValue, name, selectedDate, outFormat]);

    // Normal Value
    useEffect(() => {
        if (value) {
            const ValueFormat = hijri ? MomentHijri(value, inFormat ? inFormat : "DD-MM-YYYY") : Moment(value, inFormat ? inFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
            register && !!Object.keys(register).length && setValue(name, ValueFormat.format(outFormat ? outFormat : "DD-MM-YYYY"));
        }
    }, [value, setValue, register, name, hijri, inFormat, outFormat]);

    return (
        <LocalizationProvider dateAdapter={hijri ? AdapterMomentHijri : AdapterMoment}>
            { justText ? (
                <Typography>{selectedDate.format(format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY")}</Typography>
            ) : (
                <DateComponent label={placeholder} value={selectedDate} {...Calendar} {...Views} {...props}
                    format={format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"}
                    onChange={(newValue: any) => {
                        setSelectedDate(newValue);
                        onChange && onChange(newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                        register && !!Object.keys(register).length && setValue(name, newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                    }}
                />
            )}
        </LocalizationProvider>
    );
};
