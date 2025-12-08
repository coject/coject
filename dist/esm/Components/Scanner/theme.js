import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            width: "100%",
            marginBottom: theme.spacing(2)
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing(2),
            flexWrap: "wrap",
            gap: theme.spacing(1)
        },
        actions: {
            display: "flex",
            gap: theme.spacing(1),
            flexWrap: "wrap"
        },
        placeholder: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            color: theme.palette.text.secondary,
            gap: theme.spacing(1)
        },
        error: {
            color: theme.palette.error.main,
            marginTop: theme.spacing(0.5)
        },
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map