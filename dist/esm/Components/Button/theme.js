import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            margin: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            "& button": {
                fontSize: "14px",
                lineHeight: "14px",
                textTransform: "capitalize"
            }
        }
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map