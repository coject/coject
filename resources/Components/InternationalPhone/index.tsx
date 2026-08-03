import React, { FC, useEffect, useState } from "react";

// React Hook Form
import { useFormContext } from "react-hook-form";

// Material UI
import { TextField, Autocomplete, InputAdornment } from "@mui/material";

type Country = {
    code: string;
    label: string;
};

// Countries
const countries: Country[] = [
    { code: "+966", label: "Saudi Arabia" },
    { code: "+20", label: "Egypt" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+971", label: "UAE" },
    { code: "+965", label: "Kuwait" },
    { code: "+974", label: "Qatar" },
    { code: "+973", label: "Bahrain" },
    { code: "+968", label: "Oman" },
    { code: "+962", label: "Jordan" },
    { code: "+961", label: "Lebanon" },
    { code: "+964", label: "Iraq" },
    { code: "+90", label: "Turkey" }
];

// Interface
interface Props {
    name: string;
    label?: string;
    value?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    required?: boolean | string;
    onChange?: (fullNumber: string) => void;
}

export const InternationalPhone: FC<Props> = ({ name, label, value, required, fullWidth, disabled, onChange }) => {
    const { setValue } = useFormContext();
    const [phone, setPhone] = useState("");
    const [touched, setTouched] = useState(false);
    const [country, setCountry] = useState<Country>(countries[0]);

    // Handle Country Code
    useEffect(() => {
        if (!value) return;
        const matched = countries.find((c) => value.startsWith(c.code));
        if (matched) {
            setCountry(matched);
            setPhone(value.replace(matched.code, ""));
        }
    }, [value]);

    // Handle Value
    useEffect(() => {
        const fullNumber = `${country.code}${phone}`;
        setValue(name, fullNumber, { shouldValidate: true });
        if (onChange) onChange(fullNumber);
    }, [country, phone, name, setValue, onChange]);

    return (
        <React.Fragment>
            <TextField disabled={disabled} fullWidth={fullWidth} label={label || ""} value={phone} required={!!required} dir="ltr"
                helperText={touched && !!required && !phone ? (typeof required === "string" ? required : "This Field Is Required") : ""}
                onBlur={() => setTouched(true)}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                inputProps={{ inputMode: "numeric", dir: "ltr" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Autocomplete disableClearable options={countries} value={country} disabled={disabled}
                                onChange={(_, v) => v && setCountry(v)}
                                getOptionLabel={(o) => o.code}
                                sx={{
                                    width: 90,
                                    "& .MuiInputBase-root": {
                                        paddingRight: "18px",
                                        paddingLeft: "4px"
                                    },
                                    "& .MuiAutocomplete-popupIndicator": {
                                        marginRight: "-2px"
                                    },
                                    "& .MuiAutocomplete-input": {
                                        padding: "4px 0 !important",
                                        textAlign: "center"
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} variant="standard"
                                        InputProps={{
                                            ...params.InputProps,
                                            disableUnderline: true
                                        }}
                                    />
                                )}
                            />
                        </InputAdornment>
                    ),
                }}
            />
        </React.Fragment>
    );
};