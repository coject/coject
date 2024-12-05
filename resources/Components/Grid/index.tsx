import React, { FC, useEffect, useState, useReducer, ReactNode } from 'react';

// Request
import { Request } from "../../Services";

// Material UI
import { Box, Grid as MuiGrid, Button, Typography } from "@mui/material";

// Material UI Table
import { useGridApiRef, DataGrid, DataGridProps, GridColDef, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport, GridLocaleText } from "@mui/x-data-grid";

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

type iLocaleText = GridLocaleText & {
    toolbarNew?: string;
    modalAddTitle?: string;
    modalAddButton?: string;
    modalEditTitle?: string;
    modalEditButton?: string;
    paginationLabel?: string;
    modalDeleteTitle?: string;
    gridHeaderAction?: string;
    paginationLabelOf?: string;
    modalDeleteButton?: string;
    modalDeleteMessage?: string;
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
    resizable?: boolean;
    dependancies?: any[];
    noRequest?: boolean;
    customToolbar?: any;
    onAddCallback?: any;
    onDeleteSubmit?: any;
    onEditCallback?: any;
    actionsControl?: any;
    schema?: iSchema | any;
    noAddRequest?: boolean;
    onDeleteCallback?: any;
    editFormChildren?: any;
    invisibility?: string[];
    noEditRequest?: boolean;
    dataSource?: iDataSource;
    noRenderRequest?: boolean;
    noDeleteRequest?: boolean;
    addFormChildren?: ReactNode;
    formInvisibility?: string[];
    localeText?: iLocaleText | any;
    actions?: boolean | ("add" | "edit" | "delete")[];
    toolbar?: boolean | ("visibility" | "filter" | "export" | "print")[];
    customActions?: { icon: string, label: string, onClick: any }[];
}

export const Grid: FC<Omit<iGrid, "rows" | "columns">> = ({ dataSource, noRenderRequest, actionsControl,dependancies, resizable, staticData, callback, localeText, customKey, onAddCallback, onEditCallback, addFormChildren, editFormChildren, onDeleteCallback, schema, actions, customActions, invisibility, formInvisibility, toolbar, customToolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
    const apiRef = useGridApiRef();
    const { classes } = useStyles();
    const [ gridData, setGridData ] = useState<any>([]);
    const [ , forceUpdate ] = useReducer(x => x + 1, 0);
    const [ schemaData, setSchemaData ] = useState<any>({});
    const [ openPdf, setOpenPdf ] = useState<boolean>(false);
    const [ callData, setCallData ] = useState<boolean>(false);
    const [ addModal, setAddModal ] = useState<boolean>(false);
    const [ editModal, setEditModal ] = useState<boolean>(false);
    const [ selectedData, setSelectedData ] = useState<any>(null);
    const [ deleteModal, setDeleteModal ] = useState<boolean>(false);

    // Static Data
    useEffect(() => {
        if (staticData) {
            setGridData(staticData);
        }
    }, [staticData]);

    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !staticData && !noRenderRequest) {
            Request({ dataSource, dispatch, callback: (data: any) => {
                setGridData(data);
                callback && callback(data);
            } }).then();
        }
        // eslint-disable-next-line
    }, [callData, dispatch, staticData, callback, noRenderRequest, ...[dependancies]]);

    // Dynamic Data ( Schema )
    useEffect(() => {
        if (schema) {
            schema.map((field: any) => {
                if (field.component === "select" && field.componentProps?.dataSource?.apiUrl) {
                    return Request({ dataSource: field.componentProps.dataSource, callback: (data: any) => {
                        setSchemaData((prev: any) => ({ ...prev, [field.field]: data }));
                    } }).then();
                } else return null;
            })
        }
    }, [...[dependancies]]);

    // Default Schema
    const defaultSchema: any = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => (
        { field: columnKey, component: "input", flex: (columnKey === (customKey ? customKey : "id") ? 0 : 1) }
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
                if (columnSchema.component === "select" && columnSchema.componentProps) {
                    const customKey = columnSchema.componentProps.customKey;
                    const customName = columnSchema.componentProps.customName;
                    columnSchema.type = "singleSelect";
                    columnSchema.getOptionValue = (value: any) => customKey ? value[customKey] : value.id;
                    columnSchema.getOptionLabel = (value: any) => customName ? value[customName] : value.label;
                    if (columnSchema.componentProps.staticData && !columnSchema.componentProps.dataSource?.apiUrl) {
                        columnSchema.valueOptions = columnSchema.componentProps.staticData;
                    } else if (columnSchema.componentProps.dataSource?.apiUrl && !columnSchema.componentProps.staticData) {
                        columnSchema.valueOptions = schemaData[columnSchema.field];
                        columnSchema.componentProps.staticData = schemaData[columnSchema.field];
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
            if (((label === "edit") && (actionsControl?.edit instanceof Function ? actionsControl?.edit(row) : true)) || ((label === "delete") && (actionsControl?.delete instanceof Function ? actionsControl?.delete(row) : true))) { return (
                <GridActionsCellItem id={`coject_${label}`} key={index} label={label} icon={label === "edit" ? <Icons.Edit /> : <Icons.Delete />}
                    onClick={() => {
                        (label === "edit") ? setEditModal(true) : setDeleteModal(true);
                        setSelectedData(row);
                    } }
                />
            ) } else return undefined;
        }).filter(( element ) => element !== undefined)
        : [
            (actionsControl?.edit instanceof Function ? actionsControl?.edit(row) : true) ? <GridActionsCellItem id='coject_edit' label={"edit"} icon={<Icons.Edit />} onClick={() => { setEditModal(true); setSelectedData(row); }} /> : <></>,
            (actionsControl?.delete instanceof Function ? actionsControl?.delete(row) : true) ? <GridActionsCellItem id='coject_delete' label={"delete"} icon={<Icons.Delete />} onClick={() => { setDeleteModal(true); setSelectedData(row); }} /> : <></>
        ]
    );

    // Grid Custom Actions
    const gridCustomActions = (row: any) => customActions?.map((action: { icon: string, label: string, onClick: any }, index: any) => {
        const ActionIcon = Icons[action.icon];
        const ActionLabel = action.label;
        return (
            ((actionsControl && actionsControl[ActionLabel] instanceof Function) ? actionsControl[ActionLabel](row) : true)
            ? <GridActionsCellItem key={index} label={action.label} icon={<ActionIcon />} onClick={(event) => action.onClick(event, row)} />
            : <></>
        )
    }).filter(( element ) => element !== undefined);

    // Columns Schema
    const columnsSchema: any = [...(schema ? (invisibility ? schema.filter((column: any) => (!invisibility.includes(column.field))): schema) : defaultSchema), ...((actions || customActions)
        ? [{ field: "actions", type: "actions", minWidth: 150, headerName: (localeText && localeText?.gridHeaderAction) || "Actions", flex: 1, cellClassName: "actions", getActions: ({ row }: any) => ([...(gridActions(row) || []), ...(gridCustomActions(row) || [])]) }]
        : []
    )];

    // Printing
    const Printing = () => {
        setOpenPdf(true);
        setTimeout(() => {
            const iFrame = (document?.querySelector<any>("#iFrame"));
            iFrame?.contentDocument?.open();
            iFrame?.contentDocument?.write(`
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
                    <style>
                        @media print{
                            .table { background-color: #f5f5f5; text-align: center; width: 100% }
                            .table thead { background-color: #00b366; color:#f5f5f5 }
                            @page { margin-top: 8px }
                        }
                        table {
                            width: 100%;
                            direction: ${localStorage.language === 'ar' ? 'rtl' : 'ltr'};
                        }
                        td, th {
                            padding: 8px;
                            text-align: center;
                            border: 1px solid #dddddd;
                        }
                        tr:nth-child(even) {
                            background-color: #dddddd;
                        }
                    </style>
            `);
            const printData: any = `
            <table>
                <thead>
                    <tr>
                        ${(() => {
                            let result = '';
                            if (schema) {
                                for (let index = 0; index < schema.length; index++) {
                                    if (!invisibility?.find((column: any) => column === schema[index].field)) {
                                        const item = schema[index];
                                        result += `<th key=${index}>${item.headerName}</th>`;
                                    }
                                }
                            }
                            return result;
                        })()}
                    </tr>
                </thead>
                <tbody>
                ${(() => {
                    let rowsResult = '';
                    const allRows = apiRef?.current?.getAllRowIds();
                    if (allRows.length > 0) {
                        for (let index = 0; index < allRows.length; index++) {
                            const element = allRows[index];
                            const rowElement = apiRef?.current?.getRowElement(element);
                            const dataFieldElements: any = rowElement?.querySelectorAll('[data-field]');
                            let row = '<tr>';
                            if (actions || customActions) {
                                for (let i = 0; i < dataFieldElements?.length - 1; i++) {
                                    const dataFieldElement = dataFieldElements[i];
                                    row += `<td key=${i}>${dataFieldElement.innerText}</td>`;
                                }
                            } else {
                                for (let i = 0; i < dataFieldElements?.length; i++) {
                                    const dataFieldElement = dataFieldElements[i];
                                    row += `<td key=${i}>${dataFieldElement.innerText}</td>`;
                                }
                            }
                            row += '</tr>';
                            rowsResult += row;
                        }
                    }
                    return rowsResult;
                })()}
                </tbody>
            </table>`;
            iFrame?.contentDocument?.write(printData);
            iFrame?.contentDocument?.close();
            iFrame?.contentWindow?.focus();
            iFrame?.contentWindow?.print();
        }, 1000);
        setTimeout(() => {
            setOpenPdf(false);
        }, 1000);
    }

    // Custom Toolbar
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                { toolbar &&
                    <React.Fragment>
                        { toolbar instanceof Array ? (toolbar?.includes("visibility") && <GridToolbarColumnsButton slotProps={{button: {id: "grid_visibility"}}} />) : <GridToolbarColumnsButton slotProps={{button: {id: "grid_visibility"}}} /> }
                        { toolbar instanceof Array ? (toolbar?.includes("filter") && <GridToolbarFilterButton slotProps={{button: {id: "grid_filter"}}} />) : <GridToolbarFilterButton slotProps={{button: {id: "grid_filter"}}} /> }
                        { toolbar instanceof Array ? (toolbar?.includes("export") && <GridToolbarExport slotProps={{button: {id: "grid_export"}}} csvOptions={{utf8WithBom: true}} printOptions={{ disableToolbarButton: true }} />) : <GridToolbarExport slotProps={{button: {id: "grid_export"}}} csvOptions={{utf8WithBom: true}} printOptions={{ disableToolbarButton: true }} /> }
                        { toolbar instanceof Array ? (toolbar?.includes("print") && <Button id="grid_print" onClick={Printing}><Icons.SimCardDownloadOutlined />{localeText?.toolbarExportPrint || "Print"}</Button>) : <Button id="grid_print" onClick={Printing}><Icons.SimCardDownloadOutlined />{localeText?.toolbarExportPrint || "Print"}</Button>}
                    </React.Fragment>
                } 
                { customToolbar && customToolbar(gridData) }
                { actions && ( actions instanceof Array
                    ? ( actions?.includes("add") && <Button className={'grid_create_button'} id='coject_add' onClick={() => setAddModal(true)} type={"button"}><Icons.Add /> {(localeText && localeText?.toolbarNew) || "Add New"}</Button> )
                    : <Button className={'grid_create_button'} id='coject_add' onClick={() => setAddModal(true)} type={"button"}><Icons.Add /> {(localeText && localeText?.toolbarNew) || "Add New"}</Button> )
                }
            </GridToolbarContainer>
        );
    };

    return (
        <React.Fragment>
            {/* Create Modal */}
            <Modal className={"grid_create_modal"} title={localeText?.modalAddTitle || "Add New Item"} open={addModal} setOpen={setAddModal}>
                <Form dataSource={dataSource} schema={schema ? schema : defaultSchema} mode={"create"} noRequest={(noRequest || noAddRequest) && !!dataSource} {...(formInvisibility ? {invisibility: formInvisibility} : {})} onSubmit={(data: any) => {
                    onAddSubmit && onAddSubmit(data);
                    !!staticData && setAddModal(false);
                }} callback={(data: any) => {
                    setCallData(!callData);
                    onAddCallback && onAddCallback(data);
                }} setModal={setAddModal} {...(localeText?.modalAddButton ? {localeText: {submitButton: localeText?.modalAddButton}} : {})}>
                    {addFormChildren && addFormChildren}
                </Form>
            </Modal>

            {/* Update Modal */}
            <Modal className={"grid_update_modal"} title={localeText?.modalEditTitle || "Update Item"} open={editModal} setOpen={setEditModal}>
                <Form dataSource={dataSource} staticData={selectedData} schema={schema ? schema : defaultSchema} mode={"update"} noRequest={(noRequest || noEditRequest) && !!dataSource} {...(customKey ? {customKey: customKey} : {})} {...(formInvisibility ? {invisibility: formInvisibility} : {})} onSubmit={(data: any) => {
                    onEditSubmit && onEditSubmit(data);
                    !!staticData?.length && setEditModal(false);
                }} callback={(data: any) => {
                    setCallData(!callData);
                    onEditCallback && onEditCallback(data);
                }} setModal={setEditModal} {...(localeText?.modalEditButton ? {localeText: {submitButton: localeText?.modalEditButton}} : {})}>
                    {editFormChildren && editFormChildren(selectedData)}
                </Form>
            </Modal>

            {/* Delete Modal */}
            <Modal className={"grid_delete_modal"} title={localeText?.modalDeleteTitle || "Delete Item"} open={deleteModal} setOpen={setDeleteModal}>
                <MuiGrid container spacing={2}>
                    <MuiGrid item md={12} lg={12}>
                        <Typography color={theme => theme.palette.error.main}>{localeText?.modalDeleteMessage || "Are You Sure To Delete This Item?"}</Typography>
                    </MuiGrid>
                    <MuiGrid item md={12} lg={12}>
                        <Button fullWidth type={"button"} variant={"contained"} onClick={() => {
                            onDeleteSubmit && onDeleteSubmit(selectedData);
                            !!staticData?.length && setDeleteModal(false);
                            if (!(noRequest || noDeleteRequest) && !!dataSource) {
                                Request({
                                    dataSource, mode: "delete", callback: (data: any) => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                        onDeleteCallback && onDeleteCallback(data);
                                    }, dispatch,
                                    apiUrlId: customKey ? selectedData[customKey] : selectedData.id
                                }).then()
                            } }}>{localeText?.modalDeleteButton || "Delete"}</Button>
                    </MuiGrid>
                </MuiGrid>
            </Modal>

            {/* Data Grid */}
            <Box className={`${classes.root} coject_grid`}>
                <DataGrid apiRef={apiRef} className={!gridData?.length ? classes.empty : ""}
                    { ...(localeText ? { localeText: localeText } : {}) }
                    { ...(customKey ? { getRowId: (row : any) => row[customKey] } : {}) }
                    rows={gridData} columns={columnsSchema} density={"compact"} {...props}
                    pageSizeOptions={props?.pageSizeOptions ? props?.pageSizeOptions : [15, 25, 35, 50, 100]}
                    slotProps={{
                        ...(props?.slotProps ? props.slotProps : {}),
                        ...((localeText?.paginationLabel) || (localeText?.paginationLabelOf) ? {
                            pagination: {
                                ...(props?.slotProps?.pagination ? props.slotProps.pagination : {}),
                                ...(localeText?.paginationLabel ? {labelRowsPerPage: localeText.paginationLabel} : {}),
                                ...(localeText?.paginationLabelOf ? {labelDisplayedRows: (paginationInfo) => {
                                    return (
                                        paginationInfo.from + " - " + paginationInfo.to + " " + localeText.paginationLabelOf + " " + paginationInfo.count
                                    )
                                }} : {}),
                            }
                        } : {})
                    }}
                    disableVirtualization
                    disableColumnResize={!resizable}
                    paginationMode={openPdf ? 'server' : 'client'}
                    {...(openPdf ? {rowCount: gridData?.length} : {})}
                    initialState={props?.initialState ? props?.initialState : {pagination: {paginationModel: {pageSize: 15}}}}
                    slots={props?.slots ? props?.slots : {toolbar: actions || toolbar || customToolbar ? CustomToolbar : null}}
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : "")}
                />
            </Box>
            
            {/* Printing */}
            <iframe id={'iFrame'} title={'iFrame'} style={{ display: 'none', position: 'absolute', width: 0, height: 0 }} />
        </React.Fragment>
    );
};