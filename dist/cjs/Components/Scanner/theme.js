"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => ({
    root: {
        width: "100%",
        borderRadius: 12,
        background: "#fff",
        padding: theme.spacing(2),
        border: "1px solid #ddd",
        marginBottom: theme.spacing(2)
    },
    header: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: theme.spacing(1),
        marginBottom: theme.spacing(2),
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
            gap: theme.spacing(2),
            flexDirection: "column",
            alignItems: "flex-start"
        }
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: 18
        }
    },
    actions: {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
        flexWrap: "wrap",
        "& button": {
            borderRadius: 10,
            textTransform: "none",
            [theme.breakpoints.down("sm")]: {
                width: "100%"
            }
        }
    },
    previewBox: {
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #ccc",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        [theme.breakpoints.down("sm")]: {
            height: 400
        }
    },
    iframe: {
        width: "100%",
        height: "100%",
        border: "none"
    },
    placeholder: {
        display: "flex",
        color: "#888",
        borderRadius: 12,
        textAlign: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: theme.spacing(6),
        border: "2px dashed #ccc",
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4)
        }
    },
    placeholderIcon: {
        fontSize: 60,
        color: "#bbb",
        [theme.breakpoints.down("sm")]: {
            fontSize: 45
        }
    },
    placeholderText: {
        fontSize: 16,
        marginTop: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            fontSize: 14
        }
    },
    errorText: {
        fontSize: 15,
        marginTop: theme.spacing(1),
        color: theme.palette.error.main,
        [theme.breakpoints.down("sm")]: {
            fontSize: 13
        }
    }
}));
exports.default = useStyles;
//# sourceMappingURL=theme.js.map