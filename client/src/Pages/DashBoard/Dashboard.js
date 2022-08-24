import React, { useEffect } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import Chat from "../../Components/Chat/Chat";
import SideBar from "../../Components/SideBar/SideBar";
import Friends from "../../Components/Friend/Friends";
import { setCurrentView } from "../../features/chat/chatSlice";
import { SocketProvider } from "../../Context/SocketProvider";

const Dashboard = () => {
  const { activeView } = useSelector((state) => state.chat);

  return (
    <SocketProvider>
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="sidebar">
            <SideBar userData={{ username: "tommy" }} />
          </div>
          <div className="chat">
            {activeView === "friends" ? <Friends /> : <Chat />}
          </div>
        </div>
      </div>
    </SocketProvider>
  );
};

export default Dashboard;
