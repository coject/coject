"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
    return {
        root: {
            gap: 8,
            padding: "4px",
            display: "flex",
            alignItems: "center",
            position: "relative",
            justifyContent: "center",
            border: "1px solid" + theme.palette.grey[400],
            "& .MuiFormControl-root": {
                top: 0,
                left: 0,
                opacity: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                "& .MuiInputBase-root, & input": {
                    padding: 0,
                    height: "100%",
                    cursor: "pointer"
                }
            }
        },
        imageBox: {
            width: "100%",
            display: "flex",
            position: "relative",
            alignItems: "center",
            boxSizing: "border-box",
            border: "1px solid" + theme.palette.grey[400],
            "& img": {
                width: "32px",
                height: "32px",
                objectFit: "cover"
            },
            "& p": {
                fontWeight: 400,
                fontSize: "13px",
                overflow: "hidden",
                lineHeight: "13px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                textTransform: "capitalize",
                padding: "5.5px 20px 5.5px 5.5px"
            },
            "& button": {
                top: "50%",
                padding: 0,
                right: "2.5px",
                minWidth: "auto",
                position: "absolute",
                transform: "translateY(-50%)",
                "& svg": {
                    width: "15px",
                    height: "15px"
                }
            }
        },
        multiImageBox: {
            maxWidth: "calc(100% - 48px)"
        },
        moreMultiImageBox: {
            maxWidth: "calc(100% - 77px)"
        },
        emptyValue: {
            gap: 4,
            width: "100%",
            padding: "8px",
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
            border: "1px dashed" + theme.palette.grey[400],
            "& svg": {
                width: "18px",
                height: "16px",
                fill: "rgba(0, 0, 0, 0.6)"
            },
            "& p": {
                fontSize: "14px",
                lineHeight: "14px",
                textTransform: "capitalize",
                color: "rgba(0, 0, 0, 0.6)"
            }
        },
        error: {
            fontSize: "11px",
            lineHeight: "16px",
            textTransform: "capitalize",
            color: theme.palette.error.main
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map