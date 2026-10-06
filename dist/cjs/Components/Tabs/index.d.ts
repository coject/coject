import React, { FC, ReactNode, ReactElement } from "react";
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
export declare const Tabs: FC<iTabs>;
export {};
