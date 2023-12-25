import React, { useEffect, useState, useReducer } from "react";
// Request
import { Request } from "../../Services";
// Material UI
import { Box, Grid as MuiGrid, Button, Typography } from "@mui/material";
// Material UI Icons
import * as MuiIcons from "@mui/icons-material";
// Material UI Table
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
// Coject
import { Form, DatePicker, Modal } from "../index";
// Styles
import useStyles from "./theme";
export const Grid = ({ dataSource, customKey, schema, actions, toolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
    const Icons = MuiIcons;
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
        if (dataSource?.staticData && !dataSource?.apiUrl) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource?.apiUrl, dataSource?.staticData]);
    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !dataSource.staticData) {
            Request({ dataSource, dispatch, callBack: (data) => setGridData(data) }).then();
        }
    }, [callData, dataSource, dataSource?.apiUrl, dispatch]);
    // Dynamic Data ( Schema )
    useEffect(() => {
        if (schema) {
            schema.map((field) => {
                if (field.component === "select" && field.componentProps?.dataSource && !field.componentProps.dataSource.staticData) {
                    return Request({ dataSource: field.componentProps.dataSource, callBack: (data) => setSchemaData((prev) => ({ ...prev, [field.field]: data })) }).then();
                }
                else
                    return null;
            });
        }
    }, [schema]);
    // Default Schema
    const defaultSchema = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => ({
        field: columnKey,
        component: "input",
        flex: (columnKey === (dataSource?.primaryKey ? dataSource.primaryKey : "id") ? 0 : 1)
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
                    columnSchema.renderCell = (data) => React.createElement(DatePicker, { value: data.value, textView: true });
                }
                if (columnSchema.component === "select" && columnSchema.componentProps?.dataSource) {
                    const customKey = columnSchema.componentProps.customKey;
                    const customName = columnSchema.componentProps.customName;
                    columnSchema.type = "singleSelect";
                    columnSchema.getOptionValue = (value) => customKey ? value[customKey] : value.id;
                    columnSchema.getOptionLabel = (value) => customName ? value[customName] : value.label;
                    if (columnSchema.componentProps.dataSource.staticData) {
                        columnSchema.valueOptions = columnSchema.componentProps.dataSource.staticData;
                        columnSchema.componentProps.dataSource = { staticData: columnSchema.componentProps.dataSource.staticData };
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
    // Columns Schema
    const columnsSchema = [...(schema ? schema : defaultSchema), ...(actions
            ? [{ field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions",
                    getActions: ({ row }) => {
                        return [
                            React.createElement(GridActionsCellItem, { icon: React.createElement(Icons.Edit, null), label: "Edit", onClick: () => { setEditModal(true); setSelectedData(row); } }),
                            React.createElement(GridActionsCellItem, { icon: React.createElement(Icons.Delete, null), label: "Delete", onClick: () => { setDeleteModal(true); setSelectedData(row); } })
                        ];
                    }
                }] : [])
    ];
    // Custom Toolbar
    const CustomToolbar = () => {
        return (React.createElement(GridToolbarContainer, null,
            toolbar &&
                React.createElement(React.Fragment, null,
                    React.createElement(GridToolbarColumnsButton, null),
                    React.createElement(GridToolbarFilterButton, null),
                    React.createElement(GridToolbarExport, null)),
            actions &&
                React.createElement(Button, { onClick: () => setAddModal(true), type: "button" },
                    React.createElement(Icons.Add, null),
                    " Add New")));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { title: "Add New Item", open: addModal, setOpen: setAddModal },
            React.createElement(Form, { dataSource: dataSource, schema: schema ? schema : defaultSchema, mode: "create", noRequest: noRequest || noAddRequest, onSubmit: (data) => {
                    onAddSubmit && onAddSubmit(data);
                    !!dataSource?.staticData && setAddModal(false);
                }, onSuccess: () => setCallData(!callData), setModal: setAddModal })),
        React.createElement(Modal, { title: "Update Item", open: editModal, setOpen: setEditModal },
            React.createElement(Form, { dataSource: { ...dataSource, staticData: selectedData }, schema: schema ? schema : defaultSchema, mode: "update", noRequest: noRequest || noEditRequest, onSubmit: (data) => {
                    onEditSubmit && onEditSubmit(data);
                    !!dataSource?.staticData?.length && setEditModal(false);
                }, onSuccess: () => setCallData(!callData), setModal: setEditModal })),
        React.createElement(Modal, { title: "Delete Item", open: deleteModal, setOpen: setDeleteModal },
            React.createElement(MuiGrid, { container: true, spacing: 2 },
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Typography, { color: theme => theme.palette.error.main }, "Are You Sure To Delete This Item?")),
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Button, { fullWidth: true, type: "button", variant: "contained", onClick: () => {
                            onDeleteSubmit && onDeleteSubmit(selectedData);
                            !!dataSource?.staticData?.length && setDeleteModal(false);
                            if (!noRequest || !noDeleteRequest) {
                                Request({
                                    dataSource, mode: "delete", callBack: () => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                    }, dispatch,
                                    apiUrlId: dataSource.primaryKey ? selectedData[dataSource.primaryKey] : selectedData.id
                                }).then();
                            }
                        } }, "Delete")))),
        React.createElement(Box, { className: classes.root },
            React.createElement(DataGrid, { className: !gridData?.length ? classes.empty : "", ...(customKey ? { getRowId: (row) => row[customKey] } : {}), rows: gridData, columns: columnsSchema, density: "compact", ...props, pageSizeOptions: props?.pageSizeOptions ? props?.pageSizeOptions : [15, 25, 35, 50, 100], slots: props?.slots ? props?.slots : { toolbar: actions || toolbar ? CustomToolbar : null }, initialState: props?.initialState ? props?.initialState : { pagination: { paginationModel: { pageSize: 15 } } }, getRowClassName: (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : "") }))));
};
//# sourceMappingURL=index.js.map