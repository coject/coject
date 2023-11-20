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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
const react_1 = __importStar(require("react"));
// Request
const Services_1 = require("../../Services");
// Material UI Icons
const material_1 = require("@mui/material");
// Material UI Icons
const MuiIcons = __importStar(require("@mui/icons-material"));
// Material UI Table
const x_data_grid_1 = require("@mui/x-data-grid");
const Grid = (_a) => {
    var _b;
    var { dataSource, schema, actions, toolbar, dispatch } = _a, props = __rest(_a, ["dataSource", "schema", "actions", "toolbar", "dispatch"]);
    const Icons = MuiIcons;
    const [gridData, setGridData] = (0, react_1.useState)([]);
    // Static Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    (0, react_1.useEffect)(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            (0, Services_1.Request)({
                dataSource: Object.assign({}, dataSource),
                dispatch,
                callBack: (ResponseData) => {
                    setGridData(ResponseData);
                }
            }).then();
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl]);
    // Default Schema
    const defaultSchema = !!gridData.length ? (_b = Object.keys(gridData[0])) === null || _b === void 0 ? void 0 : _b.map((columnKey) => ({ field: columnKey })) : [];
    // Columns Schema
    const columnsSchema = [
        ...(schema ? schema : defaultSchema),
        ...(actions
            ? [
                {
                    field: 'actions',
                    type: 'actions',
                    headerName: 'Actions',
                    width: 100,
                    cellClassName: 'actions',
                    getActions: ({ row }) => {
                        return [
                            react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { icon: react_1.default.createElement(Icons.Edit, null), label: "Edit", onClick: () => console.log(schema ? schema : defaultSchema, row) }),
                            react_1.default.createElement(x_data_grid_1.GridActionsCellItem, { icon: react_1.default.createElement(Icons.Delete, null), label: "Delete", onClick: () => console.log(schema ? schema : defaultSchema, row) })
                        ];
                    }
                }
            ]
            : [])
    ];
    // Custom Toolbar
    const CustomToolbar = () => {
        return (react_1.default.createElement(x_data_grid_1.GridToolbarContainer, null,
            react_1.default.createElement(x_data_grid_1.GridToolbarColumnsButton, null),
            react_1.default.createElement(x_data_grid_1.GridToolbarFilterButton, null),
            react_1.default.createElement(x_data_grid_1.GridToolbarExport, null),
            actions && (react_1.default.createElement(material_1.Button, { onClick: () => console.log(schema ? schema : defaultSchema), type: 'button' },
                react_1.default.createElement(Icons.Add, null),
                " Add New"))));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(x_data_grid_1.DataGrid, Object.assign({ rows: gridData, columns: columnsSchema, slots: { toolbar: toolbar ? CustomToolbar : null } }, props))));
};
exports.Grid = Grid;
//# sourceMappingURL=index.js.map