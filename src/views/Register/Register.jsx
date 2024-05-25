import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import GreenButton from "../../components/GreenButton";
import useAuth from "../../hooks/auth";
import { useNavigate } from "react-router-dom";
const StyledForm = styled("form")({
  marginTop: "1em",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "400px",
});
const StyledContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#2D2F31",
  color: "#ffffff",
});

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const navigate = useNavigate();
  const { register, user, loading } = useAuth();

  if (user) navigate("/dashboard");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      return alert("Please fill up all fields");
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register(username, email, password);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <StyledContainer>
      <Typography sx={{ marginTop: "100px" }} component="h1" variant="h5">
        Створити Аккаунт
      </Typography>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Ім'я користувача"
          name="username"
          autoComplete="username"
          value={formData.username}
          onInput={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Е-Мейл"
          name="email"
          autoComplete="email"
          value={formData.email}
          onInput={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Пароль"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onInput={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Підтвердіть пароль"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onInput={handleChange}
        />
        <GreenButton
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "24px" }}
          onClick={handleSubmit}
          text={loading ? "Завантаження..." : "Створити"}
        />

        <Typography component="p" style={{ marginTop: "20px" }}>
          Вже є аккаунт? <Link to="/auth/login">Увійти</Link>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
}

export default Register;
