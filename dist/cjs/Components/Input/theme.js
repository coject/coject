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
            "& .MuiInputBase-inputSizeSmall": {
                padding: "8px 12px"
            },
            "& .MuiInputLabel-sizeSmall": {
                top: "-2px"
            },
            "& .MuiInputBase-fullWidth": {
                minWidth: "200px"
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