"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
    return {
        root: {
            display: "flex",
            marginTop: "70px",
            overflow: "hidden",
            minHeight: "calc(100vh - 70px)",
            backgroundColor: theme.palette.secondary.light,
            "& a": {
                color: "inherit",
                textTransform: "capitalize"
            }
        },
        pages: {
            display: "flex",
            overflow: "auto",
            alignItems: "center",
            flexDirection: "column",
            width: "calc(100vw - 280px)",
            height: "calc(100vh - 70px)",
            flex: "1 0 calc(100% - 280px)",
            justifyContent: "space-between",
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            [theme.breakpoints.down('md')]: {
                width: "100vw",
                flex: "1 0 100%"
            }
        },
        closeSidebar: {
            width: "calc(100vw - 70px) !important"
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map