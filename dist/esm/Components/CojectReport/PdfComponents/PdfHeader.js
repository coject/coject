import React from 'react';
// React Pdf
import { View } from '@react-pdf/renderer';
// Process all Items
import ProcessItem from './ProcessItem';
const Header = ({ apiData, headerData, tableData, pageIndex, parameter, totalPages }) => (React.createElement(View, { style: { position: 'relative', height: headerData?.Header?.height ? `${Math.trunc(((headerData?.Header?.height + 7) / headerData?.PxPerCmV) * 100) / 100}cm` : 0 } }, headerData?.Header?.items?.map((item, index) => {
    return (React.createElement(ProcessItem, { key: index, apiData: apiData, item: item, json: headerData, tableData: tableData, pageIndex: pageIndex, parameter: parameter, totalPages: totalPages }));
})));
export default Header;
//# sourceMappingURL=PdfHeader.js.map