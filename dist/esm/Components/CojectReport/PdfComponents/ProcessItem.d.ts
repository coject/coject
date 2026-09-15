import React from 'react';
export declare const isImageValue: (val: any, colDef?: any) => boolean;
export declare const getImageSource: (val: any) => string;
interface ProcessItemProps {
    apiData?: any;
    item?: any;
    pageIndex?: number;
    tableData?: any;
    json?: any;
    parameter?: any;
    totalPages?: number;
    adjustedLayouts?: Record<string, {
        y: number;
        height: number;
    }>;
}
declare const ProcessItem: React.FC<ProcessItemProps>;
export default ProcessItem;
