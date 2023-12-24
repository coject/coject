"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
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
exports.default = useStyles;
//# sourceMappingURL=theme.js.map