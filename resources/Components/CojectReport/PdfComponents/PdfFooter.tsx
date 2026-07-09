import React from 'react';

// React Pdf
import { View } from '@react-pdf/renderer';

// Process all Items
import ProcessItem from './ProcessItem';

// Interface
interface PdfFooterProps {
    apiData?: any;
    footerData?: any;
    pageIndex?: number;
    parameter?: any;
    tableData?: any;
    totalPages?: number;
}

const Footer: React.FC<PdfFooterProps> = ({ apiData, footerData, tableData, pageIndex, parameter, totalPages }) => (
    <View style={{ position: 'relative', height: footerData?.Footer?.height ? `${Math.trunc((footerData?.Footer?.height / footerData?.PxPerCmV) * 100) / 100}cm` : 0 }}>
        {footerData?.Footer?.items?.map((item: any, index: number) => {
            return (<ProcessItem key={index} apiData={apiData} item={item} json={footerData} tableData={tableData} pageIndex={pageIndex} parameter={parameter} totalPages={totalPages} />);
        })}
    </View>
);

export default Footer;