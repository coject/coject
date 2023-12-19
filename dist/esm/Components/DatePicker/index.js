import React, { useState, useEffect } from "react";
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
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
// Styles
import useStyles from "./theme";
export const DatePicker = ({ name, value, hijri, format, inFormat, outFormat, minDate, maxDate, error, helperText, style, withTime, textView, fullWidth, onChange, ...props }) => {
    const { classes } = useStyles();
    const DateComponent = withTime ? DateTimePicker : MuiDatePicker;
    const { setValue, control } = useFormContext() || {};
    const [selectedDate, setSelectedDate] = useState(hijri ? MomentHijri(new Date()) : Moment(new Date()));
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
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} ${error ? classes.rootError : ""}` },
            React.createElement(LocalizationProvider, { dateAdapter: hijri ? AdapterMomentHijri : AdapterMoment }, textView
                ? React.createElement(Typography, { ...style, ...props }, selectedDate.format(format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"))
                : React.createElement(DateComponent, { className: `${fullWidth ? "MuiFormControl-fullWidth" : ""}`, label: props.label ? props.label : name, value: selectedDate, ...style, ...Calendar, ...props, format: format ? format : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY", onChange: (newValue) => {
                        setSelectedDate(newValue);
                        onChange && onChange(newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                        control && setValue(name || "default", newValue.format(outFormat ? outFormat : "DD-MM-YYYY"));
                    } })),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map