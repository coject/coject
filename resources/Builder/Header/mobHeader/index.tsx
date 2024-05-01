import React, { FC, useState, useEffect } from "react";

// Material UI
import { Box, IconButton, Menu, Typography, Button, MenuItem, TextField, Accordion, AccordionSummary, AccordionDetails, Divider, List, ListItem } from "@mui/material";

// Material Icon
import * as MuiIcons from "@mui/icons-material";

// Styles
import useStyles from "../theme";

// Interfaces
interface iMobHeader {
    logo?: any;
    icon?: any;
    menus?: any;
    setMenus?: any;
    search?: boolean;
    localeText?: {
        headerSearch?: string
    };
    defaultLanguage?: "ar" | "en" | string;
    mobMenus?: ("menu" | "footer" | "subMenu" | "sidebar")[];
    languages?: {name: "ar" | "en" | string, logo?: string, onClick?: any}[];
}

export const MobHeader: FC<iMobHeader> = ({ logo, icon, menus, setMenus, localeText, languages, defaultLanguage, search, mobMenus }) => {
    const Icons: any = MuiIcons;
    const { classes } = useStyles();
    const [ menuList, setMenuList ] = useState<any>({});
    const [ searchView, setSearchView ] = useState<boolean>(false);
    const [ accordionState, setAccordionState ] = useState<string | false>("components");
    const [ languageLogo, setLanguageLogo ] = useState<string>("/images/lang/en.jpg");

    // Accordion
    const accordionHandler = ( Panel: string ) => ( _: React.SyntheticEvent, isExpanded: boolean ) => {
        setAccordionState(isExpanded ? Panel : false);
    };

    // Default Language Logo
    useEffect(() => {
        if (defaultLanguage && languages?.length) {
            if (defaultLanguage === 'ar' || defaultLanguage === 'en') {
                setLanguageLogo(`${defaultLanguage === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
            } else setLanguageLogo(languages.filter((language) => language.name === defaultLanguage)[0]?.logo || "");
        }
    }, [defaultLanguage, languages]);

    return (
        <React.Fragment>
            <Box className={classes.mobHeader}>
                <Box className={classes.mobLogo}>
                    <img onClick={() => window.location.href='/'} src={icon} alt="Logo"/>
                </Box>
                <Box className={classes.mobMenu}>
                    <List className={classes.menuList}>
                        { !!mobMenus?.length &&
                            <ListItem>
                                <Button onClick={(e) => setMenuList({mainMenu: e.currentTarget})}>
                                    <Icons.Menu/>
                                </Button>
                            </ListItem>
                        }
                    </List>
                    <List className={classes.menuList} style={{justifyContent: "flex-end"}}>
                        { search &&
                            <MenuItem>
                                <Button onClick={() => setSearchView(!searchView)}>
                                    <Icons.SearchOutlined/>
                                </Button>
                                { searchView &&
                                    <Box className={classes.mobSearch}>
                                        <IconButton className={"mobSearchBtn"}><Icons.Search/></IconButton>
                                        <TextField fullWidth placeholder={localeText?.headerSearch || "Search"}/>
                                    </Box>
                                }
                            </MenuItem>
                        }
                        { languages && !!languages.length &&
                            <MenuItem>
                                <Button onClick={(e) => setMenuList({ languages: e.currentTarget })}>
                                    <img src={languageLogo} alt={'Language'} />
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
                                                            setLanguageLogo(`${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`);
                                                        }}>
                                                            <img src={`${language.name === "ar" ? "/images/lang/ar.jpg" : "/images/lang/en.jpg"}`} alt={language.name === "ar" ? "العربية" : "English"} />
                                                            { language.name === "ar" ? "العربية" : "English" }
                                                        </MenuItem>
                                                    )
                                                } else {
                                                    return (
                                                        <MenuItem key={index} component={Button} onClick={(event) => {
                                                            setMenuList({});
                                                            setLanguageLogo(language?.logo || "");
                                                            language.onClick && language.onClick(event);
                                                        }}>
                                                            <img src={language?.logo} alt={language.name} />
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
                        { !( !!mobMenus?.length && mobMenus.includes("subMenu") ) && menus && !!Object.keys(menus).length && menus.subMenu && !!menus.subMenu.length && menus.subMenu.map((listItem: any, index: number) => {
                            const ItemIcon = listItem.icon && Icons[listItem.icon];
                            if (listItem.children && !!listItem.children.length) {
                                return (
                                    <ListItem key={index}>
                                        <Button className={classes.mobProfile} onClick={(e) => setMenuList({[((listItem.label).toLowerCase()).replaceAll(" ", "_")]: e.currentTarget})}>
                                            {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                            {ItemIcon ? <ItemIcon/> : ""}
                                            <Typography>{!listItem.noLabel && listItem.label}</Typography>
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
                                                                    <Typography>{!childListItem.noLabel && childListItem.label}</Typography>
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
                                            <Typography>{!listItem.noLabel && listItem.label}</Typography>
                                        </Button>
                                    </ListItem>
                                )
                            }
                        }) }
                    </List>
                    { menuList && !!Object.keys(menuList).length && !!mobMenus?.length &&
                        <Menu className={`${classes.mobMenuList} mobMenuList`} anchorEl={menuList && Object.keys(menuList).length && menuList?.mainMenu} open={Boolean(menuList?.mainMenu)} onClose={() => setMenuList({})}>
                            <Button className={`${classes.mobMenuClose} mobMenuClose`} onClick={() => setMenuList({})}><Icons.Close /></Button>
                            <Box className={classes.mobMenuContent}>
                                <MenuItem className={classes.mobMenuImage}>
                                    <Button href={"/"}><img src={logo} alt={"Logo"} /></Button>
                                </MenuItem>
                                { mobMenus.map((menu: string, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            { index !== 0 && <Divider /> }
                                            { menus && !!Object.keys(menus).length && menus[menu] && !!menus[menu].length && menus[menu].map((listItem: any, index: number) => {
                                                const ItemIcon = listItem.icon && Icons[listItem.icon];
                                                if (listItem.children && !!listItem.children.length) {
                                                    return (
                                                        <Accordion key={index} className={classes.mobAccordion} expanded={accordionState === ((listItem.label).toLowerCase()).replaceAll(" ", "_")} onChange={accordionHandler(((listItem.label).toLowerCase()).replaceAll(" ", "_"))}>
                                                            <AccordionSummary className={classes.mobMenuTitle} {...(!listItem.noArrow ? {expandIcon: <Icons.Add />} : {})}>
                                                                <Typography variant={"h6"}>
                                                                    {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                                                    {ItemIcon ? <ItemIcon/> : ""}
                                                                    <Typography>{!listItem.noLabel && listItem.label}</Typography>
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails className={classes.mobMenuBody}>
                                                                { listItem.children.map((childListItem: any, childIndex: number) => {
                                                                    const ChildItemIcon = childListItem.icon && Icons[childListItem.icon];
                                                                    return (
                                                                        <MenuItem key={childIndex} title={childListItem.label} onClick={() => setMenuList({}) }>
                                                                            <Button {...(childListItem.link ? {href: childListItem.link} : {})} onClick={() => childListItem.onClick && childListItem.onClick(setMenus)}>
                                                                                {childListItem.image && <img src={childListItem.image} alt={childListItem.label} />}
                                                                                {ChildItemIcon ? <ChildItemIcon /> : ""}
                                                                                <Typography>{!childListItem.noLabel && childListItem.label}</Typography>
                                                                            </Button>
                                                                        </MenuItem>
                                                                    )
                                                                }) }
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    )
                                                } else {
                                                    return (
                                                        <MenuItem key={index} title={listItem.label} onClick={() => { setMenuList({}); listItem.onClick && listItem.onClick(setMenus) }}>
                                                            <Button fullWidth type={"button"} {...(listItem.link ? {href: listItem.link} : {})}>
                                                                {listItem.image && <img src={listItem.image} alt={listItem.label} />}
                                                                {ItemIcon ? <ItemIcon/> : ""}
                                                                {!listItem.noLabel && <Typography>{listItem.label}</Typography>}
                                                            </Button>
                                                        </MenuItem>
                                                    )
                                                }
                                            }) }
                                        </React.Fragment>
                                    )
                                }) }
                            </Box>
                        </Menu>
                    }
                </Box>
            </Box>
        </React.Fragment>
    );
};