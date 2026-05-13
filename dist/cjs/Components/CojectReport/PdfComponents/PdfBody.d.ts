import React from 'react';
interface PdfBodyProps {
    apiData?: any;
    bodyData?: any;
    tableData?: any;
    pageIndex?: number;
    parameter?: any;
    totalPages?: number;
}
declare const Body: React.FC<PdfBodyProps>;
export default Body;
