import React from 'react';
// React Pdf
import { View } from '@react-pdf/renderer';
// Process all Items
import ProcessItem from './ProcessItem';
const Body = ({ apiData, bodyData, tableData, pageIndex, parameter, totalPages, adjustedLayouts }) => (React.createElement(View, { style: { position: 'relative', height: bodyData?.Body?.height ? `${Math.trunc(((bodyData?.Body?.height + 7) / bodyData?.PxPerCmV) * 100) / 100}cm` : 0 } }, bodyData?.Body?.items?.map((item, index) => {
    return (React.createElement(ProcessItem, { key: index, apiData: apiData, item: item, json: bodyData, pageIndex: pageIndex, tableData: tableData, parameter: parameter, totalPages: totalPages, adjustedLayouts: adjustedLayouts }));
})));
export default Body;
//# sourceMappingURL=PdfBody.js.map