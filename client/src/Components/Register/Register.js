import {
  Avatar,
  Box,
  Container,
  createTheme,
  TextField,
  ThemeProvider,
  Typography,
  Button,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as api from "../../Api/api";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// TODO: Handle error messages
// TODO: Redirect to login + say that accout was made

const theme = createTheme();

function Register() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const newAcc = await api.createAccount({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      created_on: new Date(Date.now()).toISOString(),
    });

    console.log(newAcc);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="
              
              "
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
