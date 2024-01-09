import React, { FC, useState } from "react";

// Material UI
import { Box, IconButton, List, ListItem, TextField, Button, Menu, MenuItem } from "@mui/material";

// Coject
import { Icons } from "../../../Components";

// Styles
import useStyles from "../theme";

// Interface
interface DskHeaderInterface {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    setSidebar?: any;
    search?: boolean;
    sidebar?: boolean;
    languages?: {name: "ar" | "en" | string, logo?: string, onClick?: any}[];
}

export const DskHeader: FC<DskHeaderInterface> = ({ logo, icon, search, languages, menus, setMenus, sidebar, setSidebar }) => {
    const { classes } = useStyles();
    const [ menuList, setMenuList ] = useState<any>({});
    const [ languageLogo, setLanguageLogo ] = useState<string>(process.env.PUBLIC_URL + '/images/lang/en.jpg');

    return (
        <React.Fragment>
            <Box className={classes.dskHeader}>
                <Box className={`${classes.dskLogo} ${!sidebar ? classes.closedDskLogo : ""}`}>
                    { sidebar
                        ? <img onClick={() => window.location.href="/"} src={logo} alt="Logo"/>
                        : <img onClick={() => window.location.href="/"} src={icon} alt="Logo"/>
                    }
                </Box>
                <Box className={`${classes.dskMenu} ${!sidebar ? classes.closedDskMenu : ""}`}>
                    <List className={classes.menuList}>
                        <ListItem>
                            <Button onClick={() => setSidebar(!sidebar)}>
                                <Icons.Menu />
                            </Button>
                        </ListItem>
                        { search &&
                            <ListItem>
                                <Box className={classes.dskSearch}>
                                    <IconButton><Icons.Search/></IconButton>
                                    <TextField placeholder={"Search"}/>
                                </Box>
                            </ListItem>
                        }
                        { menus && !!Object.keys(menus).length && menus.menu && !!menus.menu.length && menus.menu.map((listItem: any, index: number) => {
                            const ItemIcon = listItem.icon && Icons[listItem.icon];
                            if (listItem.children && !!listItem.children.length) {
                                return (
                                    <ListItem key={index}>
                                        <Button onClick={(e) => setMenuList({[((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget})}>
                                            {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                            {ItemIcon ? <ItemIcon/> : ""}
                                            {!listItem.noLabel && listItem.label}
                                            {!listItem.noArrow && <Icons.ExpandMore/>}
                                        </Button>
                                        { menuList && !!Object.keys(menuList).length &&
                                            <Menu className={classes.subMenuList} anchorEl={menuList && Object.keys(menuList).length && menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]} open={Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")])} onClose={() => setMenuList({})} transformOrigin={{ horizontal: 'left', vertical: 'top' }} anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
                                                <Box className={classes.subListMenu} onMouseLeave={() => setMenuList({})}>
                                                    <Box className={classes.subMenuContent}>
                                                        { listItem.children.map((childListItem: any, childIndex: number) => {
                                                            const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                            return (
                                                                <MenuItem key={childIndex} component={Button} {...(childListItem.link ? {href: childListItem.link} : {})} onClick={() => { setMenuList({}); childListItem.onClick && childListItem.onClick(setMenus) }}>
                                                                    {childListItem.image && <img src={childListItem.image} alt={childListItem.label} />}
                                                                    {ChildItemIcon ? <ChildItemIcon /> : ""}
                                                                    {!childListItem.noLabel && childListItem.label}
                                                                </MenuItem>
                                                            )
                                                        }) }
                                                    </Box>
                                                </Box>
                                            </Menu>
                                        }
                                    </ListItem>
                                )
                            } else {
                                return (
                                    <ListItem key={index}>
                                        <Button {...(listItem.link ? {href: listItem.link} : {})} onClick={() => listItem.onClick && listItem.onClick(setMenus)}>
                                            {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                            {ItemIcon ? <ItemIcon/> : ""}
                                            {!listItem.noLabel && listItem.label}
                                        </Button>
                                    </ListItem>
                                )
                            }
                        }) }
                    </List>
                    <List className={classes.menuList} style={{justifyContent: "flex-end"}}>
                        { languages && !!languages.length &&
                            <MenuItem>
                                <Button onClick={(e) => setMenuList({languages: e.currentTarget})}>
                                    <img src={languageLogo} alt={"Language"}/>
                                </Button>
                                <Menu className={classes.subMenuList} anchorEl={menuList && Object.keys(menuList).length && menuList?.languages} open={Boolean(menuList?.languages)} onClose={() => setMenuList({})} transformOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
                                    <Box className={classes.subListMenu} onMouseLeave={() => setMenuList({})}>
                                        <Box className={classes.subMenuContent}>
                                            { languages.map((language: {name: "ar" | "en" | string, logo?: string, onClick?: any}, index: number) => {
                                                if (language.name === "ar" || language.name === "en") {
                                                    return (
                                                        <MenuItem key={index} component={Button} onClick={(event) => {
                                                            setMenuList({});
                                                            language.onClick && language.onClick(event);
                                                            setLanguageLogo(process.env.PUBLIC_URL + `${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
                                                        }}>
                                                            <img src={process.env.PUBLIC_URL + `${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`} alt={language.name === "ar" ? "Arabic" : "English"} />
                                                            { language.name === "ar" ? "Arabic" : "English" }
                                                        </MenuItem>
                                                    )
                                                } else {
                                                    return (
                                                        <MenuItem key={index} component={Button} onClick={(event) => {
                                                            setMenuList({});
                                                            setLanguageLogo(language.logo || "");
                                                            language.onClick && language.onClick(event);
                                                        }}>
                                                            <img src={language.logo} alt={language.name} />
                                                            { language.name }
                                                        </MenuItem>
                                                    )
                                                }
                                            }) }
                                        </Box>
                                    </Box>
                                </Menu>
                            </MenuItem>
                        }
                        { menus && !!Object.keys(menus).length && menus.subMenu && !!menus.subMenu.length && menus.subMenu.map((listItem: any, index: number) => {
                            const ItemIcon = listItem.icon && Icons[listItem.icon];
                            if (listItem.children && !!listItem.children.length) {
                                return (
                                    <ListItem key={index}>
                                        <Button onClick={(e) => setMenuList({[((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget})}>
                                            {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                            {ItemIcon ? <ItemIcon/> : ""}
                                            {!listItem.noLabel && listItem.label}
                                            {!listItem.noArrow && <Icons.ExpandMore/>}
                                        </Button>
                                        { menuList && !!Object.keys(menuList).length &&
                                            <Menu className={classes.subMenuList} anchorEl={menuList && Object.keys(menuList).length && menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")]} open={Boolean(menuList[((listItem.label).toLowerCase()).replaceAll(" ", "_")])} onClose={() => setMenuList({})} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                                <Box className={classes.subListMenu} onMouseLeave={() => setMenuList({})}>
                                                    <Box className={classes.subMenuContent}>
                                                        { listItem.children.map((childListItem: any, childIndex: number) => {
                                                            const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                            return (
                                                                <MenuItem key={childIndex} component={Button} {...(childListItem.link ? {href: childListItem.link} : {})} onClick={() => { setMenuList({}); childListItem.onClick && childListItem.onClick(setMenus) }}>
                                                                    {childListItem.image && <img src={childListItem.image} alt={childListItem.label} />}
                                                                    {ChildItemIcon ? <ChildItemIcon /> : ""}
                                                                    {!childListItem.noLabel && childListItem.label}
                                                                </MenuItem>
                                                            )
                                                        }) }
                                                    </Box>
                                                </Box>
                                            </Menu>
                                        }
                                    </ListItem>
                                )
                            } else {
                                return (
                                    <ListItem key={index}>
                                        <Button {...(listItem.link ? {href: listItem.link} : {})} onClick={() => listItem.onClick && listItem.onClick(setMenus)}>
                                            {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                            {ItemIcon ? <ItemIcon/> : ""}
                                            {!listItem.noLabel && listItem.label}
                                        </Button>
                                    </ListItem>
                                )
                            }
                        }) }
                    </List>
                </Box>
            </Box>
        </React.Fragment>
    );
};