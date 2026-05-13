import React from 'react';

// React Pdf
import { View } from '@react-pdf/renderer';

// Process all Items
import ProcessItem from './ProcessItem';

// Interface
interface PdfBodyProps {
    apiData?: any;
    bodyData?: any;
    tableData?: any;
    pageIndex?: number;
    parameter?: any;
    totalPages?: number;
}

const Body: React.FC<PdfBodyProps> = ({ apiData, bodyData, tableData, pageIndex, parameter, totalPages }) => (
    <View style={{ position: 'relative', height: bodyData?.Body?.height ? `${Math.trunc(((bodyData?.Body?.height + 7) / bodyData?.PxPerCmV) * 100) / 100}cm` : 0 }}>
        {bodyData?.Body?.items?.map((item: any, index: number) => {
            return (<ProcessItem key={index} apiData={apiData} item={item} json={bodyData} pageIndex={pageIndex} tableData={tableData} parameter={parameter} totalPages={totalPages} />);
        })}
    </View>
);

export default Body;
