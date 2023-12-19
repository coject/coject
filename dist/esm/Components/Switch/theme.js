import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            margin: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            "& .MuiSwitch-root": {
                height: "25px",
                padding: "7px 12px 6px",
                "& .MuiButtonBase-root": {
                    padding: "3px 9px"
                }
            },
            "& .MuiTypography-root": {
                fontSize: "14px",
                lineHeight: "14px",
                textTransform: "capitalize"
            }
        },
        rootError: {
            "& span": {
                color: theme.palette.error.main
            },
            "& .MuiSwitch-track": {
                backgroundColor: theme.palette.error.main
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
export default useStyles;
//# sourceMappingURL=theme.js.map