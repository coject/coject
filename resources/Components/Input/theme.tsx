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
            "& .MuiAutocomplete-root": {
                "& .MuiInputBase-root, & input": {
                    cursor: "pointer"
                }
            }
        }
    }
});

export default useStyles;