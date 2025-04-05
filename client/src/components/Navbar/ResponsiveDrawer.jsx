import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
    Home as HomeIcon,
    Event as EventIcon,
    AttachMoney as SponsorshipIcon,
    Groups as TeamIcon,
    ShoppingBag as MerchandiseIcon,
    Close,
    FavoriteBorderOutlined,
    Favorite,
    East,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";


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
    const drawerWidth = window.innerWidth;
    const [nav, setNav] = useState("Home");

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
            <DrawerHeader sx={{ display: "flex", height: 65, justifyContent: "space-between" }}>
                <img
                    src="/assets/logo/logo_white.webp"
                    alt="rebeca_logo"
                    style={{ padding: "1rem 0px", width: "100px", marginLeft: "10px" }}
                />
                <IconButton onClick={() => onClose()} color="primary">
                    <Close />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List
                sx={{
                    height: "45vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingTop: "3rem",
                }}
            >
                <Box>
                    {menuItems.map((item, index) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                onClick={() => {
                                    onClose();
                                    navigate(item.link);
                                    setNav(item.text);
                                }}
                                disableRipple
                            >
                                <ListItemText
                                    primary={item.text}
                                    sx={{ color: item.text === nav ? "var(--primary)" : "" }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </Box>
                <ListItem
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        padding: "2rem",
                        flexDirection: "column",
                        marginTop: "3rem",
                        // background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(5px)",
                        width: 'max-content'
                    }}
                >
                    <Typography variant="h5" fontFamily={"Sedgwick Ave Display"}>
                        Join Rebeca as a Volunteer!
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            p: 1,
                            px: 2,
                        }}
                        startIcon={<Favorite />}
                        endIcon={<East />}
                        onClick={() => window.open("https://forms.gle/qnceaoaaTiBTJ3627", "_blank")}
                    >
                        Join as Volunteer
                    </Button>
                    {/* <Typography sx={{ textShadow: "0 0 10px #000", paddingTop: "1rem" }}>
                        Join REBECA as volunteer and help in loading the fun and laughter together!
                    </Typography> */}
                </ListItem>
            </List>
        </Drawer>
    );
};

export default RespDrawer;
