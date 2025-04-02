import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./GlobalContext";
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const navigate = useNavigate();
    const { val, toggleTheme } = useContext(AppContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleAuthClick = () => {
        if (localStorage.removeItem('userId')) {
            toggleTheme(false);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/');
        } else {
            navigate("/signup");
        }
    };

    const quizeForm = () => {
        navigate('/contact');
    }

    const standardquizeForm = () => {
        navigate('/quizdashboard');
    }

    const blogForm = () => {
        navigate('/blogdashboard');
    }

    const toggleDrawer = (open) => {
        setDrawerOpen(open);
    };

    const menuItems = [
        { label: "Home", onClick: () => navigate("/") },
        { label: localStorage.getItem('userId') ? "Logout" : "Login", onClick: handleAuthClick },
        { label: "About", onClick: () => navigate("/about") },
        localStorage.getItem('userId') && { label: "Contact", onClick: quizeForm },
        localStorage.getItem('userId') && { label: "Quiz Dashboard", onClick: standardquizeForm },
        localStorage.getItem('userId') && { label: "Blog", onClick: blogForm },
    ].filter(Boolean);

    return (
        <AppBar position="relative">
            <Toolbar>
                <Box sx={{ flexGrow: 1, p: 1 }}>
                    <Typography sx={{ color: "#FFF2D8", fontFamily: "Roboto sans", letterSpacing: "2px", fontWeight: "bold" }}>
                        DIGITAL
                    </Typography>
                    <Typography sx={{ color: "#BCA37F", fontWeight: "bold", letterSpacing: "3px" }}>
                        IDENTITY
                    </Typography>
                </Box>

                
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {menuItems.map((item, index) => (
                        <Button color="inherit" key={index} onClick={item.onClick}>
                            {item.label}
                        </Button>
                    ))}
                </Box>

                
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2, display: { xs: 'block', sm: 'none' } }}
                    onClick={() => toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                sx={{
                    width: '250px',
                    flexShrink: 0,
                    cursor:'pointer',
                    '& .MuiDrawer-paper': {
                        width: '250px',
                        boxSizing: 'border-box',
                    }
                }}
            >
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem button key={index} onClick={() => { item.onClick(); toggleDrawer(false); }}>
                            <ListItemText>{item.label}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar>
    );
}
