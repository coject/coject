"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
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
            backgroundColor: theme.palette.primary.contrastText
        },
        header: {
            display: "flex",
            padding: "10px 25px",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.palette.grey[200],
            "& h5": {
                margin: 0,
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "16px",
                color: theme.palette.primary.main
            }
        },
        body: {
            padding: "25px"
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map