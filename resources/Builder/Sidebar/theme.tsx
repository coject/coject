import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            width: "250px",
            display: "flex",
            flexDirection: "column",
            height: "calc(100vh - 70px)",
            color: theme.palette.primary.light,
            backgroundColor: theme.palette.secondary.dark,
            transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
        },
        closedSidebar: {
            width: "70px !important"
        },
        sidebarList: {
            gap: 16,
            display: "flex",
            overflow: "auto",
            padding: "22px 20px",
            flexDirection: "column"
        },
        button: {
            gap: 10,
            margin: 0,
            padding: 0,
            display: "flex",
            fontSize: "13px",
            minWidth: "auto",
            minHeight: "auto",
            lineHeight: "13px",
            alignItems: "center",
            textTransform: "capitalize",
            justifyContent: "flex-start",
            color: theme.palette.primary.light,
            backgroundColor: "transparent !important",
            "& svg": {
                width: "22px",
                height: "22px",
                color: theme.palette.primary.contrastText
            },
            "& img": {
                width: "22px",
                objectFit: "cover"
            },
            "&:hover": {
                color: theme.palette.primary.contrastText
            }
        },
        accordion: {
            width: "100%",
            margin: "0 !important",
            boxShadow: "none !important",
            backgroundColor: "transparent !important",
            "&:before": {
                content: "none"
            },
            "& .MuiAccordionDetails-root": {
                padding: 0
            }
        },
        accordionTitle: {
            padding: 0,
            borderRadius: 0,
            minHeight: "auto !important",
            transition: "background-color .4s ease",
            "& .MuiAccordionSummary-content": {
                gap: 10,
                display: "flex",
                fontSize: "13px",
                lineHeight: "13px",
                alignItems: "center",
                margin: "0 !important",
                color: theme.palette.primary.light,
                "& svg": {
                    width: "22px",
                    height: "22px",
                    color: theme.palette.primary.contrastText
                },
                "& img": {
                    width: "22px",
                    objectFit: "cover"
                }
            },
            "& .MuiAccordionSummary-expandIconWrapper": {
                fontSize: "7px",
                marginRight: "auto",
                "& svg": {
                    width: "22px !important",
                    height: "22px !important",
                    color: theme.palette.primary.light + "!important"
                }
            },
            "&:hover .MuiAccordionSummary-content, &:hover svg": {
                color: theme.palette.primary.contrastText + "!important"
            }
        },
        accordionList: {
            gap: 16,
            display: "flex",
            marginTop: "16px",
            flexDirection: "column",
            padding: "0 !important",
            "& li": {
                padding: 0,
                "& a, & button": {
                    gap: 5,
                    margin: 0,
                    width: "100%",
                    fontSize: "13px",
                    lineHeight: "13px",
                    textAlign: "start",
                    alignItems: "center",
                    padding: "0 0 0 32px",
                    justifyContent: "flex-start",
                    color: theme.palette.primary.light,
                    transition: "background-color .4s ease",
                    backgroundColor: "transparent !important",
                    "& svg": {
                        width: "22px !important",
                        height: "22px !important",
                        color: theme.palette.primary.contrastText + "!important"
                    },
                    "& img": {
                        width: "22px",
                        objectFit: "cover"
                    },
                    "&:hover": {
                        color: theme.palette.primary.contrastText + "!important"
                    }
                }
            }
        },
        list: {
            gap: 16,
            padding: 0,
            display: "flex",
            flexDirection: "column"
        },
        listItem: {
            margin: 0,
            padding: 0,
            width: "auto",
            cursor: "pointer",
            justifyContent: "center",
            "& button, & a": {
                margin: 0,
                padding: 0,
                width: "100%",
                fontSize: "13px",
                minWidth: "auto",
                lineHeight: "13px",
                justifyContent: "center",
                textTransform: "capitalize",
                backgroundColor: "transparent !important",
                "& svg": {
                    width: "22px",
                    height: "22px",
                    color: theme.palette.primary.light
                },
                "& img": {
                    width: "22px",
                    objectFit: "cover"
                },
                "&:hover svg": {
                    color: theme.palette.primary.contrastText
                }
            }
        },
        menuList: {
            "& .MuiPaper-root": {
                width: "180px",
                boxShadow: "none",
                overflow: "initial",
                left: "70px !important",
                transform: "translateY(-6px) !important",
                backgroundColor: "transparent !important"
            },
            "& ul": {
                gap: 16,
                display: "flex",
                padding: "16px 20px",
                flexDirection: "column",
                backgroundColor: theme.palette.secondary.dark,
                "& li, & a, & button": {
                    gap: 5,
                    padding: 0,
                    width: "100%",
                    fontSize: "13px",
                    lineHeight: "13px",
                    alignItems: "center",
                    textTransform: "capitalize",
                    justifyContent: "flex-start",
                    color: theme.palette.primary.light,
                    backgroundColor: "transparent !important",
                    "& svg": {
                        width: "22px",
                        height: "22px",
                        color: theme.palette.primary.contrastText
                    },
                    "& img": {
                        width: "22px",
                        objectFit: "cover"
                    },
                    "&:hover": {
                        color: theme.palette.primary.contrastText
                    }
                }
            }
        }
    }
});

export default useStyles;