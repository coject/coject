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
            "& legend": {
                fontSize: "10px"
            },
            "& button": {
                padding: "2px 10px",
            },
            "& .MuiAutocomplete-root": {
                "& .MuiAutocomplete-input": {
                    cursor: "pointer",
                    padding: "12px !important"
                },
                "& .MuiInputBase-root": {
                    cursor: "pointer",
                    padding: "0 25px 0 0"
                },
                "& .MuiFormHelperText-root": {
                    fontSize: "12px"
                },
                "& .MuiInputBase-fullWidth": {
                    minWidth: "200px"
                }
            }
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map