import React, { useState } from "react";
import GreenButton from "./GreenButton";
import styled from "styled-components";
import useAuth from "../hooks/auth";
import {
  Modal,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";
import { transactions } from "../constants";

const CreateTransactionWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#17191A",
  width: "min(80%,500px)",
  padding: "30px",
  borderRadius: "15px",
  margin: "40px",
});

const StyledDateInput = styled.input`
  font-size: 14px;
  border: 1px solid #87c232;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  padding: 15px 20px;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: #ffffff;
  color: #000000;
  margin: 10px 0;

  &:hover {
    border-color: #87c232;
  }

  &:focus {
    border-color: #87c232;
  }
`;

const StyledTab = styled(Tab)`
  && {
    color: white;
    &.Mui-selected {
      border-bottom: 2px solid #87c232;
      color: #87c232;
    }
    .MuiTab-indicator {
      background-color: #87c232;
    }
  }
`;

function CreateTransaction({
  createTransaction,
  isOpen,
  handleClose,
  balanceList,
}) {
  const [value, setValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [tab, setTab] = useState(1);

  const { user } = useAuth();

  const handleInput = (e) => setValue(e.target.value);
  const handleClick = (e) => {
    e.preventDefault();
    createTransaction({
      value: !!tab ? -value : value,
      category: !!tab ? selectedItem : "Доходи",
      date: new Date(selectedDate),
      userId: user?.user_id,
      balanceId: balanceList?.[0]?.balance_id,
    });
    setValue(null);
    setSelectedDate(new Date().toISOString().slice(0, 10));
    setSelectedItem(null);
    handleClose();
  };

  return (
    <Modal
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      open={isOpen}
      onClose={handleClose}
    >
      <CreateTransactionWrapper>
        <img
          style={{ width: "170px", margin: "0 0 20px 0" }}
          src="../src/assets/logo-home.svg"
        />
        <Typography sx={{ color: "white" }}>Створіть транзакцію:</Typography>
        <Tabs value={tab} sx={{ width: "100%" }} onChange={(_, v) => setTab(v)}>
          <StyledTab label="Доходи" sx={{ width: "50%" }} index={0} />
          <StyledTab label="Витрати" sx={{ width: "50%" }} index={1} />
        </Tabs>
        <TextField
          sx={{
            margin: "15px 0px 0px 0px",
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="balance"
          label="Сума"
          name="balance"
          type="number"
          autoComplete="balance"
          value={value}
          onInput={handleInput}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Категорія</InputLabel>
          <Select
            value={selectedItem}
            required
            fullWidth
            onChange={(e) => {
              setSelectedItem(e.target.value);
            }}
            label="Категорія"
          >
            {transactions &&
              transactions.map((t) => {
                return (
                  <MenuItem value={t.type}>
                    <Stack direction={"row"} gap={1}>
                      {t.icon}
                      <Typography>{t.type} </Typography>
                    </Stack>
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <StyledDateInput
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <GreenButton text={"Зберегти"} onClick={handleClick} />
      </CreateTransactionWrapper>
    </Modal>
  );
}
export default CreateTransaction;
