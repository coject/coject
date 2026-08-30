"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// React Pdf
const renderer_1 = require("@react-pdf/renderer");
// QR Code
const qr_code_styling_1 = __importDefault(require("qr-code-styling"));
// Function to get decimal value
const getDecimal = (value) => {
    if (value === null || value === undefined)
        return 0;
    if (typeof value === "number")
        return value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
};
// Function to handle text wrapping
const ensureWrap = (val) => {
    if (val === null || val === undefined)
        return "";
    const str = String(val);
    if (/[\u0600-\u06FF]/.test(str))
        return str;
    return str.split(' ').map(word => {
        if (word.length > 8) {
            return word.split('').join('\u200B');
        }
        return word;
    }).join(' ');
};
// Function to get common styles
const ProcessItemCommonStyles = (item, json) => {
    const x = getDecimal(item?.x);
    const y = getDecimal(item?.y);
    const width = getDecimal(item?.width);
    const height = getDecimal(item?.height);
    const styles = {
        position: 'absolute',
        left: `${x / json.PxPerCmH}cm`,
        top: `${y / json.PxPerCmV}cm`,
        width: `${width / json.PxPerCmH}cm`,
        height: `${height / json.PxPerCmV}cm`,
        zIndex: 1
    };
    if (item?.fontFamily)
        styles.fontFamily = item.fontFamily;
    if (item?.fontSize)
        styles.fontSize = `${item.fontSize}pt`;
    if (item?.fontStyle) {
        const stylesList = item.fontStyle.split(' ');
        if (stylesList.includes('font-bold'))
            styles.fontWeight = 'bold';
        if (stylesList.includes('font-italic'))
            styles.fontStyle = 'italic';
        if (stylesList.includes('font-underline'))
            styles.textDecoration = 'underline';
    }
    if (item?.color)
        styles.color = item.color;
    if (item?.textAlign)
        styles.textAlign = item.textAlign;
    if (item?.characterSpacing) {
        const spacing = getDecimal(item.characterSpacing);
        styles.characterSpacing = spacing.toString();
        styles.letterSpacing = `${spacing / 1000}`;
        styles.wordSpacing = `${spacing / 1000}em`;
    }
    if (item?.lineHeight) {
        const newHeight = getDecimal(item.lineHeight);
        styles.lineHeight = newHeight > 3 ? `${newHeight}pt` : newHeight.toString();
    }
    if (item?.border) {
        switch (item.border) {
            case "single":
                styles.border = "1px solid black";
                break;
            case "double":
                styles.border = "3px double black";
                break;
            case "dashed":
                styles.border = "1px dashed black";
                break;
            case "dotted":
                styles.border = "1px dotted black";
                break;
            case "dropShadow":
                styles.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.4)";
                break;
            default:
                break;
        }
    }
    if (item?.backgroundColor)
        styles.backgroundColor = item.backgroundColor;
    if (item?.textRotation) {
        const rotation = getDecimal(item.textRotation);
        styles.transform = `rotate(${rotation}deg)`;
        styles.transformOrigin = 'left top';
    }
    return styles;
};
const ProcessTextObjectItem = (item, json) => {
    const styles = ProcessItemCommonStyles(item, json);
    if (item?.hyperlink && item.hyperlink.trim() !== "") {
        styles.textDecoration = "underline";
        styles.color = "blue";
        styles.hyperlink = item.hyperlink;
    }
    return styles;
};
const ProcessDatabaseFieldItem = (item, json) => {
    return ProcessItemCommonStyles(item, json);
};
const ProcessPictureItem = (item, json) => {
    const x = getDecimal(item?.x);
    const y = getDecimal(item?.y);
    const width = getDecimal(item?.width);
    const height = getDecimal(item?.height);
    const styles = {
        position: 'absolute',
        left: `${x / json.PxPerCmH}cm`,
        top: `${y / json.PxPerCmV}cm`,
        width: `${width / json.PxPerCmH}cm`,
        height: `${height / json.PxPerCmV}cm`,
    };
    if (item?.rounded) {
        styles.borderRadius = 50;
    }
    if (item?.layerPosition === "back") {
        styles.zIndex = 2;
    }
    else {
        styles.zIndex = 0;
    }
    if (item?.border) {
        switch (item.border) {
            case "single":
                styles.border = "1px solid black";
                break;
            case "double":
                styles.border = "3px double black";
                break;
            case "dashed":
                styles.border = "1px dashed black";
                break;
            case "dotted":
                styles.border = "1px dotted black";
                break;
            case "dropShadow":
                styles.boxShadow = "2px 2px 6px rgba(0, 0, 0, 0.4)";
                break;
            default:
                break;
        }
    }
    return styles;
};
const ProcessSpecialFieldItem = (item, json) => {
    return ProcessItemCommonStyles(item, json);
};
const ProcessTableObjectItem = (item, json) => {
    const x = getDecimal(item?.x);
    const y = getDecimal(item?.y);
    const width = getDecimal(item?.width);
    const styles = {
        position: 'absolute',
        left: `${x / json.PxPerCmH}cm`,
        top: `${y / json.PxPerCmV}cm`,
        width: `${width / json.PxPerCmH}cm`,
        zIndex: 1
    };
    return styles;
};
const ProcessQrCodeObjectItem = (item, json) => {
    const x = getDecimal(item?.x);
    const y = getDecimal(item?.y);
    const width = getDecimal(item?.width);
    const height = getDecimal(item?.height);
    const styles = {
        position: 'absolute',
        left: `${x / json.PxPerCmH}cm`,
        top: `${y / json.PxPerCmV}cm`,
        width: `${width / json.PxPerCmH}cm`,
        height: `${height / json.PxPerCmV}cm`,
        zIndex: 1
    };
    return styles;
};
const QrCodeGeneratedImage = ({ item, styles }) => {
    const generateQrCode = async () => {
        if (!item?.data)
            return "";
        const size = Math.max(getDecimal(item?.width) || 300, 300);
        const qrContent = unescape(encodeURIComponent(item?.data || ""));
        let base64Image = "";
        if (item?.image && item.image.startsWith("http")) {
            const proxiedUrl = `https://wsrv.nl/?url=${encodeURIComponent(item.image)}&w=150&h=150&fit=contain&output=png`;
            try {
                const res = await fetch(proxiedUrl);
                const blob = await res.blob();
                base64Image = await new Promise(resolve => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result || "");
                    reader.readAsDataURL(blob);
                });
            }
            catch (e) {
                console.error("Failed to proxy image CORS", e);
                base64Image = proxiedUrl;
            }
        }
        else {
            base64Image = item?.image || "";
        }
        const qrCode = new qr_code_styling_1.default({
            width: size,
            height: size,
            data: qrContent,
            image: base64Image,
            margin: getDecimal(item?.margin) || 0,
            qrOptions: {
                errorCorrectionLevel: item?.image ? "H" : (item?.errorCorrectionLevel || "M")
            },
            dotsOptions: {
                type: item?.dotsOptionsType === "rounded" ? "rounded" : (item?.dotsOptionsType || "square"),
                color: item?.dotsOptionsColor || "#000000"
            },
            cornersSquareOptions: {
                type: item?.cornersSquareOptionsType === "rounded" ? "extra-rounded" : (item?.cornersSquareOptionsType || "square"),
                color: item?.cornersSquareOptionsColor || "#000000"
            },
            cornersDotOptions: {
                type: item?.cornersDotOptionsType === "rounded" ? "dot" : (item?.cornersDotOptionsType || "square"),
                color: item?.cornersDotOptionsColor || "#000000"
            },
            backgroundOptions: {
                color: item?.backgroundOptionsColor || "#ffffff"
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 2,
                imageSize: 0.3
            }
        });
        try {
            const buffer = await qrCode.getRawData("png");
            if (buffer) {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result || "");
                    reader.readAsDataURL(buffer);
                });
            }
        }
        catch (error) {
            console.error("Failed to generate QR Code locally:", error);
            return `https://quickchart.io/qr?size=300&text=${encodeURIComponent(item?.data || "")}&centerImageUrl=${encodeURIComponent(item?.image || "")}&dark=${(item?.dotsOptionsColor || "#000000").replace("#", "")}&margin=${getDecimal(item?.margin) || 0}`;
        }
    };
    return (react_1.default.createElement(renderer_1.View, { style: { ...styles } }, item?.data ? (react_1.default.createElement(renderer_1.Image, { src: generateQrCode(), style: { width: '100%', height: '100%', objectFit: 'contain' }, cache: false })) : null));
};
const processTableColumns = (item, json) => {
    const columns = item?.columns;
    if (!columns || typeof columns !== 'object')
        return {};
    const visibleKeys = Object.keys(columns).filter(key => !columns[key]?.hide);
    visibleKeys.sort((a, b) => (columns[a]?.ordinal ?? 0) - (columns[b]?.ordinal ?? 0));
    const firstColumnName = visibleKeys[0];
    const lastColumnName = visibleKeys[visibleKeys.length - 1];
    const tableTotalPx = getDecimal(item?.width) || 1064;
    const pxPerCmH = json.PxPerCmH || 53.057;
    let totalSizedWidthPx = 0;
    const columnWidthsPx = {};
    visibleKeys.forEach((key) => {
        const col = columns[key];
        if (col?.width) {
            const widthPx = parseFloat(col.width);
            if (!isNaN(widthPx)) {
                columnWidthsPx[key] = widthPx;
                totalSizedWidthPx += widthPx;
            }
        }
    });
    const flexColumnCount = visibleKeys.filter(k => !columnWidthsPx[k]).length;
    const remainingPx = Math.max(0, tableTotalPx - totalSizedWidthPx);
    const flexWidthPx = flexColumnCount > 0 ? remainingPx / flexColumnCount : 0;
    const updatedColumns = {};
    visibleKeys.forEach((key) => {
        const col = columns[key];
        const styleDict = {
            fontSize: '12pt',
            padding: '0.1cm 0.2cm',
            minHeight: '1cm',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderBottom: '1px solid #000',
            borderRight: '1px solid #000',
            zIndex: 1,
            fontWeight: 'bold'
        };
        if (col?.fontSize)
            styleDict.fontSize = `${col.fontSize}pt`;
        if (col?.color)
            styleDict.color = col.color;
        if (col?.backgroundColor)
            styleDict.backgroundColor = col.backgroundColor;
        if (col?.textAlign)
            styleDict.textAlign = col.textAlign;
        if ((key === lastColumnName && json.Direction === 'rtl') ||
            (key === firstColumnName && json.Direction === 'ltr')) {
            styleDict.borderLeft = '1px solid #000';
        }
        if (columnWidthsPx[key]) {
            styleDict.width = `${columnWidthsPx[key] / pxPerCmH}cm`;
        }
        else {
            styleDict.width = `${flexWidthPx / pxPerCmH}cm`;
        }
        updatedColumns[key] = {
            ordinal: col?.ordinal ?? 0,
            text: col?.text ?? key,
            isCustom: col?.isCustom ?? false,
            valueSource: col?.valueSource ?? null,
            staticValue: col?.staticValue ?? null,
            parameter: col?.parameter ?? null,
            Styles: styleDict,
            merge: col?.merge,
            colSpanLabel: col?.colSpanLabel,
        };
    });
    return updatedColumns;
};
// Returns the value of a special field (like page number, date, etc.) based on the given key and context
const getSpecialFieldValue = (key, context) => {
    switch (key) {
        case 'pageNumber': return context.pageNumber || 1;
        case 'totalPages': return context.totalPages || 1;
        case 'pageXofY':
            if (context?.dir === 'rtl') {
                return `الصفحة ${context.pageNumber || 1} من ${context.totalPages || 1}`;
            }
            else {
                return `Page ${context.pageNumber || 1} of ${context.totalPages || 1}`;
            }
        case 'currentDate': return formatDate(new Date(), context.format || "dd/MM/yyyy", context.dir);
        case 'currentTime': return formatDate(new Date(), context.format || "HH:mm", context.dir);
        case 'currentDateTime': return formatDate(new Date(), context.format || "dd/MM/yyyy HH:mm", context.dir);
        case 'printedBy': return context.printedBy || "Unknown";
        case 'printDate': return formatDate(context.printDate || new Date(), context.format || "dd/MM/yyyy HH:mm", context.dir);
        default: return '';
    }
};
// Formats a Date object into a string based on the provided format pattern
const formatDate = (date, format = "dd/MM/yyyy HH:mm", dir) => {
    if (!(date instanceof Date))
        date = new Date(date);
    const lang = dir === 'rtl' ? 'ar' : 'en';
    const days = {
        ar: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
        en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };
    const months = {
        ar: [
            "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
            "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
        ],
        en: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
    };
    const pad = (n) => String(n).padStart(2, "0");
    const map = {
        dddd: days[lang][date.getDay()],
        dd: pad(date.getDate()),
        d: date.getDate(),
        MMMM: months[lang][date.getMonth()],
        MMM: months[lang][date.getMonth()].slice(0, 3),
        MM: pad(date.getMonth() + 1),
        M: date.getMonth() + 1,
        yyyy: date.getFullYear(),
        yy: String(date.getFullYear()).slice(-2),
        HH: pad(date.getHours()),
        hh: pad((date.getHours() % 12) || 12),
        mm: pad(date.getMinutes()),
        ss: pad(date.getSeconds()),
        A: lang === "ar" ? (date.getHours() >= 12 ? "م" : "ص") : (date.getHours() >= 12 ? "PM" : "AM")
    };
    return format.replace(/dddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|HH|hh|mm|ss|A/g, m => map[m]);
};
// Currency symbol mapping
const currencySymbolMap = {
    'SAR': 'ر.س',
    'EGP': 'ج.م',
    '$': '$',
    '€': '€',
    '£': '£'
};
// Formats a Number based on the provided format pattern
const formatNumber = (val, format) => {
    if (val === null || val === undefined || val === '' || isNaN(val))
        return '';
    let num = Number(val);
    let prefix = '';
    let suffix = '';
    let hasComma = false;
    let decimalPlaces = 0;
    let f = format || "";
    if (f.includes("%")) {
        suffix += "%";
        f = f.replace("%", "");
    }
    // Replace known currency codes with Arabic symbols before parsing
    for (const [code, symbol] of Object.entries(currencySymbolMap)) {
        if (f.startsWith(code)) {
            prefix = symbol + ' ';
            f = f.slice(code.length);
            break;
        }
    }
    const match = f.match(/^([^\d#]*)([\d#,\.]+)([^\d#]*)$/);
    if (match) {
        if (!prefix)
            prefix = match[1] || "";
        let core = match[2];
        suffix = (match[3] || "") + suffix;
        hasComma = core.includes(",");
        const dotIdx = core.indexOf(".");
        if (dotIdx !== -1) {
            decimalPlaces = core.length - dotIdx - 1;
        }
    }
    let str = num.toFixed(decimalPlaces);
    if (hasComma) {
        let parts = str.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        str = parts.join(".");
    }
    return prefix + str + suffix;
};
const ProcessPanelItem = (item, json) => {
    return ProcessItemCommonStyles(item, json);
};
const getColumnType = (json, dataSource, fieldName) => {
    if (json?.Datasources?.[dataSource]?.columns) {
        const columns = json.Datasources[dataSource].columns;
        if (Array.isArray(columns)) {
            const column = columns.find((c) => c.name === fieldName);
            if (column)
                return column.type;
        }
    }
    return null;
};
const formatValueByType = (value, type) => {
    if (!value || !type)
        return value;
    const strVal = String(value);
    if (type === 'date') {
        return strVal.split('T')[0];
    }
    else if (type === 'dateTime') {
        return strVal.includes('T') ? strVal : `${strVal}T00:00:00`;
    }
    return value;
};
const ProcessItem = ({ apiData, item: rawItem, pageIndex, tableData, json, parameter, totalPages, adjustedLayouts }) => {
    const item = (adjustedLayouts && adjustedLayouts[rawItem?.id])
        ? { ...rawItem, y: adjustedLayouts[rawItem.id].y }
        : rawItem;
    const isVisible = item?.fixed ||
        (adjustedLayouts
            ? !!adjustedLayouts[item?.id]
            : (item?.type === "text-object" ? pageIndex === 0 : true));
    if (!isVisible)
        return null;
    if (item?.type === "text-object") {
        const itemStyles = ProcessTextObjectItem(item, json);
        const { position, left, top, width, height, zIndex, border, boxShadow, backgroundColor, transform, transformOrigin, ...textStyles } = itemStyles;
        const containerStyles = { position, left, top, width, height, zIndex, border, boxShadow, backgroundColor, transform, transformOrigin };
        return (react_1.default.createElement(renderer_1.View, { style: containerStyles },
            react_1.default.createElement(renderer_1.Text, { style: {
                    ...textStyles,
                    fontSize: textStyles.fontSize || '12pt',
                    direction: json?.Direction || 'rtl',
                    hyphens: 'none'
                } }, ensureWrap(item?.text))));
    }
    else if (item?.type === "database-field") {
        let fieldValue = '';
        const itemStyles = ProcessDatabaseFieldItem(item, json);
        const sourceData = apiData?.[item?.dataSource];
        if (Array.isArray(sourceData)) {
            fieldValue = sourceData[0]?.[item?.field] ?? '';
        }
        else if (typeof sourceData === 'object') {
            fieldValue = sourceData?.[item?.field] ?? '';
        }
        const colType = getColumnType(json, item?.dataSource, item?.field);
        fieldValue = formatValueByType(fieldValue, colType);
        const { position, left, top, width, height, zIndex, border, boxShadow, backgroundColor, transform, transformOrigin, ...textStyles } = itemStyles;
        const containerStyles = { position, left, top, width, height, zIndex, border, boxShadow, backgroundColor, transform, transformOrigin };
        return (react_1.default.createElement(renderer_1.View, { style: containerStyles },
            react_1.default.createElement(renderer_1.Text, { style: {
                    ...textStyles,
                    fontSize: textStyles.fontSize || '12pt',
                    direction: json?.Direction || 'rtl',
                    hyphens: 'none'
                } }, ensureWrap(fieldValue ?? ''))));
    }
    else if (item?.type === "picture") {
        const itemStyles = ProcessPictureItem(item, json);
        let source = item?.sourceType === "parameter" ? parameter[item?.parameter] : item?.source;
        if (typeof source === 'string' && source.startsWith('http')) {
            source = `https://wsrv.nl/?url=${encodeURIComponent(source)}&fit=contain&output=png&.png`;
        }
        else if (typeof source === 'string' && !source.startsWith('data:') && source.length > 100) {
            source = `data:image/png;base64,${source}`;
        }
        return (react_1.default.createElement(renderer_1.View, { style: { ...itemStyles } }, source ? react_1.default.createElement(renderer_1.Image, { src: source, cache: false }) : null));
    }
    else if (item?.type === "special-field") {
        const itemStyles = ProcessSpecialFieldItem(item, json);
        return (react_1.default.createElement(renderer_1.View, { style: { position: itemStyles.position, left: itemStyles.left, top: itemStyles.top, width: itemStyles.width, height: itemStyles.height, zIndex: itemStyles.zIndex, border: itemStyles.border, boxShadow: itemStyles.boxShadow, backgroundColor: itemStyles.backgroundColor, transform: itemStyles.transform, transformOrigin: itemStyles.transformOrigin, display: 'flex', justifyContent: 'center' } },
            react_1.default.createElement(renderer_1.Text, { style: {
                    fontSize: itemStyles.fontSize || '12pt',
                    color: itemStyles.color || 'black',
                    fontFamily: itemStyles.fontFamily,
                    textAlign: itemStyles.textAlign,
                    fontWeight: itemStyles.fontWeight,
                    fontStyle: itemStyles.fontStyle,
                    textDecoration: itemStyles.textDecoration,
                    letterSpacing: itemStyles.letterSpacing,
                    wordSpacing: itemStyles.wordSpacing,
                    width: '100%',
                    hyphens: 'none'
                }, render: ({ pageNumber, totalPages }) => {
                    const context = {
                        dir: json?.Direction,
                        pageNumber,
                        totalPages,
                        printedBy: "Coject User",
                        printDate: new Date(),
                        format: item?.format || (item?.fieldType == "currentTime" ? "HH:mm" : "dd/MM/yyyy HH:mm")
                    };
                    const value = getSpecialFieldValue(item.fieldType, context);
                    return String(value);
                } })));
    }
    else if (item?.type === "table-object") {
        const itemStyles = ProcessTableObjectItem(item, json);
        const updatedColumns = processTableColumns(item, json);
        const updatedColumnsEntries = Object.entries(updatedColumns);
        const hasMerge = updatedColumnsEntries.some(([_, col]) => col.merge?.colSpan > 1);
        const headerItems = [];
        for (let i = 0; i < updatedColumnsEntries.length; i++) {
            const [key, col] = updatedColumnsEntries[i];
            const colSpan = col.merge?.colSpan || 1;
            if (colSpan > 1) {
                const subCols = updatedColumnsEntries.slice(i, i + colSpan);
                headerItems.push({ type: 'merged', col, subCols });
                i += (colSpan - 1);
            }
            else {
                headerItems.push({ type: 'single', key, col });
            }
        }
        // Grouping Logic
        const tableRows = (tableData ?? {})[item?.id] || (apiData ?? {})[item?.dataSource] || [];
        const groupConfigs = item?.groups || [];
        const footerConfigs = item?.footer || [];
        const shouldRepeatHeader = groupConfigs.some((g) => g.showHeader);
        const processedRows = [];
        let lastGroupValues = {};
        tableRows.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
                footerConfigs.forEach((footer, fIdx) => {
                    const gc = footer.columns?.groupColumn;
                    if (gc && row[gc] !== tableRows[rowIndex - 1][gc]) {
                        const groupValue = tableRows[rowIndex - 1][gc];
                        const prevGroupRows = [];
                        for (let i = rowIndex - 1; i >= 0; i--) {
                            if (tableRows[i][gc] === groupValue) {
                                prevGroupRows.unshift(tableRows[i]);
                            }
                            else {
                                break;
                            }
                        }
                        processedRows.push({
                            type: 'footer-row',
                            dataRows: prevGroupRows,
                            footerIndex: fIdx,
                            key: `gf-${rowIndex}-${fIdx}`
                        });
                    }
                });
            }
            let groupChanged = false;
            groupConfigs.forEach((group, groupIndex) => {
                const val = row[group.field];
                if (groupChanged || rowIndex === 0 || val !== lastGroupValues[group.field]) {
                    groupChanged = true;
                    lastGroupValues[group.field] = val;
                    processedRows.push({
                        type: 'group-header',
                        text: (group.headerText || "").replace(/\{(\w+)\}/g, (_match, key) => row[key] ?? ""),
                        key: `gh-${rowIndex}-${groupIndex}`
                    });
                }
            });
            if (shouldRepeatHeader) {
                processedRows.push({
                    type: 'table-header',
                    key: `th-${rowIndex}`
                });
            }
            processedRows.push({
                type: 'data-row',
                data: row,
                index: rowIndex,
                key: `dr-${rowIndex}`
            });
        });
        footerConfigs.forEach((footer, fIdx) => {
            const gc = footer.columns?.groupColumn;
            if (gc && tableRows.length > 0) {
                const groupValue = tableRows[tableRows.length - 1][gc];
                const lastGroupRows = [];
                for (let i = tableRows.length - 1; i >= 0; i--) {
                    if (tableRows[i][gc] === groupValue) {
                        lastGroupRows.unshift(tableRows[i]);
                    }
                    else {
                        break;
                    }
                }
                processedRows.push({
                    type: 'footer-row',
                    dataRows: lastGroupRows,
                    footerIndex: fIdx,
                    key: `gf-last-${fIdx}`
                });
            }
        });
        const renderTableHeader = (headerKey) => (react_1.default.createElement(renderer_1.View, { key: headerKey, style: { flexDirection: json?.Direction == 'rtl' ? 'row-reverse' : 'row' } }, headerItems.map((hItem, idx) => {
            if (hItem.type === 'single') {
                return (react_1.default.createElement(renderer_1.View, { key: idx, style: {
                        ...hItem.col.Styles,
                        minHeight: hasMerge ? '2cm' : '1cm',
                        justifyContent: 'center'
                    } },
                    react_1.default.createElement(renderer_1.Text, { wrap: true, style: { textAlign: hItem.col.Styles.textAlign || 'left', width: '100%', hyphens: 'none' } }, ensureWrap(hItem.col.text || hItem.key))));
            }
            else {
                let totalWidthCm = 0;
                hItem.subCols.forEach(([_, sc]) => totalWidthCm += parseFloat(sc.Styles.width));
                return (react_1.default.createElement(renderer_1.View, { key: idx, style: { flexDirection: 'column', width: `${totalWidthCm}cm` } },
                    react_1.default.createElement(renderer_1.View, { style: {
                            ...hItem.col.Styles,
                            width: `${totalWidthCm}cm`,
                            minHeight: '1cm',
                            justifyContent: 'center',
                            alignItems: 'center'
                        } },
                        react_1.default.createElement(renderer_1.Text, { wrap: true, style: { textAlign: 'center', hyphens: 'none' } }, ensureWrap(hItem.col.colSpanLabel || ""))),
                    react_1.default.createElement(renderer_1.View, { style: { flexDirection: json?.Direction == 'rtl' ? 'row-reverse' : 'row' } }, hItem.subCols.map(([sk, sc], sidx) => (react_1.default.createElement(renderer_1.View, { key: sidx, style: { ...sc.Styles, minHeight: '1cm', justifyContent: 'center' } },
                        react_1.default.createElement(renderer_1.Text, { wrap: true, style: { textAlign: sc.Styles.textAlign || 'left', width: '100%', hyphens: 'none' } }, ensureWrap(sc.text || sk))))))));
            }
        })));
        const renderTableFooters = (rows, specificFooterIndex) => {
            if (!item?.footer || !Array.isArray(item.footer))
                return null;
            const footersToRender = specificFooterIndex !== undefined
                ? [item.footer[specificFooterIndex]]
                : item.footer;
            return footersToRender.map((footerRow, fIdx) => {
                const actualIdx = specificFooterIndex !== undefined ? specificFooterIndex : fIdx;
                const fCols = footerRow?.columns || {};
                const visibility = fCols.footerVisibility || "ALL";
                const groupCol = fCols.groupColumn;
                if (rows === undefined && groupCol)
                    return null;
                if (rows !== undefined && !groupCol)
                    return null;
                if (visibility === "LAST" && pageIndex !== (totalPages || 1) - 1) {
                    return null;
                }
                const colKeys = Object.keys(fCols)
                    .filter(k => !isNaN(parseInt(k)))
                    .sort((a, b) => parseInt(a) - parseInt(b));
                let currentTableColIndex = 0;
                return (react_1.default.createElement(renderer_1.View, { key: `footer-${actualIdx}`, style: { flexDirection: json?.Direction == 'rtl' ? 'row-reverse' : 'row' }, wrap: false }, colKeys.map((colKey, cIdx) => {
                    const fCol = fCols[colKey];
                    const colSpan = parseInt(fCol.colSpan) || 1;
                    let widthCm = 0;
                    if (fCol.width) {
                        const pxPerCmH = json?.PxPerCmH || 53.057;
                        widthCm = parseFloat(fCol.width) / pxPerCmH;
                    }
                    else if (updatedColumnsEntries.length > 0) {
                        for (let i = 0; i < colSpan; i++) {
                            if (currentTableColIndex + i < updatedColumnsEntries.length) {
                                const [, tableCol] = updatedColumnsEntries[currentTableColIndex + i];
                                widthCm += parseFloat(tableCol.Styles.width);
                            }
                        }
                    }
                    else {
                        const tableTotalPx = getDecimal(item?.width) || 1064;
                        const pxPerCmH = json?.PxPerCmH || 53.057;
                        const tableWidthCm = tableTotalPx / pxPerCmH;
                        const totalCols = parseInt(fCols.nOC) || colKeys.length || 1;
                        widthCm = (tableWidthCm / totalCols) * colSpan;
                    }
                    currentTableColIndex += colSpan;
                    let cellValue = '';
                    if (fCol.valueSource === 'staticValue') {
                        cellValue = fCol.staticValue || '';
                    }
                    else if (fCol.valueSource === 'parameter') {
                        cellValue = (parameter && fCol.parameter) ? (parameter[fCol.parameter] ?? '') : '';
                    }
                    else if (fCol.valueSource === 'field' && fCol.field) {
                        const fieldName = fCol.field;
                        const rowsToUse = rows || (tableData ?? {})[item?.id] || (apiData ?? {})[item?.dataSource] || [];
                        let values = rowsToUse.map((r) => parseFloat(r[fieldName])).filter((v) => !isNaN(v));
                        if (fCol.aggregate === 'sum') {
                            cellValue = values.reduce((a, b) => a + b, 0);
                        }
                        else if (fCol.aggregate === 'count') {
                            cellValue = values.length;
                        }
                        else if (fCol.aggregate === 'avg') {
                            cellValue = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
                        }
                        else if (fCol.aggregate === 'min') {
                            cellValue = values.length ? Math.min(...values) : 0;
                        }
                        else if (fCol.aggregate === 'max') {
                            cellValue = values.length ? Math.max(...values) : 0;
                        }
                        else {
                            cellValue = (rowsToUse[parseInt((fCol.rowNo) || "1") - 1]?.[fieldName]) ?? '';
                        }
                        if (fCol.format) {
                            cellValue = formatNumber(cellValue, fCol.format);
                        }
                        else {
                            const colType = getColumnType(json, item?.dataSource, fieldName);
                            cellValue = formatValueByType(cellValue, colType);
                        }
                    }
                    const cellStyle = {
                        width: `${widthCm}cm`,
                        minHeight: '1cm',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '0.1cm 0.2cm',
                        borderRight: '1px solid #000',
                        borderBottom: '1px solid #000',
                        zIndex: 1,
                        fontWeight: 'bold'
                    };
                    if ((cIdx === colKeys.length - 1 && json?.Direction === 'rtl') ||
                        (cIdx === 0 && json?.Direction === 'ltr')) {
                        cellStyle.borderLeft = '1px solid #000';
                    }
                    if (fCol.fontSize)
                        cellStyle.fontSize = `${fCol.fontSize}pt`;
                    else
                        cellStyle.fontSize = '12pt';
                    if (fCol.color)
                        cellStyle.color = fCol.color;
                    if (fCol.backgroundColor)
                        cellStyle.backgroundColor = fCol.backgroundColor;
                    if (fCol.textAlign)
                        cellStyle.textAlign = fCol.textAlign;
                    return (react_1.default.createElement(renderer_1.View, { key: cIdx, style: { ...cellStyle } },
                        react_1.default.createElement(renderer_1.Text, { style: { textAlign: cellStyle.textAlign || 'left', width: '100%', hyphens: 'none' } }, ensureWrap(cellValue))));
                })));
            });
        };
        const hasVisibleColumns = updatedColumnsEntries.length > 0;
        const hasVisibleFooters = item?.footer && Array.isArray(item.footer) && item.footer.some((footerRow) => {
            const fCols = footerRow?.columns || {};
            const groupCol = fCols.groupColumn;
            if (groupCol)
                return false;
            const visibility = fCols.footerVisibility || "ALL";
            if (visibility === "LAST" && (pageIndex ?? 0) !== (totalPages ?? 1) - 1) {
                return false;
            }
            return true;
        });
        const hasVisibleRows = hasVisibleColumns && processedRows.length > 0;
        const isTableVisibleOnThisPage = hasVisibleRows || hasVisibleFooters || (!shouldRepeatHeader && hasVisibleColumns);
        return ((isTableVisibleOnThisPage && (((tableData ?? {})[item?.id] || (apiData ?? {})[item?.dataSource])?.length || (pageIndex ?? 0) == 0)) ? (react_1.default.createElement(renderer_1.View, { style: { ...itemStyles, borderTop: '1px solid #000' }, wrap: true },
            !shouldRepeatHeader && renderTableHeader('top-header'),
            react_1.default.createElement(renderer_1.View, { style: { flexDirection: 'column' } },
                processedRows.map((pRow) => {
                    if (pRow.type === 'group-header') {
                        return (react_1.default.createElement(renderer_1.View, { key: pRow.key, style: {
                                flexDirection: json?.Direction == 'rtl' ? 'row-reverse' : 'row',
                                backgroundColor: '#f0f0f0',
                                borderBottom: '1px solid #000',
                                borderLeft: '1px solid #000',
                                borderRight: '1px solid #000',
                                padding: '4pt',
                                zIndex: 1
                            } },
                            react_1.default.createElement(renderer_1.Text, { style: { fontWeight: 'bold', fontSize: '10pt', hyphens: 'none' } }, ensureWrap(pRow.text))));
                    }
                    if (pRow.type === 'table-header') {
                        return renderTableHeader(pRow.key);
                    }
                    if (pRow.type === 'footer-row') {
                        return renderTableFooters(pRow.dataRows, pRow.footerIndex);
                    }
                    const { data: row, index: idx } = pRow;
                    return (react_1.default.createElement(renderer_1.View, { key: pRow.key, style: { flexDirection: json?.Direction == 'rtl' ? 'row-reverse' : 'row' }, wrap: false }, updatedColumnsEntries.map(([key, col], i) => {
                        const { color, backgroundColor, fontWeight, ...filteredStyles } = col?.Styles || {};
                        let cellValue;
                        if (col?.isCustom && col?.valueSource) {
                            switch (col.valueSource) {
                                case 'rowNum':
                                    cellValue = idx + 1;
                                    break;
                                case 'staticValue':
                                    cellValue = col?.staticValue ?? '';
                                    break;
                                case 'parameter':
                                    cellValue = parameter?.[col?.parameter] ?? '';
                                    break;
                                default: cellValue = row[key] ?? '';
                            }
                        }
                        else {
                            cellValue = row[key] ?? '';
                        }
                        const colType = getColumnType(json, item?.dataSource, key);
                        cellValue = formatValueByType(cellValue, colType);
                        return (react_1.default.createElement(renderer_1.View, { key: i, style: { ...filteredStyles, backgroundColor: backgroundColor } },
                            react_1.default.createElement(renderer_1.Text, { style: {
                                    width: '100%',
                                    textAlign: filteredStyles.textAlign || (json?.Direction === 'rtl' ? 'right' : 'left'),
                                    color: color || 'black',
                                    hyphens: 'none'
                                } }, ensureWrap(cellValue))));
                    })));
                }),
                renderTableFooters()))) : null);
    }
    else if (item?.type === "qr-code-object") {
        const itemStyles = ProcessQrCodeObjectItem(item, json);
        return react_1.default.createElement(QrCodeGeneratedImage, { item: item, styles: itemStyles });
    }
    else if (item?.type === "panel") {
        const itemStyles = ProcessPanelItem(item, json);
        return (react_1.default.createElement(renderer_1.View, { style: { ...itemStyles } }, item?.body?.items?.map((childItem, index) => (react_1.default.createElement(ProcessItem, { key: index, apiData: apiData, item: childItem, json: json, pageIndex: pageIndex, tableData: tableData, parameter: parameter, totalPages: totalPages, adjustedLayouts: adjustedLayouts })))));
    }
    return null;
};
exports.default = ProcessItem;
//# sourceMappingURL=ProcessItem.js.map