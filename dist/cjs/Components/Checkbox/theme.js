"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
    return {
        root: {
            margin: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            "& .MuiButtonBase-root": {
                padding: "0 9px"
            },
            "& .MuiTypography-root": {
                fontSize: "14px",
                lineHeight: "14px",
                textTransform: "capitalize"
            }
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map