import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            margin: 0,
            width: "100%",
            "& button": {
                gap: 4,
                display: "flex",
                padding: "10px 20px",
                alignItems: "center",
                boxShadow: "none !important",
                backgroundColor: theme.palette.primary.main
            }
        },
        button: {
            gap: 4,
            display: "flex",
            marginTop: "10px",
            padding: "5px 20px",
            alignItems: "center",
            textTransform: "capitalize",
            borderRadius: "0 !important",
            boxShadow: "none !important",
            backgroundColor: theme.palette.primary.main
        },
        children: {
            width: "auto",
            padding: "10px",
            border: "1px solid #d2d0d0",
            minHeight: "calc(100vh - 250px)"
        },
        modal: {
            "& .coject_modal": {
                width: "800px"
            }
        },
        preview: {
            width: "100%",
            height: "calc(100vh - 250px)"
        }
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map