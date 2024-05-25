import React, { useState } from "react";
import { Menu, MenuItem, Typography, Modal, TextField } from "@mui/material";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useAuth from "../hooks/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import GreenButton from "./GreenButton";
import useBalance from "../hooks/balance";

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
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 320px;
  width: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalTitle = styled.h2`
  margin: 0;
`;

const ModalInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [balance, setBalance] = useState("unset");
  const [name, setName] = useState("unset");

  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, loading, logout, updateUser } = useAuth();
  if (user && name === "unset") setName(user?.username);

  const { balanceList, createBalance } = useBalance(user?.user_id);
  if (balanceList.length && balance === "unset")
    setBalance(balanceList[0]?.balance);

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate("/auth/login");
  };

  const handleSettingsClick = () => {
    setOpenModal(true);
    setAnchorEl(null);
  };

  return (
    <ProfileBarContainer>
      <ProfileName onClick={handleClick}>
        <AccountCircleIcon sx={{ fill: "#2D2F31" }} />
        <Typography sx={{ color: "#2D2F31" }}>
          {loading ? "Завантаження.." : user?.username}
        </Typography>
      </ProfileName>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleSettingsClick}>
          <SettingsIcon sx={{ width: "20px", fill: "#757575" }} />
          <Typography sx={{ fontSize: "14px" }}>Налаштування</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ width: "20px", fill: "#757575" }} />
          <Typography sx={{ fontSize: "14px" }}>Вихід</Typography>
        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContainer>
          <ModalContent>
            <ModalTitle>Налаштування</ModalTitle>
            <ModalInputContainer>
              <label htmlFor="username">Ім'я користувача:</label>
              <TextField
                type="text"
                id="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </ModalInputContainer>
            <ModalInputContainer>
              <label htmlFor="balance">Баланс:</label>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                id="balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
            </ModalInputContainer>
            <GreenButton
              onClick={() => {
                const taskList = [];
                if (balance != balanceList[0].balance) {
                  taskList.push(
                    createBalance({
                      balance,
                      userId: user.user_id,
                      balanceId: balanceList[0].balance_id,
                    })
                  );
                }
                if (name != user.username) {
                  taskList.push(updateUser(user.user_id, name));
                }

                if (taskList.length)
                  Promise.all(taskList).then(() => {
                    navigate(0);
                  });
              }}
              text={"Зберегти"}
            />
          </ModalContent>
        </ModalContainer>
      </Modal>
    </ProfileBarContainer>
  );
};

export default ProfileBar;
