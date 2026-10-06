"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStyles = void 0;
const mui_1 = require("tss-react/mui");
exports.useStyles = (0, mui_1.makeStyles)()((theme, { centered, fullWidth, orientation, variant }) => ({
    root: {
        width: "100%",
        display: "flex",
        flexDirection: orientation === "vertical" ? "row" : "column",
    },
    tabsContainer: {
        display: "flex",
        width: fullWidth ? "100%" : "auto",
        justifyContent: centered ? "center" : "flex-start",
        flexDirection: orientation === "vertical" ? "column" : "row",
        gap: variant === "pills" ? theme.spacing(0.5) : 0,
        padding: variant === "pills" ? theme.spacing(0.5) : 0,
        backgroundColor: variant === "pills" ? theme.palette.action.hover : "transparent",
        borderRadius: variant === "pills" ? theme.shape.borderRadius * 2 : 0,
        borderBottom: variant === "underline" && orientation === "horizontal" ? `1px solid ${theme.palette.divider}` : "none",
        borderRight: variant === "underline" && orientation === "vertical" ? `1px solid ${theme.palette.divider}` : "none",
        alignSelf: orientation === "vertical" ? "flex-start" : "auto",
    },
    tab: {
        padding: variant === "pills" ? theme.spacing(0.75, 2) : theme.spacing(1.5, 2),
        cursor: "pointer",
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(0.75),
        border: "none",
        background: "none",
        color: theme.palette.text.secondary,
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightMedium,
        borderRadius: variant === "pills" ? theme.shape.borderRadius * 1.5 : 0,
        transition: theme.transitions.create(["color", "background-color", "box-shadow"], { duration: theme.transitions.duration.shorter }),
        "&:hover:not(.disabled)": {
            color: theme.palette.primary.main,
            backgroundColor: variant === "pills" ? "transparent" : theme.palette.action.hover,
        },
        "&.active": {
            color: variant === "default" ? theme.palette.primary.main : theme.palette.primary.main,
            backgroundColor: variant === "pills" ? theme.palette.background.paper : "transparent",
            boxShadow: variant === "pills" ? theme.shadows[1] : "none",
        },
        "&.disabled": {
            opacity: 0.4,
            cursor: "not-allowed",
            pointerEvents: "none",
        },
    },
    tabLabel: {
        lineHeight: 1,
    },
    tabIcon: {
        display: "flex",
        alignItems: "center",
        fontSize: theme.typography.pxToRem(18),
    },
    badge: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 18,
        height: 18,
        padding: theme.spacing(0, 0.5),
        borderRadius: 9,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: theme.typography.pxToRem(11),
        fontWeight: theme.typography.fontWeightBold,
        lineHeight: 1,
    },
    indicator: {
        position: "absolute",
        height: orientation === "horizontal" ? 2 : "100%",
        width: orientation === "horizontal" ? "100%" : 2,
        bottom: orientation === "horizontal" ? 0 : "auto",
        left: orientation === "horizontal" ? 0 : "auto",
        right: orientation === "vertical" ? 0 : "auto",
        top: orientation === "vertical" ? 0 : "auto",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 2,
        transition: theme.transitions.create(["all"], {
            duration: theme.transitions.duration.shorter,
        }),
    },
    tabPanel: {
        padding: theme.spacing(2),
        flexGrow: 1,
    },
}));
//# sourceMappingURL=theme.js.map