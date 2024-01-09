import React, { useEffect, useState, useReducer } from 'react';
// Request
import { Request } from "../../Services";
// Material UI
import { Box, Grid as MuiGrid, Button, Typography } from "@mui/material";
// Material UI Table
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
// Coject
import { Form, DatePicker, Modal, Icons } from "../index";
// Styles
import useStyles from "./theme";
export const Grid = ({ dataSource, staticData, callback, customKey, onAddCallback, onEditCallback, onDeleteCallback, schema, actions, customActions, invisibility, formInvisibility, toolbar, customToolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
    const { classes } = useStyles();
    const [gridData, setGridData] = useState([]);
    const [schemaData, setSchemaData] = useState({});
    const [selectedData, setSelectedData] = useState(null);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [callData, setCallData] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    // Static Data
    useEffect(() => {
        if (staticData && !dataSource?.apiUrl) {
            setGridData(staticData);
        }
    }, [dataSource?.apiUrl, staticData]);
    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !staticData) {
            Request({ dataSource, dispatch, callback: (data) => {
                    setGridData(data);
                    callback && callback(data);
                } }).then();
        }
    }, [callData, dataSource, dataSource?.apiUrl, dispatch, staticData]);
    // Dynamic Data ( Schema )
    useEffect(() => {
        if (schema) {
            schema.map((field) => {
                if (field.component === "select" && field.componentProps?.dataSource && !field.componentProps.staticData) {
                    return Request({ dataSource: field.componentProps.dataSource, callback: (data) => {
                            setSchemaData((prev) => ({ ...prev, [field.field]: data }));
                        } }).then();
                }
                else
                    return null;
            });
        }
    }, [schema, callback]);
    // Default Schema
    const defaultSchema = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => ({
        field: columnKey,
        component: "input",
        flex: (columnKey === (customKey ? customKey : "id") ? 0 : 1)
    })) : [];
    // Custom Schema
    useEffect(() => {
        if (schema) {
            schema.map((columnSchema) => {
                if (columnSchema.headerName) {
                    if (columnSchema.componentProps)
                        columnSchema.componentProps.label = columnSchema.headerName;
                    else
                        columnSchema.componentProps = { label: columnSchema.headerName };
                }
                if (columnSchema.component === "date" && !columnSchema.renderCell) {
                    columnSchema.renderCell = (data) => React.createElement(DatePicker, { value: data.value, ...columnSchema.componentProps, textView: true });
                }
                if (columnSchema.component === "select" && columnSchema.componentProps?.dataSource) {
                    const customKey = columnSchema.componentProps.customKey;
                    const customName = columnSchema.componentProps.customName;
                    columnSchema.type = "singleSelect";
                    columnSchema.getOptionValue = (value) => customKey ? value[customKey] : value.id;
                    columnSchema.getOptionLabel = (value) => customName ? value[customName] : value.label;
                    if (columnSchema.componentProps.staticData) {
                        columnSchema.valueOptions = columnSchema.componentProps.staticData;
                        columnSchema.componentProps.dataSource = { staticData: columnSchema.componentProps.staticData };
                    }
                    else {
                        columnSchema.valueOptions = schemaData[columnSchema.field];
                        columnSchema.componentProps.dataSource = { staticData: schemaData[columnSchema.field] };
                    }
                }
                return ({ ...columnSchema });
            });
        }
        forceUpdate();
    }, [forceUpdate, schema, schemaData]);
    // Grid Actions
    const gridActions = (row) => actions && (actions instanceof Array
        ? actions?.map((label, index) => {
            if (label === "edit" || label === "delete") {
                return (React.createElement(GridActionsCellItem, { key: index, label: label, icon: label === "edit" ? React.createElement(Icons.Edit, null) : React.createElement(Icons.Delete, null), onClick: () => {
                        (label === "edit") ? setEditModal(true) : setDeleteModal(true);
                        setSelectedData(row);
                    } }));
            }
            else
                return undefined;
        }).filter((element) => element !== undefined)
        : [
            React.createElement(GridActionsCellItem, { label: "edit", icon: React.createElement(Icons.Edit, null), onClick: () => { setEditModal(true); setSelectedData(row); } }),
            React.createElement(GridActionsCellItem, { label: "delete", icon: React.createElement(Icons.Delete, null), onClick: () => { setDeleteModal(true); setSelectedData(row); } })
        ]);
    // Grid Custom Actions
    const gridCustomActions = (row) => customActions?.map((action, index) => {
        const ActionIcon = Icons[action.icon];
        return (React.createElement(GridActionsCellItem, { key: index, label: action.label, icon: React.createElement(ActionIcon, null), onClick: (event) => action.onClick(event, row) }));
    }).filter((element) => element !== undefined);
    // Columns Schema
    const columnsSchema = [...(schema ? schema : defaultSchema), ...(actions
            ? [{ field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions", getActions: ({ row }) => ([...(gridActions(row) || []), ...(gridCustomActions(row) || [])]) }]
            : [])];
    // Custom Toolbar
    const CustomToolbar = () => {
        return (React.createElement(GridToolbarContainer, null,
            toolbar &&
                React.createElement(React.Fragment, null,
                    toolbar instanceof Array ? (toolbar?.includes("visibility") && React.createElement(GridToolbarColumnsButton, null)) : React.createElement(GridToolbarColumnsButton, null),
                    toolbar instanceof Array ? (toolbar?.includes("filter") && React.createElement(GridToolbarFilterButton, null)) : React.createElement(GridToolbarFilterButton, null),
                    toolbar instanceof Array ? (toolbar?.includes("export") && React.createElement(GridToolbarExport, null)) : React.createElement(GridToolbarExport, null)),
            customToolbar && customToolbar(gridData),
            actions && (actions instanceof Array
                ? (actions?.includes("add") && React.createElement(Button, { onClick: () => setAddModal(true), type: "button" },
                    React.createElement(Icons.Add, null),
                    " Add New"))
                : React.createElement(Button, { onClick: () => setAddModal(true), type: "button" },
                    React.createElement(Icons.Add, null),
                    " Add New"))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { title: "Add New Item", open: addModal, setOpen: setAddModal },
            React.createElement(Form, { dataSource: dataSource, schema: schema ? schema : defaultSchema, mode: "create", noRequest: noRequest || noAddRequest, ...(invisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onAddSubmit && onAddSubmit(data);
                    !!staticData && setAddModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onAddCallback && onAddCallback(data);
                }, setModal: setAddModal })),
        React.createElement(Modal, { title: "Update Item", open: editModal, setOpen: setEditModal },
            React.createElement(Form, { dataSource: dataSource, staticData: selectedData, schema: schema ? schema : defaultSchema, mode: "update", noRequest: noRequest || noEditRequest, ...(customKey ? { customKey: customKey } : {}), ...(invisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onEditSubmit && onEditSubmit(data);
                    !!staticData?.length && setEditModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onEditCallback && onEditCallback(data);
                }, setModal: setEditModal })),
        React.createElement(Modal, { title: "Delete Item", open: deleteModal, setOpen: setDeleteModal },
            React.createElement(MuiGrid, { container: true, spacing: 2 },
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Typography, { color: theme => theme.palette.error.main }, "Are You Sure To Delete This Item?")),
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Button, { fullWidth: true, type: "button", variant: "contained", onClick: () => {
                            onDeleteSubmit && onDeleteSubmit(selectedData);
                            !!staticData?.length && setDeleteModal(false);
                            if (!noRequest || !noDeleteRequest) {
                                Request({
                                    dataSource, mode: "delete", callback: (data) => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                        onDeleteCallback && onDeleteCallback(data);
                                    }, dispatch,
                                    apiUrlId: customKey ? selectedData[customKey] : selectedData.id
                                }).then();
                            }
                        } }, "Delete")))),
        React.createElement(Box, { className: classes.root },
            React.createElement(DataGrid, { className: !gridData?.length ? classes.empty : "", ...(customKey ? { getRowId: (row) => row[customKey] } : {}), rows: gridData, columns: columnsSchema, density: "compact", ...props, pageSizeOptions: props?.pageSizeOptions ? props?.pageSizeOptions : [15, 25, 35, 50, 100], slots: props?.slots ? props?.slots : { toolbar: actions || toolbar ? CustomToolbar : null }, initialState: props?.initialState ? props?.initialState : { pagination: { paginationModel: { pageSize: 15 } } }, getRowClassName: (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : ""), ...(invisibility ? { columnVisibilityModel: invisibility.reduce((prev, key) => ({ ...prev, [key]: false }), {}) } : {}) }))));
};
//# sourceMappingURL=index.js.map