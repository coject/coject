import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            width: "100%",
            '& .MuiDataGrid-filler': {
                height: '1px !important'
            },
            "& .dark": {
                backgroundColor: theme.palette.grey[200]
            },
            "& .MuiDataGrid-root": {
                border: "unset"
            },
            "& .MuiDataGrid-row.edited-row": {
                backgroundColor: "rgba(255, 193, 7, 0.15)",
                "&:hover": {
                    backgroundColor: "rgba(255, 193, 7, 0.25)",
                }
            },
            "& .MuiDataGrid-toolbarContainer": {
                padding: 0,
                marginBottom: "15px",
                "& button": {
                    gap: '3px',
                    padding: 0,
                    width: "100px",
                    height: "35px",
                    fontSize: "14px",
                    minHeight: "auto",
                    textTransform: "capitalize",
                    color: theme.palette.grey[900],
                    border: "1px solid" + theme.palette.grey[400],
                    "& svg": {
                        margin: 0,
                        width: "18px",
                        height: "18px",
                        color: theme.palette.primary.main
                    }
                }
            },
            "& .MuiDataGrid-columnHeaders": {
                borderRadius: "unset",
                backgroundColor: theme.palette.primary.main,
                "& .MuiDataGrid-columnHeader": {
                    backgroundColor: theme.palette.primary.main,
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: theme.palette.primary.contrastText
                },
                "& svg": {
                    fill: theme.palette.primary.contrastText
                }
            },
            "& .MuiDataGrid-virtualScroller": {
                minHeight: "100px"
            }
        },
        empty: {
            "& .MuiDataGrid-virtualScroller": {
                minHeight: "100px"
            }
        }
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map