import "./Styles/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Chat from "./Components/Chat/Chat";
import { SocketProvider } from "./Context/SocketProvider";
import Friends from "./Components/Friend/Friends";
import SideBar from "./Components/SideBar/SideBar";
import useToken from "./Utils/useToken";
import { useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import RequireAuth from "./Components/Auth/RequireAuth";
import Dashboard from "./Components/DashBoard/Dashboard";

// Discord colors https://www.color-hex.com/color-palette/28549

function App() {
  const { setToken } = useToken();

  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <AppLayout />
              </RequireAuth>
            }
          >
            <Route path="friends" element={<Friends />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
