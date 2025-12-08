"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
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
exports.default = useStyles;
//# sourceMappingURL=theme.js.map