import React, { useState } from "react";
import useAuth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import useBalance from "../../hooks/balance";
import { Grid, Stack, InputLabel, FormControl } from "@mui/material";
import SetBalance from "../../components/SetBalance";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Masonry from "@mui/lab/Masonry";
import { Select, MenuItem, Typography } from "@mui/material";
import ItemList from "../../components/ItemList";
import { transactions } from "../../constants";

function Transactions() {
  document.title = "Записи";
  const { user, loading } = useAuth();
  const navigation = useNavigate();
  const {
    balanceList,
    loadingList,
    createBalance,
    filteredTransactions,
    selectedRange,
    changeRange,
    selectedCategory,
    changeCategory,
    isBalanceSet,
  } = useBalance(user?.user_id);
  const isLoading = loading || loadingList.length > 0;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const ContentWrapper = styled.div`
    display: flex;
    padding-left: ${isMobile ? "20px" : "320px"};
    padding-right: 20px;
  `;

  if (!user && !loading) navigation("/auth/login");

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && !isBalanceSet && balanceList.length === 0 && (
        <Grid
          sx={{
            background: "#E0E0E0",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SetBalance createBalance={createBalance} />
        </Grid>
      )}
      {!isLoading && balanceList.length > 0 && (
        <div>
          <Sidebar />
          <ContentWrapper>
            <Masonry
              columns={1}
              sx={{
                columnGap: "0px",
              }}
              spacing={1}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <FormControl
                  sx={{ width: "48%", minWidth: "250px", flex: "1" }}
                >
                  <InputLabel>Категорія</InputLabel>
                  <Select
                    value={selectedCategory}
                    required
                    fullWidth
                    onChange={(e) => {
                      changeCategory(e.target.value);
                    }}
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
                <FormControl
                  sx={{ width: "48%", minWidth: "250px", flex: "1" }}
                >
                  <InputLabel>Діапазон</InputLabel>
                  <Select
                    value={selectedRange}
                    onChange={(e) => changeRange(e.target.value)}
                  >
                    <MenuItem value="day">
                      <Typography>Поточний день</Typography>
                    </MenuItem>
                    <MenuItem value="month">
                      <Typography>Поточний місяць</Typography>
                    </MenuItem>
                    <MenuItem value="year">
                      <Typography>Поточний рік</Typography>
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <ItemList items={filteredTransactions} showButton={false} />
            </Masonry>
          </ContentWrapper>
        </div>
      )}
    </>
  );
}

export default Transactions;
