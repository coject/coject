import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
    return {
        root: {
            width: "100%",
            height: "50px",
            display: "flex",
            flex: "1 0 50px",
            padding: "0 22px",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.secondary.contrastText,
            boxShadow: "0px 10px 30px 0px rgba(82, 63, 105, 0.05);",
            [theme.breakpoints.down('md')]: {
                justifyContent: "center"
            }
        },
        copyRight: {
            display: "flex",
            alignItems: "center",
            "& p": {
                margin: 0,
                fontSize: "13px",
                lineHeight: "13px",
                color: theme.palette.grey[600]
            },
            "& a, & button": {
                margin: 0,
                padding: "0 3px",
                fontSize: "13px",
                lineHeight: "13px",
                fontWeight: "bolder",
                textDecoration: "none",
                textTransform: "capitalize",
                transition: "color .2s ease",
                color: theme.palette.grey[600],
                "&:hover": {
                    color: theme.palette.primary.main + "!important"
                }
            }
        },
        menuList: {
            gap: 16,
            display: "flex",
            alignItems: "center",
            padding: "0 !important",
            "& li": {
                padding: 0,
                "& a, & button": {
                    gap: 3,
                    padding: 0,
                    minWidth: "auto",
                    fontSize: "13px",
                    lineHeight: "13px",
                    whiteSpace: "nowrap",
                    transition: "color .2s ease",
                    color: theme.palette.grey[600],
                    backgroundColor: "transparent !important",
                    "& svg": {
                        width: "22px",
                        height: "22px"
                    },
                    "& img": {
                        width: "22px",
                        objectFit: "cover"
                    }
                },
                "&:hover a, &:hover button": {
                    color: theme.palette.primary.main + "!important"
                }
            }
        }
    }
});

export default useStyles;