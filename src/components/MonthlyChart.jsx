import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  height: 400px;
  position: relative; /* Ensure relative positioning for absolute positioning of labels */
`;

const MonthlyChart = ({ transactions, totalBalance }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const groupTransactionsByMonth = () => {
      const groupedData = transactions.reduce((acc, transaction) => {
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
          (totalBalance || 0) +
          groupedData[month]
            .filter((t) => t.value > 0)
            .reduce((acc, item) => acc + Math.abs(item.value), 0),
      }));

      setMonthlyData(formattedData);
    };

    groupTransactionsByMonth();
  }, [transactions]);

  const options = {
    data: monthlyData,
    background: {
      fill: "transparent",
    },

    legend: {
      enabled: true,
      position: "bottom",
      pagination: {
        activeStyle: {
          fill: "white",
        },
        label: {
          color: "white",
        },
      },
      item: {
        paddingX: 10,
        paddingY: 5,
        marker: {
          shape: "circle",
          size: 15,
        },
        label: {
          color: "white",
          fontSize: 14,
        },
      },
    },

    axes: [
      {
        type: "number",
        label: {
          color: "white",
        },
      },
      {
        type: "category",
        label: {
          color: "white",
        },
      },
    ],
    series: [
      {
        type: "bar",
        xKey: "month",
        yKey: "total",
        yName: "Доходи",
        fill: "#63ABFD",
      },
      {
        type: "bar",
        xKey: "month",
        yKey: "value",
        yName: "Витрати",
        fill: "#E697FF",
      },
    ],
  };

  return (
    <div style={{ backgroundColor: "#17191A", borderRadius: "5px" }}>
      <div style={{ height: "330px", padding: "20px" }}>
        <AgChartsReact options={options} />
      </div>
    </div>
  );
};

export default MonthlyChart;
