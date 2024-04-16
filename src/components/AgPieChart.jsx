import React, { useMemo } from "react";
import { AgChartsReact } from "ag-charts-react";
import { Typography } from "@mui/material";
import { formatToUAH } from "../utils";

const COLORS = [
  "#87C232",
  "#0088FE",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF0000",
  "#00FFFF",
  "#FF12f1",
  "#FF1493",
  "#00FF00",
  "#8A2BE2",
  "#FF4500",
  "#7FFF00",
  "#00CED1",
  "#9932CC",
];

const PieChartComponent = ({ data, title, subtitle, additionalText }) => {
  const chartData = useMemo(() => {
    const categoryMap = {};
    let totalValue = 0;

    // Calculate total value and populate categoryMap
    data.forEach((item) => {
      const value = Math.abs(item.value);
      totalValue += value;
      if (categoryMap[item.category]) {
        categoryMap[item.category].value += value;
      } else {
        categoryMap[item.category] = {
          value: value,
          color: item.color, // Assuming each item might have a specific color
        };
      }
    });

    // Calculate percentage for each category and format chart data
    return Object.keys(categoryMap).map((category, index) => ({
      category,
      label: `${category} - ${formatToUAH(categoryMap[category].value)}`,
      value: categoryMap[category].value,
      percentage: (categoryMap[category].value / totalValue) * 100,
      color: categoryMap[category].color || COLORS[index % COLORS.length], // Use custom or default color
    }));
  }, [data]);

  const options = {
    autoSize: true,
    background: {
      fill: "transparent", // Setting the chart background to transparent
    },
    data: chartData,
    theme: {
      palette: {
        fills: chartData.map((d) => d.color),
        strokes: ["#17191A"],
      },
    },
    series: [
      {
        type: "donut",
        angleKey: "value",
        calloutLabelKey: "label",
        calloutLabel: {
          enabled: false,
        },
        sectorLabelKey: "label",
        sectorLabel: {
          color: "black",
          fontWeight: "bold",
          formatter: ({ datum }) => {
            console.log("Datum", datum);
            return `${datum.percentage.toFixed(0)}%`;
          },
        },
        innerRadiusRatio: 0.5,
      },
    ],

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
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div style={{ backgroundColor: "#17191A", borderRadius: "5px" }}>
      <Typography
        sx={{
          padding: "10px 0 0 20px",
          color: "white",
          fontSize: "24px",
          fontWeight: "600",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          padding: "0 20px",
          color: "white",
          fontSize: "32px",
          fontWeight: "400",
        }}
      >
        {subtitle}
      </Typography>
      <Typography
        sx={{
          padding: "0 20px",
          color: "#e0e0e0",
          fontSize: "18px",
          fontWeight: "300",
        }}
      >
        {additionalText}
      </Typography>
      <div style={{ height: "330px", padding: "20px" }}>
        <AgChartsReact options={options} />
      </div>
    </div>
  );
};

export default PieChartComponent;
