import "./Styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Chat from "./Components/Chat/Chat";
import { SocketProvider } from "./Context/SocketProvider";
import Friends from "./Components/Friend/Friends";
import SideBar from "./Components/SideBar/SideBar";
import useToken from "./Utils/useToken";
import { useState } from "react";
import AppLayout from "./AppLayout";

// TODO: Make sidebar on every page besides the login/register pages

function App() {
  const { token, setToken } = useToken();
  const [isRegistering, setIsRegistering] = useState(false);
  if (!token) {
    console.log(isRegistering);
    if (isRegistering) {
      return <Register setIsRegistering={setIsRegistering} />;
    } else {
      return <Login setToken={setToken} setIsRegistering={setIsRegistering} />;
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/friends" element={<Friends />} />
          <Route
            index
            path="/chat"
            element={
              <SocketProvider>
                <Chat />
              </SocketProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
