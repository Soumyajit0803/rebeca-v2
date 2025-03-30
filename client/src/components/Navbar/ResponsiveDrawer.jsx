import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
    Home as HomeIcon,
    Event as EventIcon,
    AttachMoney as SponsorshipIcon,
    Groups as TeamIcon,
    ShoppingBag as MerchandiseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
}));

const menuItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: "Events", icon: <EventIcon />, link: "/events" },
    { text: "Sponsorship", icon: <SponsorshipIcon />, link: "/sponsorship" },
    { text: "Our Team", icon: <TeamIcon />, link: "/team" },
    { text: "Merchandise", icon: <MerchandiseIcon />, link: "/merchandise" },
];

const RespDrawer = ({ open, onClose }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader sx={{display: 'flex',height: 65}}>
                <IconButton onClick={() => onClose()}>
                    {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                <img
                    src="/assets/logo/logo_white.webp"
                    alt="rebeca_logo"
                    style={{ padding: "1rem 0px", width: "100px", marginLeft: "10px" }}
                />
            </DrawerHeader>
            <Divider />
            <List>
                {menuItems.map((item, index) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                onClose();
                                navigate(item.link);
                            }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default RespDrawer;
