import React from 'react';
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
