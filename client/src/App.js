import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Chat from "./Components/Chat/Chat";
import { SocketProvider } from "./Context/SocketProvider";
import RequireAuth from "./Components/Auth/RequireAuth";
import Dashboard from "./Components/DashBoard/Dashboard";

// Discord colors https://www.color-hex.com/color-palette/28549

function App() {
  return (
    <SocketProvider>
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
    </SocketProvider>
  );
}

export default App;
