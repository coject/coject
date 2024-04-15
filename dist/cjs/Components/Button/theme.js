"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()(() => {
    return {
        root: {
            margin: 0,
            width: "auto",
            display: "flex",
            alignItems: "center",
            "& button": {
                fontSize: "14px",
                minWidth: "auto",
                minHeight: "auto",
                lineHeight: "14px",
                textTransform: "capitalize"
            }
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map