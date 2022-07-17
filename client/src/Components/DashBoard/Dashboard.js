import React from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/authSlice";
import Chat from "../Chat/Chat";
import SideBar from "../SideBar/SideBar";
import Friends from "../Friend/Friends";
import { setCurrentView } from "../../features/chat/chatSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { activeView } = useSelector((state) => state.chat);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="chat">
          {activeView === "friends" ? <Friends /> : <Chat />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
