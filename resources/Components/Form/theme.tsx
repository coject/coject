import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => {
    return {
        root: {
            width: "100%",
            padding: "16px",
            "& button": {
                padding: "9px 15px",
                textTransform: "capitalize"
            }
        }
    }
});

export default useStyles;