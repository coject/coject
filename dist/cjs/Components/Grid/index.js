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
const Grid = ({ dataSource, noRenderRequest, actionsControl, resizable, staticData, callback, localeText, customKey, onAddCallback, onEditCallback, addFormChildren, editFormChildren, onDeleteCallback, schema, actions, customActions, invisibility, formInvisibility, toolbar, customToolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
    const apiRef = (0, x_data_grid_1.useGridApiRef)();
    const { classes } = (0, theme_1.default)();
    const [gridData, setGridData] = (0, react_1.useState)([]);
    const [, forceUpdate] = (0, react_1.useReducer)(x => x + 1, 0);
    const [schemaData, setSchemaData] = (0, react_1.useState)({});
    const [openPdf, setOpenPdf] = (0, react_1.useState)(false);
    const [callData, setCallData] = (0, react_1.useState)(false);
    const [addModal, setAddModal] = (0, react_1.useState)(false);
    const [editModal, setEditModal] = (0, react_1.useState)(false);
    const [selectedData, setSelectedData] = (0, react_1.useState)(null);
    const [deleteModal, setDeleteModal] = (0, react_1.useState)(false);
    // Static Data
    (0, react_1.useEffect)(() => {
        if (staticData) {
            setGridData(staticData);
        }
    }, [staticData]);
    // Dynamic Data
    (0, react_1.useEffect)(() => {
        if (dataSource?.apiUrl && !staticData && !noRenderRequest) {
            (0, Services_1.Request)({ dataSource, dispatch, callback: (data) => {
                    setGridData(data);
                    callback && callback(data);
                } }).then();
        }
        // eslint-disable-next-line
    }, [callData, dispatch, staticData, callback, noRenderRequest]);
    // Dynamic Data ( Schema )
    (0, react_1.useEffect)(() => {
        if (schema) {
            schema.map((field) => {
                if (field.component === "select" && field.componentProps?.dataSource?.apiUrl) {
                    return (0, Services_1.Request)({ dataSource: field.componentProps.dataSource, callback: (data) => {
                            setSchemaData((prev) => ({ ...prev, [field.field]: data }));
                        } }).then();
                }
                else
                    return null;
            });
        }
    }, []);
    // Default Schema
    const defaultSchema = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => ({ field: columnKey, component: "input", flex: (columnKey === (customKey ? customKey : "id") ? 0 : 1) })) : [];
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
                if (columnSchema.component === "select" && columnSchema.componentProps) {
                    const customKey = columnSchema.componentProps.customKey;
                    const customName = columnSchema.componentProps.customName;
                    columnSchema.type = "singleSelect";
                    columnSchema.getOptionValue = (value) => customKey ? value[customKey] : value.id;
                    columnSchema.getOptionLabel = (value) => customName ? value[customName] : value.label;
                    if (columnSchema.componentProps.staticData && !columnSchema.componentProps.dataSource?.apiUrl) {
                        columnSchema.valueOptions = columnSchema.componentProps.staticData;
                    }
                    else if (columnSchema.componentProps.dataSource?.apiUrl && !columnSchema.componentProps.staticData) {
                        columnSchema.valueOptions = schemaData[columnSchema.field];
                        columnSchema.componentProps.staticData = schemaData[columnSchema.field];
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
            if (((label === "edit") && (actionsControl?.edit instanceof Function ? actionsControl?.edit(row) : true)) || ((label === "delete") && (actionsControl?.delete instanceof Function ? actionsControl?.delete(row) : true))) {
                return (react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { key: index, label: label, icon: label === "edit" ? react_1.default.createElement(index_1.Icons.Edit, null) : react_1.default.createElement(index_1.Icons.Delete, null), onClick: () => {
                        (label === "edit") ? setEditModal(true) : setDeleteModal(true);
                        setSelectedData(row);
                    } }));
            }
            else
                return undefined;
        }).filter((element) => element !== undefined)
        : [
            (actionsControl?.edit instanceof Function ? actionsControl?.edit(row) : true) ? react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { label: "edit", icon: react_1.default.createElement(index_1.Icons.Edit, null), onClick: () => { setEditModal(true); setSelectedData(row); } }) : react_1.default.createElement(react_1.default.Fragment, null),
            (actionsControl?.delete instanceof Function ? actionsControl?.delete(row) : true) ? react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { label: "delete", icon: react_1.default.createElement(index_1.Icons.Delete, null), onClick: () => { setDeleteModal(true); setSelectedData(row); } }) : react_1.default.createElement(react_1.default.Fragment, null)
        ]);
    // Grid Custom Actions
    const gridCustomActions = (row) => customActions?.map((action, index) => {
        const ActionIcon = index_1.Icons[action.icon];
        const ActionLabel = action.label;
        return (((actionsControl && actionsControl[ActionLabel] instanceof Function) ? actionsControl[ActionLabel](row) : true)
            ? react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { key: index, label: action.label, icon: react_1.default.createElement(ActionIcon, null), onClick: (event) => action.onClick(event, row) })
            : react_1.default.createElement(react_1.default.Fragment, null));
    }).filter((element) => element !== undefined);
    // Columns Schema
    const columnsSchema = [...(schema ? (invisibility ? schema.filter((column) => (!invisibility.includes(column.field))) : schema) : defaultSchema), ...((actions || customActions)
            ? [{ field: "actions", type: "actions", minWidth: 150, headerName: (localeText && localeText?.gridHeaderAction) || "Actions", flex: 1, cellClassName: "actions", getActions: ({ row }) => ([...(gridActions(row) || []), ...(gridCustomActions(row) || [])]) }]
            : [])];
    // Printing
    const Printing = () => {
        setOpenPdf(true);
        setTimeout(() => {
            const iFrame = (document?.querySelector("#iFrame"));
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
            const printData = `
            <table>
                <thead>
                    <tr>
                        ${(() => {
                let result = '';
                if (schema) {
                    for (let index = 0; index < schema.length; index++) {
                        if (!invisibility?.find((column) => column === schema[index].field)) {
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
                        const dataFieldElements = rowElement?.querySelectorAll('[data-field]');
                        let row = '<tr>';
                        if (actions || customActions) {
                            for (let i = 0; i < dataFieldElements?.length - 1; i++) {
                                const dataFieldElement = dataFieldElements[i];
                                row += `<td key=${i}>${dataFieldElement.innerText}</td>`;
                            }
                        }
                        else {
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
    };
    // Custom Toolbar
    const CustomToolbar = () => {
        return (react_1.default.createElement(x_data_grid_1.GridToolbarContainer, null,
            toolbar &&
                react_1.default.createElement(react_1.default.Fragment, null,
                    toolbar instanceof Array ? (toolbar?.includes("visibility") && react_1.default.createElement(x_data_grid_1.GridToolbarColumnsButton, null)) : react_1.default.createElement(x_data_grid_1.GridToolbarColumnsButton, null),
                    toolbar instanceof Array ? (toolbar?.includes("filter") && react_1.default.createElement(x_data_grid_1.GridToolbarFilterButton, null)) : react_1.default.createElement(x_data_grid_1.GridToolbarFilterButton, null),
                    toolbar instanceof Array ? (toolbar?.includes("export") && react_1.default.createElement(x_data_grid_1.GridToolbarExport, { csvOptions: { utf8WithBom: true }, printOptions: { disableToolbarButton: true } })) : react_1.default.createElement(x_data_grid_1.GridToolbarExport, { csvOptions: { utf8WithBom: true }, printOptions: { disableToolbarButton: true } }),
                    toolbar instanceof Array ? (toolbar?.includes("print") && react_1.default.createElement(material_1.Button, { onClick: Printing },
                        react_1.default.createElement(index_1.Icons.SimCardDownloadOutlined, null),
                        localeText?.toolbarExportPrint || "Print")) : react_1.default.createElement(material_1.Button, { onClick: Printing },
                        react_1.default.createElement(index_1.Icons.SimCardDownloadOutlined, null),
                        localeText?.toolbarExportPrint || "Print")),
            customToolbar && customToolbar(gridData),
            actions && (actions instanceof Array
                ? (actions?.includes("add") && react_1.default.createElement(material_1.Button, { onClick: () => setAddModal(true), type: "button" },
                    react_1.default.createElement(index_1.Icons.Add, null),
                    " ",
                    (localeText && localeText?.toolbarNew) || "Add New"))
                : react_1.default.createElement(material_1.Button, { onClick: () => setAddModal(true), type: "button" },
                    react_1.default.createElement(index_1.Icons.Add, null),
                    " ",
                    (localeText && localeText?.toolbarNew) || "Add New"))));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(index_1.Modal, { title: localeText?.modalAddTitle || "Add New Item", open: addModal, setOpen: setAddModal },
            react_1.default.createElement(index_1.Form, { dataSource: dataSource, schema: schema ? schema : defaultSchema, mode: "create", noRequest: (noRequest || noAddRequest) && !!dataSource, ...(formInvisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onAddSubmit && onAddSubmit(data);
                    !!staticData && setAddModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onAddCallback && onAddCallback(data);
                }, setModal: setAddModal, ...(localeText?.modalAddButton ? { localeText: { submitButton: localeText?.modalAddButton } } : {}) }, addFormChildren && addFormChildren)),
        react_1.default.createElement(index_1.Modal, { title: localeText?.modalEditTitle || "Update Item", open: editModal, setOpen: setEditModal },
            react_1.default.createElement(index_1.Form, { dataSource: dataSource, staticData: selectedData, schema: schema ? schema : defaultSchema, mode: "update", noRequest: (noRequest || noEditRequest) && !!dataSource, ...(customKey ? { customKey: customKey } : {}), ...(formInvisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onEditSubmit && onEditSubmit(data);
                    !!staticData?.length && setEditModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onEditCallback && onEditCallback(data);
                }, setModal: setEditModal, ...(localeText?.modalEditButton ? { localeText: { submitButton: localeText?.modalEditButton } } : {}) }, editFormChildren && editFormChildren(selectedData))),
        react_1.default.createElement(index_1.Modal, { title: localeText?.modalDeleteTitle || "Delete Item", open: deleteModal, setOpen: setDeleteModal },
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                react_1.default.createElement(material_1.Grid, { item: true, md: 12, lg: 12 },
                    react_1.default.createElement(material_1.Typography, { color: theme => theme.palette.error.main }, localeText?.modalDeleteMessage || "Are You Sure To Delete This Item?")),
                react_1.default.createElement(material_1.Grid, { item: true, md: 12, lg: 12 },
                    react_1.default.createElement(material_1.Button, { fullWidth: true, type: "button", variant: "contained", onClick: () => {
                            onDeleteSubmit && onDeleteSubmit(selectedData);
                            !!staticData?.length && setDeleteModal(false);
                            if (!(noRequest || noDeleteRequest) && !!dataSource) {
                                (0, Services_1.Request)({
                                    dataSource, mode: "delete", callback: (data) => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                        onDeleteCallback && onDeleteCallback(data);
                                    }, dispatch,
                                    apiUrlId: customKey ? selectedData[customKey] : selectedData.id
                                }).then();
                            }
                        } }, localeText?.modalDeleteButton || "Delete")))),
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(x_data_grid_1.DataGrid, { apiRef: apiRef, className: !gridData?.length ? classes.empty : "", ...(localeText ? { localeText: localeText } : {}), ...(customKey ? { getRowId: (row) => row[customKey] } : {}), rows: gridData, columns: columnsSchema, density: "compact", ...props, pageSizeOptions: props?.pageSizeOptions ? props?.pageSizeOptions : [15, 25, 35, 50, 100], slotProps: {
                    ...(props?.slotProps ? props.slotProps : {}),
                    ...((localeText?.paginationLabel) || (localeText?.paginationLabelOf) ? {
                        pagination: {
                            ...(props?.slotProps?.pagination ? props.slotProps.pagination : {}),
                            ...(localeText?.paginationLabel ? { labelRowsPerPage: localeText.paginationLabel } : {}),
                            ...(localeText?.paginationLabelOf ? { labelDisplayedRows: (paginationInfo) => {
                                    return (paginationInfo.from + " - " + paginationInfo.to + " " + localeText.paginationLabelOf + " " + paginationInfo.count);
                                } } : {}),
                        }
                    } : {})
                }, disableVirtualization: true, disableColumnResize: !resizable, paginationMode: openPdf ? 'server' : 'client', ...(openPdf ? { rowCount: gridData?.length } : {}), initialState: props?.initialState ? props?.initialState : { pagination: { paginationModel: { pageSize: 15 } } }, slots: props?.slots ? props?.slots : { toolbar: actions || toolbar || customToolbar ? CustomToolbar : null }, getRowClassName: (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : "") })),
        react_1.default.createElement("iframe", { id: 'iFrame', title: 'iFrame', style: { display: 'none', position: 'absolute', width: 0, height: 0 } })));
};
exports.Grid = Grid;
//# sourceMappingURL=index.js.map