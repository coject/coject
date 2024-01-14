"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const react_1 = __importStar(require("react"));
// Request
const Services_1 = require("../../Services");
// Material UI
const material_1 = require("@mui/material");
// Material UI Table
const x_data_grid_1 = require("@mui/x-data-grid");
// Coject
const index_1 = require("../index");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Grid = ({ dataSource, staticData, callback, localeText, customKey, onAddCallback, onEditCallback, onDeleteCallback, schema, actions, customActions, invisibility, formInvisibility, toolbar, customToolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
    const { classes } = (0, theme_1.default)();
    const [gridData, setGridData] = (0, react_1.useState)([]);
    const [schemaData, setSchemaData] = (0, react_1.useState)({});
    const [selectedData, setSelectedData] = (0, react_1.useState)(null);
    const [, forceUpdate] = (0, react_1.useReducer)(x => x + 1, 0);
    const [callData, setCallData] = (0, react_1.useState)(false);
    const [addModal, setAddModal] = (0, react_1.useState)(false);
    const [editModal, setEditModal] = (0, react_1.useState)(false);
    const [deleteModal, setDeleteModal] = (0, react_1.useState)(false);
    // Static Data
    (0, react_1.useEffect)(() => {
        if (staticData && !dataSource?.apiUrl) {
            setGridData(staticData);
        }
    }, [dataSource?.apiUrl, staticData]);
    // Dynamic Data
    (0, react_1.useEffect)(() => {
        if (dataSource?.apiUrl && !staticData) {
            (0, Services_1.Request)({ dataSource, dispatch, callback: (data) => {
                    setGridData(data);
                    callback && callback(data);
                } }).then();
        }
    }, [callData, dataSource, dataSource?.apiUrl, dispatch, staticData, callback]);
    // Dynamic Data ( Schema )
    (0, react_1.useEffect)(() => {
        if (schema) {
            schema.map((field) => {
                if (field.component === "select" && field.componentProps?.dataSource && !field.componentProps.staticData) {
                    return (0, Services_1.Request)({ dataSource: field.componentProps.dataSource, callback: (data) => {
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
    (0, react_1.useEffect)(() => {
        if (schema) {
            schema.map((columnSchema) => {
                if (columnSchema.headerName) {
                    if (columnSchema.componentProps)
                        columnSchema.componentProps.label = columnSchema.headerName;
                    else
                        columnSchema.componentProps = { label: columnSchema.headerName };
                }
                if (columnSchema.component === "date" && !columnSchema.renderCell) {
                    columnSchema.renderCell = (data) => react_1.default.createElement(index_1.DatePicker, { value: data.value, ...columnSchema.componentProps, textView: true });
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
                return (react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { key: index, label: label, icon: label === "edit" ? react_1.default.createElement(index_1.Icons.Edit, null) : react_1.default.createElement(index_1.Icons.Delete, null), onClick: () => {
                        (label === "edit") ? setEditModal(true) : setDeleteModal(true);
                        setSelectedData(row);
                    } }));
            }
            else
                return undefined;
        }).filter((element) => element !== undefined)
        : [
            react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { label: "edit", icon: react_1.default.createElement(index_1.Icons.Edit, null), onClick: () => { setEditModal(true); setSelectedData(row); } }),
            react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { label: "delete", icon: react_1.default.createElement(index_1.Icons.Delete, null), onClick: () => { setDeleteModal(true); setSelectedData(row); } })
        ]);
    // Grid Custom Actions
    const gridCustomActions = (row) => customActions?.map((action, index) => {
        const ActionIcon = index_1.Icons[action.icon];
        return (react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { key: index, label: action.label, icon: react_1.default.createElement(ActionIcon, null), onClick: (event) => action.onClick(event, row) }));
    }).filter((element) => element !== undefined);
    // Columns Schema
    const columnsSchema = [...(schema ? schema : defaultSchema), ...(actions
            ? [{ field: "actions", type: "actions", headerName: localeText && localeText?.gridHeaderAction || "Actions", width: 100, cellClassName: "actions", getActions: ({ row }) => ([...(gridActions(row) || []), ...(gridCustomActions(row) || [])]) }]
            : [])];
    // Custom Toolbar
    const CustomToolbar = () => {
        return (react_1.default.createElement(x_data_grid_1.GridToolbarContainer, null,
            toolbar &&
                react_1.default.createElement(react_1.default.Fragment, null,
                    toolbar instanceof Array ? (toolbar?.includes("visibility") && react_1.default.createElement(x_data_grid_1.GridToolbarColumnsButton, null)) : react_1.default.createElement(x_data_grid_1.GridToolbarColumnsButton, null),
                    toolbar instanceof Array ? (toolbar?.includes("filter") && react_1.default.createElement(x_data_grid_1.GridToolbarFilterButton, null)) : react_1.default.createElement(x_data_grid_1.GridToolbarFilterButton, null),
                    toolbar instanceof Array ? (toolbar?.includes("export") && react_1.default.createElement(x_data_grid_1.GridToolbarExport, null)) : react_1.default.createElement(x_data_grid_1.GridToolbarExport, null)),
            customToolbar && customToolbar(gridData),
            actions && (actions instanceof Array
                ? (actions?.includes("add") && react_1.default.createElement(material_1.Button, { onClick: () => setAddModal(true), type: "button" },
                    react_1.default.createElement(index_1.Icons.Add, null),
                    " ",
                    localeText && localeText?.toolbarNew || "Add New"))
                : react_1.default.createElement(material_1.Button, { onClick: () => setAddModal(true), type: "button" },
                    react_1.default.createElement(index_1.Icons.Add, null),
                    " ",
                    localeText && localeText?.toolbarNew || "Add New"))));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(index_1.Modal, { title: "Add New Item", open: addModal, setOpen: setAddModal },
            react_1.default.createElement(index_1.Form, { dataSource: dataSource, schema: schema ? schema : defaultSchema, mode: "create", noRequest: noRequest || noAddRequest, ...(invisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onAddSubmit && onAddSubmit(data);
                    !!staticData && setAddModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onAddCallback && onAddCallback(data);
                }, setModal: setAddModal })),
        react_1.default.createElement(index_1.Modal, { title: "Update Item", open: editModal, setOpen: setEditModal },
            react_1.default.createElement(index_1.Form, { dataSource: dataSource, staticData: selectedData, schema: schema ? schema : defaultSchema, mode: "update", noRequest: noRequest || noEditRequest, ...(customKey ? { customKey: customKey } : {}), ...(invisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onEditSubmit && onEditSubmit(data);
                    !!staticData?.length && setEditModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onEditCallback && onEditCallback(data);
                }, setModal: setEditModal })),
        react_1.default.createElement(index_1.Modal, { title: "Delete Item", open: deleteModal, setOpen: setDeleteModal },
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                react_1.default.createElement(material_1.Grid, { item: true, md: 12, lg: 12 },
                    react_1.default.createElement(material_1.Typography, { color: theme => theme.palette.error.main }, "Are You Sure To Delete This Item?")),
                react_1.default.createElement(material_1.Grid, { item: true, md: 12, lg: 12 },
                    react_1.default.createElement(material_1.Button, { fullWidth: true, type: "button", variant: "contained", onClick: () => {
                            onDeleteSubmit && onDeleteSubmit(selectedData);
                            !!staticData?.length && setDeleteModal(false);
                            if (!noRequest || !noDeleteRequest) {
                                (0, Services_1.Request)({
                                    dataSource, mode: "delete", callback: (data) => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                        onDeleteCallback && onDeleteCallback(data);
                                    }, dispatch,
                                    apiUrlId: customKey ? selectedData[customKey] : selectedData.id
                                }).then();
                            }
                        } }, "Delete")))),
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(x_data_grid_1.DataGrid, { className: !gridData?.length ? classes.empty : "", ...(localeText ? { localeText: localeText } : {}), ...(customKey ? { getRowId: (row) => row[customKey] } : {}), rows: gridData, columns: columnsSchema, density: "compact", ...props, pageSizeOptions: props?.pageSizeOptions ? props?.pageSizeOptions : [15, 25, 35, 50, 100], slots: props?.slots ? props?.slots : { toolbar: actions || toolbar ? CustomToolbar : null }, initialState: props?.initialState ? props?.initialState : { pagination: { paginationModel: { pageSize: 15 } } }, getRowClassName: (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : ""), ...(invisibility ? { columnVisibilityModel: invisibility.reduce((prev, key) => ({ ...prev, [key]: false }), {}) } : {}) }))));
};
exports.Grid = Grid;
//# sourceMappingURL=index.js.map