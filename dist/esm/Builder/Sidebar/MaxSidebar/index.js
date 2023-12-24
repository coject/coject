import React, { useState } from "react";
// Material UI
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem, Tooltip } from "@mui/material";
// Coject
import { Icons } from "../../../Components";
// Styles
import useStyles from "../theme";
export const MaxSidebar = ({ menus, setMenus }) => {
    const { classes } = useStyles();
    const [accordionState, setAccordionState] = useState();
    // Accordion
    const accordionHandler = (Panel) => (_, isExpanded) => {
        setAccordionState(isExpanded ? Panel : false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Box, { className: classes.sidebarList }, menus && !!Object.keys(menus).length && menus.sidebar && !!menus.sidebar.length && menus.sidebar.map((listItem, index) => {
            const ItemIcon = listItem.icon && Icons[listItem.icon];
            if (listItem.children && !!listItem.children.length) {
                return (React.createElement(Accordion, { key: index, className: classes.accordion, expanded: accordionState === ((listItem.label).toLowerCase()).replaceAll(" ", "_"), onChange: accordionHandler(((listItem.label).toLowerCase()).replaceAll(" ", "_")) },
                    React.createElement(Tooltip, { title: listItem.label, placement: "right" },
                        React.createElement(AccordionSummary, { className: classes.accordionTitle, ...(!listItem.noArrow ? { expandIcon: React.createElement(Icons.ExpandMore, null) } : {}) },
                            listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                            ItemIcon ? React.createElement(ItemIcon, null) : "",
                            !listItem.noLabel && listItem.label)),
                    React.createElement(AccordionDetails, null,
                        React.createElement(List, { className: classes.accordionList }, listItem.children.map((childListItem, childIndex) => {
                            const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                            return (React.createElement(Tooltip, { key: childIndex, title: childListItem.label, placement: "right" },
                                React.createElement(ListItem, null,
                                    React.createElement(Button, { ...(childListItem.link ? { href: childListItem.link } : {}), onClick: () => childListItem.onClick && childListItem.onClick(setMenus) },
                                        childListItem.image && React.createElement("img", { src: childListItem.image, alt: childListItem.label }),
                                        ChildItemIcon ? React.createElement(ChildItemIcon, null) : "",
                                        !childListItem.noLabel && childListItem.label))));
                        })))));
            }
            else {
                return (React.createElement(Tooltip, { key: index, title: listItem.label, placement: "right" },
                    React.createElement(Button, { fullWidth: true, className: classes.button, ...(listItem.link ? { href: listItem.link } : {}), onClick: () => listItem.onClick && listItem.onClick(setMenus) },
                        listItem.image && React.createElement("img", { src: listItem.image, alt: listItem.label }),
                        ItemIcon ? React.createElement(ItemIcon, null) : "",
                        !listItem.noLabel && listItem.label)));
            }
        }))));
};
//# sourceMappingURL=index.js.map