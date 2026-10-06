import React, { FC, ReactNode, ReactElement, useState } from "react";

import { useStyles } from "./theme";

// Interfaces
interface iTab {
    label: string;
    disabled?: boolean;
    content: ReactNode;
    keepMounted?: boolean;
    badge?: number | string;
    icon?: string | ReactElement;
}

interface iTabs {
    name?: string;
    tabs: iTab[];
    centered?: boolean;
    fullWidth?: boolean;
    keepMounted?: boolean;
    orientation?: "horizontal" | "vertical";
    variant?: "default" | "pills" | "underline";
    defaultTab?: number;
    onChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

export const Tabs: FC<iTabs> = ({ name, tabs, onChange, centered, fullWidth, keepMounted = false, orientation = "horizontal", variant = "underline", defaultTab = 0, ...props }) => {
    const [value, setValue] = useState<number>(defaultTab);
    const { classes, cx } = useStyles({ centered, fullWidth, orientation, variant });

    // Handle Change
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        onChange && onChange(event, newValue);
    };

    return (
        <div className={classes.root}>
            <div className={classes.tabsContainer} role="tablist" aria-label={name || "tabs"}>
                {tabs.map((tab, index) => (
                    <button key={index} id={`tab-${name || "default"}-${index}`} role="tab"
                        className={cx(classes.tab, value === index && "active", tab.disabled && "disabled")}
                        onClick={(e) => !tab.disabled && handleChange(e, index)}
                        aria-selected={value === index} aria-controls={`tabpanel-${name || "default"}-${index}`} disabled={tab.disabled}
                    >
                        {tab.icon && <span className={classes.tabIcon}>{tab.icon}</span>}
                        <span className={classes.tabLabel}>{tab.label}</span>
                        {tab.badge !== undefined && (
                            <span className={classes.badge}>{tab.badge}</span>
                        )}
                        {variant === "underline" && value === index && (
                            <span className={classes.indicator} />
                        )}
                    </button>
                ))}
            </div>
            {tabs.map((tab, index) => (
                <div className={classes.tabPanel} key={index} {...props} role="tabpanel" hidden={value !== index}
                    id={`tabpanel-${name || "default"}-${index}`} aria-labelledby={`tab-${name || "default"}-${index}`}
                >
                    {(keepMounted || tab.keepMounted || value === index) && tab.content}
                </div>
            ))}
        </div>
    );
};