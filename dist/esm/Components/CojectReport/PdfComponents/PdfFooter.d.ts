import React from 'react';
interface PdfFooterProps {
    apiData?: any;
    footerData?: any;
    pageIndex?: number;
    parameter?: any;
    totalPages?: number;
}
declare const Footer: React.FC<PdfFooterProps>;
export default Footer;
