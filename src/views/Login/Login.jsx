import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import GreenButton from '../../components/GreenButton';
import useAuth from '../../hooks/auth';

const StyledForm = styled('form')({
  marginTop: '1em',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '400px',
});

const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: '#2D2F31',
  color: '#ffffff',
});

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  
  const navigate = useNavigate();
  const { login,user,loading } = useAuth();

  if(user) navigate("/dashboard")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log('Call');
    e.preventDefault();
    const { email, password } = formData;

    try {
      login(email, password).then(()=>{
        console.log("Logged in");
        navigate('/dashboard'); // Redirect to dashboard after successful login
      }); // Call the login function from useAuth
      
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error, such as displaying error message to user
    }
  };

  return (
    <StyledContainer>
      <Typography sx={{marginTop:'100px'}} component="h1" variant="h5">
        Увійти
      </Typography>
      <StyledForm onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Е-Мейл"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
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
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />
        <GreenButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ marginTop: '24px' }}
          text={'Увійти'}
        />
          
        <Typography component="p" style={{ marginTop: '20px' }}>
          Немає аккаунту? <Link to="/auth/register">Створити</Link>
        </Typography>
      </StyledForm>
    </StyledContainer>
  );
}

export default Login;
