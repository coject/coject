import React, { useState, useEffect, useRef } from "react";
// React Hook Form
import { useFormContext } from "react-hook-form";
// Moment
import Moment from "moment";
// Coject Hijri
import MomentHijri from "coject-hijri";
import { Adapter } from "coject-hijri/adapter";
// Material UI
import { Box, Typography, FormHelperText, Tooltip } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
// Styles
import useStyles from "./theme";
export const DatePicker = ({ name, value, hijri, viewFormat, actionFormat, minDate, maxDate, error, helperText, style, withTime, textView, fullWidth, onChange, required, tooltipPlacement, ...props }) => {
    const { classes } = useStyles();
    const Methods = useFormContext() || {};
    const DateComponent = withTime ? DateTimePicker : MuiDatePicker;
    const [selectedDate, setSelectedDate] = useState(null);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [persistTooltip, setPersistTooltip] = useState(false);
    const timerRef = useRef(null);
    const { setValue, control, getValues, watch, register, formState } = useFormContext() || {};
    const requiredMessage = typeof required === "string" ? required : required ? "This Field is Required" : undefined;
    const rhfError = formState?.errors?.[name || ""];
    const isRequiredError = !!rhfError || (required && !selectedDate && error);
    // Handle Ref Error
    useEffect(() => {
        if (rhfError) {
            if (timerRef.current)
                clearTimeout(timerRef.current);
            setPersistTooltip(true);
            setTooltipOpen(true);
        }
        else {
            setPersistTooltip(false);
            setTooltipOpen(false);
        }
    }, [rhfError]);
    // Calendar
    const Calendar = hijri
        ? { minDate: MomentHijri(minDate ? minDate : "14-03-1937", (actionFormat && minDate) ? actionFormat : "DD-MM-YYYY"), maxDate: MomentHijri(maxDate ? maxDate : "26-10-2076", (actionFormat && maxDate) ? actionFormat : "DD-MM-YYYY") }
        : { minDate: Moment(minDate ? minDate : "01-01-1900", (actionFormat && minDate) ? actionFormat : "DD-MM-YYYY"), maxDate: Moment(maxDate ? maxDate : "01-12-2099", (actionFormat && maxDate) ? actionFormat : "DD-MM-YYYY") };
    // Regiser
    useEffect(() => {
        if (control && name && required) {
            register(name, { required: requiredMessage });
        }
    }, [control, name, required, register, requiredMessage]);
    // Cleanup timer on unmount
    useEffect(() => {
        return () => { if (timerRef.current)
            clearTimeout(timerRef.current); };
    }, []);
    // Methods Watching
    useEffect(() => {
        if (getValues && getValues(name || "default")) {
            const ValueFormat = hijri ? MomentHijri(getValues(name || "default"), actionFormat ? actionFormat : "DD-MM-YYYY") : Moment(getValues(name || "default"), actionFormat ? actionFormat : "DD-MM-YYYY");
            setSelectedDate(ValueFormat);
        }
        else
            setSelectedDate(null);
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
    // Tooltip Message
    const tooltipMessage = rhfError?.message || requiredMessage || "This Field is Required";
    // Handle Blur
    const handleBlur = () => {
        if (required && !selectedDate && !persistTooltip) {
            if (timerRef.current)
                clearTimeout(timerRef.current);
            setTooltipOpen(true);
            timerRef.current = setTimeout(() => setTooltipOpen(false), 3000);
        }
    };
    // Handle Change
    const handleChange = (newValue) => {
        setSelectedDate(newValue);
        if (newValue) {
            setPersistTooltip(false);
            setTooltipOpen(false);
            if (timerRef.current)
                clearTimeout(timerRef.current);
        }
        onChange && onChange(newValue ? newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY") : null, Methods);
        control && setValue(name || "default", newValue ? newValue.format(actionFormat ? actionFormat : "DD-MM-YYYY") : '', { shouldValidate: true });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: `${classes.root} ${(error || isRequiredError) ? classes.rootError : ""} coject_date` },
            React.createElement(LocalizationProvider, { dateAdapter: (hijri ? Adapter : AdapterMoment) },
                React.createElement(Tooltip, { arrow: true, title: tooltipMessage, placement: tooltipPlacement ?? (localStorage?.language === "ar" ? "left" : "right"), open: tooltipOpen, onClose: () => { if (!persistTooltip)
                        setTooltipOpen(false); } },
                    React.createElement("span", { style: { display: fullWidth ? "block" : "inline-block" } }, textView
                        ? React.createElement(Typography, { ...style, ...props }, selectedDate ? selectedDate.format(viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY") : '')
                        : React.createElement(DateComponent, { className: `${fullWidth ? "MuiFormControl-fullWidth" : ""}`, label: props.label ? props.label : name, value: selectedDate, ...style, ...Calendar, ...props, format: viewFormat ? viewFormat : hijri ? (withTime ? "iDD-iMM-iYYYY HH:mm" : "iDD-iMM-iYYYY") : withTime ? "DD-MM-YYYY HH:mm" : "DD-MM-YYYY", slotProps: {
                                textField: {
                                    error: !!(error || isRequiredError),
                                    onBlur: handleBlur
                                }
                            }, onChange: handleChange })))),
            helperText && React.createElement(FormHelperText, { className: classes.error }, helperText))));
};
//# sourceMappingURL=index.js.map