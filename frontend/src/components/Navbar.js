import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import "../style.css";
import { useAuth } from "../AuthContext";
import shadows from "@mui/material/styles/shadows";

export default function NavBarAndDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
    logout();

  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <ArrowBackIosIcon sx={{ margin: 2 }} onClick={toggleDrawer(false)} />
      <Divider />
      {
        isAuthenticated === false ? ( // Use the correct conditional rendering syntax
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText>Sign In</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        ) : null /* Render nothing when isAuthenticated is true */
      }
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/qrcode">
                <ListItemIcon>
                  <QrCode2Icon />
                </ListItemIcon>
                <ListItemText primary="QR Code" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/profile">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </>
        ) : null}
      </List>

      {
        isAuthenticated ? ( // Use the correct conditional rendering syntax
          <List>
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </ListItemButton>
          </List>
        ) : null /* Render nothing when isAuthenticated is false */
      }
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" className="blended-background" sx={{boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)"}}>
        <Toolbar>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: 28,
              fontWeight: 1000,
              letterSpacing: 2,
            }}
          >
            BookBelay
          </Typography>
          <IconButton
            onClick={toggleDrawer(true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"right"}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
      >
        {list("right")}
      </Drawer>
    </Box>
  );
}
