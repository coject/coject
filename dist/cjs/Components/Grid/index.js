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
// Material UI Icons
const MuiIcons = __importStar(require("@mui/icons-material"));
// Material UI Table
const x_data_grid_1 = require("@mui/x-data-grid");
// Components
const index_1 = require("../index");
// Styles
const theme_1 = __importDefault(require("./theme"));
const Grid = (_a) => {
    var _b;
    var { dataSource, schema, actions, toolbar, dispatch, onAddSubmit, onEditSubmit } = _a, props = __rest(_a, ["dataSource", "schema", "actions", "toolbar", "dispatch", "onAddSubmit", "onEditSubmit"]);
    const Icons = MuiIcons;
    const { classes } = (0, theme_1.default)();
    const [gridData, setGridData] = (0, react_1.useState)([]);
    const [schemaData, setSchemaData] = (0, react_1.useState)({});
    const [selectedData, setSelectedData] = (0, react_1.useState)(null);
    const [, forceUpdate] = (0, react_1.useReducer)(x => x + 1, 0);
    const [addNew, setAddNew] = (0, react_1.useState)(false);
    const [update, setUpdate] = (0, react_1.useState)(false);
    const [delModal, setDelModal] = (0, react_1.useState)(false);
    // Static Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            (0, Services_1.Request)({ dataSource, dispatch, callBack: (data) => setGridData(data) }).then();
        }
    }, [dataSource, dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl, dispatch]);
    // Dynamic Data ( Schema )
    (0, react_1.useEffect)(() => {
        if (schema) {
            schema.map((field) => {
                var _a;
                if (field.component === "select" && ((_a = field.componentProps) === null || _a === void 0 ? void 0 : _a.dataSource)) {
                    return (0, Services_1.Request)({ dataSource: field.componentProps.dataSource, callBack: (data) => setSchemaData((prev) => (Object.assign(Object.assign({}, prev), { [field.field]: data }))) }).then();
                }
                else
                    return null;
            });
        }
    }, [schema]);
    // Default Schema
    const defaultSchema = !!gridData.length ? (_b = Object.keys(gridData[0])) === null || _b === void 0 ? void 0 : _b.map((columnKey) => ({
        width: 100,
        field: columnKey,
        component: "input",
        flex: (columnKey === ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.primaryKey) ? dataSource.primaryKey : "id") ? 0 : 1)
    })) : [];
    // Custom Schema
    (0, react_1.useEffect)(() => {
        if (schema) {
            schema.map((columnSchema) => {
                if (columnSchema.component === "date" && !columnSchema.renderCell) {
                    columnSchema.renderCell = (data) => react_1.default.createElement(index_1.DatePicker, { value: data.value, textView: true });
                }
                if (columnSchema.component === "select") {
                    const customKey = columnSchema.componentProps.customKey;
                    const customName = columnSchema.componentProps.customName;
                    columnSchema.type = "singleSelect";
                    columnSchema.getOptionValue = (value) => customKey ? value[customKey] : value.id;
                    columnSchema.getOptionLabel = (value) => customName ? value[customName] : value.label;
                    columnSchema.valueOptions = schemaData[columnSchema.field];
                    columnSchema.componentProps.dataSource = { staticData: schemaData[columnSchema.field] };
                }
                return (Object.assign({}, columnSchema));
            });
        }
        forceUpdate();
    }, [forceUpdate, schema, schemaData]);
    // Columns Schema
    const columnsSchema = [...(schema ? schema : defaultSchema), ...(actions
            ? [{ field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions",
                    getActions: ({ row }) => {
                        return [
                            react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { icon: react_1.default.createElement(Icons.Edit, null), label: "Edit", onClick: () => { setUpdate(true); setSelectedData(row); } }),
                            react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { icon: react_1.default.createElement(Icons.Delete, null), label: "Delete", onClick: () => { setDelModal(true); setSelectedData(row); } })
                        ];
                    }
                }] : [])
    ];
    // Custom Toolbar
    const CustomToolbar = () => {
        return (react_1.default.createElement(x_data_grid_1.GridToolbarContainer, null,
            toolbar &&
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(x_data_grid_1.GridToolbarColumnsButton, null),
                    react_1.default.createElement(x_data_grid_1.GridToolbarFilterButton, null),
                    react_1.default.createElement(x_data_grid_1.GridToolbarExport, null)),
            actions &&
                react_1.default.createElement(material_1.Button, { onClick: () => setAddNew(true), type: "button" },
                    react_1.default.createElement(Icons.Add, null),
                    " Add New")));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(index_1.Modal, { title: "Add New Item", open: addNew, setOpen: setAddNew },
            react_1.default.createElement(index_1.Form, { onSubmit: (data) => onAddSubmit(data), dataSource: dataSource, schema: schema ? schema : defaultSchema, mode: "create" })),
        react_1.default.createElement(index_1.Modal, { title: "Update Item", open: update, setOpen: setUpdate },
            react_1.default.createElement(index_1.Form, { onSubmit: (data) => onEditSubmit(data), dataSource: Object.assign(Object.assign({}, dataSource), { staticData: selectedData }), schema: schema ? schema : defaultSchema, mode: "update" })),
        react_1.default.createElement(index_1.Modal, { title: "Delete Item", open: delModal, setOpen: setDelModal },
            react_1.default.createElement(material_1.Grid, { container: true, spacing: 2 },
                react_1.default.createElement(material_1.Grid, { item: true, md: 12, lg: 12 },
                    react_1.default.createElement(material_1.Typography, { color: theme => theme.palette.error.main }, "Are You Sure To Delete This Item?")),
                react_1.default.createElement(material_1.Grid, { item: true, md: 12, lg: 12 },
                    react_1.default.createElement(material_1.Button, { fullWidth: true, type: "button", variant: "contained", onClick: () => (0, Services_1.Request)({
                            dataSource, mode: "delete",
                            apiUrlId: dataSource.primaryKey ? selectedData[dataSource.primaryKey] : selectedData.id,
                            callBack: () => setDelModal(false), dispatch
                        }).then() }, "Delete")))),
        react_1.default.createElement(material_1.Box, { className: classes.root },
            react_1.default.createElement(x_data_grid_1.DataGrid, Object.assign({ className: !(gridData === null || gridData === void 0 ? void 0 : gridData.length) ? classes.empty : "", rows: gridData, columns: columnsSchema, density: "compact" }, props, { getRowClassName: (params) => (params.indexRelativeToCurrentPage % 2 === 0 ? "dark" : ""), initialState: (props === null || props === void 0 ? void 0 : props.initialState) ? props === null || props === void 0 ? void 0 : props.initialState : { pagination: { paginationModel: { pageSize: 15 } } }, pageSizeOptions: (props === null || props === void 0 ? void 0 : props.pageSizeOptions) ? props === null || props === void 0 ? void 0 : props.pageSizeOptions : [15, 25, 35, 50, 100], slots: (props === null || props === void 0 ? void 0 : props.slots) ? props === null || props === void 0 ? void 0 : props.slots : { toolbar: actions || toolbar ? CustomToolbar : null } })))));
};
exports.Grid = Grid;
//# sourceMappingURL=index.js.map