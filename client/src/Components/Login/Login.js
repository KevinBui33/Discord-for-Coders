import {
  Avatar,
  Box,
  Container,
  createTheme,
  CssBaseline,
  TextField,
  ThemeProvider,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as api from "../../Api/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// TODO: Make error message disappear when inputting text field
const theme = createTheme();

function Login({ setToken, setIsRegistering }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMsg, setErrorMsg] = useState("");

  const login = async (data) => {
    const res = await api.loginLocal(data);
    console.log(res);
    if (res.data) {
      setToken(res.data);
    } else {
      setErrorMsg(res.error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(login)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: "Email is required" })}
              error={Boolean(errors.email) || errorMsg}
              helperText={errors.email?.message}
              onChange={() => {
                setErrorMsg("");
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
              error={Boolean(errors.password) || errorMsg}
              helperText={errors.password?.message}
              onChange={() => {
                setErrorMsg("");
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {errorMsg && <Typography color="error.main">{errorMsg}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="/"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRegistering(true);
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
