"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// React Pdf
const renderer_1 = require("@react-pdf/renderer");
// Process all Items
const ProcessItem_1 = __importDefault(require("./ProcessItem"));
const Header = ({ apiData, headerData, tableData, pageIndex, parameter, totalPages }) => (react_1.default.createElement(renderer_1.View, { style: { position: 'relative', height: headerData?.Header?.height ? `${Math.trunc(((headerData?.Header?.height + 7) / headerData?.PxPerCmV) * 100) / 100}cm` : 0 } }, headerData?.Header?.items?.map((item, index) => {
    return (react_1.default.createElement(ProcessItem_1.default, { key: index, apiData: apiData, item: item, json: headerData, tableData: tableData, pageIndex: pageIndex, parameter: parameter, totalPages: totalPages }));
})));
exports.default = Header;
//# sourceMappingURL=PdfHeader.js.map