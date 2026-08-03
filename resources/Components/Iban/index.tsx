import React, { FC } from "react";

// Material UI
import { TextFieldProps } from "@mui/material";

// Coject
import { Input } from "../Input";

type iIban = Omit<TextFieldProps, | "name" | "helperText" | "required"> & {
    name: string;
    label?: string;
    helperText?: string;
    required?: boolean | string;
    value?: string | number;
    errorMessages?: {
        required?: string;
        pattern?: string;
    };
};

export const Iban: FC<iIban> = ({ name, label, helperText, required = true, errorMessages, onChange: externalOnChange, value, ...props }) => {
    const ibanRegex = /^[A-Za-z]{2}[0-9]{20}$/;

    return (
        <React.Fragment>
            <Input name={name} label={label || ""} helperText={helperText} required={errorMessages?.required ?? required} inputProps={{ maxLength: 22 }} value={value}
                validation={{
                    pattern: {
                        value: ibanRegex,
                        message: errorMessages?.pattern ?? "IBAN Must Start With 2 Letters Followed by 20 Digits"
                    },
                    minLength: { value: 22, message: "IBAN Must be Exactly 22 Characters" },
                    maxLength: { value: 22, message: "IBAN Must be Exactly 22 Characters" }
                }}
                onChange={(_: any, v: any, form: any) => {
                    let val = v.toUpperCase();
                    val = val.replace(/[^A-Za-z0-9]/g, "");
                    if (val.length <= 2) val = val.replace(/[^A-Za-z]/g, "");
                    if (val.length > 2) {
                        const letters = val.substring(0, 2).replace(/[^A-Za-z]/g, "");
                        const numbers = val.substring(2).replace(/[^0-9]/g, "");
                        val = letters + numbers;
                    }
                    form?.setValue(name, val);
                    if (externalOnChange) {
                        externalOnChange({ target: { name, value: val } } as React.ChangeEvent<HTMLInputElement>);
                    }
                }}
                {...props}
            />
        </React.Fragment>
    );
};