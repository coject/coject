import React from 'react';
// React Pdf
import { Document, Page as PDFPage, Font } from '@react-pdf/renderer';
// Pdf Components
import PdfBody from './PdfComponents/PdfBody';
import PdfHeader from './PdfComponents/PdfHeader';
import PdfFooter from './PdfComponents/PdfFooter';
// Add Fonts
Font.register({
    family: 'Almarai',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/almarai/Almarai-Regular.ttf', fontWeight: 'normal' },
        { src: 'https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/almarai/Almarai-Bold.ttf', fontWeight: 'bold' },
    ]
});
// Disable automatic hyphenation to prevent hyphens at the end of wrapped lines
Font.registerHyphenationCallback(word => {
    if (word.includes('\u200B')) {
        return word.split('\u200B');
    }
    return [word];
});
// Estimating heigth of header cell 
function estimateHeaderHeight(columns, json, fontSizeCm = 0.42, lineHeightMultiplier = 1.2) {
    let maxHeightCm = 0;
    for (const key in columns) {
        const col = columns[key];
        const text = String(col?.text || '');
        const colWidthCm = parseFloat(((getDecimal(col?.width) / json.PxPerCmH) || '3')); // Show again at processTableColumns in ProcessItem
        const minHeightCm = 1;
        const approxCharsPerCm = 4.5;
        const charsPerLine = colWidthCm * approxCharsPerCm;
        const lines = Math.ceil(text.length / charsPerLine);
        const lineHeightCm = fontSizeCm * lineHeightMultiplier;
        const estimatedHeightCm = lines * lineHeightCm;
        const finalHeightCm = Math.max(minHeightCm, estimatedHeightCm);
        maxHeightCm = Math.max(maxHeightCm, finalHeightCm);
    }
    return maxHeightCm;
}
// Estimating heigth of row cell 
function estimateRowHeight(row, columns, json, fontSizeCm = 0.4, lineHeightMultiplier = 1.2) {
    let maxHeightCm = 0;
    const pxPerCmH = json.PxPerCmH || 53.057;
    for (const key in columns) {
        if (columns[key]?.hide)
            continue;
        const text = String(row[key] || '');
        const colWidthCm = parseFloat(((getDecimal(columns[key]?.width) / pxPerCmH) || '3'));
        const minHeightCm = 1;
        const approxCharsPerLine = Math.max(1, Math.floor(colWidthCm / 0.22));
        let lines = 0;
        const words = text.split(/\s+/);
        let currentLineLength = 0;
        if (words.length === 0 || text.trim() === '') {
            lines = 1;
        }
        else {
            for (const word of words) {
                if (word.length > approxCharsPerLine) {
                    if (currentLineLength > 0)
                        lines++;
                    lines += Math.ceil(word.length / approxCharsPerLine);
                    currentLineLength = word.length % approxCharsPerLine;
                }
                else if (currentLineLength + word.length > approxCharsPerLine) {
                    lines++;
                    currentLineLength = word.length + 1;
                }
                else {
                    currentLineLength += word.length + 1;
                }
            }
            if (currentLineLength > 0)
                lines++;
        }
        const estimatedHeightCm = (lines * fontSizeCm * lineHeightMultiplier) + 0.2; // 0.2cm padding
        maxHeightCm = Math.max(maxHeightCm, Math.max(minHeightCm, estimatedHeightCm));
    }
    return maxHeightCm;
}
// Estimating heigth of footer cell 
function estimateFooterHeight(footer) {
    if (!footer || !Array.isArray(footer))
        return 0;
    return footer.length * 1.1;
}
// Pagination logic to handle page breaks
function paginateByHeight(data, columns, availableHeight, json, tableItem) {
    const pages = [];
    let currentPage = [];
    let usedHeight = 0;
    const groupConfigs = tableItem?.groups || [];
    const shouldRepeatHeader = groupConfigs.some((g) => g.showHeader);
    const headerHeight = estimateHeaderHeight(columns, json);
    let lastGroupValues = {};
    for (const row of data) {
        // Simulate ProcessItem's group detection logic
        let tempLastGroupValues = { ...lastGroupValues };
        let tempGroupChanged = false;
        let tempExtraHeight = 0;
        groupConfigs.forEach((group) => {
            const val = row[group.field];
            if (tempGroupChanged || val !== tempLastGroupValues[group.field]) {
                tempGroupChanged = true;
                tempLastGroupValues[group.field] = val;
                // Group header height estimation: padding (4pt*2) + fontSize(10pt) + border/margin
                tempExtraHeight += 0.8;
            }
        });
        if (shouldRepeatHeader) {
            tempExtraHeight += headerHeight;
        }
        const rowHeight = estimateRowHeight(row, columns, json);
        const totalRowHeight = rowHeight + tempExtraHeight;
        // If this row (with its headers) doesn't fit, start a new page
        if (usedHeight + totalRowHeight > availableHeight && currentPage.length > 0) {
            pages.push(currentPage);
            currentPage = [];
            usedHeight = 0;
            lastGroupValues = {}; // Reset for new page (matching ProcessItem's per-page initialization)
            // Re-calculate headers for the first row of the new page
            let newPageExtraHeight = 0;
            let newPageGroupChanged = false;
            groupConfigs.forEach((group) => {
                const val = row[group.field];
                if (newPageGroupChanged || val !== lastGroupValues[group.field]) {
                    newPageGroupChanged = true;
                    lastGroupValues[group.field] = val;
                    newPageExtraHeight += 0.8;
                }
            });
            if (shouldRepeatHeader)
                newPageExtraHeight += headerHeight;
            currentPage.push(row);
            usedHeight += rowHeight + newPageExtraHeight;
        }
        else {
            // Fits on current page
            currentPage.push(row);
            usedHeight += totalRowHeight;
            lastGroupValues = tempLastGroupValues;
        }
    }
    if (currentPage.length) {
        pages.push(currentPage);
    }
    return pages;
}
const getDecimal = (value) => {
    if (value === null || value === undefined)
        return 0;
    if (typeof value === "number")
        return value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};
const PdfContainer = ({ data, jsonData, parameter, reportName }) => {
    let maxLength;
    let paginatedDataForTables = [];
    const tableItems = jsonData?.Body?.items?.filter((i) => i.type === "table-object") || [];
    if (tableItems.length > 0) {
        const columnsForTables = tableItems.map((item) => item.columns || {});
        const tableTops = tableItems.map((item) => parseFloat((getDecimal(item?.y) / jsonData.PxPerCmV) || '0'));
        const bodyHeightPx = jsonData?.Body?.height ?? jsonData?.Body?.Height ?? 0;
        const bodyHeight = Math.trunc(((bodyHeightPx + 7) / jsonData?.PxPerCmV) * 100) / 100;
        const headerHeights = columnsForTables.map((columns) => estimateHeaderHeight(columns, jsonData));
        const footerHeights = tableItems.map((item) => estimateFooterHeight(item.footer));
        const availableHeights = tableItems.map((item, index) => {
            const groupConfigs = item?.groups || [];
            const shouldRepeatHeader = groupConfigs.some((g) => g.showHeader);
            const initialHeaderHeight = shouldRepeatHeader ? 0 : headerHeights[index];
            return bodyHeight - tableTops[index] - initialHeaderHeight - footerHeights[index] - 0.5;
        });
        paginatedDataForTables = tableItems.map((item, index) => {
            const tableDataSource = item.dataSource || '';
            const tableData = data[tableDataSource] || [];
            return {
                id: item.id,
                paginatedData: paginateByHeight(tableData, columnsForTables[index], availableHeights[index], jsonData, item)
            };
        });
        maxLength = Math.max(...paginatedDataForTables.map((item) => item.paginatedData.length));
    }
    return (React.createElement(Document, { title: reportName }, Array.from({ length: maxLength || 1 }).map((_, pageIndex) => {
        const pageDataWithIds = tableItems.length > 0 && paginatedDataForTables.reduce((acc, item) => {
            acc[item.id] = item.paginatedData[pageIndex] || [];
            return acc;
        }, {});
        return (React.createElement(PDFPage, { key: pageIndex, size: jsonData?.PaperSize, orientation: jsonData?.PageOrientation, style: {
                fontFamily: 'Almarai',
                textAlign: jsonData.Direction === 'rtl' ? 'right' : 'left',
                direction: jsonData.Direction
            } },
            React.createElement(PdfHeader, { apiData: data, headerData: jsonData, tableData: data, pageIndex: pageIndex, parameter: parameter, totalPages: maxLength || 1 }),
            React.createElement(PdfBody, { apiData: data, bodyData: jsonData, tableData: pageDataWithIds, pageIndex: pageIndex, parameter: parameter, totalPages: maxLength || 1 }),
            React.createElement(PdfFooter, { apiData: data, footerData: jsonData, tableData: data, pageIndex: pageIndex, parameter: parameter, totalPages: maxLength || 1 })));
    })));
};
export default PdfContainer;
//# sourceMappingURL=PdfContainer.js.map