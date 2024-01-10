declare const useStyles: (params: void, muiStyleOverridesParams?: {
    props: Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"button" | "list" | "root" | "menuList" | "closedSidebar" | "sidebarList" | "accordion" | "accordionTitle" | "accordionList" | "listItem", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export default useStyles;
