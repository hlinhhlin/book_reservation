import * as React from "react";
import { Link } from "react-router-dom"; // Import Link
import { useState } from "react";
import {AppBar, Box, Toolbar, Typography, IconButton, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "../style.css";

export default function NavBarAndDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
              <SearchIcon/>
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <QrCode2Icon />
            </ListItemIcon>
            <ListItemText primary="QR Code" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="blended-background">
        <Toolbar>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: 28,
              fontWeight: 550,
              letterSpacing: 3,
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
