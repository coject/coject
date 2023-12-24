declare const useStyles: (params: void, muiStyleOverridesParams?: {
    props: Record<string, unknown>;
    ownerState?: Record<string, unknown> | undefined;
} | undefined) => {
    classes: Record<"menuList" | "dskHeader" | "dskLogo" | "closedDskLogo" | "dskMenu" | "closedDskMenu" | "dskSearch" | "subMenuList" | "subListMenu" | "subMenuContent" | "mobHeader" | "mobLogo" | "mobMenu" | "mobSearch" | "mobMenuList" | "mobMenuClose" | "mobMenuContent" | "mobMenuImage" | "mobAccordion" | "mobMenuTitle" | "mobMenuBody", string>;
    theme: import("@mui/material").Theme;
    css: import("tss-react/types").Css;
    cx: import("tss-react/types").Cx;
};
export default useStyles;
