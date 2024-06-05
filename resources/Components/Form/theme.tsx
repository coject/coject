import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => {
    return {
        root: {
            width: "100%",
            "& button": {
                padding: "9px 15px",
                textTransform: "capitalize"
            }
        }
    }
});

export default useStyles;