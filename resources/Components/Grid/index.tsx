import React, { FC, useEffect, useState, useReducer } from "react";

// Request
import { Request } from "../../Services";

// Material UI
import { Box, Grid as MuiGrid, Button, Typography } from "@mui/material";

// Material UI Icons
import * as MuiIcons from "@mui/icons-material";

// Material UI Table
import { DataGrid, DataGridProps, GridColDef, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";

// Coject
import { Form, DatePicker, Modal } from "../index";

// Styles
import useStyles from "./theme";

// Interface
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
}
interface iGrid extends DataGridProps {
    dispatch?: any;
    noRequest?: any;
    dataSource?: any;
    toolbar?: boolean;
    actions?: boolean;
    onAddSubmit?: any;
    customKey?: string;
    onEditSubmit?: any;
    onDeleteSubmit?: any;
    schema?: iSchema | any;
    noAddRequest?: boolean;
    invisibility?: string[];
    noEditRequest?: boolean;
    noDeleteRequest?: boolean;
    formInvisibility?: string[];
}

export const Grid: FC<Omit<iGrid, "rows" | "columns">> = ({ dataSource, customKey, schema, actions, invisibility, formInvisibility, toolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
    const Icons: any = MuiIcons;
    const { classes } = useStyles();
    const [ gridData, setGridData ] = useState<any>([]);
    const [ schemaData, setSchemaData ] = useState<any>({});
    const [ selectedData, setSelectedData ] = useState<any>(null);
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const [ callData, setCallData ] = useState<boolean>(false);
    const [ addModal, setAddModal ] = useState<boolean>(false);
    const [ editModal, setEditModal ] = useState<boolean>(false);
    const [ deleteModal, setDeleteModal ] = useState<boolean>(false);

    // Static Data
    useEffect(() => {
        if (dataSource?.staticData && !dataSource?.apiUrl) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource?.apiUrl, dataSource?.staticData]);

    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !dataSource.staticData) {
            Request({ dataSource, dispatch, callBack: (data: any) => setGridData(data) }).then();
        }
    }, [callData, dataSource, dataSource?.apiUrl, dispatch]);

    // Dynamic Data ( Schema )
    useEffect(() => {
        if (schema) {
            schema.map((field: any) => {
                if (field.component === "select" && field.componentProps?.dataSource && !field.componentProps.dataSource.staticData) {
                    return Request({ dataSource: field.componentProps.dataSource, callBack: (data: any) => setSchemaData((prev: any) => ({...prev, [field.field]: data})) }).then();
                } else return null;
            })
        }
    }, [schema]);

    // Default Schema
    const defaultSchema: any = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => (
        {
            field: columnKey,
            component: "input",
            flex: (columnKey === (dataSource?.primaryKey ? dataSource.primaryKey : "id") ? 0 : 1)
        }
    )) : [];

    // Custom Schema
    useEffect(() => {
        if (schema) {
            schema.map((columnSchema: any) => {
                if (columnSchema.headerName) {
                    if (columnSchema.componentProps) columnSchema.componentProps.label = columnSchema.headerName
                    else columnSchema.componentProps = {label: columnSchema.headerName}
                }
                if (columnSchema.component === "date" && !columnSchema.renderCell) {
                    columnSchema.renderCell     = (data: any) => <DatePicker value={data.value} textView />;
                }
                if (columnSchema.component === "select" && columnSchema.componentProps?.dataSource) {
                    const customKey = columnSchema.componentProps.customKey;
                    const customName = columnSchema.componentProps.customName;
                    columnSchema.type = "singleSelect";
                    columnSchema.getOptionValue = (value: any) => customKey ? value[customKey] : value.id;
                    columnSchema.getOptionLabel = (value: any) => customName ? value[customName] : value.label;
                    if (columnSchema.componentProps.dataSource.staticData) {
                        columnSchema.valueOptions = columnSchema.componentProps.dataSource.staticData;
                        columnSchema.componentProps.dataSource = { staticData: columnSchema.componentProps.dataSource.staticData };
                    } else {
                        columnSchema.valueOptions = schemaData[columnSchema.field];
                        columnSchema.componentProps.dataSource = { staticData: schemaData[columnSchema.field] };
                    }
                }
                return ({ ...columnSchema });
            })
        }
        forceUpdate();
    }, [forceUpdate, schema, schemaData]);

    // Columns Schema
    const columnsSchema: any = [ ...(schema ? schema : defaultSchema), ...(actions
        ? [ { field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions",
            getActions: ({ row }: any) => {
                return [
                    <GridActionsCellItem icon={<Icons.Edit />} label="Edit" onClick={() => { setEditModal(true); setSelectedData(row) }} />,
                    <GridActionsCellItem icon={<Icons.Delete />} label="Delete" onClick={() => { setDeleteModal(true); setSelectedData(row) }} />
                ];
            }
        }] : [])
    ];

    // Custom Toolbar
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                { toolbar &&
                    <React.Fragment>
                        <GridToolbarColumnsButton/>
                        <GridToolbarFilterButton />
                        <GridToolbarExport />
                    </React.Fragment>
                }
                { actions &&
                    <Button onClick={() => setAddModal(true)} type={"button"}><Icons.Add /> Add New</Button>
                }
            </GridToolbarContainer>
        );
    };

    return (
        <React.Fragment>
            {/* Create Modal */}
            <Modal title={"Add New Item"} open={addModal} setOpen={setAddModal}>
                <Form dataSource={dataSource} schema={schema ? schema : defaultSchema} mode={"create"} noRequest={noRequest || noAddRequest} {...(invisibility ? {invisibility: formInvisibility} : {})} onSubmit={(data: any) => {
                    onAddSubmit && onAddSubmit(data);
                    !!dataSource?.staticData && setAddModal(false);
                }} onSuccess={() => setCallData(!callData)} setModal={setAddModal} />
            </Modal>

            {/* Update Modal */}
            <Modal title={"Update Item"} open={editModal} setOpen={setEditModal}>
                <Form dataSource={{...dataSource, staticData: selectedData}} schema={schema ? schema : defaultSchema} mode={"update"} noRequest={noRequest || noEditRequest} {...(invisibility ? {invisibility: formInvisibility} : {})} onSubmit={(data: any) => {
                    onEditSubmit && onEditSubmit(data);
                    !!dataSource?.staticData?.length && setEditModal(false);
                }} onSuccess={() => setCallData(!callData)} setModal={setEditModal} />
            </Modal>

            {/* Delete Modal */}
            <Modal title={"Delete Item"} open={deleteModal} setOpen={setDeleteModal}>
                <MuiGrid container spacing={2}>
                    <MuiGrid item md={12} lg={12}>
                        <Typography color={theme => theme.palette.error.main}>Are You Sure To Delete This Item?</Typography>
                    </MuiGrid>
                    <MuiGrid item md={12} lg={12}>
                        <Button fullWidth type={"button"} variant={"contained"} onClick={() => {
                            onDeleteSubmit && onDeleteSubmit(selectedData);
                            !!dataSource?.staticData?.length && setDeleteModal(false);
                            if (!noRequest || !noDeleteRequest) {
                                Request({
                                    dataSource, mode: "delete", callBack: () => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                    }, dispatch,
                                    apiUrlId: dataSource.primaryKey ? selectedData[dataSource.primaryKey] : selectedData.id
                                }).then()
                            } }}>Delete</Button>
                    </MuiGrid>
                </MuiGrid>
            </Modal>

            {/* Data Grid */}
            <Box className={classes.root}>
                <DataGrid className={!gridData?.length ? classes.empty : ""}
                    { ...(customKey ? { getRowId: (row : any) => row[customKey] } : {}) }
                    rows={gridData} columns={columnsSchema} density={"compact"} {...props}
                    pageSizeOptions={props?.pageSizeOptions ? props?.pageSizeOptions : [15, 25, 35, 50, 100]}
                    slots={props?.slots ? props?.slots : {toolbar: actions || toolbar ? CustomToolbar : null}}
                    initialState={props?.initialState ? props?.initialState : {pagination: {paginationModel: {pageSize: 15}}}}
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : "")}
                    { ...(invisibility ? {columnVisibilityModel: invisibility.reduce((prev: any, key: string) => ({ ...prev, [key]: false}), {}) } : {}) }
                />
            </Box>
        </React.Fragment>
    );
};