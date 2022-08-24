import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Chat from "./Components/Chat/Chat";
import RequireAuth from "./Components/Auth/RequireAuth";
import Dashboard from "./Pages/DashBoard/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

// Discord colors https://www.color-hex.com/color-palette/28549

const theme = createTheme({
  overrides: {},
  palette: {
    primary: {
      main: "#7289da",
    },
  },
  typography: {
    fontFamily: "'Nunito Sans', 'sans-serif'",
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/*Public routes*/}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/*Protected Routes*/}
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
