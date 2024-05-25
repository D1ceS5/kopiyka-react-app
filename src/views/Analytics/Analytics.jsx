import React, { useState } from "react";
import useAuth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
import useBalance from "../../hooks/balance";
import { Grid } from "@mui/material";
import SetBalance from "../../components/SetBalance";
import Loader from "../../components/Loader";
import Sidebar from "../../components/Sidebar";
import GreenButton from "../../components/GreenButton";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Masonry from "@mui/lab/Masonry";
import { formatDate, formatToUAH } from "../../utils";
import { Typography, Box } from "@mui/material";

import MonthlyChart from "../../components/MonthlyChart";

const Container = styled(Box)({
  backgroundColor: "#17191a",
  padding: "20px",
  color: "white",
  borderRadius: "5px",
});

const Text = styled(Typography)({
  fontWeight: "bold",
});

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "#e0e0e0",
  padding: "10px",
  borderRadius: "5px",
  color: "black",
});

function Analytics() {
  document.title = "Аналітика";
  const { user, loading } = useAuth();
  const navigation = useNavigate();
  const {
    balanceList,
    transactionList,
    loadingList,
    createBalance,
    isBalanceSet,
  } = useBalance(user?.user_id);
  const isLoading = loading || loadingList.length > 0;
  const currentBalance = balanceList[0];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const groupTransactionsByMonth = () => {
    const groupedData = transactionList.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.transaction_date);
      const monthYear = `${transactionDate.getFullYear()}-${(
        transactionDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(transaction);
      return acc;
    }, {});

    const formattedData = Object.keys(groupedData).map((month) => ({
      month,
      transactions: groupedData[month],
      value: groupedData[month]
        .filter((t) => t.value < 0)
        .reduce((acc, item) => acc + Math.abs(item.value), 0),
      total:
        (currentBalance.balance || 0) +
        groupedData[month]
          .filter((t) => t.value > 0)
          .reduce((acc, item) => acc + Math.abs(item.value), 0),
    }));
    return formattedData;
  };

  const items = groupTransactionsByMonth();

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
              <MonthlyChart
                transactions={transactionList}
                totalBalance={currentBalance.balance}
              />
              <Container>
                {!items.length && (
                  <Typography>Транзакцій не знайдено</Typography>
                )}
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                ></Grid>
                {items.length &&
                  items.map((item) => {
                    return (
                      <StyledBox mt={2} key={item.month}>
                        <Box>
                          <Text sx={{ fontWeight: "bold" }}>
                            Статистика за:
                          </Text>
                          <Text
                            sx={{
                              fontWeight: "bold",
                            }}
                          >
                            {formatDate(item.month)}
                          </Text>
                        </Box>

                        <Box sx={{ gap: "10px" }}>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Text>Витрати:</Text>
                            <Text sx={{ color: "#DC0000", fontWeight: "bold" }}>
                              -{item.value}
                            </Text>
                          </Box>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Text>Доходи:</Text>
                            <Text sx={{ color: "#87C232", fontWeight: "bold" }}>
                              {item.total}
                            </Text>
                          </Box>
                        </Box>
                      </StyledBox>
                    );
                  })}
              </Container>
            </Masonry>
          </ContentWrapper>
        </div>
      )}
    </>
  );
}

export default Analytics;
