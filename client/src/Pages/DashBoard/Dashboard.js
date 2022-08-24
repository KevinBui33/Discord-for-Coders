import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import Chat from "../../Components/Chat/Chat";
import SideBar from "../../Components/SideBar/SideBar";
import Friends from "../../Components/Friend/Friends";
import { setCurrentView } from "../../features/chat/chatSlice";
import { SocketProvider } from "../../Context/SocketProvider";
import { userApi } from "../../api/userApi";

const Dashboard = () => {
  const { activeView } = useSelector((state) => state.chat);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      await userApi
        .userInfo()
        .then((res) => setCurrentUser(res))
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  return (
    <SocketProvider>
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="sidebar">
            <SideBar userData={currentUser} />
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
