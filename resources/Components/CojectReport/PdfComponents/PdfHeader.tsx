import React from 'react';

// React Pdf
import { View } from '@react-pdf/renderer';

// Process all Items
import ProcessItem from './ProcessItem';

// Interface
interface PdfHeaderProps {
    apiData?: any;
    headerData?: any;
    pageIndex?: number;
    parameter?: any;
    tableData?: any;
    totalPages?: number;
}

const Header: React.FC<PdfHeaderProps> = ({ apiData, headerData, tableData, pageIndex, parameter, totalPages }) => (
    <View style={{ position: 'relative', height: headerData?.Header?.height ? `${Math.trunc(((headerData?.Header?.height + 7) / headerData?.PxPerCmV) * 100) / 100}cm` : 0 }}>
        {headerData?.Header?.items?.map((item: any, index: number) => {
            return (<ProcessItem key={index} apiData={apiData} item={item} json={headerData} tableData={tableData} pageIndex={pageIndex} parameter={parameter} totalPages={totalPages} />);
        })}
    </View>
);

export default Header;