import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import GreenButton from "./GreenButton";
import styled from "styled-components";
import useAuth from "../hooks/auth";

const SetBalanceWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#17191A",
  width: "min(80%,500px)",
  padding: "30px",
  borderRadius: "15px",
  margin: "40px",
});
function SetBalance({ createBalance }) {
  const [balance, setBalance] = useState("");
  const { user } = useAuth();

  const handleInput = (e) => setBalance(e.target.value);
  const handleClick = (e) => {
    e.preventDefault();
    if (!balance) return alert("Fill up balance");
    createBalance({ balance, userId: user?.user_id });
  };

  return (
    <SetBalanceWrapper>
      <img
        style={{ width: "170px", margin: "0 0 20px 0" }}
        src="../src/assets/logo-home.svg"
      />
      <Typography sx={{ color: "white" }}>
        Вкажіть ваш баланс на місяць:
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="balance"
        label="Баланс"
        name="balance"
        type="number"
        inputProps={{ min: 1 }}
        autoComplete="balance"
        value={balance}
        onInput={handleInput}
      />
      <GreenButton text={"Зберегти"} onClick={handleClick} />
    </SetBalanceWrapper>
  );
}
export default SetBalance;
