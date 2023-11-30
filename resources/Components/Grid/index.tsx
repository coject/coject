import React, { FC, useEffect, useState } from "react";

// Request
import { Request } from "../../Services";

// Material UI
import { Box, Grid as MuiGrid, Button, Typography } from "@mui/material";

// Material UI Icons
import * as MuiIcons from "@mui/icons-material";

// Material UI Table
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";

// Components
import { Form, Modal } from "../index";

// Styles
import useStyles from "./theme";

// Interface
interface iGrid {
    schema?: any;
    dispatch?: any;
    dataSource?: any;
    actions?: boolean;
    toolbar?: boolean;
    initialState?: any;
    pageSizeOptions?: number[];
}

export const Grid: FC<iGrid> = ({ dataSource, schema, actions, toolbar, initialState, pageSizeOptions, dispatch, ...props }) => {
    const Icons: any = MuiIcons;
    const { classes } = useStyles();
    const [ gridData, setGridData ] = useState<any>([]);
    const [ selectedData, setSelectedData ] = useState<any>(null);
    const [ addNew, setAddNew ] = useState<boolean>(false);
    const [ update, setUpdate ] = useState<boolean>(false);
    const [ delModal, setDelModal ] = useState<boolean>(false);

    // Static Data
    useEffect(() => {
        if (dataSource?.staticData && !!dataSource.staticData.length && !dataSource?.apiUrl) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource?.apiUrl, dataSource?.staticData]);

    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !dataSource.staticData) {
            Request({ dataSource: { ...dataSource }, dispatch, callBack: (ResponseData: any) => setGridData(ResponseData) }).then();
        }
    }, [dataSource, dataSource?.apiUrl, dispatch]);

    // Default Schema
    const defaultSchema: any = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => ({ field: columnKey, flex: (columnKey === (dataSource?.primaryKey ? dataSource.primaryKey : "id") ? 0 : 1), component: "input", width: 100 })) : [];

    // Columns Schema
    const columnsSchema: any = [ ...(schema ? schema : defaultSchema), ...(actions
        ? [ { field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions",
            getActions: ({ row }: any) => {
                return [
                    <GridActionsCellItem icon={<Icons.Edit />} label="Edit" onClick={() => { setUpdate(true); setSelectedData(row) }} />,
                    <GridActionsCellItem icon={<Icons.Delete />} label="Delete" onClick={() => { setDelModal(true); setSelectedData(row) }} />
                ];
            }
        }] : [])
    ];

    // Custom Toolbar
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
                { actions && ( <Button onClick={() => setAddNew(true)} type={"button"}><Icons.Add /> Add New</Button> )}
            </GridToolbarContainer>
        );
    };

    return (
        <React.Fragment>
            {/* Create Modal */}
            <Modal title={"Add New Item"} open={addNew} setOpen={setAddNew}><Form dataSource={dataSource} schema={schema ? schema : defaultSchema} mode={"create"} /></Modal>

            {/* Update Modal */}
            <Modal title={"Update Item"} open={update} setOpen={setUpdate}><Form dataSource={{...dataSource, staticData: selectedData}} schema={schema ? schema : defaultSchema} mode={"update"} /></Modal>

            {/* Delete Modal */}
            <Modal title={"Delete Item"} open={delModal} setOpen={setDelModal}>
                <MuiGrid container spacing={2}>
                    <MuiGrid item md={12} lg={12}>
                        <Typography color={theme => theme.palette.error.main}>Are You Sure To Delete This Item?</Typography>
                    </MuiGrid>
                    <MuiGrid item md={12} lg={12}>
                        <Button fullWidth type={"button"} variant={"contained"} onClick={() => Request({ dataSource, mode: "delete", apiUrlId: dataSource.primaryKey ? selectedData[dataSource.primaryKey] : selectedData.id, callBack: () => setDelModal(false), dispatch }).then()}>Delete</Button>
                    </MuiGrid>
                </MuiGrid>
            </Modal>

            {/* Data Grid */}
            <Box className={classes.root}>
                <DataGrid className={!gridData?.length ? classes.empty : ""} rows={gridData} columns={columnsSchema} density={"compact"} {...props}
                    getRowClassName={(params) => (
                        params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : ""
                    )}
                    initialState={initialState ? initialState : {
                        pagination: { paginationModel: { pageSize: 15 } }
                    }}
                    pageSizeOptions={pageSizeOptions ? pageSizeOptions : [15, 25, 35, 50, 100]}
                    slots={{
                        toolbar: toolbar ? CustomToolbar : null
                    }}
                />
            </Box>
        </React.Fragment>
    );
};
