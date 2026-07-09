import React from 'react';
interface PdfHeaderProps {
    apiData?: any;
    headerData?: any;
    pageIndex?: number;
    parameter?: any;
    tableData?: any;
    totalPages?: number;
}
declare const Header: React.FC<PdfHeaderProps>;
export default Header;
