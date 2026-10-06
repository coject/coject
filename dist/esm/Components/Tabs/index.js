import React, { useState } from "react";
import { useStyles } from "./theme";
export const Tabs = ({ name, tabs, onChange, centered, fullWidth, keepMounted = false, orientation = "horizontal", variant = "underline", defaultTab = 0, ...props }) => {
    const [value, setValue] = useState(defaultTab);
    const { classes, cx } = useStyles({ centered, fullWidth, orientation, variant });
    // Handle Change
    const handleChange = (event, newValue) => {
        setValue(newValue);
        onChange && onChange(event, newValue);
    };
    return (React.createElement("div", { className: classes.root },
        React.createElement("div", { className: classes.tabsContainer, role: "tablist", "aria-label": name || "tabs" }, tabs.map((tab, index) => (React.createElement("button", { key: index, id: `tab-${name || "default"}-${index}`, role: "tab", className: cx(classes.tab, value === index && "active", tab.disabled && "disabled"), onClick: (e) => !tab.disabled && handleChange(e, index), "aria-selected": value === index, "aria-controls": `tabpanel-${name || "default"}-${index}`, disabled: tab.disabled },
            tab.icon && React.createElement("span", { className: classes.tabIcon }, tab.icon),
            React.createElement("span", { className: classes.tabLabel }, tab.label),
            tab.badge !== undefined && (React.createElement("span", { className: classes.badge }, tab.badge)),
            variant === "underline" && value === index && (React.createElement("span", { className: classes.indicator })))))),
        tabs.map((tab, index) => (React.createElement("div", { className: classes.tabPanel, key: index, ...props, role: "tabpanel", hidden: value !== index, id: `tabpanel-${name || "default"}-${index}`, "aria-labelledby": `tab-${name || "default"}-${index}` }, (keepMounted || tab.keepMounted || value === index) && tab.content)))));
};
//# sourceMappingURL=index.js.map