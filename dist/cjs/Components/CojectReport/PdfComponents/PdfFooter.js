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
const Footer = ({ apiData, footerData, tableData, pageIndex, parameter, totalPages }) => (react_1.default.createElement(renderer_1.View, { style: { position: 'relative', height: footerData?.Footer?.height ? `${Math.trunc((footerData?.Footer?.height / footerData?.PxPerCmV) * 100) / 100}cm` : 0 } }, footerData?.Footer?.items?.map((item, index) => {
    return (react_1.default.createElement(ProcessItem_1.default, { key: index, apiData: apiData, item: item, json: footerData, tableData: tableData, pageIndex: pageIndex, parameter: parameter, totalPages: totalPages }));
})));
exports.default = Footer;
//# sourceMappingURL=PdfFooter.js.map