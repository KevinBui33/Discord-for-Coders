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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { useLoginMutation } from "../../features/authApiSlice";

// TODO: Make error message disappear when inputting text field
const theme = createTheme();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLogin, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect to dashboard if token in session storage
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/dashboard");
    }
  }, []);

  // Clear error message when typing
  useEffect(() => {
    setErrorMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userLogin({ email, password: pwd }).unwrap();
      if (res.status === 200) {
        dispatch(setCredentials({ ...res.response, email }));
        localStorage.setItem("loggedIn", true);
        setEmail("");
        setPwd("");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handlePwdInput = (e) => {
    setPwd(e.target.value);
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
            onSubmit={handleSubmit}
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
              onChange={handleEmailInput}
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
              onChange={handlePwdInput}
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
                <Link href="/register" variant="body2">
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
