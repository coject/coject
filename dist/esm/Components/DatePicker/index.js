var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useEffect } from 'react';
// React Hook Form
import { useFormContext } from 'react-hook-form';
// Moment
import Moment from 'moment';
import MomentHijri from 'moment-hijri';
// Material UI
import { Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMomentHijri } from '@mui/x-date-pickers/AdapterMomentHijri';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export const DatePicker = (_a) => {
    var { name, value, hijri, format, inFormat, outFormat, minDate, maxDate, views, withTime, justText, placeholder, onChange } = _a, props = __rest(_a, ["name", "value", "hijri", "format", "inFormat", "outFormat", "minDate", "maxDate", "views", "withTime", "justText", "placeholder", "onChange"]);
    const DateComponent = withTime ? DateTimePicker : MuiDatePicker;
    const Views = views ? { views: [`${views}`] } : {};
    const { register, setValue } = useFormContext() || {};
    const [selectedDate, setSelectedDate] = useState(hijri ? MomentHijri(new Date()) : Moment(new Date()));
    // Calendar
    const Calendar = hijri
        ? { minDate: MomentHijri(minDate ? minDate : '14-03-1937', inFormat ? inFormat : 'DD-MM-YYYY'), maxDate: MomentHijri(maxDate ? maxDate : '26-10-2076', inFormat ? inFormat : 'DD-MM-YYYY') }
        : { minDate: Moment(minDate ? minDate : '01-01-1900', inFormat ? inFormat : 'DD-MM-YYYY'), maxDate: Moment(minDate ? minDate : '01-12-2099', inFormat ? inFormat : 'DD-MM-YYYY') };
    // Default Value
    useEffect(() => {
        register && !!Object.keys(register).length && setValue(name, selectedDate.format(outFormat ? outFormat : 'DD-MM-YYYY'));
    }, [register, setValue, name, selectedDate, outFormat]);
    // Normal Value
    useEffect(() => {
        if (value) {
            const ValueFormat = hijri ? MomentHijri(value, inFormat ? inFormat : 'DD-MM-YYYY') : Moment(value, inFormat ? inFormat : 'DD-MM-YYYY');
            setSelectedDate(ValueFormat);
            register && !!Object.keys(register).length && setValue(name, ValueFormat.format(outFormat ? outFormat : 'DD-MM-YYYY'));
        }
    }, [value, setValue, register, name, hijri, inFormat, outFormat]);
    return (React.createElement(LocalizationProvider, { dateAdapter: hijri ? AdapterMomentHijri : AdapterMoment }, justText ? (React.createElement(Typography, null, selectedDate.format(format ? format : hijri ? (withTime ? 'iDD-iMM-iYYYY HH:mm' : 'iDD-iMM-iYYYY') : withTime ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY'))) : (React.createElement(DateComponent, Object.assign({ label: placeholder, value: selectedDate }, Calendar, Views, props, { format: format ? format : hijri ? (withTime ? 'iDD-iMM-iYYYY HH:mm' : 'iDD-iMM-iYYYY') : withTime ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY', onChange: (newValue) => {
            setSelectedDate(newValue);
            onChange && onChange(newValue.format(outFormat ? outFormat : 'DD-MM-YYYY'));
            register && !!Object.keys(register).length && setValue(name, newValue.format(outFormat ? outFormat : 'DD-MM-YYYY'));
        } })))));
};
//# sourceMappingURL=index.js.map