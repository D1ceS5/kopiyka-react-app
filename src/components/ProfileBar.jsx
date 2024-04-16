import React, { useState } from "react";
import { Menu, MenuItem, Typography } from "@mui/material";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../hooks/auth";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const ProfileBarContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ProfileName = styled.div`
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ProfileBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/auth/login");
  };

  return (
    <ProfileBarContainer>
      <ProfileName onClick={handleClick}>
        <AccountCircleIcon sx={{ fill: "#2D2F31" }} />
        <Typography sx={{ color: "#2D2F31" }}>
          {loading ? "Завантаження.." : user.username}
        </Typography>
      </ProfileName>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link
            style={{
              textDecoration: "none",
              color: "initial",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
            }}
          >
            <SettingsIcon sx={{ width: "20px", fill: "#757575" }} />
            <Typography sx={{ fontSize: "14px" }}>Налаштування</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link
            style={{
              textDecoration: "none",
              color: "initial",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "14px",
            }}
          >
            <LogoutIcon sx={{ width: "20px", fill: "#757575" }} />
            <Typography sx={{ fontSize: "14px" }}>Вихід</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </ProfileBarContainer>
  );
};

export default ProfileBar;
