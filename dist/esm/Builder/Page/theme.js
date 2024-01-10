import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            flexGrow: 1,
            width: "100%",
            padding: "22px",
            flex: "1 0 calc(100% - 50px)"
        },
        header: {
            display: "flex",
            marginBottom: "24px",
            alignItems: "center",
            justifyContent: "space-between",
            "& h2": {
                margin: 0,
                padding: 0,
                fontWeight: 700,
                fontSize: "18px",
                lineHeight: "18px",
                textTransform: "uppercase"
            }
        }
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map