import React, { FC, useState } from "react";

// Material UI
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, List, ListItem, Tooltip } from "@mui/material";

// Coject
import { Icons } from "../../../Components";

// Styles
import useStyles from "../theme";

// Interfaces
interface iMaxSidebar {
    menus?: any;
    setMenus?: any;
    customList?: any;
}

export const MaxSidebar: FC<iMaxSidebar> = ({ menus, setMenus, customList }) => {
    const { classes } = useStyles();
    const [ accordionState, setAccordionState ] = useState<any>();

    // Accordion
    const accordionHandler = ( Panel: string ) => ( _: React.SyntheticEvent, isExpanded: boolean ) => {
        setAccordionState(isExpanded ? Panel : false);
    };

    return (
        <React.Fragment>
            <Box className={classes.sidebarList}>
                {customList}
                { menus && !!Object.keys(menus).length && menus.sidebar && !!menus.sidebar.length && menus.sidebar.map((listItem: any, index: number) => {
                    const ItemIcon = listItem.icon && Icons[listItem.icon];
                    if (listItem.children && !!listItem.children.length) {
                        return (
                            <Accordion key={index} className={classes.accordion} expanded={accordionState === ((listItem.label).toLowerCase()).replaceAll(" ", "_")} onChange={accordionHandler(((listItem.label).toLowerCase()).replaceAll(" ", "_"))}>
                                <Tooltip title={listItem.label} placement="right">
                                    <AccordionSummary className={classes.accordionTitle} {...(!listItem.noArrow ? {expandIcon: <Icons.ExpandMore />} : {})}>
                                        {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                        {ItemIcon ? <ItemIcon /> : ""}
                                        {!listItem.noLabel && listItem.label}
                                    </AccordionSummary>
                                </Tooltip>
                                <AccordionDetails>
                                    <List className={`${classes.accordionList} maxMenuList`}>
                                        { listItem.children.map((childListItem: any, childIndex: number) => {
                                            const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                            return (
                                                <Tooltip key={childIndex} title={childListItem.label} placement="right">
                                                    <ListItem>
                                                        <Button {...(childListItem.link ? {href: childListItem.link} : {})} onClick={() => childListItem.onClick && childListItem.onClick(setMenus)}>
                                                            {childListItem.image && <img src={childListItem.image} alt={childListItem.label} />}
                                                            {ChildItemIcon ? <ChildItemIcon /> : ""}
                                                            {!childListItem.noLabel && childListItem.label}
                                                        </Button>
                                                    </ListItem>
                                                </Tooltip>
                                            )
                                        }) }
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        )
                    } else {
                        return (
                            <Tooltip key={index} title={listItem.label} placement="right">
                                <Button fullWidth className={classes.button} {...(listItem.link ? {href: listItem.link} : {})} onClick={() => listItem.onClick && listItem.onClick(setMenus)}>
                                    {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                    {ItemIcon ? <ItemIcon /> : ""}
                                    {!listItem.noLabel && listItem.label}
                                </Button>
                            </Tooltip>
                        )
                    }
                }) }
            </Box>
        </React.Fragment>
    );
}