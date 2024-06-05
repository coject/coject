"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
    return {
        root: {
            margin: 0,
            width: "100%",
            "& label": {
                display: "block",
                fontSize: "13px",
                marginBottom: "7px"
            },
            "& .MuiFormHelperText-root": {
                marginLeft: 0,
                marginRight: 0,
                color: theme.palette.error.dark
            }
        },
        container: {
            width: "100%",
            padding: "7px",
            display: "flex",
            border: "1px solid" + theme.palette.grey[400]
        },
        error: {
            borderColor: theme.palette.error.dark
        },
        files: {
            gap: 7,
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        file: {
            width: "100%",
            display: "flex",
            overflow: "hidden",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid" + theme.palette.grey[400],
            "& img": {
                minWidth: "100%",
                minHeight: "100%",
                objectFit: "cover"
            }
        },
        inputContainer: {
            gap: 3,
            width: "100%",
            padding: "7px",
            display: "flex",
            cursor: "pointer",
            overflow: "hidden",
            position: "relative",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            border: "1px solid" + theme.palette.grey[400],
            "& .MuiFormControl-root": {
                top: 0,
                left: 0,
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
                position: "absolute",
                "& .MuiInputBase-root, & input": {
                    padding: 0,
                    height: "100%",
                    cursor: "pointer"
                }
            },
            "& svg": {
                fill: theme.palette.grey[500]
            },
            "& p": {
                fontSize: "13px",
                lineHeight: "13px",
                textTransform: "capitalize",
                color: theme.palette.grey[500]
            }
        },
        remove: {
            top: 0,
            left: 0,
            opacity: 0,
            width: "100%",
            height: "100%",
            transition: "0.4s",
            position: "absolute",
            "&:hover": {
                opacity: 1
            },
            "& button, & a": {
                top: "7px",
                padding: 0,
                right: "7px",
                opacity: 0.85,
                width: "20px",
                height: "20px",
                position: "absolute",
                backgroundColor: theme.palette.grey[200],
                border: "1px solid" + theme.palette.grey[500],
                "&:hover": {
                    opacity: 1,
                    color: theme.palette.grey[100],
                    backgroundColor: theme.palette.grey[500]
                },
                "& svg": {
                    width: "15px",
                    height: "15px",
                    fill: theme.palette.secondary.dark
                }
            }
        },
        viewer: {
            top: 0,
            left: 0,
            opacity: 0.2,
            width: "100%",
            height: "100%",
            cursor: "pointer",
            position: "absolute",
            backgroundColor: theme.palette.primary.contrastText
        },
        imageViewer: {
            width: "100%"
        },
        download: {
            top: 0,
            left: 0,
            opacity: 0,
            width: "100%",
            height: "100%",
            transition: "0.4s",
            position: "absolute",
            "&:hover": {
                opacity: 1
            },
            "& button, & a": {
                top: "50%",
                padding: 0,
                right: "50%",
                opacity: 0.85,
                width: "50px",
                height: "50px",
                position: "absolute",
                backgroundColor: theme.palette.grey[200],
                border: "1px solid" + theme.palette.grey[500],
                transform: "translate(calc(50% - 100%), -50%)",
                "&:hover": {
                    color: theme.palette.grey[100],
                    backgroundColor: theme.palette.grey[500],
                    "& svg": {
                        fill: theme.palette.primary.contrastText
                    }
                },
                "& svg": {
                    width: "25px",
                    height: "25px",
                    fill: theme.palette.secondary.dark
                }
            }
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map