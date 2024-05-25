import { useState } from "react";
import Home from "./views/Home/Home";
import { createTheme, ThemeProvider } from "@mui/material";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Dashboard from "./views/Dashboard/Dashboard";
import Transactions from "./views/Transactions/Transactions";
import Analytics from "./views/Analytics/Analytics";

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "unset",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            backgroundColor: "#ffffff", // Specify your desired background color
            borderColor: "#87C232", // Specify your desired border color
            fontSize: "14px",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "transparent", // Hide the default underline
          },

          "& label.Mui-focused": {
            color: "#87C232",
            backgroundColor: "white",
            padding: "0 10px",
            border: "1px solid #87C232",
          },
          "& label": {
            color: "#87C232",
            backgroundColor: "white",
            padding: "0 10px",
            fontSize: "14px",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#87C232",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#87C232",
            },
            "&:hover fieldset": {
              borderColor: "#87C232",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#87C232",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          backgroundColor: "#ffffff", // Your desired background color for the select
          fontSize: "14px",
          "&:focus": {
            backgroundColor: "#ffffff", // Maintain bg color on focus, adjust if needed
          },
        },
        icon: {
          color: "#87C232", // Adjust the dropdown icon color if needed
        },
        root: {
          // Border adjustments similar to MuiTextField
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#87C232", // Your desired border color
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#87C232", // Border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#87C232", // Border color when the component is focused
          },
          "& .MuiInputLabel-outlined": {
            color: "#87C232", // Label color
            "&.Mui-focused": {
              color: "#87C232", // Label color when the input is focused
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#87C232", // Border color on hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#87C232", // Border color when the component is focused
          },
        },
        notchedOutline: {
          borderColor: "#87C232", // Initial border color
        },
      },
    },
    // For the label of the select input
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          fontSize: "14px",
          backgroundColor: "#ffffff",
          padding: "0 10px",

          color: "#87C232", // Label color
          "&.Mui-focused": {
            border: "1px solid #87C232",
            color: "#87C232", // Label color when the input is focused
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          // Change background color of the Tab indicator here
          "& .MuiTabs-indicator": {
            backgroundColor: "#87C232", // Your desired background color
          },
        },
      },
    },
  },
});

function App() {
  const text = "Test";

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
