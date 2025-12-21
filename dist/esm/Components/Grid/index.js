import React, { useEffect, useState, useReducer } from 'react';
// Request
import { Request } from "../../Services";
// Material UI
import { Box, Grid as MuiGrid, Button, Typography } from "@mui/material";
// Material UI Table
import { useGridApiRef, DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";
// Coject
import { Form, DatePicker, Modal, Icons } from "../index";
// Styles
import useStyles from "./theme";
export const Grid = ({ dataSource, noRenderRequest, actionsControl, dependancies, resizable, staticData, callback, localeText, customKey, onAddCallback, onEditCallback, addFormChildren, editFormChildren, onDeleteCallback, schema, actions, customActions, invisibility, formInvisibility, toolbar, customToolbar, dispatch, onAddSubmit, onEditSubmit, onDeleteSubmit, noAddRequest, noEditRequest, noDeleteRequest, noRequest, ...props }) => {
    const apiRef = useGridApiRef();
    const { classes } = useStyles();
    const [gridData, setGridData] = useState([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [schemaData, setSchemaData] = useState({});
    const [openPdf, setOpenPdf] = useState(false);
    const [callData, setCallData] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editedRows, setEditedRows] = useState({});
    // Static Data
    useEffect(() => {
        if (staticData) {
            setGridData(staticData);
        }
    }, [staticData]);
    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !staticData && !noRenderRequest) {
            Request({ dataSource, dispatch, callback: (data) => {
                    setGridData(data);
                    callback && callback(data);
                } }).then();
        }
        // eslint-disable-next-line
    }, [callData, dispatch, staticData, callback, noRenderRequest, ...[dependancies]]);
    // Dynamic Data ( Schema )
    useEffect(() => {
        if (schema) {
            schema.map((field) => {
                if (field.component === "select" && field.componentProps?.dataSource?.apiUrl) {
                    return Request({ dataSource: field.componentProps.dataSource, callback: (data) => {
                            setSchemaData((prev) => ({ ...prev, [field.field]: data }));
                        } }).then();
                }
                else
                    return null;
            });
        }
    }, [...[dependancies]]);
    // Default Schema
    const defaultSchema = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => ({ field: columnKey, component: "input", flex: (columnKey === (customKey ? customKey : "id") ? 0 : 1) })) : [];
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
                if (columnSchema.editable && columnSchema.componentProps?.validation) {
                    columnSchema.preProcessEditCellProps = (params) => {
                        if (!params.hasChanged) {
                            return { ...params.props, error: false };
                        }
                        return {
                            ...params.props,
                            error: false,
                        };
                    };
                }
                if (columnSchema.editable) {
                    columnSchema.preProcessEditCellProps = (params) => {
                        const rowId = customKey ? params.row[customKey] : params.id;
                        const updatedRow = { ...params.row, [params.field]: params.props.value };
                        setEditedRows(prev => ({ ...prev, [rowId]: updatedRow }));
                        props.onRowsChange?.({ ...editedRows, [rowId]: updatedRow });
                        props.onRowEdit?.(updatedRow);
                        return params.props;
                    };
                }
                if (columnSchema.component === "date" && !columnSchema.renderCell) {
                    columnSchema.renderCell = (data) => React.createElement(DatePicker, { value: data.value, ...columnSchema.componentProps, textView: true });
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
                return (React.createElement(GridActionsCellItem, { id: `coject_${label}`, key: index, label: label, icon: label === "edit" ? React.createElement(Icons.Edit, null) : React.createElement(Icons.Delete, null), onClick: () => {
                        (label === "edit") ? setEditModal(true) : setDeleteModal(true);
                        setSelectedData(row);
                    } }));
            }
            else
                return undefined;
        }).filter((element) => element !== undefined)
        : [
            (actionsControl?.edit instanceof Function ? actionsControl?.edit(row) : true) ? React.createElement(GridActionsCellItem, { id: 'coject_edit', label: "edit", icon: React.createElement(Icons.Edit, null), onClick: () => { setEditModal(true); setSelectedData(row); } }) : React.createElement(React.Fragment, null),
            (actionsControl?.delete instanceof Function ? actionsControl?.delete(row) : true) ? React.createElement(GridActionsCellItem, { id: 'coject_delete', label: "delete", icon: React.createElement(Icons.Delete, null), onClick: () => { setDeleteModal(true); setSelectedData(row); } }) : React.createElement(React.Fragment, null)
        ]);
    // Grid Custom Actions
    const gridCustomActions = (row) => customActions?.map((action, index) => {
        const ActionIcon = Icons[action.icon];
        const ActionLabel = action.label;
        return (((actionsControl && actionsControl[ActionLabel] instanceof Function) ? actionsControl[ActionLabel](row) : true)
            ? React.createElement(GridActionsCellItem, { key: index, label: action.label, icon: React.createElement(ActionIcon, null), onClick: (event) => action.onClick(event, row) })
            : React.createElement(React.Fragment, null));
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
                const visibilityModel = apiRef.current?.state.columns.columnVisibilityModel || {};
                const visibleColumns = apiRef.current?.getAllColumns()?.filter((col) => col.field !== 'actions' && visibilityModel[col.field] !== false);
                visibleColumns?.forEach((col, index) => {
                    result += `<th key=${index}>${col.headerName}</th>`;
                });
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
        return (React.createElement(GridToolbarContainer, null,
            toolbar &&
                React.createElement(React.Fragment, null,
                    toolbar instanceof Array ? (toolbar?.includes("visibility") && React.createElement(GridToolbarColumnsButton, { slotProps: { button: { id: "grid_visibility" } } })) : React.createElement(GridToolbarColumnsButton, { slotProps: { button: { id: "grid_visibility" } } }),
                    toolbar instanceof Array ? (toolbar?.includes("filter") && React.createElement(GridToolbarFilterButton, { slotProps: { button: { id: "grid_filter" } } })) : React.createElement(GridToolbarFilterButton, { slotProps: { button: { id: "grid_filter" } } }),
                    toolbar instanceof Array ? (toolbar?.includes("export") && React.createElement(GridToolbarExport, { slotProps: { button: { id: "grid_export" } }, csvOptions: { utf8WithBom: true }, printOptions: { disableToolbarButton: true } })) : React.createElement(GridToolbarExport, { slotProps: { button: { id: "grid_export" } }, csvOptions: { utf8WithBom: true }, printOptions: { disableToolbarButton: true } }),
                    toolbar instanceof Array ? (toolbar?.includes("print") && React.createElement(Button, { id: "grid_print", onClick: Printing },
                        React.createElement(Icons.SimCardDownloadOutlined, null),
                        localeText?.toolbarExportPrint || "Print")) : React.createElement(Button, { id: "grid_print", onClick: Printing },
                        React.createElement(Icons.SimCardDownloadOutlined, null),
                        localeText?.toolbarExportPrint || "Print")),
            customToolbar && customToolbar(gridData),
            actions && (actions instanceof Array
                ? (actions?.includes("add") && React.createElement(Button, { className: 'grid_create_button', id: 'coject_add', onClick: () => setAddModal(true), type: "button" },
                    React.createElement(Icons.Add, null),
                    " ",
                    (localeText && localeText?.toolbarNew) || "Add New"))
                : React.createElement(Button, { className: 'grid_create_button', id: 'coject_add', onClick: () => setAddModal(true), type: "button" },
                    React.createElement(Icons.Add, null),
                    " ",
                    (localeText && localeText?.toolbarNew) || "Add New"))));
    };
    // Validation in Cell
    const validateCellValue = (value, rules) => {
        if (!rules)
            return null;
        if (rules.required && (value === undefined || value === null || value === "")) {
            return rules.required;
        }
        if (rules.arabic && value && /[A-Za-z]/.test(value)) {
            return rules.arabic;
        }
        if (rules.english && value && /[\u0600-\u06FF]/.test(value)) {
            return rules.english;
        }
        return null;
    };
    // Handle Update in Row in Inline Mode
    const processRowUpdate = async (newRow, _) => {
        if (schema) {
            for (const col of schema) {
                const rules = col.componentProps?.validation;
                if (!rules)
                    continue;
                const value = newRow[col.field];
                const errorMessage = validateCellValue(value, rules);
                if (errorMessage) {
                    props.onCellValidationError?.(errorMessage, {
                        field: col.field,
                        value,
                        id: customKey ? newRow[customKey] : newRow.id
                    });
                    throw new Error(errorMessage);
                }
            }
        }
        const rowId = customKey ? newRow[customKey] : newRow.id;
        setEditedRows((prev) => {
            const updated = { ...prev, [rowId]: newRow };
            props.onRowsChange?.(updated);
            return updated;
        });
        props.onRowEdit?.(newRow);
        return newRow;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Modal, { className: "grid_create_modal", title: localeText?.modalAddTitle || "Add New Item", open: addModal, setOpen: setAddModal },
            React.createElement(Form, { dataSource: dataSource, schema: schema ? schema : defaultSchema, mode: "create", noRequest: (noRequest || noAddRequest) && !!dataSource, ...(formInvisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onAddSubmit && onAddSubmit(data);
                    !!staticData && setAddModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onAddCallback && onAddCallback(data);
                }, setModal: setAddModal, ...(localeText?.modalAddButton ? { localeText: { submitButton: localeText?.modalAddButton } } : {}) }, addFormChildren && addFormChildren)),
        React.createElement(Modal, { className: "grid_update_modal", title: localeText?.modalEditTitle || "Update Item", open: editModal, setOpen: setEditModal },
            React.createElement(Form, { dataSource: dataSource, staticData: selectedData, schema: schema ? schema : defaultSchema, mode: "update", noRequest: (noRequest || noEditRequest) && !!dataSource, ...(customKey ? { customKey: customKey } : {}), ...(formInvisibility ? { invisibility: formInvisibility } : {}), onSubmit: (data) => {
                    onEditSubmit && onEditSubmit(data);
                    !!staticData?.length && setEditModal(false);
                }, callback: (data) => {
                    setCallData(!callData);
                    onEditCallback && onEditCallback(data);
                }, setModal: setEditModal, ...(localeText?.modalEditButton ? { localeText: { submitButton: localeText?.modalEditButton } } : {}) }, editFormChildren && editFormChildren(selectedData))),
        React.createElement(Modal, { className: "grid_delete_modal", title: localeText?.modalDeleteTitle || "Delete Item", open: deleteModal, setOpen: setDeleteModal },
            React.createElement(MuiGrid, { container: true, spacing: 2 },
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Typography, { color: 'error' }, localeText?.modalDeleteMessage || "Are You Sure To Delete This Item?")),
                React.createElement(MuiGrid, { item: true, md: 12, lg: 12 },
                    React.createElement(Button, { fullWidth: true, type: "button", variant: "contained", onClick: () => {
                            onDeleteSubmit && onDeleteSubmit(selectedData);
                            !!staticData?.length && setDeleteModal(false);
                            if (!(noRequest || noDeleteRequest) && !!dataSource) {
                                Request({
                                    dataSource, mode: "delete", callback: (data) => {
                                        setCallData(!callData);
                                        setDeleteModal(false);
                                        onDeleteCallback && onDeleteCallback(data);
                                    }, dispatch,
                                    apiUrlId: customKey ? selectedData[customKey] : selectedData.id
                                }).then();
                            }
                        } }, localeText?.modalDeleteButton || "Delete")))),
        React.createElement(Box, { className: `${classes.root} coject_grid` },
            React.createElement(DataGrid, { apiRef: apiRef, className: !gridData?.length ? classes.empty : "", ...(localeText ? { localeText: localeText } : {}), ...(customKey ? { getRowId: (row) => row[customKey] } : {}), rows: gridData, columns: columnsSchema, density: "compact", ...props, pageSizeOptions: props?.pageSizeOptions ? props?.pageSizeOptions : [15, 25, 35, 50, 100], slotProps: {
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
                }, editMode: 'cell', processRowUpdate: processRowUpdate, disableVirtualization: true, disableColumnResize: !resizable, paginationMode: openPdf ? 'server' : 'client', ...(openPdf ? { rowCount: gridData?.length } : {}), initialState: props?.initialState ? props?.initialState : { pagination: { paginationModel: { pageSize: 15 } } }, slots: props?.slots ? props?.slots : { toolbar: actions || toolbar || customToolbar ? CustomToolbar : null }, getRowClassName: (params) => { return params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : ""; } })),
        React.createElement("iframe", { id: 'iFrame', title: 'iFrame', style: { display: 'none', position: 'absolute', width: 0, height: 0 } })));
};
//# sourceMappingURL=index.js.map