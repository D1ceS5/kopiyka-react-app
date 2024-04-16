import React, { useEffect, useState, useMemo } from "react";
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
import CreateTransaction from "../../components/CreateTransaction";
import PieChartComponent from "../../components/AgPieChart";
import Masonry from "@mui/lab/Masonry";
import { formatToUAH } from "../../utils";
import { Select, MenuItem, Typography } from "@mui/material";
import ProgressBar from "../../components/ProgressBar";
import ItemList from "../../components/ItemList";

function Dashboard() {
  document.title = "Панель керування";
  const { user, loading } = useAuth();
  const navigation = useNavigate();
  const {
    balanceList,
    transactionList,
    loadingList,
    createBalance,
    createTransaction,
    filteredTransactions,
    selectedRange,
    changeRange,
  } = useBalance(user?.user_id);
  const isLoading = loading || loadingList.length > 0;
  const [createOpen, setCreateOpen] = useState(false);
  const currentBalance = balanceList[0];

  console.log("Transactions", filteredTransactions);
  console.log(selectedRange);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const spendindgs = useMemo(
    () => filteredTransactions.filter((t) => t.category !== "Доходи"),
    [filteredTransactions]
  );

  const earnings = useMemo(
    () => filteredTransactions.filter((t) => t.category === "Доходи"),
    [filteredTransactions]
  );

  const totalSpendings = useMemo(() => {
    const totalValue = spendindgs.reduce(
      (prev, cur) => prev + Math.abs(cur.value),
      0
    );
    return totalValue;
  }, [spendindgs]);
  const totalEarnings = useMemo(() => {
    const totalValue = earnings.reduce(
      (prev, cur) => prev + Math.abs(cur.value),
      0
    );
    return totalValue;
  }, [earnings]);

  const difference = [
    {
      category: "Залишок балансу",
      value:
        (selectedRange === "year"
          ? currentBalance?.balance * 12
          : currentBalance?.balance) +
        totalEarnings -
        totalSpendings,
      color: "#e0e0e0",
    },

    { category: "Витрати", value: totalSpendings, color: "#87C232" },
  ];

  const ContentWrapper = styled.div`
    display: flex;
    padding-left: ${isMobile ? "20px" : "320px"};
    padding-right: 20px;
  `;

  const percent = parseInt(
    (totalSpendings /
      (totalEarnings +
        (selectedRange === "year"
          ? currentBalance?.balance * 12
          : currentBalance?.balance))) *
      100
  );
  console.log(percent);
  if (!user && !loading) navigation("/auth/login");

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && balanceList.length === 0 && (
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
              columns={{ lg: 2, md: 1, sm: 1, xs: 1 }}
              sx={{
                columnGap: "0px",
              }}
              spacing={1}
            >
              <GreenButton
                text={"Створити запис"}
                onClick={() => setCreateOpen(true)}
              />
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
              <PieChartComponent
                data={spendindgs}
                title={"Структура витрат"}
                subtitle={formatToUAH(totalSpendings)}
                additionalText={"Усі категорії"}
              />

              <ProgressBar
                title={"Готівковий потік"}
                subtitle={`Залишок: ${formatToUAH(
                  (selectedRange === "year"
                    ? currentBalance?.balance * 12
                    : currentBalance?.balance) +
                    +totalEarnings -
                    totalSpendings
                )}`}
                percent={percent}
              />
              <PieChartComponent data={difference} title={"Залишок"} />
              <ItemList items={transactionList.slice(0, 3)} />
            </Masonry>
          </ContentWrapper>
        </div>
      )}
      <CreateTransaction
        isOpen={createOpen}
        createTransaction={createTransaction}
        handleClose={() => setCreateOpen(false)}
      />
    </>
  );
}

export default Dashboard;
