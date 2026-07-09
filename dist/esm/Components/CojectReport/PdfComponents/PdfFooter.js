import React from 'react';
// React Pdf
import { View } from '@react-pdf/renderer';
// Process all Items
import ProcessItem from './ProcessItem';
const Footer = ({ apiData, footerData, tableData, pageIndex, parameter, totalPages }) => (React.createElement(View, { style: { position: 'relative', height: footerData?.Footer?.height ? `${Math.trunc((footerData?.Footer?.height / footerData?.PxPerCmV) * 100) / 100}cm` : 0 } }, footerData?.Footer?.items?.map((item, index) => {
    return (React.createElement(ProcessItem, { key: index, apiData: apiData, item: item, json: footerData, tableData: tableData, pageIndex: pageIndex, parameter: parameter, totalPages: totalPages }));
})));
export default Footer;
//# sourceMappingURL=PdfFooter.js.map