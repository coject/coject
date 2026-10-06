export declare const useStyles: (params: {
    centered?: boolean | undefined;
    fullWidth?: boolean | undefined;
    orientation?: "horizontal" | "vertical" | undefined;
    variant?: "default" | "underline" | "pills" | undefined;
}, muiStyleOverridesParams?: {
    props: Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"root" | "tab" | "tabsContainer" | "tabLabel" | "tabIcon" | "badge" | "indicator" | "tabPanel", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
