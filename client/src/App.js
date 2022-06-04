import "./Styles/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Chat from "./Components/Chat/Chat";

// TODO: Add socket provider (use react context)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
