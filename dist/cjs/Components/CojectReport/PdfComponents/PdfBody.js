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
const Body = ({ apiData, bodyData, tableData, pageIndex, parameter, totalPages, adjustedLayouts }) => (react_1.default.createElement(renderer_1.View, { style: { position: 'relative', height: bodyData?.Body?.height ? `${Math.trunc(((bodyData?.Body?.height + 7) / bodyData?.PxPerCmV) * 100) / 100}cm` : 0 } }, bodyData?.Body?.items?.map((item, index) => {
    return (react_1.default.createElement(ProcessItem_1.default, { key: index, apiData: apiData, item: item, json: bodyData, pageIndex: pageIndex, tableData: tableData, parameter: parameter, totalPages: totalPages, adjustedLayouts: adjustedLayouts }));
})));
exports.default = Body;
//# sourceMappingURL=PdfBody.js.map