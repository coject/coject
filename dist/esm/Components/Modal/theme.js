import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            top: "50%",
            left: "50%",
            width: "550px",
            maxWidth: "90vw",
            overflow: "hidden",
            borderRadius: "8px",
            textAlign: "center",
            position: "absolute",
            transform: "translate(-50%, -50%)",
            backgroundColor: theme.palette.primary.contrastText,
            "&:focus-visible": {
                outline: "none !important"
            }
        },
        header: {
            display: "flex",
            padding: "15px",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.palette.grey[200],
            "& button": {
                padding: 0
            },
            "& h5": {
                margin: 0,
                fontWeight: 400,
                fontSize: "16px",
                lineHeight: "16px",
                color: theme.palette.primary.main
            }
        },
        body: {
            padding: "10px",
            overflow: "auto",
            maxHeight: "calc(90vh - 60px)"
        }
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map