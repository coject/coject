import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
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
            "& .MuiFormHelperText-root": {
                fontSize: "12px"
            },
            "& .MuiInputBase-fullWidth": {
                minWidth: "200px"
            }
        }
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map