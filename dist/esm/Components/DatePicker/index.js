import React, { useState, useEffect } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Moment
import Moment from "moment";
// Coject Hijri
import MomentHijri from "coject-hijri";
import { Adapter } from "coject-hijri/adapter";
// Material UI
import { Box, Typography, FormHelperText } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
// Styles
import useStyles from "./theme";
export const DatePicker = ({ name, value, hijri, viewFormat, actionFormat, minDate, maxDate, error, helperText, style, withTime, textView, fullWidth, onChange, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const DateComponent = withTime ? DateTimePicker : MuiDatePicker;
    const [selectedDate, setSelectedDate] = useState(hijri ? MomentHijri(new Date()) : Moment(new Date()));
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
        }
        else
            setSelectedDate(hijri ? MomentHijri(new Date()) : Moment(new Date()));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getValues, name, watch && watch(name || "default")]);
    // Default Value
    useEffect(() => {
        control && setValue(name || "default", selectedDate ? selectedDate.format(actionFormat ? actionFormat : "DD-MM-YYYY") : '');
    }, [control, setValue, name, selectedDate, actionFormat]);
    // Normal Value
    useEffect(() => {
        if (value) {
            const ValueFormat = hijri ? MomentHijri(value, actionFormat ? actionFormat : "DD-MM-YYYY") : Moment(value, actionFormat ? actionFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
            control && setValue(name || "default", ValueFormat.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
        }
    }, [value, setValue, control, name, hijri, actionFormat]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} ${error ? classes.rootError : ""} coject_date` },
            React.createElement(LocalizationProvider, { dateAdapter: (hijri ? Adapter : AdapterMoment) }, textView
                ? React.createElement(Typography, { ...style, ...props }, selectedDate.format(viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY"))
                : React.createElement(DateComponent, { className: `${fullWidth ? "MuiFormControl-fullWidth" : ""}`, label: props.label ? props.label : name, value: selectedDate, ...style, ...Calendar, ...props, format: viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY", onChange: (newValue) => {
                        setSelectedDate(newValue);
                        onChange && onChange(newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY"), Methods);
                        control && setValue(name || "default", newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY"));
                    } })),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map