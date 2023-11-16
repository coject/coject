import React, { FC, useEffect, useState } from "react";

// Request
import { Request } from "../../Services";

// Material UI Icons
import { Button } from "@mui/material";

// Material UI Icons
import * as MuiIcons from "@mui/icons-material";

// Material UI Table
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from "@mui/x-data-grid";

// Interface
interface iGrid {
    schema?: any;
    dispatch?: any;
    dataSource?: any;
    actions?: boolean;
    toolbar?: boolean;
}

export const Grid: FC<iGrid> = ({ dataSource, schema, actions, toolbar, dispatch, ...props }) => {
    const Icons: any = MuiIcons;
    const [ gridData, setGridData ] = useState<any>([]);

    // Static Data
    useEffect(() => {
        if (dataSource?.staticData && !!dataSource.staticData.length && !dataSource?.apiUrl) {
            setGridData(dataSource.staticData);
        }
    }, [dataSource?.staticData]);

    // Dynamic Data
    useEffect(() => {
        if (dataSource?.apiUrl && !dataSource.staticData) {
            Request({
                dataSource: { ...dataSource }, dispatch, callBack: (ResponseData: any) => {
                    setGridData(ResponseData);
                }
            }).then();
        }
    }, [dataSource?.apiUrl]);

    // Default Schema
    const defaultSchema: any = !!gridData.length ? Object.keys(gridData[0])?.map((columnKey) => (
        { field: columnKey }
    ) ) : [];

    // Columns Schema
    const columnsSchema: any = [ ... schema ? schema : defaultSchema,
        ... actions ? [{ field: "actions", type: "actions", headerName: "Actions", width: 100, cellClassName: "actions",
            getActions: ({row}: any) => {
                return [
                    <GridActionsCellItem icon={<Icons.Edit />} label="Edit" onClick={() => console.log(schema ? schema : defaultSchema, row)} />,
                    <GridActionsCellItem icon={<Icons.Delete />} label="Delete" onClick={() => console.log(schema ? schema : defaultSchema, row)} />
                ]
            }
        }] : []
    ];

    // Custom Toolbar
    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
                { actions &&
                    <Button onClick={() => console.log(schema ? schema : defaultSchema)} type={"button"}>
                        <Icons.Add /> Add New
                    </Button>
                }
            </GridToolbarContainer>
        );
    };

    return (
        <React.Fragment>
            <DataGrid rows={gridData} columns={columnsSchema} slots={{ toolbar: toolbar ? CustomToolbar : null }} {...props} />
        </React.Fragment>
    )
}