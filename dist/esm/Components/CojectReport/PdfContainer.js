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
const getDecimal = (value) => {
    if (value === null || value === undefined)
        return 0;
    if (typeof value === "number")
        return value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};
// Pagination logic to handle page breaks sequentially for all elements
function computeSequentialLayout(jsonData, data) {
    const PxPerCmV = jsonData?.PxPerCmV || 29.7336;
    const bodyHeightPx = jsonData?.Body?.height ?? jsonData?.Body?.Height ?? 0;
    // Separate fixed and flow items
    const allItems = jsonData?.Body?.items || [];
    const flowItems = [...allItems]
        .filter((item) => !item?.fixed)
        .sort((a, b) => {
        const dy = getDecimal(a?.y) - getDecimal(b?.y);
        if (dy !== 0)
            return dy;
        return getDecimal(a?.x) - getDecimal(b?.x);
    });
    // Group flow items by y coordinate to preserve horizontal rows (side-by-side elements)
    const groups = [];
    let currentGroup = [];
    flowItems.forEach((item) => {
        if (currentGroup.length === 0) {
            currentGroup.push(item);
        }
        else {
            const prevInGroup = currentGroup[currentGroup.length - 1];
            // If the item's y is within 10 pixels of the previous item in the group, they are side-by-side
            if (getDecimal(item.y) - getDecimal(prevInGroup.y) < 10) {
                currentGroup.push(item);
            }
            else {
                groups.push(currentGroup);
                currentGroup = [item];
            }
        }
    });
    if (currentGroup.length > 0) {
        groups.push(currentGroup);
    }
    const pages = [];
    let currentPageIndex = 0;
    let currentPage = {
        yCursor: 0,
        adjustedLayouts: {},
        tableData: {}
    };
    pages.push(currentPage);
    function startNewPage() {
        currentPageIndex++;
        currentPage = {
            yCursor: 6, // 6 pixels top margin on new pages (approx 0.2cm)
            adjustedLayouts: {},
            tableData: {}
        };
        pages.push(currentPage);
    }
    let prevGroup = null;
    let prevGroupPageIndex = 0;
    groups.forEach((group, groupIdx) => {
        if (groupIdx === 0) {
            // Respect the design's top gap on the first page
            currentPage.yCursor = getDecimal(group[0]?.y);
        }
        const isTable = group.length === 1 && group[0]?.type === "table-object";
        if (isTable) {
            const item = group[0];
            const columns = item?.columns || {};
            const tableDataSource = item?.dataSource || '';
            const tableRows = data[tableDataSource] || [];
            const headerHeight = estimateHeaderHeight(columns, jsonData) * PxPerCmV;
            const footerHeight = estimateFooterHeight(item?.footer) * PxPerCmV;
            const groupConfigs = item?.groups || [];
            const shouldRepeatHeader = groupConfigs.some((g) => g.showHeader);
            // Calculate design gap from the previous group on the same page
            let designGap = 0;
            if (prevGroup && currentPageIndex === prevGroupPageIndex) {
                const maxPrevHeight = Math.max(...prevGroup.map((gItem) => getDecimal(gItem.height)));
                designGap = Math.max(0, getDecimal(item.y) - (getDecimal(prevGroup[0].y) + maxPrevHeight));
            }
            // Clamp the gap to standard professional spacing (10px to 20px) to prevent both overlaps and huge empty spaces
            const gap = prevGroup ? Math.min(20, Math.max(10, designGap)) : 0;
            let tableStartCursor = currentPage.yCursor + gap;
            // Ensure we can fit at least the header on the current page
            if (tableStartCursor + headerHeight > bodyHeightPx) {
                startNewPage();
                tableStartCursor = currentPage.yCursor; // 6 pixels
            }
            else {
                currentPage.yCursor = tableStartCursor;
            }
            let lastGroupValues = {};
            let tableRowIndex = 0;
            if (tableRows.length === 0) {
                // Empty table gets header + footer
                const emptyTableHeight = headerHeight + footerHeight;
                currentPage.tableData[item.id] = [];
                currentPage.adjustedLayouts[item.id] = {
                    y: currentPage.yCursor,
                    height: emptyTableHeight
                };
                currentPage.yCursor += emptyTableHeight;
            }
            else {
                while (tableRowIndex < tableRows.length) {
                    let tableHeightOnThisPage = 0;
                    // If not repeating header, header is only on the very first page of the table
                    const isFirstPageOfTable = !currentPage.adjustedLayouts[item.id];
                    if (!shouldRepeatHeader && isFirstPageOfTable) {
                        tableHeightOnThisPage += headerHeight;
                    }
                    const pageRows = [];
                    let pageUsedHeight = tableHeightOnThisPage;
                    while (tableRowIndex < tableRows.length) {
                        const row = tableRows[tableRowIndex];
                        let tempLastGroupValues = { ...lastGroupValues };
                        let tempGroupChanged = false;
                        let tempExtraHeight = 0;
                        groupConfigs.forEach((gConf) => {
                            const val = row[gConf.field];
                            if (tempGroupChanged || val !== tempLastGroupValues[gConf.field]) {
                                tempGroupChanged = true;
                                tempLastGroupValues[gConf.field] = val;
                                tempExtraHeight += 0.8 * PxPerCmV;
                            }
                        });
                        if (shouldRepeatHeader) {
                            tempExtraHeight += headerHeight;
                        }
                        const rowHeight = estimateRowHeight(row, columns, jsonData) * PxPerCmV;
                        let totalRowHeight = rowHeight + tempExtraHeight;
                        const isLastRow = (tableRowIndex === tableRows.length - 1);
                        if (isLastRow) {
                            totalRowHeight += footerHeight;
                        }
                        // Check overflow
                        if (currentPage.yCursor + pageUsedHeight + totalRowHeight > bodyHeightPx && pageRows.length > 0) {
                            break;
                        }
                        pageRows.push(row);
                        pageUsedHeight += totalRowHeight;
                        lastGroupValues = tempLastGroupValues;
                        tableRowIndex++;
                    }
                    if (pageRows.length === 0 && tableRowIndex < tableRows.length) {
                        // Force layout of at least one row to prevent infinite loop
                        const row = tableRows[tableRowIndex];
                        pageRows.push(row);
                        let tempExtraHeight = 0;
                        if (shouldRepeatHeader)
                            tempExtraHeight += headerHeight;
                        const rowHeight = estimateRowHeight(row, columns, jsonData) * PxPerCmV;
                        pageUsedHeight += rowHeight + tempExtraHeight;
                        tableRowIndex++;
                    }
                    currentPage.tableData[item.id] = pageRows;
                    currentPage.adjustedLayouts[item.id] = {
                        y: currentPage.yCursor,
                        height: pageUsedHeight
                    };
                    currentPage.yCursor += pageUsedHeight;
                    if (tableRowIndex < tableRows.length) {
                        startNewPage();
                        tableStartCursor = currentPage.yCursor;
                    }
                }
            }
            prevGroup = group;
            prevGroupPageIndex = currentPageIndex;
        }
        else {
            // Non-table flow group (could contain multiple side-by-side elements)
            const maxGroupHeight = Math.max(...group.map(gItem => getDecimal(gItem.height)));
            // Calculate design gap from the previous group
            let designGap = 0;
            if (prevGroup && currentPageIndex === prevGroupPageIndex) {
                const maxPrevHeight = Math.max(...prevGroup.map((gItem) => getDecimal(gItem.height)));
                designGap = Math.max(0, getDecimal(group[0].y) - (getDecimal(prevGroup[0].y) + maxPrevHeight));
            }
            // Clamp the gap to standard professional spacing (10px to 20px) to prevent both overlaps and huge empty spaces
            const gap = prevGroup ? Math.min(20, Math.max(10, designGap)) : 0;
            if (currentPage.yCursor + gap + maxGroupHeight > bodyHeightPx) {
                startNewPage();
                // On new page, gap resets, starting from top margin (6px)
                currentPage.yCursor = 6;
            }
            else {
                currentPage.yCursor += gap;
            }
            // Lay out all items in the group at the same yCursor
            group.forEach((item) => {
                currentPage.adjustedLayouts[item.id] = {
                    y: currentPage.yCursor,
                    height: getDecimal(item?.height)
                };
            });
            currentPage.yCursor += maxGroupHeight;
            prevGroup = group;
            prevGroupPageIndex = currentPageIndex;
        }
    });
    return pages;
}
const PdfContainer = ({ data, jsonData, parameter, reportName }) => {
    if (!jsonData || !jsonData.Body || !jsonData.Body.items) {
        return (React.createElement(Document, { title: reportName },
            React.createElement(PDFPage, { size: "A4", style: { fontFamily: 'Almarai' } },
                React.createElement(PdfHeader, { apiData: data, headerData: jsonData, tableData: data, pageIndex: 0, parameter: parameter, totalPages: 1 }),
                React.createElement(PdfBody, { apiData: data, bodyData: jsonData, tableData: {}, pageIndex: 0, parameter: parameter, totalPages: 1 }),
                React.createElement(PdfFooter, { apiData: data, footerData: jsonData, tableData: data, pageIndex: 0, parameter: parameter, totalPages: 1 }))));
    }
    const pages = computeSequentialLayout(jsonData, data);
    const maxLength = pages.length;
    return (React.createElement(Document, { title: reportName }, pages.map((pageLayout, pageIndex) => {
        return (React.createElement(PDFPage, { key: pageIndex, size: jsonData?.PaperSize, orientation: jsonData?.PageOrientation, style: {
                fontFamily: 'Almarai',
                textAlign: jsonData.Direction === 'rtl' ? 'right' : 'left',
                direction: jsonData.Direction
            } },
            React.createElement(PdfHeader, { apiData: data, headerData: jsonData, tableData: data, pageIndex: pageIndex, parameter: parameter, totalPages: maxLength || 1 }),
            React.createElement(PdfBody, { apiData: data, bodyData: jsonData, tableData: pageLayout.tableData, pageIndex: pageIndex, parameter: parameter, totalPages: maxLength || 1, adjustedLayouts: pageLayout.adjustedLayouts }),
            React.createElement(PdfFooter, { apiData: data, footerData: jsonData, tableData: data, pageIndex: pageIndex, parameter: parameter, totalPages: maxLength || 1 })));
    })));
};
export default PdfContainer;
//# sourceMappingURL=PdfContainer.js.map