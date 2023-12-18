"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
    return {
        root: {
            margin: 0,
            width: "100%",
            "& input": {
                padding: "12px",
                fontSize: "14px"
            },
            "& fieldset": {
                borderRadius: "unset"
            },
            "& label": {
                top: "-5px",
                fontSize: "14px",
                textTransform: "capitalize",
                "&.MuiInputLabel-shrink": {
                    top: "2px"
                }
            },
            "& button": {
                backgroundColor: "transparent !important"
            },
            "& legend": {
                fontSize: "10px"
            },
            "& .MuiFormControl-fullWidth": {
                width: "100%"
            },
            "& .MuiAutocomplete-root": {
                "& .MuiInputBase-root, & input": {
                    cursor: "pointer"
                }
            }
        },
        errorRoot: {
            "& p, & input, & label, & button": {
                color: theme.palette.error.main + "!important"
            },
            "& fieldset": {
                borderColor: theme.palette.error.main + "!important"
            }
        },
        error: {
            fontSize: "11px",
            lineHeight: "16px",
            textTransform: "capitalize",
            color: theme.palette.error.main
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map