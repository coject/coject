"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mui_1 = require("tss-react/mui");
const useStyles = (0, mui_1.makeStyles)()((theme) => {
    return {
        dskHeader: {
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100%",
            height: "70px",
            display: "flex",
            position: "fixed",
        },
        dskLogo: {
            width: "250px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.dark,
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
            "& img": {
                maxWidth: "135px",
                maxHeight: "50px",
                cursor: "pointer"
            }
        },
        closedDskLogo: {
            padding: "0 22px",
            width: "70px !important",
            "& img": {
                flex: "1 0 25px",
                maxWidth: "25px",
                maxHeight: "25px"
            }
        },
        dskMenu: {
            height: "100%",
            display: "flex",
            padding: "0 22px",
            alignItems: "center",
            width: "calc(100vw - 250px)",
            justifyContent: "space-between",
            boxShadow: "0 0.75rem 1.5rem #12263f08",
            backgroundColor: theme.palette.primary.contrastText,
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
        },
        closedDskMenu: {
            width: "calc(100vw - 70px)"
        },
        dskSearch: {
            width: "192px",
            display: "flex",
            position: "relative",
            alignItems: "center",
            padding: "0 !important",
            justifyContent: "center",
            "& button": {
                zIndex: 2,
                top: "50%",
                left: "13px",
                position: "absolute",
                padding: "0 !important",
                transform: "translateY(-50%)",
                "& svg": {
                    width: "16px",
                    height: "16px",
                    color: theme.palette.secondary.main
                }
            },
            "& input": {
                fontSize: "13px",
                lineHeight: "13px",
                borderRadius: "30px",
                padding: "10px 20px 9px 40px",
                color: theme.palette.secondary.dark,
                backgroundColor: theme.palette.secondary.light
            },
            "& fieldset": {
                border: "unset",
                borderRadius: "30px"
            }
        },
        menuList: {
            gap: 20,
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 !important",
            "& li": {
                gap: 3,
                padding: 0,
                width: "auto",
                minHeight: "auto",
                transition: "color .2s ease",
                color: theme.palette.secondary.contrastText,
                "& a, & button": {
                    gap: 5,
                    padding: 0,
                    display: "flex",
                    fontSize: "13px",
                    minWidth: "auto",
                    minHeight: "22px",
                    lineHeight: "13px",
                    alignItems: "center",
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                    backgroundColor: "transparent",
                    color: theme.palette.secondary.contrastText,
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: theme.palette.primary.main
                    },
                    "& img": {
                        width: "22px",
                        objectFit: "cover"
                    },
                    "& p": {
                        width: "100%",
                        overflow: "hidden",
                        textAlign: "start",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                        textOverflow: "ellipsis"
                    }
                },
                "& svg": {
                    width: "22px",
                    height: "22px",
                    fill: theme.palette.secondary.contrastText
                },
                "&:hover": {
                    backgroundColor: "transparent",
                    color: theme.palette.primary.main,
                    "& svg": {
                        fill: theme.palette.primary.main
                    }
                }
            }
        },
        subMenuList: {
            "& .MuiPaper-root": {
                width: "180px",
                boxShadow: "none",
                overflow: "initial",
                backgroundColor: "transparent !important"
            },
            "& ul": {
                padding: 0,
                "& li, & a, & button": {
                    gap: 7,
                    padding: 0,
                    width: "100%",
                    display: "flex",
                    fontSize: "13px",
                    minHeight: "auto",
                    alignItems: "center",
                    textTransform: "capitalize",
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: theme.palette.primary.main
                    },
                    "& img": {
                        width: "22px",
                        objectFit: "cover"
                    },
                    "& p": {
                        width: "100%",
                        overflow: "hidden",
                        textAlign: "start",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    }
                }
            }
        },
        subListMenu: {
            cursor: "pointer",
            paddingTop: "48px",
            transform: "translateY(-23px)"
        },
        subMenuContent: {
            gap: 8,
            display: "flex",
            padding: "12px 14px",
            flexDirection: "column",
            backgroundColor: theme.palette.primary.contrastText,
            boxShadow: "0 0 0 1px #d1d7dc,0 2px 4px rgba(0,0,0,.08),0 4px 12px rgba(0,0,0,.08)"
        },
        mobHeader: {
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100%",
            height: "70px",
            display: "flex",
            position: "fixed",
        },
        mobLogo: {
            width: "70px",
            height: "100%",
            display: "flex",
            padding: "0 22px",
            alignItems: "center",
            justifyContent: "space-between",
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.dark,
            "& img": {
                flex: "1 0 25px",
                cursor: "pointer",
                maxWidth: "25px",
                maxHeight: "25px"
            }
        },
        mobMenu: {
            height: "100%",
            display: "flex",
            padding: "0 22px",
            alignItems: "center",
            width: "calc(100vw - 70px)",
            justifyContent: "space-between",
            boxShadow: "0 0.75rem 1.5rem #12263f08",
            backgroundColor: theme.palette.primary.contrastText,
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
        },
        mobSearch: {
            left: "50%",
            top: "70px",
            width: "100vw",
            display: "flex",
            maxWidth: "450px",
            position: "fixed",
            alignItems: "center",
            justifyContent: "center",
            transform: "translateX(-50%)",
            padding: "15px 25px !important",
            boxShadow: "0 1rem 3rem rgba(0,0,0,.175)",
            backgroundColor: theme.palette.primary.contrastText,
            "& button": {
                zIndex: 2,
                top: "50%",
                right: "25px",
                position: "absolute",
                borderRadius: "unset",
                padding: "8px !important",
                transform: "translateY(-50%)",
                backgroundColor: theme.palette.primary.main + "!important",
                "& svg": {
                    width: "22px",
                    height: "22px",
                    fill: theme.palette.primary.contrastText + "!important"
                },
                "&:hover": {
                    backgroundColor: theme.palette.primary.dark + "!important",
                    "& svg": {
                        fill: theme.palette.primary.contrastText + "!important"
                    }
                }
            },
            "& input": {
                borderRadius: 0,
                fontSize: "13px",
                lineHeight: "13px",
                padding: "10px 20px",
                color: theme.palette.secondary.dark,
                backgroundColor: theme.palette.secondary.light
            },
            "& fieldset": {
                borderRadius: 0,
                borderStyle: "solid",
                borderWidth: "1px !important",
                borderColor: theme.palette.grey[400] + "!important"
            }
        },
        mobMenuList: {
            "& ul": {
                padding: 0
            },
            "& .MuiPaper-root": {
                boxShadow: "none",
                overflow: "initial",
                top: "0 !important",
                left: "0 !important",
                backgroundColor: "transparent !important"
            },
            "& .MuiBackdrop-invisible": {
                opacity: "0.7 !important",
                backgroundColor: theme.palette.grey[900]
            }
        },
        mobMenuClose: {
            top: "15px",
            left: "300px",
            position: "absolute",
            backgroundColor: "transparent !important",
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: "transparent"
            }
        },
        mobMenuContent: {
            gap: 5,
            width: "300px",
            display: "flex",
            height: "100vh",
            overflow: "auto",
            marginRight: "auto",
            flexDirection: "column",
            backgroundColor: theme.palette.primary.contrastText,
            "& hr": {
                margin: "0 15px"
            },
            "& li": {
                padding: "0 15px",
                minHeight: "auto",
                "& p": {
                    padding: 0,
                    width: "95%",
                    fontSize: "15px",
                    overflow: "hidden",
                    lineHeight: "16px",
                    WebkitLineClamp: 1,
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    textTransform: "capitalize"
                },
                "& a, & button": {
                    gap: 7,
                    display: "flex",
                    padding: "7px 0",
                    fontSize: "15px",
                    textAlign: "start",
                    lineHeight: "16px",
                    alignItems: "center",
                    textTransform: "capitalize",
                    justifyContent: "flex-start",
                    color: theme.palette.secondary.dark,
                    "& svg": {
                        width: "24px",
                        height: "24px",
                        color: theme.palette.primary.main
                    },
                    "& img": {
                        width: "24px",
                        objectFit: "cover"
                    },
                    "& p": {
                        width: "100%",
                        overflow: "hidden",
                        textAlign: "start",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis"
                    },
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: theme.palette.primary.main
                    }
                },
                "&:hover": {
                    backgroundColor: "transparent"
                }
            }
        },
        mobMenuImage: {
            width: "100%",
            display: "flex",
            alignItems: "center",
            marginBottom: "15px",
            justifyContent: "center",
            padding: "16px !important",
            backgroundColor: theme.palette.secondary.dark + "!important",
            "& a": {
                padding: "2px 0 !important"
            },
            "& img": {
                width: "145px !important"
            }
        },
        mobAccordion: {
            width: "100%",
            marginTop: "0 !important",
            boxShadow: "none !important",
            marginBottom: "0 !important",
            padding: "7px 15px !important",
            backgroundColor: "transparent !important",
            "&:before": {
                content: "none"
            }
        },
        mobMenuTitle: {
            padding: 0,
            minHeight: "auto !important",
            alignItems: "center !important",
            "& h6": {
                width: "95%",
                display: "flex",
                fontSize: "16px",
                lineHeight: "24px",
                textTransform: "capitalize",
                "& svg": {
                    marginRight: "10px",
                    marginBottom: "-5px",
                    transform: "none !important"
                },
                "& img": {
                    width: "22px",
                    objectFit: "cover",
                    marginRight: "10px"
                },
                "& p": {
                    width: "100%",
                    overflow: "hidden",
                    textAlign: "start",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                }
            },
            "& .MuiAccordionSummary-content": {
                gap: 5,
                display: "flex",
                alignItems: "center",
                margin: "0 !important",
            },
            "& svg": {
                width: "22px !important",
                height: "22px !important"
            },
            "&.Mui-expanded": {
                margin: "0 0 10px !important",
                color: theme.palette.primary.main + "!important",
                "& svg": {
                    transform: "rotate(45deg)",
                    color: theme.palette.primary.main + "!important",
                }
            },
            "&:hover": {
                color: theme.palette.primary.main + "!important",
                "& svg": {
                    color: theme.palette.primary.main + "!important"
                }
            }
        },
        mobMenuBody: {
            padding: "0 15px",
            "& a, & button": {
                fontSize: "16px",
                lineHeight: "16px",
                textDecoration: "none",
                color: theme.palette.secondary.dark,
                "& p": {
                    width: "100%",
                    overflow: "hidden",
                    textAlign: "start",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis"
                }
            }
        },
        mobProfile: {
            width: "125px !important"
        }
    };
});
exports.default = useStyles;
//# sourceMappingURL=theme.js.map