import React, { FC, useEffect, useState, useReducer } from 'react';

// Request
import { Request } from "../../Services";

// Material UI
import { Box, Grid as MuiGrid, Button, Typography } from "@mui/material";

// Material UI Table
import { DataGrid, DataGridProps, GridColDef, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";

// Coject
import { Form, DatePicker, Modal, Icons } from "../index";

// Styles
import useStyles from "./theme";

// Interface
type iSchema = GridColDef & {
    component?: string;
    componentProps?: any;
    componentMedia?: any;
}

interface iDataSource {
    name?: string;
    headers?: any;
    apiUrl?: string;
    baseUrl?: string;
    requestData?: any;
    dataPath?: string;
    method?: "get" | "post" | "put" | "delete";
    create?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    update?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
    delete?: {
        headers?: any;
        apiUrl?: string;
        requestData?: any;
        dataPath?: string;
        method?: "get" | "post" | "put" | "delete";
    };
}

interface iGrid extends DataGridProps {
    dispatch?: any;
    callback?: any;
    staticData?: any;
    onAddSubmit?: any;
    customKey?: string;
    onEditSubmit?: any;
    noRequest?: boolean;
    customToolbar?: any;
    onAddCallback?: any;
    onDeleteSubmit?: any;
    onEditCallback?: any;
    schema?: iSchema | any;
    noAddRequest?: boolean;
    onDeleteCallback?: any;
    invisibility?: string[];
    noEditRequest?: boolean;
    dataSource?: iDataSource;
    noDeleteRequest?: boolean;
    formInvisibility?: string[];
    actions?: boolean | ("add" | "edit" | "delete")[];
    toolbar?: boolean | ("visibility" | "filter" | "export")[];
    customActions?: { icon: string, label: string, onClick: any }[];
}

export const Grid: FC<Omit<iGrid, "rows" | "columns">> = ({ dataSource, staticData, callback, customKey, onAddCallback, onEditCallback, onDeleteCallback, schema, actions, customActions, invisibility, formInvisibility, toolbar, customToolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
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
        if (staticData && !dataSource?.apiUrl) {
            setGridData(staticData);
        }
    }, [dataSource?.apiUrl, staticData]);

    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !staticData) {
            Request({ dataSource, dispatch, callback: (data: any) => {
                setGridData(data);
                callback && callback(data);
            } }).then();
        }
    }, [callData, dataSource, dataSource?.apiUrl, dispatch, staticData, callback]);

    // Dynamic Data ( Schema )
    useEffect(() => {
        if (schema) {
            schema.map((field: any) => {
                if (field.component === "select" && field.componentProps?.dataSource && !field.componentProps.staticData) {
                    return Request({ dataSource: field.componentProps.dataSource, callback: (data: any) => {
                        setSchemaData((prev: any) => ({ ...prev, [field.field]: data }));
                    } }).then();
                } else return null;
            })
        }
    }, [schema, callback]);

    // Default Schema
    const defaultSchema: any = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => (
        {
            field: columnKey,
            component: "input",
            flex: (columnKey === (customKey ? customKey : "id") ? 0 : 1)
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
                    columnSchema.renderCell = (data: any) => <DatePicker value={data.value} {...columnSchema.componentProps} textView />;
                }
                if (columnSchema.component === "select" && columnSchema.componentProps?.dataSource) {
                    const customKey = columnSchema.componentProps.customKey;
                    const customName = columnSchema.componentProps.customName;
                    columnSchema.type = "singleSelect";
                    columnSchema.getOptionValue = (value: any) => customKey ? value[customKey] : value.id;
                    columnSchema.getOptionLabel = (value: any) => customName ? value[customName] : value.label;
                    if (columnSchema.componentProps.staticData) {
                        columnSchema.valueOptions = columnSchema.componentProps.staticData;
                        columnSchema.componentProps.dataSource = { staticData: columnSchema.componentProps.staticData };
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

    // Grid Actions
    const gridActions = (row: any) => actions && ( actions instanceof Array
        ? actions?.map((label: ("add" | "edit" | "delete"), index: any) => {
            if (label === "edit" || label === "delete") { return (
                <GridActionsCellItem key={index} label={label} icon={label === "edit" ? <Icons.Edit /> : <Icons.Delete />}
                    onClick={() => {
                        (label === "edit") ? setEditModal(true) : setDeleteModal(true);
                        setSelectedData(row);
                    } }
                />
            ) } else return undefined;
        }).filter(( element ) => element !== undefined)
        : [
            <GridActionsCellItem label={"edit"} icon={<Icons.Edit />} onClick={() => { setEditModal(true); setSelectedData(row); }} />,
            <GridActionsCellItem label={"delete"} icon={<Icons.Delete />} onClick={() => { setDeleteModal(true); setSelectedData(row); }} />
        ]
    );

    // Grid Custom Actions
    const gridCustomActions = (row: any) => customActions?.map((action: { icon: string, label: string, onClick: any }, index: any) => {
        const ActionIcon = Icons[action.icon];
        return (
            <GridActionsCellItem key={index} label={action.label} icon={<ActionIcon />} onClick={(event) => action.onClick(event, row)} />
        )
    }).filter(( element ) => element !== undefined);

    // Columns Schema
    const columnsSchema: any = [ ...(schema ? schema : defaultSchema), ...( actions
        ? [ { field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions", getActions: ({ row }: any) => ([ ...(gridActions(row) || []), ...(gridCustomActions(row) || []) ])} ]
        : []
    ) ];

    // Custom Toolbar
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                { toolbar &&
                    <React.Fragment>
                        { toolbar instanceof Array ? (toolbar?.includes("visibility") && <GridToolbarColumnsButton />) : <GridToolbarColumnsButton /> }
                        { toolbar instanceof Array ? (toolbar?.includes("filter") && <GridToolbarFilterButton />) : <GridToolbarFilterButton /> }
                        { toolbar instanceof Array ? (toolbar?.includes("export") && <GridToolbarExport />) : <GridToolbarExport /> }
                    </React.Fragment>
                }
                { customToolbar && customToolbar(gridData) }
                { actions && ( actions instanceof Array
                    ? ( actions?.includes("add") && <Button onClick={() => setAddModal(true)} type={"button"}><Icons.Add /> Add New</Button> )
                    : <Button onClick={() => setAddModal(true)} type={"button"}><Icons.Add /> Add New</Button> )
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
                    !!staticData && setAddModal(false);
                }} callback={(data: any) => {
                    setCallData(!callData);
                    onAddCallback && onAddCallback(data);
                }} setModal={setAddModal} />
            </Modal>

            {/* Update Modal */}
            <Modal title={"Update Item"} open={editModal} setOpen={setEditModal}>
                <Form dataSource={dataSource} staticData={selectedData} schema={schema ? schema : defaultSchema} mode={"update"} noRequest={noRequest || noEditRequest} {...(customKey ? {customKey: customKey} : {})} {...(invisibility ? {invisibility: formInvisibility} : {})} onSubmit={(data: any) => {
                    onEditSubmit && onEditSubmit(data);
                    !!staticData?.length && setEditModal(false);
                }} callback={(data: any) => {
                    setCallData(!callData);
                    onEditCallback && onEditCallback(data);
                }} setModal={setEditModal} />
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
                            !!staticData?.length && setDeleteModal(false);
                            if (!noRequest || !noDeleteRequest) {
                                Request({
                                    dataSource, mode: "delete", callback: (data: any) => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                        onDeleteCallback && onDeleteCallback(data);
                                    }, dispatch,
                                    apiUrlId: customKey ? selectedData[customKey] : selectedData.id
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