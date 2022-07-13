import React from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/authSlice";
import Chat from "../Chat/Chat";
import NavBar from "../Navbar";
import SideBar from "../SideBar/SideBar";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="sidebar-container">
          <SideBar />
        </div>
        <div className="message-container">
          <NavBar />
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
