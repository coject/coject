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
import React, { useEffect, useState } from 'react';
// Request
import { Request } from '../../Services';
// Material UI Icons
import { Button } from '@mui/material';
// Material UI Icons
import * as MuiIcons from '@mui/icons-material';
// Material UI Table
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid';
export const Grid = (_a) => {
    var _b;
    var { dataSource, schema, actions, toolbar, dispatch } = _a, props = __rest(_a, ["dataSource", "schema", "actions", "toolbar", "dispatch"]);
    const Icons = MuiIcons;
    const [gridData, setGridData] = useState([]);
    // Static Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData) && !!dataSource.staticData.length && !(dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl)) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource === null || dataSource === void 0 ? void 0 : dataSource.staticData]);
    // Dynamic Data
    useEffect(() => {
        if ((dataSource === null || dataSource === void 0 ? void 0 : dataSource.apiUrl) && !dataSource.staticData) {
            Request({
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
                            React.createElement(GridActionsCellItem, { icon: React.createElement(Icons.Edit, null), label: "Edit", onClick: () => console.log(schema ? schema : defaultSchema, row) }),
                            React.createElement(GridActionsCellItem, { icon: React.createElement(Icons.Delete, null), label: "Delete", onClick: () => console.log(schema ? schema : defaultSchema, row) })
                        ];
                    }
                }
            ]
            : [])
    ];
    // Custom Toolbar
    const CustomToolbar = () => {
        return (React.createElement(GridToolbarContainer, null,
            React.createElement(GridToolbarColumnsButton, null),
            React.createElement(GridToolbarFilterButton, null),
            React.createElement(GridToolbarExport, null),
            actions && (React.createElement(Button, { onClick: () => console.log(schema ? schema : defaultSchema), type: 'button' },
                React.createElement(Icons.Add, null),
                " Add New"))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(DataGrid, Object.assign({ rows: gridData, columns: columnsSchema, slots: { toolbar: toolbar ? CustomToolbar : null } }, props))));
};
//# sourceMappingURL=index.js.map