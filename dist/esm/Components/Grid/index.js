var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState } from "react";
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
export const Grid = (_a) => {
    var _b;
    var { dataSource, schema, actions, toolbar, initialState, pageSizeOptions, dispatch } = _a, props = __rest(_a, ["dataSource", "schema", "actions", "toolbar", "initialState", "pageSizeOptions", "dispatch"]);
    const Icons = MuiIcons;
    const { classes } = useStyles();
    const [gridData, setGridData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [addNew, setAddNew] = useState(false);
    const [update, setUpdate] = useState(false);
    const [delModal, setDelModal] = useState(false);
    // Static Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            Request({ dataSource: Object.assign({}, dataSource), dispatch, callBack: (ResponseData) => setGridData(ResponseData) }).then();
        }
    }, [dataSource, dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dispatch]);
    // Default Schema
    const defaultSchema = !!gridData.length ? (_b = Object.keys(gridData[0])) === null || _b === void 0 ? void 0 : _b.map((columnKey) => ({ field: columnKey, flex: (columnKey === ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.primaryKey) ? dataSource.primaryKey : "id") ? 0 : 1), component: "input", width: 100 })) : [];
    // Columns Schema
    const columnsSchema = [...(schema ? schema : defaultSchema), ...(actions
            ? [{ field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions",
                    getActions: ({ row }) => {
                        return [
                            React.createElement(GridActionsCellItem, { icon: React.createElement(Icons.Edit, null), label: "Edit", onClick: () => { setUpdate(true); setSelectedData(row); } }),
                            React.createElement(GridActionsCellItem, { icon: React.createElement(Icons.Delete, null), label: "Delete", onClick: () => { setDelModal(true); setSelectedData(row); } })
                        ];
                    }
                }] : [])
    ];
    // Custom Toolbar
    const CustomToolbar = () => {
        return (React.createElement(GridToolbarContainer, null,
            React.createElement(GridToolbarColumnsButton, null),
            React.createElement(GridToolbarFilterButton, null),
            React.createElement(GridToolbarExport, null),
            actions && (React.createElement(Button, { onClick: () => setAddNew(true), type: "button" },
                React.createElement(Icons.Add, null),
                " Add New"))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { title: "Add New Item", open: addNew, setOpen: setAddNew },
            React.createElement(Form, { dataSource: dataSource, schema: schema ? schema : defaultSchema, mode: "create" })),
        React.createElement(Modal, { title: "Update Item", open: update, setOpen: setUpdate },
            React.createElement(Form, { dataSource: Object.assign(Object.assign({}, dataSource), { staticData: selectedData }), schema: schema ? schema : defaultSchema, mode: "update" })),
        React.createElement(Modal, { title: "Delete Item", open: delModal, setOpen: setDelModal },
            React.createElement(MuiGrid, { container: true, spacing: 2 },
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Typography, { color: theme => theme.palette.error.main }, "Are You Sure To Delete This Item?")),
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Button, { fullWidth: true, type: "button", variant: "contained", onClick: () => Request({ dataSource, mode: "delete", apiUrlId: dataSource.primaryKey ? selectedData[dataSource.primaryKey] : selectedData.id, callBack: () => setDelModal(false), dispatch }).then() }, "Delete")))),
        React.createElement(Box, { className: classes.root },
            React.createElement(DataGrid, Object.assign({ className: !(gridData === null || gridData === void 0 ? void 0 : gridData.length) ? classes.empty : "", rows: gridData, columns: columnsSchema, density: "compact" }, props, { getRowClassName: (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : ""), initialState: initialState ? initialState : {
                    pagination: { paginationModel: { pageSize: 15 } }
                }, pageSizeOptions: pageSizeOptions ? pageSizeOptions : [15, 25, 35, 50, 100], slots: {
                    toolbar: toolbar ? CustomToolbar : null
                } })))));
};
//# sourceMappingURL=index.js.map