import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import jolteon from './../assets/jolteon-icon.png';


export default function ({ setUserId }) {
  const [loggingIn, setLoggingIn] = useState(true)
  const navigate = useNavigate();
  const loginPasswordRef = useRef();

  const handleLogin = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        username,
        password
      }),
    })
    .then(res => {
      if (res.status === 204) return alert('Your login information was incorrect.')
      else return res.json()
    })
    .then(user => {
      if (user && user.username === username && user.password === password) {
        console.log('successful login: ', user);
        // do login stuff here
        setUserId(username);
        navigate('/home');
        console.log('login successful');
      } else {
        loginPasswordRef.current.value = "";
      }
    })
    .catch(err => {
      console.log('Error signing in: ', err);
    })
  };

  const handleSignup = (event) => {
    event.preventDefault();
    console.log('signing up');
    
    const data = new FormData(event.currentTarget);

    fetch("/api/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        username: data.get("username"),
        password: data.get("password"),
      }),
    })
    .then(res => {return res.json()})
    .then(data => {
      if (data.username) {
        setUserId(username);
        navigate("/");
      }
      else {
        alert('Username is taken, please try again');
        document.getElementById('signup-username').value = "";
        document.getElementById('signup-password').value = "";
      }
    })
    .catch(err => {
      console.log('Error signing up: ', err);
    })
  };

  const loginPage = () => {
    return <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar 
            src={jolteon}
            style={{
              margin: "10px",
              width: "60px",
              height: "60px",
            }} 
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box 
            component="form" 
            onSubmit={e => {
              handleLogin(e);
              setLoggingIn(false);
            }} 
            noValidate 
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login-username"
              label="username"
              name="username"
              autoComplete="off"
              autoFocus
            />
            <TextField
              ref={loginPasswordRef}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="login-password"
              autoComplete="off"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2"
                  onClick={() => setLoggingIn(false)}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  }

  const signupPage = () => {
    return <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar 
            src={jolteon}
            style={{
              margin: "10px",
              width: "60px",
              height: "60px",
            }} 
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={e => handleSignup(e)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="signup-username"
                  label="username"
                  name="username"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="signup-password"
                  autoComplete="off"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  }

  return (
    <div>
      {loggingIn ? loginPage() : signupPage()}
    </div>
  );
}
