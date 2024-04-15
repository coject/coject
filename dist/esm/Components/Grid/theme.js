import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => {
    return {
        root: {
            width: "100%",
            "& .dark": {
                backgroundColor: theme.palette.grey[200]
            },
            "& .MuiDataGrid-root": {
                border: "unset"
            },
            "& .MuiDataGrid-toolbarContainer": {
                padding: 0,
                marginBottom: "15px",
                "& button": {
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
                minHeight: "39px !important",
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
                minHeight: "350px"
            }
        },
        empty: {
            "& .MuiDataGrid-virtualScroller": {
                minHeight: "350px"
            }
        }
    };
});
export default useStyles;
//# sourceMappingURL=theme.js.map