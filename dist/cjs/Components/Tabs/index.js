"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tabs = void 0;
const react_1 = __importStar(require("react"));
const theme_1 = require("./theme");
const Tabs = ({ name, tabs, onChange, centered, fullWidth, keepMounted = false, orientation = "horizontal", variant = "underline", defaultTab = 0, ...props }) => {
    const [value, setValue] = (0, react_1.useState)(defaultTab);
    const { classes, cx } = (0, theme_1.useStyles)({ centered, fullWidth, orientation, variant });
    // Handle Change
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange && onChange(event, newValue);
    };
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement("div", { className: classes.tabsContainer, role: "tablist", "aria-label": name || "tabs" }, tabs.map((tab, index) => (react_1.default.createElement("button", { key: index, id: `tab-${name || "default"}-${index}`, role: "tab", className: cx(classes.tab, value === index && "active", tab.disabled && "disabled"), onClick: (e) => !tab.disabled && handleChange(e, index), "aria-selected": value === index, "aria-controls": `tabpanel-${name || "default"}-${index}`, disabled: tab.disabled },
            tab.icon && react_1.default.createElement("span", { className: classes.tabIcon }, tab.icon),
            react_1.default.createElement("span", { className: classes.tabLabel }, tab.label),
            tab.badge !== undefined && (react_1.default.createElement("span", { className: classes.badge }, tab.badge)),
            variant === "underline" && value === index && (react_1.default.createElement("span", { className: classes.indicator })))))),
        tabs.map((tab, index) => (react_1.default.createElement("div", { className: classes.tabPanel, key: index, ...props, role: "tabpanel", hidden: value !== index, id: `tabpanel-${name || "default"}-${index}`, "aria-labelledby": `tab-${name || "default"}-${index}` }, (keepMounted || tab.keepMounted || value === index) && tab.content)))));
};
exports.Tabs = Tabs;
//# sourceMappingURL=index.js.map