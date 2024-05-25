import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import PollIcon from "@mui/icons-material/Poll";
import { Link } from "react-router-dom";
import ProfileBar from "./ProfileBar";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const DrawerHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "10px",
  justifyContent: "space-between",
});

const DrawerWrapper = styled("div")({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#17191A",
  minHeight: "100vh",
  border: "0",
  "& .MuiTypography-root": {
    fontWeight: "500",
  },
  a: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    ":active": {
      backgroundColor: "#f5f5f5",
    },
  },
});

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawer = (
    <DrawerWrapper>
      <DrawerHeader>
        <img style={{ width: "150px" }} src="../src/assets/logo-home.svg" />
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl" ? (
              <CloseIcon sx={{ fill: "white" }} />
            ) : (
              <CloseIcon sx={{ fill: "white" }} />
            )}
          </IconButton>
        )}
      </DrawerHeader>
      <List>
        <Link to={"/dashboard"}>
          <ListItem
            sx={{
              backgroundColor:
                location.pathname === "/dashboard" ? "#232526" : "",
              gap: "10px",
              ":hover": { backgroundColor: "#232526" },
            }}
          >
            <ListItemIcon>
              <SpaceDashboardIcon sx={{ fill: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText
              sx={{ color: "#FFFFFF" }}
              primary={"Панель керування"}
            />
          </ListItem>
        </Link>
        <Link to={"/transactions"}>
          <ListItem
            sx={{
              backgroundColor:
                location.pathname === "/transactions" ? "#232526" : "",
              gap: "10px",
              ":hover": { backgroundColor: "#232526" },
            }}
          >
            <ListItemIcon>
              <StickyNote2Icon sx={{ fill: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#FFFFFF" }} primary={"Записи"} />
          </ListItem>
        </Link>
        <Link to={"/analytics"}>
          <ListItem
            sx={{
              backgroundColor:
                location.pathname === "/analytics" ? "#232526" : "",
              gap: "10px",
              ":hover": { backgroundColor: "#232526" },
            }}
          >
            <ListItemIcon>
              <PollIcon sx={{ fill: "#FFFFFF" }} />
            </ListItemIcon>
            <ListItemText sx={{ color: "#FFFFFF" }} primary={"Аналітика"} />
          </ListItem>
        </Link>
      </List>
    </DrawerWrapper>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: isMobile ? "space-between" : "flex-end",
      }}
    >
      <div
        style={{ width: isMobile ? "30px" : "260px", padding: "0 0 0 20px" }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon sx={{ fill: "#" }} />
        </IconButton>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: isSm ? "flex-end" : "space-between",
          flex: "1",
          padding: "10px 30px 10px 20px",
          alignItems: "center",
        }}
      >
        <Typography
          fontSize={"26px"}
          color={"#2D2F31"}
          fontWeight={"bold"}
          sx={{ display: isSm ? "none" : "", padding: "0 0 0 20px" }}
        >
          {document.title}
        </Typography>
        <ProfileBar />
      </div>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
};

export default Sidebar;
